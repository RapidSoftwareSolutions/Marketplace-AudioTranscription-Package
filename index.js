"use strict";
global.PACKAGE_NAME = 'AudioTranscription';
var datetime = require('node-datetime');

const express       = require('express'),
    bodyParser      = require('body-parser'),
    API             = require('rapi-js-package'),
    fs              = require('fs'),
    lib             = require('./lib'),
    _               = lib.callback;

const PORT          = process.env.PORT || 8080;
const app           = express();

let mfile = fs.readFileSync('./metadata.json', 'utf-8'),
    cfile = fs.readFileSync('./control.json',  'utf-8');

let metadata = JSON.parse(mfile),
    control  = JSON.parse(cfile);

app.use(bodyParser.json(({limit: '50mb'})));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.all(`/api/${PACKAGE_NAME}`, (req, res) => { res.send(metadata); });

for(let func in control) {
    let options = {
        parseUri: true,
        hasSkip:  true,
        query:    {},
        //debug:    true
    };

    let {
        method,
        args,
        values,
        tree,
        url
    } = control[func];

    app.post(`/api/${PACKAGE_NAME}/${func}`, _(function* (req, res) {

        let response;
        let opts = {};
        let r    = {
            callback     : "",
            contextWrites: {}
        };

        req.body.args = lib.clearArgs(req.body.args);

        let startTime =datetime.create(req.body.args.startTime);
        req.body.args.startTime = startTime.format('Y-m-d\TH:M:S\Z');

        let endTime =datetime.create(req.body.args.endTime);
        req.body.args.endTime = endTime.format('Y-m-d\TH:M:S\Z');

        try {
            if(values)
                for(let val in values) opts[val + '|String'] = values[val];

            for(let arg in args) {
                let argarr = arg.split('|');
                opts[args[arg] + '|' + argarr[0]] = req.body.args[argarr[1]];
            }

            method == 'GET' ? options.query = opts : options.body = opts;
            options.isRawBody = method == 'POST' || method == 'PUT';
            options.method = method;

            response = yield new API(url).auth({
                type: 'basic',
                username: req.body.args['apiKey'],
                password: ''})
            .request(options);

            r.callback            = 'success';
            r.contextWrites['to'] = response == '' ? {'message': 'Success'} : response;
        } catch(e) {
            r.callback            = 'error';
            r.contextWrites['to'] = e.status_code ? e : { status_code: "API_ERROR", status_msg:  e.message ? e.message : e };
        }

        res.status(200).send(r);
    }))
}

app.listen(PORT);
module.exports = app;

const express = require("express");
const bodyParser = require("body-parser");
const htmlParser = require("htmlparser");
const got = require("got");

const baseScriptureUrl = "https://www.churchofjesuschrist.org/study/scriptures/nt";
const scriptureUrlEnd = "?lang=eng";
const baseUrl = "/api";
const app = express();

app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(bodyParser.json());

const handler = new htmlParser.DefaultHandler((error, dom) => {
    handler.finish(dom);
});

handler.finish = (dom) => {};

const parser = new htmlParser.Parser(handler);

app.get(`${baseUrl}/scripture/:book/:chap/:start/:end`, async (req, res) => {
    got(`${baseScriptureUrl}/${req.params.book}/${req.params.chap}${scriptureUrlEnd}`).then(response => {
        handler.finish = (dom) => {
            let text = "";
            const getText = (element) => {
                if (element.name != "sup" && element.children && (!element.attribs || element.attribs.class != "para-mark")) {
                    for (const sub of element.children) {
                        if (sub.type == "text") {
                            text += sub.raw;
                        }
                        else {
                            getText(sub);
                        }
                    }
                }
            };
            
            const search = (element) => {
                if (element.attribs && element.attribs.id) {
                    const verse = parseInt(element.attribs.id.substr(1));
                    if (!isNaN(verse) && verse >= req.params.start && verse <= req.params.end) {
                        if (text.length > 0) {
                            text += "\n";
                        }
                        getText(element);
                    }
                }
                
                if (element.children) {
                    for (const child of element.children) {
                        search(child);
                    }
                }
            };
            
            for (const e of dom) {
                search(e);
            }
            
            res.send(text);
        };
        
        parser.parseComplete(response.body);
    });
});

app.listen(3000, () => console.log('Server listening on port 3000!'));
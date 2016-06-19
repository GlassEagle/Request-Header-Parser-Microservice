'use strict';

function requestHeaderParserHandler (req, res) {
			
			var data = {
				ipaddress: null,
				language: null,
				software: null
			};
			
			var re;
			
			data.ipaddress = req.ip; //express property, depends on "trust proxy" setting
			
			if (req.headers) {
				
				if (req.headers["accept-language"]){
					//refrence https://tools.ietf.org/html/rfc7231#section-5.3.1 to remove the qvalues
					re = /;(?:q=)(?:0(?:.\d\d?\d?)?|1(?:.00?0?)?)/;
					var lang = req.headers["accept-language"].replace(re, "");
					data.language = lang;
				}
				
				if(req.headers["user-agent"]){
					//search for (os) and extract os, else just copy user agent
					var userAgent = req.headers["user-agent"];
					re = /\((.*)\)/;
					var result = re.exec(userAgent);
					data.software = result ? result[1] : userAgent;
				}
			}
			
			res.json(data);
		}

module.exports = requestHeaderParserHandler;
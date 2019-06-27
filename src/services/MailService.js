//@ts-check

const credentials = require("./credentials.js");
const token = require("./token");
import { google } from "googleapis";

const SCOPES = [
  "https://mail.google.com/",
  "https://www.googleapis.com/auth/gmail.modify",
  "https://www.googleapis.com/auth/gmail.compose",
  "https://www.googleapis.com/auth/gmail.send"
];

authorize(credentials, listLabels);

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials, callback) {
  const { client_secret, client_id, redirect_uris } = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(
    client_id,
    client_secret,
    redirect_uris[0]
  );
  oAuth2Client.setCredentials(token);
  callback(oAuth2Client);
}

// to and from = "some name <blaw.blaw.com"
function makeBody(to, from, subject, message) {
  var str = [
    'Content-Type: text/html; charset="UTF-8"\r\n',
    "MIME-Version: 1.0\r\n",
    "Content-Transfer-Encoding: 7bit\r\n",
    "to: ",
    to,
    "\r\n",
    "from: ",
    from,
    "\r\n",
    "subject: ",
    subject,
    "\r\n\r\n",
    message
  ].join("");

  var encodedMail = Buffer.from(str)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");

  return encodedMail;
}

var gmail;

/**
 * Lists the labels in the user's account.
 *
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
function listLabels(auth) {
  gmail = google.gmail({ version: "v1", auth });
}

export async function sendMail(email, password){
    await gmail.users.messages.send(
        {
          userId: "me",
          requestBody: {
            raw: makeBody(
              email,
              "support@seekinnovation.com",
              "OVB Learning - Zugangsdaten",
              createMail(email, password)
            )
          }
        }
      );
}

// class MailService{
//     gmail;
//     constructor(){

//     }
// }

function createMail(email, passwort) {
  return `<div class=WordSection1>
  <p class=MsoNormal>
    <span lang=DE-AT style='font-size:14.0pt;line-height:107%;font-family:"Bahnschrift",sans-serif'>Sehr geehrter User,<o:p></o:p></span>
  </p>
  <p class=MsoNormal>
    <span lang=DE-AT style='font-size:12.0pt;line-height:107%;font-family:"Bahnschrift",sans-serif'><o:p>&nbsp;</o:p></span>
  </p>
  <p class=MsoNormal>
    <span lang=DE-AT style='font-size:12.0pt;line-height:107%;font-family:"Bahnschrift",sans-serif'>willkommen in der OVB Learning Suite.<o:p></o:p></span>
  </p>
  <p class=MsoNormal>
  <span lang=DE-AT style='font-size:12.0pt;line-height:107%;font-family:"Bahnschrift",sans-serif'>Ihnen wurden folgende Zugangsdaten zugewiesen:<o:p></o:p></span>
  </p>
  <p class=MsoNormal>
<span lang=DE-AT style='font-size:12.0pt;line-height:107%;font-family:"Bahnschrift",sans-serif'><o:p>&nbsp;</o:p></p>
<p class=MsoNormal>
<b>
<span lang=DE-AT style='font-size:14.0pt;line-height:107%;font-family:"Bahnschrift",sans-serif'>Username:          ${email}<o:p>
</o:p>
</span>
</b>
</p>
<p class=MsoNormal>
<b>
<span lang=DE-AT style='font-size:14.0pt;line-height:107%;font-family:"Bahnschrift",sans-serif'>Passwort:           ${passwort}<o:p>
</o:p>
</span>
</b>
</p>
<p class=MsoNormal>
<span lang=DE-AT style='font-size:12.0pt;line-height:107%;color:black;mso-fareast-language:EN-GB'>
<o:p>&nbsp;</o:p>
</span>
</p>
<p class=MsoNormal>
<span lang=DE-AT style='font-size:12.0pt;line-height:107%;font-family:"Bahnschrift",sans-serif'>
<o:p>&nbsp;</o:p>
</span>
</p>
<p class=MsoNormal>
<span lang=DE-AT style='font-size:12.0pt;line-height:107%;font-family:"Bahnschrift",sans-serif'>Sie können die iOS/Android-App unter folgenden Links herunterladen:<br/><o:p>
</o:p>
</span>
</p>
<p class=MsoNormal>
<b>
<span lang=DE-AT style='font-size:12.0pt;line-height:107%;font-family:"Bahnschrift",sans-serif'>Android:         <br/><br/><o:p>
</o:p>
</span>
</b>
</p>
<p class=MsoNormal>
<span lang=DE-AT>
<a href="https://play.google.com/store/apps/details?id=com.seekinnovation.ovb_learning" target="_blank">
<b>
<span style='font-size:10.5pt;line-height:107%;font-family:"Bahnschrift",sans-serif;background:white'>Get on PlayStore</span>
</b>
</a>
</span>
<br/><br/>
</p>
<p class=MsoNormal>
<b>
<span lang=DE-AT style='font-size:12.0pt;line-height:107%;font-family:"Bahnschrift",sans-serif'>iOS:                <br/><br/><o:p>
</o:p>
</span>
</b>
</p>
<p class=MsoNormal>
<span class=MsoHyperlink>
<span lang=DE-AT style='font-size:10.5pt;line-height:107%;background:white'>
<a href="https://apps.apple.com/az/app/ovb-learning/id1459039127"><b>
<span style='font-size:10.5pt;line-height:107%;font-family:"Bahnschrift",sans-serif;background:white'>Get on AppStore</span>
</b></a><br/><br/>
</span>
</span>
<span lang=DE-AT style='font-size:10.5pt;line-height:107%;font-family:"Bahnschrift",sans-serif;color:black;background:white'>
<o:p>
</o:p>
</span>
</p>
<p class=MsoNormal>
<span lang=DE-AT style='font-size:12.0pt;line-height:107%;font-family:"Bahnschrift",sans-serif'>
<o:p>&nbsp;</o:p>
</span>
</p>
<p class=MsoNormal>
<span lang=DE style='font-size:10.5pt;line-height:107%;font-family:"Bahnschrift",sans-serif;color:black;mso-fareast-language:EN-GB'>Mit&nbsp;<b>„OVB Learning“</b>&nbsp;können Sie die App in ihrem Store ganz einfach auf Ihrem Smartphone finden.</span>
<span lang=DE-AT style='font-size:10.5pt;line-height:107%;font-family:"Bahnschrift",sans-serif;color:black;background:white'>
<o:p>
</o:p>
</span>
</p>
<p class=MsoNormal>
<span lang=DE-AT style='font-family:"Bahnschrift",sans-serif'>
<o:p>&nbsp;</o:p>
</span>
</p>
<p class=MsoNormal>
<span lang=DE-AT style='font-family:"Bahnschrift",sans-serif'>Bei Anregungen oder Feedback können Sie in der Bewertungssektion der iOS/Android-App eine Bewertung hinterlassen oder an folgende Supportadresse eine E-Mail senden:<o:p>
</o:p>
</span>
</p>
<p class=MsoNormal>
<span lang=DE-AT style='font-family:"Bahnschrift",sans-serif'>
<o:p>&nbsp;</o:p>
</span>
</p>
<p class=MsoNormal>
<span lang=DE-AT>
<a href="mailto:support@seekinnovation.at">
<span style='font-size:13.5pt;line-height:107%;font-family:"Bahnschrift",sans-serif;background:white'>support@seekinnovation.at</span>
</a>
</span>
<span lang=DE-AT style='font-family:"Bahnschrift",sans-serif'>
<o:p>
</o:p>
</span>
</p>
<p class=MsoNormal>
<span lang=DE-AT style='font-family:"Bahnschrift",sans-serif'>
<o:p>&nbsp;</o:p>
</span>
</p>
<p class=MsoNormal>
<i>
<span lang=DE-AT style='font-family:"Bahnschrift",sans-serif'>Dies ist eine automatisch generierte E-Mail, Antworten werden nicht weitergeleitet.<o:p>
</o:p>
</span>
</i>
</p>
<p class=MsoNormal>
<i>
<span lang=DE-AT style='font-family:"Bahnschrift",sans-serif'>
<o:p>&nbsp;</o:p>
</span>
</i>
</p>
<p class=MsoNormal>
<i>
<span lang=DE-AT style='font-family:"Bahnschrift",sans-serif'>SeekInnovation 2019<o:p>
</o:p>
</span>
</i>
</p>
</div>`;
}

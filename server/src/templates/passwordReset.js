/**
 * @param {string} url
 * @param {string} token reset token
 * @param {string} email user email
 * @return {HTML} returns HTML template
 */

export default (url, token, email) => {
  // eslint-disable-next-line no-unused-expressions
  `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><html xmlns="http://www.w3.org/1999/xhtml" lang="en" xml:lang="en" style="background:#fff!important;margin-top:50px">
    <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta name="viewport" content="width=device-width">
    <title></title>
    <style>
        @media only screen {
            html {
                min-height: 100%;
                background: #f3f3f3
            }
        }

        @media only screen and (max-width:596px) {
            .small-float-center {
                margin: 0 auto !important;
                float: none !important;
                text-align: center !important
            }
        }

        @media only screen and (max-width:596px) {
            table.body img {
                width: auto;
                height: auto
            }

            table.body center {
                min-width: 0 !important
            }

            table.body .container {
                width: 95% !important
            }

            table.body .columns {
                height: auto !important;
                -moz-box-sizing: border-box;
                -webkit-box-sizing: border-box;
                box-sizing: border-box;
                padding-left: 16px !important;
                padding-right: 16px !important
            }

            table.body .columns .columns {
                padding-left: 0 !important;
                padding-right: 0 !important
            }

            table.body .collapse .columns {
                padding-left: 0 !important;
                padding-right: 0 !important
            }

            th.small-6 {
                display: inline-block !important;
                width: 50% !important
            }

            th.small-12 {
                display: inline-block !important;
                width: 100% !important
            }

            .columns th.small-12 {
                display: block !important;
                width: 100% !important
            }

            table.menu {
                width: 100% !important
            }

            table.menu td,
            table.menu th {
                width: auto !important;
                display: inline-block !important
            }

            table.menu.vertical td,
            table.menu.vertical th {
                display: block !important
            }

            table.menu[align=center] {
                width: auto !important
            }
        }
    </style>
</head>

<body style="-moz-box-sizing:border-box;-ms-text-size-adjust:100%;-webkit-box-sizing:border-box;-webkit-text-size-adjust:100%;Margin:0;background:#fff!important;box-sizing:border-box;color:#0a0a0a;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:400;line-height:1.3;margin:0;margin-top:50px;min-width:100%;padding:0;text-align:left;width:100%!important"><span
        class="preheader" style="color:#f3f3f3;display:none!important;font-size:1px;line-height:1px;max-height:0;max-width:0;mso-hide:all!important;opacity:0;overflow:hidden;visibility:hidden"></span>
    <table class="body" style="Margin:0;background:#fff!important;border-collapse:collapse;border-spacing:0;color:#0a0a0a;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:400;height:100%;line-height:1.3;margin:0;margin-top:50px;padding:0;text-align:left;vertical-align:top;width:100%">
        <tr style="padding:0;text-align:left;vertical-align:top">
            <td class="center" align="center" valign="top" style="-moz-hyphens:auto;-webkit-hyphens:auto;Margin:0;border-collapse:collapse!important;color:#0a0a0a;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:400;hyphens:auto;line-height:1.3;margin:0;padding:0;text-align:left;vertical-align:top;word-wrap:break-word">
                <center data-parsed="" style="min-width:580px;width:100%">
                    <table align="center" class="container float-center" style="Margin:0 auto;background:#fefefe;border-collapse:collapse;border-spacing:0;float:none;margin:0 auto;padding:0;text-align:center;vertical-align:top;width:580px">
                        <tbody>
                            <tr style="padding:0;text-align:left;vertical-align:top">
                                <td style="-moz-hyphens:auto;-webkit-hyphens:auto;Margin:0;border-collapse:collapse!important;color:#0a0a0a;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:400;hyphens:auto;line-height:1.3;margin:0;padding:0;text-align:left;vertical-align:top;word-wrap:break-word">
                                        <table class="row header" style="background: #3D444A!important;border-collapse:collapse;border-spacing:0;color:#fff!important;display:table;padding:0;position:relative;text-align:left;vertical-align:top;width:100%">
                                            <tr style="padding:0;text-align:left;vertical-align:top">
                                                <th class="text-center small-12 large-12 columns first last" style="Margin:0 auto;color:#0a0a0a;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:400;line-height:1.3;margin:0 auto;padding:0;padding-bottom:0;padding-left:16px;padding-right:16px;text-align:center;width:564px">
                                                    <table style="border-collapse:collapse;border-spacing:0;padding:0;text-align:left;vertical-align:top;width:100%">
                                                        <tr style="padding:0;text-align:left;vertical-align:top">
                                                            <th style="Margin:0;color:#0a0a0a;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:400;line-height:1.3;margin:0;padding:0;text-align:left">
                                                                <table class="spacer" style="border-collapse:collapse;border-spacing:0;padding:0;text-align:left;vertical-align:top;width:100%">
                                                                    <tbody>
                                                                        <tr style="padding:0;text-align:left;vertical-align:top">
                                                                            <td height="26px" style="-moz-hyphens:auto;-webkit-hyphens:auto;Margin:0;border-collapse:collapse!important;color:#0a0a0a;font-family:Helvetica,Arial,sans-serif;font-size:26px;font-weight:400;hyphens:auto;line-height:26px;margin:0;mso-line-height-rule:exactly;padding:0;text-align:left;vertical-align:top;word-wrap:break-word">&#xA0;</td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                                <h2 style="text-align: center;color: #fff;font-size: 30px;">Politico</h2>
                                                                <table class="spacer" style="border-collapse:collapse;border-spacing:0;padding:0;text-align:left;vertical-align:top;width:100%">
                                                                    <tbody>
                                                                        <tr style="padding:0;text-align:left;vertical-align:top">
                                                                            <td height="26px" style="-moz-hyphens:auto;-webkit-hyphens:auto;Margin:0;border-collapse:collapse!important;color:#0a0a0a;font-family:Helvetica,Arial,sans-serif;font-size:26px;font-weight:400;hyphens:auto;line-height:26px;margin:0;mso-line-height-rule:exactly;padding:0;text-align:left;vertical-align:top;word-wrap:break-word">&#xA0;</td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </th>
                                                            <th class="expander" style="Margin:0;color:#0a0a0a;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:400;line-height:1.3;margin:0;padding:0!important;text-align:left;visibility:hidden;width:0"></th>
                                                        </tr>
                                                    </table>
                                                </th>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <table class="row" style="border-collapse:collapse;border-spacing:0;display:table;padding:0;position:relative;text-align:left;vertical-align:top;width:100%">
                                        <tbody>
                                            <tr style="padding:0;text-align:left;vertical-align:top">
                                                <th class="main small-12 large-12 columns first last" style="Margin:0 auto;border:1px solid #ededed;color:#0a0a0a;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:400;line-height:1.3;margin:0 auto;padding:30px;padding-bottom:16px;padding-left:16px;padding-right:16px;text-align:left;width:564px">
                                                    <table style="border-collapse:collapse;border-spacing:0;padding:0;text-align:left;vertical-align:top;width:100%">
                                                        <tr style="padding:0;text-align:left;vertical-align:top">
                                                            <th style="Margin:0;color:#0a0a0a;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:400;line-height:1.3;margin:0;padding:0;text-align:left">
                                                                <p style="Margin:0;Margin-bottom:10px;color:#333;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:400;line-height:1.3;margin:0;margin-bottom:10px;padding:0;text-align:left">Hi,</p>
                                                                <table class="spacer" style="border-collapse:collapse;border-spacing:0;padding:0;text-align:left;vertical-align:top;width:100%">
                                                                    <tbody>
                                                                        <tr style="padding:0;text-align:left;vertical-align:top">
                                                                            <td height="5px" style="-moz-hyphens:auto;-webkit-hyphens:auto;Margin:0;border-collapse:collapse!important;color:#0a0a0a;font-family:Helvetica,Arial,sans-serif;font-size:5px;font-weight:400;hyphens:auto;line-height:5px;margin:0;mso-line-height-rule:exactly;padding:0;text-align:left;vertical-align:top;word-wrap:break-word">&#xA0;</td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                                <p style="Margin:0;Margin-bottom:10px;color:#333;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:400;line-height:1.3;margin:0;margin-bottom:10px;padding:0;text-align:left">You
                                                                    recently requested to reset your password. If this
                                                                    wasn't you, please ignore this mail.</p><br>
                                                                <center data-parsed="" style="min-width:532px;width:100%">
                                                                    <table class="button btn float-center" style="Margin:0 0 16px 0;border-collapse:collapse;border-spacing:0;float:none;margin:0 0 16px 0;padding:0;text-align:center;vertical-align:top;width:auto">
                                                                        <tr style="padding:0;text-align:left;vertical-align:top">
                                                                            <td style="-moz-hyphens:auto;-webkit-hyphens:auto;Margin:0;border-collapse:collapse!important;color:#0a0a0a;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:400;hyphens:auto;line-height:1.3;margin:0;padding:0;text-align:left;vertical-align:top;word-wrap:break-word">
                                                                                <table style="border-collapse:collapse;border-spacing:0;padding:0;text-align:left;vertical-align:top;width:100%">
                                                                                    <tr style="padding:0;text-align:left;vertical-align:top">
                                                                                        <td style="-moz-hyphens:auto;-webkit-hyphens:auto;Margin:0;background:#3D444A;border:0 solid #3D444A!important;border-collapse:collapse!important;border-radius:2px!important;color:#fff;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:400;hyphens:auto;line-height:1.3;margin:0;padding:0;text-align:left;vertical-align:top;word-wrap:break-word"><a
                                                                                                href="http://${url}/api/v1/auth/reset-password?token=${token}&email=${email}"
                                                                                                style="Margin:0;background:0 0!important;border:0 solid #2199e8;border-color:#3D444A!important;border-radius:5px!important;color:#fff!important;cursor:pointer;display:inline-block;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:700;line-height:1.3;margin:0;padding:15px!important;text-align:left;text-decoration:none">Reset
                                                                                                Password</a></td>
                                                                                    </tr>
                                                                                </table>
                                                                            </td>
                                                                        </tr>
                                                                    </table>
                                                                </center><br>
                                                                <p style="Margin:0;Margin-bottom:10px;color:#333;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:400;line-height:1.3;margin:0;margin-bottom:10px;padding:0;text-align:left">Or
                                                                    copy the link below and paste it in your browser</p><br><a
                                                                    href="http://${url}/reset-password?token=${token}&email=${email}"
                                                                    style="Margin:0;color: #00CC80!important;cursor:pointer;font-family:Helvetica,Arial,sans-serif;font-weight:400;line-height:1.3;margin:0;padding:0;text-align:left;text-decoration:none">http://${url}/reset-password?token=${token}&email=${email}</a><br><br>
                                                                <p style="Margin:0;Margin-bottom:10px;color:#333;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:400;line-height:1.3;margin:0;margin-bottom:10px;padding:0;text-align:left">This
                                                                    link expires in 1 day.</p><br>
                                                                <p style="Margin:0;Margin-bottom:10px;color:#333;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:400;line-height:1.3;margin:0;margin-bottom:10px;padding:0;text-align:left">Have
                                                                    a great day.</p><br><a href="https://cryptic-escarpment-28116.herokuapp.com/"
                                                                    style="Margin:0;color:#3D444A!important;cursor:pointer;font-family:Helvetica,Arial,sans-serif;font-weight:400;line-height:1.3;margin:0;padding:0;text-align:left;text-decoration:none">Politico</a><br><br>
                                                            </th>
                                                            <th class="expander" style="Margin:0;color:#0a0a0a;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:400;line-height:1.3;margin:0;padding:0!important;text-align:left;visibility:hidden;width:0"></th>
                                                        </tr>
                                                    </table>
                                                </th>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <table class="row footer text-center" style="background:#fff!important;border-collapse:collapse;border-spacing:0;display:table;padding:0;position:relative;text-align:center;vertical-align:top;width:100%">
                                        <tbody>
                                            <tr style="padding:0;text-align:left;vertical-align:top">
                                                <th class="small-12 large-12 columns first last" style="Margin:0 auto;color:#0a0a0a;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:400;line-height:1.3;margin:0 auto;padding:0;padding-bottom:16px;padding-left:16px;padding-right:16px;text-align:left;width:564px">
                                                    <table style="border-collapse:collapse;border-spacing:0;padding:0;text-align:left;vertical-align:top;width:100%">
                                                        <tr style="padding:0;text-align:left;vertical-align:top">
                                                            <th class="expander" style="margin:0;color:#0a0a0a;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:400;line-height:1.3;margin:0;padding:0!important;text-align:left;visibility:hidden;width:0"></th>
                                                        </tr>
                                                    </table>
                                                </th>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </center>
            </td>
        </tr>
    </table>
    <div style="display:none;white-space:nowrap;font:15px courier;line-height:0">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
        &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
        &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</div>
</body>
</html>
`;
};

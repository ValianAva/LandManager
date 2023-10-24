using System.Net.Mail;
using System.Text.RegularExpressions;
using Microsoft.Extensions.Options;
using LandManager.Application.Common.Configuration;
using LandManager.Application.Common.Interfaces;

namespace LandManager.Infrastructure.Common;

public class Smtp : INotify
{
	private readonly ILogger _logger;
	private readonly SmtpSettings _smtpSettings;
	public Smtp(ILogger logger, IOptions<SmtpSettings> smtpOptions)
	{
		_logger = logger.ForContext("SourceContext", typeof(Smtp).Name);
		_smtpSettings = smtpOptions.Value;
	}

	/// <summary>
	/// Sends an SMTP message.
	/// </summary>
	/// <param name="to"></param>
	/// <param name="subject"></param>
	/// <param name="body"></param>
	public void Send(string to, string subject, string body)
	{
		if (string.IsNullOrWhiteSpace(to))
		{
			_logger.Warning("Recipient's email was null, aborting SMTP Message.");
			return;
		}

		if (_smtpSettings.SuppressMessages)
		{
			_logger.Information("Email titled '{Subject}' suppressed. Would have been sent to {Recipient}", subject, to);
			return;
		}
		var htmlBody = body;
		//first wrap the desired content in the template
		htmlBody = Template(htmlBody, subject);

		//keep line breaks by replacing br and opening p
		body = body.Replace("<br />", Environment.NewLine).Replace("<p>", Environment.NewLine);
		//strip all other html tags
		body = Regex.Replace(body, "<(.|\\n)*?>", string.Empty);

		var smtp = new SmtpClient(_smtpSettings.HostServer, _smtpSettings.Port);
		if (!string.IsNullOrWhiteSpace(_smtpSettings.Username))
		{
			smtp.Credentials = new System.Net.NetworkCredential(_smtpSettings.Username, _smtpSettings.Password);
			smtp.EnableSsl = true;
		}
		var mm = new MailMessage(_smtpSettings.FromAddress, to, $"[{_smtpSettings.SubjectPrefix}] - " + subject, body)
		{
			IsBodyHtml = false
		};

		var htmlView = AlternateView.CreateAlternateViewFromString(htmlBody, null, System.Net.Mime.MediaTypeNames.Text.Html);
		mm.AlternateViews.Add(htmlView);

		try
		{
			smtp.Send(mm);

			_logger.Information("Email titled '{Subject}' successfully sent to {@Recipients}", mm.Subject, mm.To.Select(t => t.Address).ToArray());

		}
		catch (SmtpFailedRecipientException ex)
		{
			//just catch this exception since it's more than likely a permanent problem
			var statusCode = ex.StatusCode;
			if (statusCode == SmtpStatusCode.MailboxBusy || statusCode == SmtpStatusCode.MailboxUnavailable || statusCode == SmtpStatusCode.TransactionFailed)
			{
				System.Threading.Thread.Sleep(2000);
				smtp.Send(mm);
				_logger.Information("Email titled '{Subject}' successfully sent to {@Recipients} after SmtpFailedRecipientException", mm.Subject, mm.To.Select(t => t.Address).ToArray());
			}
			else
			{
				_logger.Warning(ex, "Error sending {Subject} to recipient {Recipient}", mm.Subject, to);
				throw ex;
			}
		}
		catch (SmtpException)
		{
			//if it fails once, wait 2 seconds and try again since it may be a temporary problem
			System.Threading.Thread.Sleep(2000);
			try
			{
				smtp.Send(mm);
				_logger.Information("Email titled '{Subject}' successfully sent to {@Recipients} after SmtpException", mm.Subject, mm.To.Select(t => t.Address).ToArray());
			}
			catch (SmtpException ex)
			{
				_logger.Warning(ex, "Error sending {Subject} to recipient {Recipient} after a retry", mm.Subject, to);
				throw ex;
			}
		}
		finally
		{
			smtp.Dispose();
			mm.Dispose();
		}

	}

	//Template is just straight text in the code so there's no worry of I/O and getting things correct on the filesystem when publishing
	private string Template(string body, string title)
	{
		return $@"
                <!doctype html>
                <html>
                  <head>
                    <meta name=""viewport"" content=""width=device-width"">
                    <meta http-equiv=""Content-Type"" content=""text/html; charset=UTF-8"">
                    <title>{title}</title>
                    <style>
                    /* -------------------------------------
                        INLINED WITH htmlemail.io/inline
                    ------------------------------------- */
                    /* -------------------------------------
                        RESPONSIVE AND MOBILE FRIENDLY STYLES
                    ------------------------------------- */
                    @media only screen and (max-width: 620px) {{
                      table[class=body] h1 {{
                        font-size: 28px;
                        margin-bottom: 10px;
                      }}
                      table[class=body] p,
                            table[class=body] ul,
                            table[class=body] ol,
                            table[class=body] td,
                            table[class=body] span,
                            table[class=body] a {{
                        font-size: 16px;
                      }}
                      table[class=body] .wrapper,
                            table[class=body] .article {{
                        padding: 10px;
                      }}
                      table[class=body] .content {{
                        padding: 0;
                      }}
                      table[class=body] .container {{
                        padding: 0;
                        width: 100%;
                      }}
                      table[class=body] .main {{
                        border-left-width: 0;
                        border-radius: 0;
                        border-right-width: 0;
                      }}
                      table[class=body] .btn table {{
                        width: 100%;
                      }}
                      table[class=body] .btn a {{
                        width: 100%;
                      }}
                      table[class=body] .img-responsive {{
                        height: auto;
                        max-width: 100%;
                        width: auto;
                      }}
                    }}
                    /* -------------------------------------
                        PRESERVE THESE STYLES IN THE HEAD
                    ------------------------------------- */
                    @media all {{
                      .ExternalClass {{
                        width: 100%;
                      }}
                      .ExternalClass,
                            .ExternalClass p,
                            .ExternalClass span,
                            .ExternalClass font,
                            .ExternalClass td,
                            .ExternalClass div {{
                        line-height: 100%;
                      }}
                      .apple-link a {{
                        color: inherit;
                        font-family: inherit;
                        font-size: inherit;
                        font-weight: inherit;
                        line-height: inherit;
                        text-decoration: none;
                      }}
                      .btn-primary table td:hover {{
                        background-color: #34495e;
                      }}
                      .btn-primary a:hover {{
                        background-color: #34495e;
                        border-color: #34495e;
                      }}
                    }}
                    </style>
                  </head>
                  <body class="""" style=""background-color: #f6f6f6; font-family: sans-serif; -webkit-font-smoothing: antialiased; font-size: 14px; line-height: 1.4; margin: 0; padding: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;"">
                    <table border=""0"" cellpadding=""0"" cellspacing=""0"" class=""body"" style=""border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%; background-color: #f6f6f6;"">
                      <tr>
                        <td style=""font-family: sans-serif; font-size: 14px; vertical-align: top;"">&nbsp;</td>
                        <td class=""container"" style=""font-family: sans-serif; font-size: 14px; vertical-align: top; display: block; Margin: 0 auto; max-width: 580px; padding: 10px; width: 580px;"">
                          <div class=""content"" style=""box-sizing: border-box; display: block; Margin: 0 auto; max-width: 580px; padding: 10px;"">

                            
                            <span class=""preheader"" style=""color: transparent; display: none; height: 0; max-height: 0; max-width: 0; opacity: 0; overflow: hidden; mso-hide: all; visibility: hidden; width: 0;""></span>
                            <table class=""main"" style=""border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%; background: #ffffff; border-radius: 3px;"">

                             
                              <tr>
                                <td class=""wrapper"" style=""font-family: sans-serif; font-size: 14px; vertical-align: top; box-sizing: border-box; padding: 20px;"">
                                  <table border=""0"" cellpadding=""0"" cellspacing=""0"" style=""border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%;"">
                                    <tr>
                                      <td style=""font-family: sans-serif; font-size: 14px; vertical-align: top;"">
                                        {body}
                                      </td>
                                    </tr>
                                  </table>
                                </td>
                              </tr>

                            
                            </table>

                            
                            <div class=""footer"" style=""clear: both; Margin-top: 10px; text-align: center; width: 100%;"">
                              <table border=""0"" cellpadding=""0"" cellspacing=""0"" style=""border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%;"">
                                <tr>
                                  <td class=""content-block"" style=""font-family: sans-serif; vertical-align: top; padding-bottom: 10px; padding-top: 10px; font-size: 12px; color: #999999; text-align: center;"">
                                    <span class=""apple-link"" style=""color: #999999; font-size: 12px; text-align: center;"">LandManager</span>
                                  </td>
                                </tr>                                
                              </table>
                            </div>
                            

                          
                          </div>
                        </td>
                        <td style=""font-family: sans-serif; font-size: 14px; vertical-align: top;"">&nbsp;</td>
                      </tr>
                    </table>
                  </body>
                </html>
                ";
	}
}

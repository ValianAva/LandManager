﻿namespace LandManager.Application.Common.Configuration;

public class SmtpSettings
{
	public string HostServer { get; set; }
	public string FromAddress { get; set; }
	public string Username { get; set; }
	public string Password { get; set; }
	public int Port { get; set; }
	public string SubjectPrefix { get; set; }
	public bool SuppressMessages { get; set; }
}

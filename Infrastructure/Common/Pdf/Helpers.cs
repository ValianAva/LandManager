

using HtmlAgilityPack;

namespace LandManager.Infrastructure.Common.Pdf;

public static class Helpers
{
	public static string StripHtml(string html)
	{
		if (string.IsNullOrEmpty(html)) return "";
		var htmlDoc = new HtmlDocument();
		htmlDoc.LoadHtml(html.Replace("</p>", "</p>\r\n".Replace("<br/>", Environment.NewLine)));
		return HtmlEntity.DeEntitize(htmlDoc.DocumentNode.InnerText);
	}
}
using MigraDoc.DocumentObjectModel;
using MigraDoc.Extensions.Html;
using LandManager.Application.Common.Configuration.Labelling;

namespace LandManager.Infrastructure.Common.Pdf;

public static class SectionExtensions
{
	public static void AddTitle(this Section section, string sectionTitle, Font font = null, string bookmarkName = null, OutlineLevel outlineLevel = OutlineLevel.BodyText)
	{
		if (font == null)
			font = Fonts.Header2;

		var p = new Paragraph();
		p.Format.LineSpacingRule = LineSpacingRule.Multiple;
		p.Format.LineSpacing = 1.1;
		p.AddLineBreak();
		p.AddFormattedText(sectionTitle.ToUpper(), font);

		if (!string.IsNullOrEmpty(bookmarkName))
		{
			p.AddBookmark(bookmarkName);
			p.Format.OutlineLevel = outlineLevel;
		}
		p.AddLineBreak();

		section.Add(p);
	}

	public static void AddFieldHeader(this Section section, string sectionTitle)
	{
		section.AddTitle(sectionTitle, Fonts.FieldHeader);
	}

	public static void AddFieldHeader(this Section section, FieldLabel sectionTitle)
	{
		section.AddTitle(sectionTitle.Label, Fonts.FieldHeader);
	}

	public static void AddTocItem(this Section section, string text, string bookmarkName, int numIndents = 0)
	{
		var p = new Paragraph();
		p.Format.AddTabStop("16cm", TabAlignment.Right, TabLeader.Dots);
		p.Format.SpaceAfter = new Unit(5);

		var h = p.AddHyperlink(bookmarkName);
		var i = 0;
		var totalPadding = 0;
		while (i < numIndents)
		{
			totalPadding += 8;
			i += 1;
		}
		p.Format.LeftIndent = new Unit(totalPadding);
		h.AddText(text);
		h.AddTab();
		h.AddPageRefField(bookmarkName);

		section.Add(p);
	}

	public static void LineBreak(this Section section, int breakCount = 2)
	{
		section.Add(Elements.LineBreak(breakCount));
	}

	public static void AddHtmlField(this Section section, FieldLabel label, string value)
	{
		section.AddFieldHeader(label.Label);
		section.AddHtml(value);
	}
}
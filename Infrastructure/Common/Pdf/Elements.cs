using MigraDoc.DocumentObjectModel;

namespace LandManager.Infrastructure.Common.Pdf;

public static class Elements
{
	public static Paragraph LineBreak(int breakCount = 2)
	{
		var p = new Paragraph();
		for (int i = 0; i < breakCount; i++)
		{
			p.AddLineBreak();
		}

		return p;
	}
}
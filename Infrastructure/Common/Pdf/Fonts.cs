using MigraDoc.DocumentObjectModel;

namespace LandManager.Infrastructure.Common.Pdf;

public static class Fonts
{
	private static readonly Color _headerColor = new(80, 88, 65);
	public static Font Title => new("Franklin Gothic Medium") { Size = new Unit(28), Color = _headerColor };
	public static Font Header1 => new("Franklin Gothic Medium") { Size = new Unit(19), Color = _headerColor };
	public static Font Header2 => new("Franklin Gothic Medium") { Size = new Unit(15), Color = _headerColor };
	public static Font FieldHeader => new("Franklin Gothic Medium") { Size = new Unit(12), Color = _headerColor };
	public static Font FieldSubHeader => new("Franklin Gothic Medium") { Size = new Unit(11), Color = new Color(62, 62, 66) };
}
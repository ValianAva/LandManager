using Lucene.Net.Analysis;
using Lucene.Net.Analysis.Core;
using Lucene.Net.Util;

namespace LandManager.Infrastructure.Common.Search;

public sealed class LowerWhiteSpaceAnalyzer : Analyzer
{
	private readonly LuceneVersion _matchVersion;

	/// <summary>
	/// Creates an analyzer that splits tokens on white space and is case-insensitive
	/// Allows search terms to begin with a dash
	/// </summary>
	/// <param name="matchVersion"></param>
	public LowerWhiteSpaceAnalyzer(LuceneVersion matchVersion)
	{
		_matchVersion = matchVersion;
	}

	protected override TokenStreamComponents CreateComponents(string fieldName, TextReader reader)
	{
		var tokenizer = new WhitespaceTokenizer(_matchVersion, reader);
		TokenStream result = new LowerCaseFilter(_matchVersion, tokenizer);
		return new TokenStreamComponents(tokenizer, result);
	}
}
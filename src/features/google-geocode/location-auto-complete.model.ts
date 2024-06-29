export interface MatchedSubString {
    length: number;
    offset: number;
}

export interface StructuredFormatting {
    mainText: string;
    mainTextMatchedSubstrings: Array<MatchedSubString>;
    secondaryText: string;
}

export interface Term {
    offset: number;
    value: string;
}

export interface GoogleLocationSuggestionResult {
    description: string;
    matchedSubstrings: Array<MatchedSubString>;
    placeId: string;
    reference: string;
    structuredFormatting: StructuredFormatting;
    terms: Array<Term>;
    types: Array<string>;
}

export default interface GoogleLocationSuggestion {
    predictions: Array<GoogleLocationSuggestionResult>;
}

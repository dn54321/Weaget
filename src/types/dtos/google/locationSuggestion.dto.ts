import { Expose, Type } from "class-transformer";
import GoogleLocationSuggestion, { StructuredFormatting, MatchedSubString, GoogleLocationSuggestionResult, Term } from "../../models/google/locationSuggestion.model";


export class StructuredFormattingDto implements StructuredFormatting {
    @Expose({name: 'main_text_matched_substrings'}) mainTextMatchedSubstrings: Array<MatchedSubString>;
    @Expose({name: 'main_text'}) mainText: string;
    @Expose({name: 'secondary_text'}) secondaryText: string;
}


export class GoogleLocationSuggestionResultDto implements GoogleLocationSuggestionResult {
    @Expose({name: 'structured_formatting'}) @Type(() => StructuredFormattingDto) structuredFormatting: StructuredFormattingDto;
    @Expose({name: 'matched_substrings'}) matchedSubstrings: Array<MatchedSubString>;
    @Expose({name: 'place_id'}) placeId: string;
    @Expose() reference: string;
    @Expose() description: string;
    @Expose() terms: Array<Term>;
    @Expose() types: Array<string>;
}

export class GoogleLocationSuggestionQueryParamsDto {
    @Expose() input: string;
    @Expose() location?: string;
    @Expose() sessiontoken: string;
}

export default class GoogleLocationSuggestionDto implements GoogleLocationSuggestion {
    @Expose() @Type(() => GoogleLocationSuggestionResultDto) predictions: Array<GoogleLocationSuggestionResultDto>
}
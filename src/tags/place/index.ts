import Mexico from "./Mexico";
import NationalPark from "./NationalPark";
import USA from "./USA";
import OtherCountries from "./OtherCountries";

const Place = {
    Mexico,
    USA,
    NationalPark,
    ...OtherCountries
}

export default Place;
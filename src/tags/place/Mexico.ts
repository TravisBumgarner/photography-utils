import { Value } from "../../types";

const Baja: Value = {
    accounts: [],
    tags: []
}

const Country: Value = {
    tags: [
        "mexico",
        "mexicomagico",
        "mexicotravel",
        "mexicolindo",
    ],
    accounts: []
};

const MexicoCity: Value = {
    tags: [
        "cdmx",
        "mexicocity",
        "mexicodf",
    ],
    accounts: []
};

const Mexico = {
    Baja,
    Country,
    MexicoCity,
}

export default Mexico;
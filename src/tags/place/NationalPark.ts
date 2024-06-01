import { Value } from "../../types";

const _USPark: Value = {
    tags: [],
    accounts: []
}

const _CanadaPark: Value = {
    tags: [],
    accounts: []
}


const Arches: Value = {
    tags: [
        "archesnationalpark",
        "archesnps",
        ..._USPark.tags
    ],
    accounts: [
        "archesnps",
        ..._USPark.accounts
    ]
};

const Banff: Value = {
    tags: [
        "banff",
        "banffnationalpark",
        "banffcanada",
        "banffalberta ",
        ..._CanadaPark.tags
    ],
    accounts: [
        "banff.national.park",
        ..._CanadaPark.accounts

    ]
};

const Glacier: Value = {
    tags: [
        "glaciernationalpark",
        "glaciernps ",
        ..._USPark.tags
    ],
    accounts: [
        "glaciernps",
        ..._USPark.accounts
    ]
};

const NationalPark = {
    Arches,
    Banff,
    Glacier,
};



export default NationalPark;
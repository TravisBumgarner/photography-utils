import { TagsAndAccounts } from "../../types";

const _USPark: TagsAndAccounts = {
    tags: [
    ],
    accounts: [
    ]
}

const _CanadaPark: TagsAndAccounts = {
    tags: [
    ],
    accounts: [
    ]
}


const Arches: TagsAndAccounts = {
    tags: [
        "#archesnationalpark",
        "#archesnps",
        ..._USPark.tags
    ],
    accounts: [
        "@archesnps",
        ..._USPark.accounts
    ]
};

const Banff: TagsAndAccounts = {
    tags: [
        "#banff",
        "#banffnationalpark",
        "#banffcanada",
        "#banffalberta ",
        ..._CanadaPark.tags
    ],
    accounts: [
        "@banff.national.park",
        ..._CanadaPark.accounts

    ]
};

const Glacier: TagsAndAccounts = {
    tags: [
        "#glaciernationalpark",
        "#glaciernps ",
        ..._USPark.tags
    ],
    accounts: [
        "@glaciernps",
        ..._USPark.accounts
    ]
};

const NationalPark = {
    Arches,
    Banff,
    Glacier,
};



export default NationalPark;
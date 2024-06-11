import { TagOrAccount } from "../../types";

const _USPark: TagOrAccount[] = [
]

const _CanadaPark: TagOrAccount[] = [
]


const Arches: TagOrAccount[] = [
    ..._USPark,
    "#archesnationalpark",
    "#archesnps",
    "@archesnps",
];

const Banff: TagOrAccount[] = [
    ..._CanadaPark,
    "#banff",
    "#banffnationalpark",
    "#banffcanada",
    "#banffalberta",
    "@banff.national.park"
];

const Glacier: TagOrAccount[] = [
    ..._USPark,
    "#glaciernationalpark",
    "#glaciernps",
    "@glaciernps",
];

const NationalPark = {
    Arches,
    Banff,
    Glacier,
};



export default NationalPark;
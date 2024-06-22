import { TagOrAccount } from "../../types";

const Arizona: { State: TagOrAccount[], ApacheJunction: TagOrAccount[] } = {
    State: [
        "#arizona",
        "#az",
    ],
    ApacheJunction: [
        "#myphx",
        "#cactus",
        "#cactuslover",
        "#cactusgram",
        "#apachejunction",
        "#phoenix",
    ],
};

const Colorado: Record<string, TagOrAccount[]> = {
    State: [
        "#colorado",
        "#coloradophotographer",
        "#coloradophotography",
        "#coloradolove",
    ],
};

const Montana: Record<string, TagOrAccount[]> = {
    State: [
        "#montana",
        "#montanacolors",
        "#montanalife",
        "#montanaliving",
        "#montanaphotographer",
    ],
};

const Louisiana: Record<string, TagOrAccount[]> = {
    NOLA: [
        "#nolalove",
        "#neworleans",
        "#neworleansphotography",
        "#nola",
        "#nolalife"
    ],
}

const Utah: Record<string, TagOrAccount[]> = {
    State: [
        "#utah",
        "#utahphotographer",
        "#utahphotography",
        "#utahisbeautiful",
        "#utahtravels",
        "#utah",
    ],
};

const Vermont: Record<string, TagOrAccount[]> = {
    State: [
        '@vermonttourism',
        "#vermont",
        "#newenglandphotography",
        "#thisisvermont",
        "#vermontlife",
        "#vermontshots"
    ],
};

const USA = {
    Arizona,
    Colorado,
    Louisiana,
    Montana,
    Utah,
    Vermont
};

export default USA;
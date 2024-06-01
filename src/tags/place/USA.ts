import { TagsAndAccounts } from "../../types";

const Arizona: { State: TagsAndAccounts, ApacheJunction: TagsAndAccounts } = {
    State: {
        tags: [
            "arizona",
            "az",
        ],
        accounts: [
        ]
    },
    ApacheJunction: {
        tags: [
            "myphx",
            "cactus",
            "cactuslover",
            "cactusgram",
            "apachejunction",
            "phoenix",
        ],
        accounts: [
        ]
    },
};

const Colorado: Record<string, TagsAndAccounts> = {
    State: {
        tags: [
            "colorado",
            "coloradophotographer",
            "coloradophotography",
            "coloradolove",
        ],
        accounts: [
        ]
    },
};

const Montana: Record<string, TagsAndAccounts> = {
    State: {
        tags: [
            "montana",
            "montanacolors",
            "montanalife",
            "montanaliving",
            "montanaphotographer",
        ],
        accounts: [
        ]
    },
};

const Louisiana: Record<string, TagsAndAccounts> = {
    NOLA: {
        tags: [
            "nolalove",
            "neworleans",
            "neworleansphotography",
            "nola",
            "nolalife"
        ],
        accounts: [
        ]
    },
}

const Utah: Record<string, TagsAndAccounts> = {
    State: {
        tags: [
            "utah",
            "utahphotographer",
            "utahphotography",
            "utahisbeautiful",
            "utahtravels",
            "utah",
        ],
        accounts: [
        ]
    },
};

const USA = {
    Arizona,
    Colorado,
    Louisiana,
    Montana,
    Utah
};

export default USA;
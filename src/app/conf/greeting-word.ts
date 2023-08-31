/**
 * 問候語句設定檔
 * zword:中文
 * eword:英文
 *  凌晨Early       00:00 ~ 03:00
 *   拂曉dawn        03:00 ~ 06:00
 *   早晨morning     06:00 ~ 09:00
 *   午前forenoon	09:00 ~ 12:00
 *   午後Afternoon	12:00 ~ 15:00
 *   傍晚Evening     15:00 ~ 18:00
 *   薄暮dusk        18:00 ~ 21:00
 *   深夜night       21:00 ~ 24:00
 */
export const GREETINGS_SETTING = {
    "early": {
        id: "early",
        zword: [
            "夜深了！記得要保持充足的睡眠喔！",
            "夜深人靜的夜晚，我與您同在！"
        ],
        eword: [ // 翻譯：睡得好，睡得安穩。
            "Sleep well, sleep tight."

        ]
    },
    "dawn": {
        id: "dawn",
        zword: [
            "早上好！",
            "霞光萬道，嶄新的一天即將開始！",
            "睜開眼，讓陽光妝扮你的笑臉！"
        ],
        eword: [
            // 翻譯：我把清晨的第一搂陽光送给你。
            "I'll give you the first ray of sunshine in the morning.",
            // 翻譯：睁開眼睛，给你一個輕輕的祝福。
            "Open your eyes and give you a light blessing."
        ]
    },
    "morning": {
        id: "morning",
        zword: [
            "早上好，親愛的朋友",
            "早安!祝您今日有美好的一天!"
        ],
        eword: [
            // 翻譯：快點起床並迎接活力充沛的一天！
            "Rise and shine!",
            // 翻譯：早上好，親愛的朋友
            "Good morning, dear friend!",
            // 翻譯：願一個問候带给你一個新的心情，願一個祝福带给你一个新的起點。 
            "May a greeting bring you a new mood and a blessing bring you a new starting point."
        ]
    },
    "forenoon": {
        id: "forenoon",
        zword: [
            "Hi!今日過得如何?"
        ],
        eword: [
            // 翻譯：你好嗎?
            "How’s it going?"
        ]
    },
    "afternoon": {
        id: "afternoon",
        zword: [
            "午安!午餐有吃飽嗎？"
        ],
        eword: [
            "Good afternoon!"
        ]
    },
    "evening": {
        id: "evening",
        zword: [
            "下午好!"
        ],
        eword: [
            "Good evening!"
        ]
    },
    "dusk": {
        id: "dusk",
        zword: [
            "晚安!",
            "回家的路上記得注意安全!",
            "餐後散步是一件浪漫的事!"
        ],
        eword: [
            // 翻譯：晚安這兩個簡單的字，我想一天不落的跟你說一輩子。
            "Good night, these two simple words, I want to say a whole life for a day."
        ]
    },
    "night": {
        id: "night",
        zword: [
            "夜深囉!一日的最後，有我在你左右。"
        ],
        eword: [
            // 晚安，祝你睡得好，別讓臭蟲咬了。
            "Nighty-night, sleep tight, and don't let the bed bugs bite.",
            // 翻譯：睡得好，睡得安穩。
            "Sleep well, sleep tight."
        ]
    }
};

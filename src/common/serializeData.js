export function AgentType({ name, description }) {
    return { ROLE_NAME: name, DESCRIPTION: description };
}

export function GameType({ name, description }) {
    return { GAMEGROUP_NAME: name, DESCRIPTION: description };
}

export function Game({ name, url, image, group, description }) {
    return { GAME_NAME: name, GAME_URL: url, GAME_IMAGE: image, GAMEGROUP_NAME: group, DESCRIPTION: description };
}

export function LoyaltyPoints({ level, pointsNeeded, multiplier }) {
    return { LOYALTY_LEVEL: level, LOYALTY_POINTS_NEEDED: pointsNeeded, LOYALTY_MULTIPLIER: multiplier };
}

export function FAQ({ question, answer }) {
    return { FAQ_QUESTION: question, FAQ_ANSWER: answer };
}

export function ChangePassword({ currentPassword, password }) {
    return { CURRENT_PASSWORD: currentPassword, PASSWORD: password };
}

export function Notification({ type, title, message, url, image }) {
    return {
        NOTIFICATION_TYPE: type,
        NOTIFICATION_TITLE: title,
        NOTIFICATION_MESSAGE: message,
        NOTIFICATION_URL: url,
        NOTIFICATION_IMAGE: image
    };
}

export function Agent({ username, name, email, password, phoneNo, agentType, address, gameType, permissions }) {
    return {
        AGENT_USERNAME: username,
        AGENT_NAME: name,
        AGENT_EMAIL: email,
        AGENT_PASSWORD: password,
        AGENT_PHONENO: phoneNo,
        AGENT_TYPE: agentType,
        AGENT_ADDRESS: address,
        AGENT_GAME_TYPE: gameType,
        AGENT_PERMISSIONS: permissions
    };
}

export function Player({ username, name, email, password, phoneNo, agent }) {
    return {
        PLAYER_USERNAME: username,
        PLAYER_NAME: name,
        PLAYER_EMAIL: email,
        PLAYER_PASSWORD: password,
        PLAYER_PHONE_NO: phoneNo,
        PLAYER_AGENT_TYPE: agent
    };
}

export function Slider({ name, image, description }) {
    return { SLIDER_NAME: name, SLIDER_IMAGE: image, DESCRIPTION: description };
}

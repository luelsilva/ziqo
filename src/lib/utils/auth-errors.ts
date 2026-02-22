export const authErrorMap: Record<string, string> = {
    // Signup Errors
    "User already exists": "Este e-mail já está em uso por outro usuário.",
    "User already exists. Use another email.": "Este e-mail já está cadastrado. Tente outro ou faça login.",
    "Email not verified": "E-mail não verificado. Por favor, verifique sua caixa de entrada.",
    "Password is too short": "A senha é muito curta. Use pelo menos 8 caracteres.",
    "Invalid email": "O formato do e-mail é inválido.",

    // Login Errors
    "Invalid email or password": "E-mail ou senha incorretos.",
    "Invalid password": "A senha inserida está incorreta.",
    "User not found": "Usuário não encontrado com este e-mail.",
    "Too many requests": "Muitas tentativas. Tente novamente mais tarde.",

    // Recovery/Verification
    "Expired token": "Este link expirou. Solicite um novo.",
    "Invalid token": "O link de verificação é inválido.",

    // General
    "Something went wrong": "Ocorreu um erro inesperado no servidor."
};

/**
 * Traduz mensagens de erro vindas do Better Auth.
 * Se não encontrar tradução, retorna a mensagem original ou um fallback.
 */
export function translateAuthError(message: string | undefined): string {
    if (!message) return "Ocorreu um erro desconhecido.";

    // Tenta encontrar a tradução exata ou parcial
    for (const [key, value] of Object.entries(authErrorMap)) {
        if (message.includes(key)) return value;
    }

    return message;
}

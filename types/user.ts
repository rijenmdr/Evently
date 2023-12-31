export type UserType = {
    clerkId: string;
    firstName: string
    lastName: string
    username: string
    email: string
    photo: string
}

export type UpdateUserType = Omit<UserType, "email" | "clerkId">
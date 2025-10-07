import type { PostType } from "../interfaces/PostType"; 

export const posts: PostType[] = [
    {
        id: crypto.randomUUID(), 
        title: "Sample Post 1", 
        activity: "Run", 
        description: "This is a sample run post."
    },
    {
        id: crypto.randomUUID(), 
        title: "Sample Post 2", 
        activity: "Jog", 
        description: "This is a sample jog post."
    },
    {
        id: crypto.randomUUID(), 
        title: "Sample Post 3", 
        activity: "Cycle", 
        description: "This is a sample cycle post."
    }
]
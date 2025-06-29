"use client";

import { useSession } from "next-auth/react";

function CreateBlogPage(){
    const data = useSession();
    console.log(data);
    return (
        <div>Create Blog page</div>
    )
};

export default CreateBlogPage;
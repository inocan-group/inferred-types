
export type ExitExceptionRules = {

    ignoreFollowedBy: ;
    ignorePrecededBy: ;

}

export type EntryExceptionRules = {

    ignoreFollowedBy: ;
    ignorePrecededBy: ;

}



export type NestedException = {
    exit?: ExitExceptionRules;
    entry?: EntryExceptionRules;
}

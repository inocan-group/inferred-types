import { PROXMOX_CT_STATE } from "src/constants/index";
import { TupleToUnion } from "src/types/index";

/**
 * the _states_ a Proxmox LXC container can be in
 */
export type ProxmoxCtState = TupleToUnion<typeof PROXMOX_CT_STATE>;

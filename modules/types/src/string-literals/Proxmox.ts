import type { PROXMOX_CT_STATE } from "inferred-types/constants";

/**
 * the _states_ a Proxmox LXC container can be in
 */
export type ProxmoxCtState = typeof PROXMOX_CT_STATE[number];

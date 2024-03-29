import { TAppointment } from "@/schema/appointment";
import { TItemBrgy } from "@/schema/item-brgy";
import { TItemSms } from "@/schema/item-sms";
import { TPrescriptionSchema } from "@/schema/prescriptions";
import { TUser } from "@/schema/user";
import { Appointment, Item, ItemTransaction, Profile, User } from "@prisma/client";
import { Session } from "next-auth";
import { create } from "zustand";

export type ModalType =
  | "mediwiseLogin"
  | "addWorkSchedule"
  | "createBarangayItem"
  | "createDoctor"
  | "addAppointment"
  | "addPrescription"
  | "viewPrescription"
  | "createSupplier"
  | "createBarangay"
  | "createAdmin"
  | "createPatient"
  | "createSmsItem"
  | "createEvent"
  | "inventoryReport"
  | "createRequest"
  | "viewRequest"
  | "manageAppointment"
  | "deleteAppointment"
  | "deletePrescription"
  | "updateBarangayItem"
  | "deleteBarangayItem"
  | "deleteSmsItem"
  | "updateSmsItem"
  | "deleteEvent"
  | "deleteAnnouncement"
  | "rescheduleAppointment"
  | "addNewItemStock"
  | "addNewItemStockSms"
  | "viewPhoto"
// you can extend this type if you have more modal

// export type ModalType = "..." | "...." | "...."

type ModalData = {
  calendarApi?: any;
  user?: User | Session['user'];
  prescription?: TPrescriptionSchema;
  brgyItems?: (TItemBrgy & {items: Item[]}) [];
  brgyItem?: TItemBrgy;
  smsItem?: TItemSms;
  photoUrl?: string;
  transactionRequest?: ItemTransaction
  appointment?: Appointment | TAppointment & {
    doctor: TUser & { profile: Profile };
    patient: TUser & { profile: Profile };
  };
 
};

type ModalStore = {
  type: ModalType | null;
  data: ModalData;
  isOpen: boolean;
  onOpen: (type: ModalType, data?: ModalData) => void;
  onClose: () => void;
};

export const useModal = create<ModalStore>((set) => ({
  type: null,
  data: {},
  isOpen: false,
  onClose: () => set({ type: null, isOpen: false }),
  onOpen: (type, data = {}) => set({ isOpen: true, type, data }),
}));

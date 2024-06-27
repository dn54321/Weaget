import { create } from "zustand";
import { SettingSlice, createSettingSlice } from "../../slices/setting.slice";
import { persist } from 'zustand/middleware';

export const useSettingStore = create<
    SettingSlice,
    [
        ['zustand/persist', SettingSlice],
    ]
>(persist((...a) => ({
    ...createSettingSlice(...a)
}),
    {name: 'persistentStore'}
));
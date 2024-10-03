import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import type { TAppDispatch, TAppState } from 'core/store';

export const useAppDispatch = () => useDispatch<TAppDispatch>();

export const useAppSelector: TypedUseSelectorHook<TAppState> = useSelector;

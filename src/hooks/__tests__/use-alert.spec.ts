import { act, renderHook } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import { useAlert } from '../use-alert';
import { createOpenWeatherAlertMessageMockData } from '../__mocks__/alert.mock';

describe('Hooks - use-alert', () => {
    beforeEach(() => {
        vi.useFakeTimers();
    })
    
    afterEach(() => {
       vi.restoreAllMocks();
    })

    test.each([
        [{ ...createOpenWeatherAlertMessageMockData(), active: true}],
        [{ ...createOpenWeatherAlertMessageMockData(), active: true, duration: undefined}],
        [{ ...createOpenWeatherAlertMessageMockData(), active: true, id: undefined}],
    ])('(#%#) Adding an active alert should place an alert in the alerts array.', (alert) => {
        const { result } = renderHook(() => useAlert());

        act(() => {
            result.current.addAlert(alert);
        });

        expect(result.current.alerts).toHaveLength(1);
    });

    test('Adding an inactive alert should not place an alert in the alerts array.', () => {
        const { result } = renderHook(() => useAlert());
        const alert = {
            ...createOpenWeatherAlertMessageMockData(),
            active: false
        }

        act(() => {
            result.current.addAlert(alert);
        });

        expect(result.current.alerts).toHaveLength(1);
    });

    test('Adding a duplicate alert should place not put the alert in the alerts array.', () => {
        const { result } = renderHook(() => useAlert());
        const alert = {
            ...createOpenWeatherAlertMessageMockData(),
            active: true
        }
        act(() => {
            result.current.addAlert(alert);
            result.current.addAlert(alert);
        });

        expect(result.current.alerts).toHaveLength(1);
    });

    test('Stale alerts should be removed from the alerts array.', () => {
        const { result } = renderHook(() => useAlert());
        act(() => {
            result.current.addAlert(
                {
                    ...createOpenWeatherAlertMessageMockData(),
                    active: true,
                    duration: 100,
                }
            );
            result.current.addAlert(
                {
                    ...createOpenWeatherAlertMessageMockData(), 
                    active: true, 
                    duration: Infinity
                }
            );
            vi.advanceTimersByTime(200);
        });
        
        expect(result.current.alerts).toHaveLength(1);
    });

    test('should remove expired alerts from the alerts array.', () => {
        const { result } = renderHook(() => useAlert());
        const alert = {
            ...createOpenWeatherAlertMessageMockData(),
             active: true,
             id: 'test-id',
         }

        act(() => {
            result.current.addAlert(alert);
            result.current.addAlert(createOpenWeatherAlertMessageMockData());
            result.current.addAlert(createOpenWeatherAlertMessageMockData());
        });

        expect(result.current.alerts).toHaveLength(3);

        act(() => {
            result.current.removeAlert(alert.id);
        });

        expect(result.current.alerts).toHaveLength(2);
    });

    test('Alert hook should have a alert element', () => {
        const { result } = renderHook(() => useAlert());
        expect(result.current.AlertBox).toBeInstanceOf(Function);
    });
});
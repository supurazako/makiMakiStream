import { useEffect, useState } from "react";

export function useLocalStorage<T>(key: string, initialiValue: T, serialize?: (value: T) => string, deserialize?: (item: string) => T): readonly [T, (v: T) => void] {
	const [value, setValue] = useState(() => {
		if (typeof localStorage !== "undefined") {
			const item = localStorage.getItem(key);
			if (item === null) {
				return initialiValue;
			}

			return deserialize ? deserialize(item) : JSON.parse(item);
		} else {
			return initialiValue;
		}
	});

	useEffect(() => {
		if (typeof localStorage !== "undefined") {
			const item = serialize ? serialize(value) : JSON.stringify(value);
			localStorage.setItem(key, item);
		}
	}, [key, serialize, value]);

	return [value, setValue] as const;
}

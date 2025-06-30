import { JSX } from "react";
import { RemoveIcon } from "~/components/common/icons";

export function RemoveControl({ handleRemove }: { handleRemove: () => void }): JSX.Element {
	return (
		<button className="control-item"
			data-type="remove"
			type="button"
			onClick={handleRemove}>
			<RemoveIcon />
		</button>
	);
}

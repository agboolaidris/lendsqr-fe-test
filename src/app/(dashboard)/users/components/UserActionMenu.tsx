import { EllipsisVerticalIcon } from "@icons/Ellipsis";
import { TrashIcon } from "@icons/Trash";
import { ViewIcon } from "@icons/View";
import {
  Dropdown,
  DropdownContent,
  DropdownItem,
  DropdownTrigger,
} from "@ui/Dropdown";
import Link from "next/link";
import { User } from "src/@types/user";

type Props = {
  user: User;
};
export const UserActionMenu = ({ user }: Props) => {
  return (
    <Dropdown>
      <DropdownTrigger style={{ width: "max-content" }}>
        <EllipsisVerticalIcon width={16} height={16} />
      </DropdownTrigger>
      <DropdownContent align="end">
        <DropdownItem asChild>
          <Link href={`/users/${user.id}`}>
            <ViewIcon width={16} height={16} /> View Details
          </Link>
        </DropdownItem>
        <DropdownItem>
          <TrashIcon width={16} height={16} /> Delete Profile
        </DropdownItem>
      </DropdownContent>
    </Dropdown>
  );
};

import {
  BadgeCheckIcon,
  DotsHorizontalIcon, PencilIcon,
  TrashIcon
} from "@heroicons/react/outline";
import { useState } from "react";
import { PopoverBody, UncontrolledPopover } from "reactstrap";
import styled, { css } from "styled-components";
import { Debt } from "../../models/IAppState";

type PopupProps = {
  debt: Debt;
  onEditClick: (debt: Debt) => void;
  onDeleteClick: (debt: Debt) => void;
  onCompleteClick: (debt: Debt) => void;
};

function Popup(props: PopupProps) {
  const { debt, onEditClick, onDeleteClick, onCompleteClick } = props;
  const [popoverOpen, setPopoverOpen] = useState(false);

  const toggle = () => {
    setPopoverOpen(!popoverOpen);
  };

  const handleEditClick = () => {
    if (onEditClick) onEditClick(debt);
  };

  const handleDeleteClick = () => {
    if (onDeleteClick) {
      toggle();
      onDeleteClick(debt);
    }
  };

  const handleCompleteClick = () => {
    if (onCompleteClick) {
      toggle();
      onCompleteClick(debt);
    }
  };

  return (
    <>
      <ButtonOpen id={`Popover_${debt.id}`} type="button">
        <OpenIcon />
      </ButtonOpen>
      <UncontrolledPopover
        isOpen={popoverOpen}
        target={`Popover_${debt.id}`}
        toggle={toggle}
        placement="right"
        trigger="focus"
      >
        <PopoverBodyContainer>
          <PopupInner>
            {!debt.isComplete ? (
              <ButtonMixed onClick={handleEditClick}>
                <EditIcon />
                <span>Chỉnh sửa</span>
              </ButtonMixed>
            ) : null}

            <ButtonMixed onClick={handleDeleteClick}>
              <RemoveIcon />
              <span>Xoá</span>
            </ButtonMixed>

            {!debt.isComplete ? (
              <ButtonMixed onClick={handleCompleteClick}>
                <CheckedIcon />
                <span>Đã trả nợ</span>
              </ButtonMixed>
            ) : null}
          </PopupInner>
        </PopoverBodyContainer>
      </UncontrolledPopover>
    </>
  );
}

export default Popup;

const MixinIcon = css`
  height: 20px;
  width: 20px;
  margin-right: 10px;
`;

const Button = styled.button`
  border: none;
  background-color: transparent;
  display: flex;
  height: 40px;
  width: 100%;
  align-items: center;

  &:hover {
    color: #66de93;
  }
`;

const ButtonOpen = styled(Button)`
  color: #fb667a;
  &:hover {
    background-color: transparent;
    color: #fdca40;
  }
`;

const ButtonMixed = styled(Button)`
  color: #b8dfd8;
`;

const OpenIcon = styled(DotsHorizontalIcon)`
  ${MixinIcon};
  margin: 0;
`;

const EditIcon = styled(PencilIcon)`
  ${MixinIcon}
`;

const RemoveIcon = styled(TrashIcon)`
  ${MixinIcon}
`;

const CheckedIcon = styled(BadgeCheckIcon)`
  ${MixinIcon}
`;

const PopupInner = styled.div`
  position: relative;
  width: 110px;
  padding: 1px;
  background-color: #1f2739;
  &::before {
    border-color: transparent #b5eaea transparent transparent;
  }
`;

const PopoverBodyContainer = styled(PopoverBody)`
  padding: 0;
`;

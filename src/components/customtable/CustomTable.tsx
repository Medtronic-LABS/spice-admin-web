import React from 'react';

import { ReactComponent as EditIcon } from '../../assets/images/edit.svg';
import styles from './CustomTable.module.scss';
import Loader from '../loader/Loader';
import { ReactComponent as DeleteIcon } from '../../assets/images/bin.svg';
import { ReactComponent as ActivateIcon } from '../../assets/images/icon-activate.svg';
import APPCONSTANTS from '../../constants/appConstants';
import ConfirmationModalPopup from './ConfirmationModalPopup';
import Pagination from '../Pagination';
import CustomTooltip from '../tooltip';
export interface IAnyObject {
  [key: string]: any;
}

export interface IActionFormattor {
  hideEditIcon?: (rowData: any) => boolean;
  hideDeleteIcon?: (rowData: any) => boolean;
  hideCustomIcon?: (rowData: any) => boolean;
}

interface ICustomTableProps {
  handlePageChange?: (pageNo: number, rowsPerPage?: number) => void;
  columnsDef: IColumns[];
  rowData: any;
  isEdit: boolean;
  actionFormattor?: IActionFormattor;
  isDelete: boolean;
  isActivate?: boolean;
  isCustom?: boolean;
  customTitle?: string;
  CustomIcon?: any;
  customIconStyle?: any;
  page?: number;
  count?: number;
  isRowEdit?: boolean;
  onRowEdit?: (data: any) => void;
  onCustomConfirmed?: (data: any) => void;
  onActivateClick?: (data: any) => void;
  isPopupNeeded?: boolean;
  confirmationTitle?: string;
  customConfirmationTitle?: string;
  customPopupTitle?: string;
  activateConfirmationTitle?: string;
  loading?: boolean;
  onDeleteClick?: (deleteData: { data: any; index: number; pageNo: number }) => void;
  className?: string;
  isSearching?: boolean;
  noDataText?: string;
  orderBy?: string;
  order?: number;
  showRowHover?: boolean;
  rowsPerPage?: number;
  deleteTitle?: string;
  activateTitle?: string;
  handleRowClick?: (data: any) => void;
}

export interface IColumns {
  id: number;
  name: string;
  label: string;
  width?: string;
  cellFormatter?: (data: any, column: IColumns) => void;
  disableSort?: boolean;
  align?: 'center' | 'left';
}

interface ICustomTableState {
  openDialog: boolean;
  deleteClicked: boolean;
  activateClicked: boolean;
  customIconClicked?: boolean;
  data?: any;
}

export default class CustomTable extends React.PureComponent<ICustomTableProps, ICustomTableState> {
  currentDeleteObj: any = {};
  currentActivateObj: any = {};
  tableRef: React.RefObject<HTMLInputElement>;
  constructor(props: ICustomTableProps) {
    super(props);
    this.tableRef = React.createRef();
    this.state = {
      openDialog: false,
      deleteClicked: false,
      activateClicked: false,
      customIconClicked: false,
      data: {} as any
    };
  }

  /**
   * Handle pagination change of custom table
   * @param e Mouse event for onchange
   * @param pageNo Current page number
   * @param rowsPerPage Row count per page
   */
  handlePageChange = (pageNo: number, rowsPerPage: number) => {
    if (this.tableRef && this.tableRef.current) {
      this.tableRef.current.scrollTo(0, 0);
    }
    if (this.props.handlePageChange) {
      this.props.handlePageChange(pageNo, rowsPerPage);
    }
  };

  /**
   * Handle delete of custom table
   * @param data Data to delete
   * @param index Index of data
   * @param pageNo Current page number
   */
  handleDelete = (
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>,
    data: IAnyObject,
    index: number,
    pageNo?: number | undefined
  ) => {
    e.stopPropagation();
    const { rowData } = this.props;
    if (rowData.length === 1 && pageNo) {
      this.currentDeleteObj = { data, index, pageNo: pageNo - 1 };
    } else {
      this.currentDeleteObj = { data, index, pageNo };
    }
    this.setState({ openDialog: true, deleteClicked: true, activateClicked: false });
  };

  handleEdit = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>, data: any, index: number) => {
    e.stopPropagation();
    if (this.props.onRowEdit) {
      this.props.onRowEdit({ ...data, index });
    }
  };

  handleCustomIconClick = (
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>,
    data: any,
    index: number,
    isPopupNeeded = false
  ) => {
    e.stopPropagation();
    if (this.props.onCustomConfirmed && !isPopupNeeded) {
      this.props.onCustomConfirmed({ ...data, index });
    }
    if (isPopupNeeded) {
      this.setState({ customIconClicked: true, data: { ...data, index } });
    }
  };

  handleActivate = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>, data: any, index: number) => {
    e.stopPropagation();
    this.currentActivateObj = { ...data, index };
    this.setState({ openDialog: true, deleteClicked: false, activateClicked: true });
  };

  /**
   * Handles cancel event of confirmation dialog
   */
  handleConfirmationClose = () => {
    this.currentDeleteObj = {};
    this.setState({ openDialog: false, deleteClicked: false, activateClicked: false });
  };

  handleCustomConfirmationClose = () => {
    this.setState({ customIconClicked: false, data: {} });
  };

  handleCustomConfirmed = () => {
    if (this.props.onCustomConfirmed) {
      this.props.onCustomConfirmed(this.state.data);
    }
    this.handleCustomConfirmationClose();
  };

  /**
   * Handles proceed event of confirmation dialog
   */
  handleConfirmationSuccess = () => {
    this.setState({ openDialog: false });
    const { deleteClicked, activateClicked } = this.state;
    if (deleteClicked && this.props.onDeleteClick) {
      this.props.onDeleteClick(this.currentDeleteObj);
    } else if (activateClicked && this.props.onActivateClick) {
      this.props.onActivateClick(this.currentActivateObj);
    }
    this.setState({ deleteClicked: false, activateClicked: false });
  };

  handleChangeRowsPerPage = (rowsPerPage: number) => {
    if (this.tableRef && this.tableRef.current) {
      this.tableRef.current.scrollTo(0, 0);
    }
    if (this.props.handlePageChange) {
      this.props.handlePageChange(1, Number(rowsPerPage));
    }
  };

  navigateToDetail = (data: IAnyObject) => {
    if (this.props.handleRowClick) {
      this.props.handleRowClick(data);
    }
  };

  isAction = () => {
    const { isEdit, isDelete, isActivate = false, isCustom = false } = this.props;
    return isEdit || isDelete || isActivate || isCustom;
  };

  getActionsLength = (actions: boolean) => {
    const { columnsDef } = this.props;
    return actions ? columnsDef.length + 1 : columnsDef.length;
  };

  handleApplyBorderBotttom = () => {
    const { count = 0 } = this.props;
    return count > 10 ? 'pb-1' : '';
  };

  handleShowColumnHeaders = (columnsDef: IColumns[]) => {
    return (    
      columnsDef && columnsDef.map((column: IColumns) => {
        const key = column.id;
        return (
          <th key={key} style={{ width: column.width }}>
            {column.label}
          </th>
        );
      })      
    );
  };

  handleShowActionHeader = (actions: boolean) => {
    return (
      actions && (
        <th className='text-center' style={{ width: '80px' }}>
          Actions
        </th>
      )
    );
  };

  handleRowStyle = (isLastChild: boolean) => {
    const { showRowHover = false, handleRowClick, count = 0, rowsPerPage = 10 } = this.props;
    return `${showRowHover || handleRowClick ? styles.showRowHover : ''} ${
      count < rowsPerPage && isLastChild ? '' : styles.showDivider
    }`;
  };

  handleCursorPointerStyle = () => {
    const { handleRowClick, isRowEdit } = this.props;
    return handleRowClick || isRowEdit ? 'pointer' : '';
  };

  handleShowEditIcon = (data: IAnyObject, idx: number) => {
    const { isEdit, actionFormattor } = this.props;
    return (
      isEdit &&
      (!actionFormattor?.hideEditIcon || (actionFormattor?.hideEditIcon && !actionFormattor?.hideEditIcon(data))) && (
        <div className={styles.editIcon} onClick={(e) => this.handleEdit(e, data, idx)}>
          <CustomTooltip title={'Edit'}>
            <EditIcon aria-labelledby={'edit-icon'} />
          </CustomTooltip>
        </div>
      )
    );
  };

  handleShowActivateIcon = (data: IAnyObject, idx: number) => {
    const { isActivate = false } = this.props;
    return (
      isActivate && (
        <div className={styles.activateIcon} onClick={(e) => this.handleActivate(e, data, idx)}>
          <CustomTooltip title={'Activate'}>
            <ActivateIcon aria-labelledby={'activate-icon'} />
          </CustomTooltip>
        </div>
      )
    );
  };

  handleShowCustomIcon = (data: IAnyObject, idx: number) => {
    const {
      isCustom = false,
      actionFormattor,
      isPopupNeeded = false,
      customTitle = '',
      CustomIcon = null,
      customIconStyle
    } = this.props;
    return isCustom &&
      (!actionFormattor?.hideCustomIcon ||
        (actionFormattor?.hideCustomIcon && !actionFormattor?.hideCustomIcon(data))) ? (
      <div
        className={data.isCustomIconInvisible ? `${styles.customIcon} invisible` : styles.customIcon}
        onClick={(e) => this.handleCustomIconClick(e, data, idx, isPopupNeeded)}
      >
        <CustomTooltip title={customTitle}>
          <CustomIcon style={customIconStyle} aria-labelledby={'custom-icon'} />
        </CustomTooltip>
      </div>
    ) : (
      <></>
    );
  };

  handleShowDeleteIcon = (data: IAnyObject, idx: number) => {
    const { isDelete, actionFormattor } = this.props;
    return (
      isDelete &&
      (!actionFormattor?.hideDeleteIcon ||
        (actionFormattor?.hideDeleteIcon && !actionFormattor?.hideDeleteIcon(data))) && (
        <div className={styles.deleteIcon} onClick={(e) => this.handleDelete(e, data, idx)}>
          <CustomTooltip title={'Delete'}>
            <DeleteIcon aria-labelledby={'delete-icon'} />
          </CustomTooltip>
        </div>
      )
    );
  };

  handleShowPagination = () => {
    const { page, rowsPerPage, count } = this.props;
    return page && rowsPerPage && count && count > APPCONSTANTS.ROWS_PER_PAGE_OF_TABLE ? (
      <div className={styles.paginationWrapper}>
        <Pagination
          initialPage={page}
          total={count}
          length={rowsPerPage}
          currentPage={page}
          onChangePage={this.handlePageChange}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
        />
      </div>
    ) : null;
  };

  handleActivateConfirmationPopup = () => {
    const { confirmationTitle, activateConfirmationTitle, deleteTitle, activateTitle } = this.props;
    const { openDialog, activateClicked } = this.state;
    return (
      (confirmationTitle || activateConfirmationTitle) && (
        <ConfirmationModalPopup
          isOpen={openDialog}
          popupTitle={(activateClicked ? activateTitle : deleteTitle) || ''}
          cancelText='Cancel'
          submitText='Ok'
          handleCancel={this.handleConfirmationClose}
          handleSubmit={this.handleConfirmationSuccess}
          popupSize='modal-md'
          confirmationMessage={activateClicked ? activateConfirmationTitle || '' : confirmationTitle || ''}
        />
      )
    );
  };

  handleCustomPopup = () => {
    const { customConfirmationTitle = '', customPopupTitle = '' } = this.props;
    const { customIconClicked = false } = this.state;
    return (
      (customConfirmationTitle || customPopupTitle) && (
        <ConfirmationModalPopup
          isOpen={customIconClicked}
          popupTitle={customPopupTitle}
          cancelText='Cancel'
          submitText='Ok'
          handleCancel={this.handleCustomConfirmationClose}
          handleSubmit={this.handleCustomConfirmed}
          popupSize='modal-md'
          confirmationMessage={customConfirmationTitle}
        />
      )
    );
  };

  render() {
    const { columnsDef, rowData, loading } = this.props;
    const actions = this.isAction();
    const length = this.getActionsLength(actions);

    return (
      <div className={`${styles.customTable} ${this.handleApplyBorderBotttom()}`}>
        <table>
          {
            <thead>
              <tr>
                {this.handleShowColumnHeaders(columnsDef)}
                {this.handleShowActionHeader(actions)}
              </tr>
            </thead>
          }
          <tbody className={this.handleCursorPointerStyle()}>
            {rowData?.length && !loading ? (
              <>
                {rowData.map((data: IAnyObject, idx: number) => {
                  const isLastChild = (rowData.length || 0) === idx + 1;
                  return (
                    <tr
                      key={idx}
                      onClick={() => this.navigateToDetail(data)}
                      className={this.handleRowStyle(isLastChild)}
                    >
                      {columnsDef &&
                        columnsDef.map((column: IColumns) => (
                          <td key={column.id}>
                            {column.cellFormatter ? column.cellFormatter(data, column) : data[column.name]}
                          </td>
                        ))}
                      {actions && (
                        <td key={idx} className='text-center'>
                          <div className='d-inline-flex'>
                            {this.handleShowEditIcon(data, idx)}
                            {this.handleShowActivateIcon(data, idx)}
                            {this.handleShowCustomIcon(data, idx)}
                            {this.handleShowDeleteIcon(data, idx)}
                          </div>
                        </td>
                      )}
                    </tr>
                  );
                })}
              </>
            ) : (
              <tr className='cursor-default'>
                <td colSpan={length}>
                  {loading && <Loader isFullScreen={false} />}
                  {!loading && <div className='text-center'>{APPCONSTANTS.NO_RECORDS_FOUND}</div>}
                </td>
              </tr>
            )}
          </tbody>
        </table>
        {this.handleCustomPopup()}
        {this.handleActivateConfirmationPopup()}
        {this.handleShowPagination()}
      </div>
    );
  }
}

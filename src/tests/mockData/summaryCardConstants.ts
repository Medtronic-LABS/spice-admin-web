import { ISummaryCardProps } from '../../components/summaryCard/SummaryCard';

const MOCK_DATA_CONSTANTS = {
    SUMMARY_CARD_PROPS : {
        title: 'Example Title',
        subTitle: 'example subtitle',
        sub: 'example sub',
        data: [
          {
            label: 'Example Label 1',
            value: 'Example Value 1',
            type: 'string',
            route: '/example-route-1',
            disableEllipsis: true,
            onClick: jest.fn(),
          },
          {
            label: 'Example Label 2',
            value: 123,
            type: 'number',
            route: '/example-route-2',
            disableEllipsis: false,
            onClick: jest.fn(),
          },
        ],
        disableImg: false,
        titleClassName: 'example-title-classname',
        detailRoute: '/detail',
        tenantId: '123',
        formId: '456',
        setBreadcrumbDetails: jest.fn(),
      } as ISummaryCardProps
}


export default MOCK_DATA_CONSTANTS;
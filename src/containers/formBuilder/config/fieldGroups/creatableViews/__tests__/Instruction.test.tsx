import APPCONSTANTS from '../../../../../../constants/appConstants';
import INSTRUCTION_CONFIG from '../Instruction';

describe('InstructionConfig', () => {
  it('should have a valid getEmptyData function', () => {
    const emptyData: any = INSTRUCTION_CONFIG.getEmptyData();
    expect(emptyData.id).toBeDefined();
    expect(emptyData.viewType).toEqual('Instruction');
    expect(emptyData.title).toEqual('');
    expect(emptyData.fieldName).toEqual('');
    expect(emptyData.family).toEqual('');
    expect(emptyData.isSummary).toBeFalsy();
    expect(emptyData.isMandatory).toBeFalsy();
    expect(emptyData.isEnabled).toBeTruthy();
    expect(emptyData.visibility).toEqual(APPCONSTANTS.VALIDITY_OPTIONS.visible.key);
    expect(emptyData.instructions).toEqual([]);
    expect(emptyData.isNotDefault).toBeTruthy();
  });

  it('should have a valid customizableFieldMeta object', () => {
    const { instructions, fieldName, title, visibility } =
      INSTRUCTION_CONFIG.customizableFieldMeta;
    expect(instructions).toBeDefined();
    expect(fieldName).toBeDefined();
    expect(title).toBeDefined();
    expect(visibility).toBeDefined();
  });

  it('should have a valid getJSON function', () => {
    const json = {
      id: '123456',
      viewType: 'Instruction',
      title: 'Instructions',
      fieldName: 'instructionField',
      family: 'instructionFamily',
      isSummary: true,
      isMandatory: true,
      isEnabled: false,
      visibility: 'hidden',
      instructions: ['Instruction 1', 'Instruction 2'],
      isNotDefault: true,
      inputType: 0
    };
    const expectedJson = {
      id: '123456',
      viewType: 'Instruction',
      title: 'Instructions',
      fieldName: 'instructionField',
      family: 'instructionFamily',
      isSummary: true,
      isMandatory: true,
      isEnabled: false,
      visibility: 'hidden',
      instructions: ['Instruction 1', 'Instruction 2'],
      isNotDefault: true
    };
    if (INSTRUCTION_CONFIG.getJSON) {
      expect(INSTRUCTION_CONFIG.getJSON(json)).toEqual(expectedJson);
    }
  });
});

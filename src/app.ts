import PrjInput from './model/PrjInput';
import PrjList from './model/PrjList';
import { PrjListType } from './model/PrjType';
import PrjManager from './state/PrjManager';

const prjManager = PrjManager.getManager();
new PrjInput(prjManager);
new PrjList(prjManager, PrjListType.ACTIVE);
new PrjList(prjManager, PrjListType.FINISHED);

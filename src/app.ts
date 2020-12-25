import PrjInput from './model/PrjInput.js';
import PrjList from './model/PrjList.js';
import { PrjListType } from './model/PrjType.js';
import PrjManager from './state/PrjManager.js';

const prjManager = PrjManager.getManager();
new PrjInput(prjManager);
new PrjList(prjManager, PrjListType.ACTIVE);
new PrjList(prjManager, PrjListType.FINISHED);

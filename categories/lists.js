import { Variables } from "blockly/core";
import * as Blockly from "blockly/core"

class List {
    /**
     *
     * @param id { string }
     * @param name { string }
     */
    constructor(id, name) {
        this.type = "Number";

        this.id = id;
        this.name = name;
    }
}

class ListManager {
    constructor() {
        this.lists = {};
    }

    /**
     *
     * @param workspace { Blockly.Workspace }
     * @param name { string }
     * @param id { string|undefined }
     */
    addList(workspace, name, id) {
        if (!id) id = crypto.randomUUID();
        this.lists[id] = new List(id, name);
    }

    /**
     *
     * @param id { string }
     * @returns { List }
     */
    getList(id) {
        return this.lists[id];
    }

    /**
     *
     * @returns {List[]}
     */
    getLists() {
        return Object.values(this.lists);
    }

    /**
     *
     * @param id { string }
     * @param newName { string }
     */
    renameList(id, newName) {
        this.lists[id].name = newName;
    }

    /**
     *
     * @param id { string }
     */
    deleteList(id) {
        delete this.lists[id];
    }

    clear() {
        this.lists = {}
    }
}

export const listManager = new ListManager();

export class ListSerializer {
    constructor() {
        this.priority = 90
    }

    clear(_workspace) {
        listManager.clear()
    }

    load(state, workspace) {
        for (const listState of state) {
            listManager.addList(workspace, listState['name'], listState['id'])
        }
    }

    save(_workspace) {
        const listStates = []
        for (const list of listManager.getLists()) {
            listStates.push({
                id: list.id,
                name: list.name
            })
        }

        return listStates.length > 0 ? listStates : null;
    }
}

const INDEX_PREFILL = {
    INDEX: {
        block: {
            type: "math_number",
            fields: {
                NUM: 0
            }
        }
    }
}

export default function(workspace) {
    let blockList = [];
    blockList.push({
        kind: 'button',
        text: 'Create List',
        callbackKey: 'create_list',
    });

    const lists = listManager.getLists();
    if (lists.length > 0) {
        const dynamicBlocks = [
            { kind: 'block', type: 'lists_add' },
            { kind: 'block', type: 'lists_delete', inputs: INDEX_PREFILL },
            { kind: 'sep', gap: 8 },
            { kind: 'block', type: 'lists_insert', inputs: INDEX_PREFILL },
            { kind: 'sep', gap: 8 },
            { kind: 'block', type: 'lists_replace', inputs: INDEX_PREFILL },
            { kind: 'block', type: 'lists_get', inputs: INDEX_PREFILL },
            { kind: 'sep', gap: 8 },
            { kind: 'block', type: 'lists_length' },
        ]

        blockList = blockList.concat(dynamicBlocks)
    }


    workspace.registerButtonCallback('create_list', function(button) {
        Variables.promptName('create_list', '', (name) => {
            listManager.addList(workspace, name);
            workspace.refreshToolboxSelection();
        });
    });

    return blockList;
};

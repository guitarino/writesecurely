import { configureDependency } from "../../../../type/inject";
import { EditorPlugins } from "./EditorPlugins.types";
import { Cursor } from "./Cursor";
import { EditorPluginsManager as IEditorPluginsManager } from "./EditorPluginsManager.types";
import { EditorPluginsManager } from "./EditorPluginsManager";
import { EditorSchema as IEditorSchema } from "./EditorSchema.types";
import { EditorNode } from "./EditorNode.types";
import { EditorMark } from "./EditorMark.types";
import { EditorSchema } from "./EditorSchema";
import { KeyBindings } from "./KeyBindings.types";
import { History } from "./History";
import { InputRulesManager as IInputRulesManager } from "./InputRulesManager.types";
import { InputRules } from "./InputRules.types";
import { InputRulesManager } from "./InputRulesManager";
import { KeyBindingsManager as IKeyBindingsManager } from "./KeyBindingsManager.types";
import { KeyBindingsManager } from "./KeyBindingsManager";
import { CodeMark } from "./marks/CodeMark";
import { EmMark } from "./marks/EmMark";
import { StrongMark } from "./marks/StrongMark";
import { LinkMark } from "./marks/LinkMark";
import { BlockquoteNode } from "./nodes/BlockquoteNode";
import { BulletListNode } from "./nodes/BulletListNode";
import { CodeBlockNode } from "./nodes/CodeBlockNode";
import { DocNode } from "./nodes/DocNode";
import { HardBreakNode } from "./nodes/HardBreakNode";
import { HeadingNode } from "./nodes/HeadingNode";
import { HorizontalRuleNode } from "./nodes/HorizontalRuleNode";
import { ImageNode } from "./nodes/ImageNode";
import { ListItemNode } from "./nodes/ListItemNode";
import { OrderedListNode } from "./nodes/OrderedListNode";
import { ParagraphNode } from "./nodes/ParagraphNode";
import { TextNode } from "./nodes/TextNode";

configureDependency()
    .implements(EditorNode)
    .create(DocNode);

configureDependency()
    .implements(EditorNode, KeyBindings)
    .create(ParagraphNode);

configureDependency()
    .implements(EditorNode, KeyBindings, InputRules)
    .create(BlockquoteNode);

configureDependency()
    .implements(EditorNode)
    .create(HorizontalRuleNode);

configureDependency()
    .implements(EditorNode, KeyBindings, InputRules)
    .create(HeadingNode);

configureDependency()
    .implements(EditorNode)
    .create(TextNode);

configureDependency()
    .implements(EditorNode, KeyBindings, InputRules)
    .create(CodeBlockNode);

configureDependency()
    .implements(EditorNode)
    .create(ImageNode);

configureDependency()
    .implements(EditorNode, KeyBindings)
    .create(HardBreakNode);

configureDependency()
    .implements(EditorNode, KeyBindings, InputRules)
    .create(OrderedListNode);

configureDependency()
    .implements(EditorNode, KeyBindings, InputRules)
    .create(BulletListNode);

configureDependency()
    .implements(EditorNode, KeyBindings)
    .create(ListItemNode);

configureDependency()
    .implements(EditorMark)
    .create(LinkMark);

configureDependency()
    .implements(EditorMark, KeyBindings)
    .create(EmMark);

configureDependency()
    .implements(EditorMark, KeyBindings)
    .create(StrongMark);

configureDependency()
    .implements(EditorMark, KeyBindings)
    .create(CodeMark);

configureDependency()
    .implements(IEditorSchema)
    .inject(
        EditorNode.multi,
        EditorMark.multi
    )
    .create(EditorSchema);

configureDependency()
    .implements(KeyBindings, EditorPlugins)
    .create(History);

configureDependency()
    .implements(EditorPlugins)
    .create(Cursor);

configureDependency()
    .implements(IInputRulesManager, KeyBindings, EditorPlugins)
    .inject(InputRules.multi)
    .create(InputRulesManager);

configureDependency()
    .implements(IKeyBindingsManager, EditorPlugins)
    .inject(KeyBindings.multi)
    .create(KeyBindingsManager);

configureDependency()
    .implements(IEditorPluginsManager)
    .inject(EditorPlugins.multi)
    .create(EditorPluginsManager);
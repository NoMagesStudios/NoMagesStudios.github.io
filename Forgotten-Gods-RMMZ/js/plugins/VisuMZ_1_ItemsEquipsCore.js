//=============================================================================
// VisuStella MZ - Items & Equips Core
// VisuMZ_1_ItemsEquipsCore.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_1_ItemsEquipsCore = true;

var VisuMZ = VisuMZ || {};
VisuMZ.ItemsEquipsCore = VisuMZ.ItemsEquipsCore || {};
VisuMZ.ItemsEquipsCore.version = 1.32;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 1] [Version 1.32] [ItemsEquipsCore]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Items_and_Equips_Core_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Items & Equips Core makes improvements to the RPG Maker MZ item and
 * equipment dedicated scenes (including the shop) and how they're handled.
 * From more item categories, better parameter control, rulings, and more, game
 * devs are able to take control over key aspects of their game's items.
 *
 * Features include all (but not limited to) the following:
 *
 * * Modifying the appearances to the Item Scene, Equip Scene, and Shop Scene.
 * * Categorizing items in unique and multiple categories.
 * * Item Scene and Shop Scene will now display detailed information on items.
 * * NEW! marker can be displayed over recently acquired items in-game.
 * * Equipment notetags to adjust parameters past the editor limitations.
 * * Equipment Rulings to adjust what slot types can and can't be unequipped
 *   and/or optimized.
 * * Equipment Type Handling offers more control over equipment loadouts.
 * * Items sold in shops can be hidden/shown based on Switches.
 * * Items sold in shops can have varying prices adjusted by notetags.
 *
 * ============================================================================
 * Requirements
 * ============================================================================
 *
 * This plugin is made for RPG Maker MZ. This will not work in other iterations
 * of RPG Maker.
 *
 * ------ Tier 1 ------
 *
 * This plugin is a Tier 1 plugin. Place it under other plugins of lower tier
 * value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
 * that your plugins will have the best compatibility with the rest of the
 * VisuStella MZ library.
 *
 * ============================================================================
 * Major Changes: New Hard-Coded Features
 * ============================================================================
 *
 * This plugin adds some new hard-coded features to RPG Maker MZ's functions.
 * The following is a list of them.
 *
 * ---
 *
 * Equipment Type Handling
 *
 * - Characters will no longer have one universal equipment slot setting.
 * Classes can have different equipment type loadouts, made possible through
 * the usage of notetags. Also, equipment types of matching names would be
 * treated as the same type, where previously, they would be different types.
 * This means if you have two "Accessory" slots, be it in the form of notetags
 * or through the Database > Types tab, they can both equip the same type of
 * accessories.
 *
 * - The Change Equip event command is now updated to reflect this new change.
 * When processing an equip change, the slot changed will go to the first
 * empty slot of matching type. If all of the actor's matching slot types are
 * equipped, then the equip will replace the last slot available.
 *
 * ---
 *
 * Shop Status Window
 *
 * - The Status Window found in the Shop Scene was originally barren and did
 * not display much information at all. This is changed through this plugin's
 * new features. While the contents of the Shop Status Window can be customized
 * through the Plugin Parameters, it is a change that cannot be reversed and
 * for the better since it gives players the much needed information revolving
 * around the game's items.
 *
 * ---
 *
 * Core Engine Compatibility: Modern Controls
 *
 * - If the VisuStella Core Engine is added to your game with Modern Controls
 * enabled, then the Item Menu Scene, Equip Menu Scene, and Shop Menu Scene's
 * controls will be changed a bit.
 *
 * - The Item Menu Scene will automatically have the Item List Window active,
 * with using the Left/Right (for single column) or Page Up/Page Down (for
 * multi-columns) to navigate between the Item Categories. Similar will occur
 * when trying to sell items in the Shop Menu Scene.
 *
 * - The Equip Menu Scene will automatically have the Equip Slots Window active
 * and only activate the command window upon moving up to it.
 *
 * ---
 *
 * ============================================================================
 * VisuStella MZ Compatibility
 * ============================================================================
 *
 * While this plugin is compatible with the majority of the VisuStella MZ
 * plugin library, it is not compatible with specific plugins or specific
 * features. This section will highlight the main plugins/features that will
 * not be compatible with this plugin or put focus on how the make certain
 * features compatible.
 * 
 * ---
 * 
 * VisuMZ_1_BattleCore
 * 
 * Changing the "Damage Multiplier" or "Healing Multiplier" vocabulary for the
 * Item and Equip Core's Shop Status Window is not done with the Item and Equip
 * Core's Plugin Parameters if you have the Battle Core installed.
 * 
 * Instead, go to Battle Core's Plugin Parameters, Damage Settings, Damage
 * Styles, and adjust the style's version of the "Damage Multiplier" or
 * "Healing Multiplier" text instead.
 * 
 * Why does this work this way? Because not all damage styles work off
 * "Multipliers" so in order for it to convey the proper message to the player,
 * each damage style has its own vocabulary to be more accurate.
 * 
 * In case you forget about that, when you visit the Item and Equip Core's
 * plugin parameters for these, it should also remind you in the parameter's
 * description on where to change it.
 * 
 * ---
 *
 * VisuMZ_2_WeaponSwapSystem
 *
 * The custom equip slots feature from the VisuStella MZ Items and Equips Core
 * allowed you to add in extra weapon slots. This is now curated up to a max
 * of one weapon slot per character. This needs to be done to make the Weapon
 * Swap System viable.
 *
 * ---
 *
 * ============================================================================
 * Notetags
 * ============================================================================
 *
 * The following are notetags that have been added through this plugin. These
 * notetags will not work with your game if this plugin is OFF or not present.
 *
 * === General ===
 * 
 * These notetags affect the Items, Weapons, and Armors on a general scale.
 *
 * ---
 *
 * <Max: x>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Determines the maximum quantity that can be held for this item.
 * - Replace 'x' with a number value to determine the maximum amount.
 *
 * ---
 *
 * <Color: x>
 * <Color: #rrggbb>
 *
 * - Used for: Item, Weapon, Armor, Skill Notetags
 * - Determines the color of the object inside the in-game menus.
 * - Replace 'x' with a number value depicting a window text color.
 * - Replace 'rrggbb' with a hex color code for a more custom color.
 *
 * ---
 *
 * <Category: x>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Arranges items into certain/multiple categories to work with the Category
 *   Plugin Parameter setting: "Category:x".
 * - Replace 'x' with a category name to mark this item as.
 *
 * ---
 *
 * <Categories>
 *  x
 *  x
 * </Categories>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Arranges items into certain/multiple categories to work with the Category
 *   Plugin Parameter setting: "Category:x".
 * - Replace each 'x' with a category name to mark this item as.
 *
 * ---
 *
 * === Item Accessibility Notetags ===
 *
 * The following notetags allow you to choose when items can/cannot be used
 * based on switches.
 *
 * ---
 *
 * <Enable Switch: x>
 *
 * <Enable All Switches: x,x,x>
 * <Enable Any Switches: x,x,x>
 *
 * - Used for: Item Notetags
 * - Determines the enabled status of the item based on switches.
 * - Replace 'x' with the switch ID to determine the item's enabled status.
 * - If 'All' notetag variant is used, item will be disabled until all
 *   switches are ON. Then, it would be enabled.
 * - If 'Any' notetag variant is used, item will be enabled if any of the
 *   switches are ON. Otherwise, it would be disabled.
 *
 * ---
 *
 * <Disable Switch: x>
 *
 * <Disable All Switches: x,x,x>
 * <Disable Any Switches: x,x,x>
 *
 * - Used for: Item Notetags
 * - Determines the enabled status of the item based on switches.
 * - Replace 'x' with the switch ID to determine the item's enabled status.
 * - If 'All' notetag variant is used, item will be enabled until all switches
 *   are ON. Then, it would be disabled.
 * - If 'Any' notetag variant is used, item will be disabled if any of the
 *   switches are ON. Otherwise, it would be enabled.
 *
 * ---
 *
 * === JavaScript Notetags: Item Accessibility ===
 *
 * The following are notetags made for users with JavaScript knowledge to
 * determine if an item can be accessible by code.
 *
 * ---
 *
 * <JS Item Enable>
 *  code
 *  code
 *  enabled = code;
 * </JS Item Enable>
 *
 * - Used for: Item Notetags
 * - Determines the enabled status of the item based on JavaScript code.
 * - If the actor this is disabled for is the only party member, it will not be
 *   visible in the item list unless the VisuStella Battle Core is installed.
 *   - If the VisuStella Battle Core is installed, then all battle scope items
 *     will be visible even if they're disabled.
 * - Replace 'code' to determine the type enabled status of the item.
 * - The 'enabled' variable returns a boolean (true/false) to determine if the
 *   item will be enabled or not.
 * - The 'user' variable refers to the user with the item.
 * - The 'item' variable refers to the item being checked.
 * - All other item conditions must be met in order for this to code to count.
 *
 * ---
 *
 * === Equipment Notetags ===
 *
 * The following notetags provide equipment-related effects from deciding what
 * equip slots can be given to classes to the base parameter changes asigned
 * to weapons and armors.
 *
 * ---
 *
 * <Equip Slots>
 *  slotName
 *  slotName
 *  slotName
 * </Equip Slots>
 *
 * - Used for: Class Notetags
 * - Changes the equipment slot loadout for any actor who is that class.
 * - Replace 'slotName' with an Equipment Type name from Database > Types.
 *   This is case-sensitive.
 * - Insert or remove as many "slotName" equipment types as needed.
 *
 * ---
 *
 * <param: +x>
 * <param: -x>
 *
 * - Used for: Weapon, Armor Notetags
 * - Changes the base parameter value for the equip item.
 * - Replace 'param' with any of the following: 'MaxHP', 'MaxMP', 'ATK', 'DEF',
 *   'MAT', 'MDF', 'AGI', or 'LUK' to change that specific parameter's value.
 *   - These notetags do NOT work with X Parameters, S Parameters, or any
 *     custom parameters. These notetags ONLY work with the base parameters.
 * - Replace 'x' with a number value to set the parameter value to.
 * - This allows you to bypass the Database Editor's number limitations.
 *
 * ---
 * 
 * <Equip Copy Limit: x>
 * 
 * - Used for: Weapon, Armor Notetags
 * - Sets a maximum number of copies that the actor can wear of this equipment.
 * - Replace 'x' with a number value to determine the copy limit.
 * - This can be bypassed using Event Commands and/or Script Calls.
 * - Usage Example: Actors can only equip one copy of the "One-of-a-Kind Ring"
 *   on at any time despite having empty accessory slots because the ring has a
 *   <Equip Copy Limit: 1> notetag.
 * 
 * ---
 * 
 * <Equip Weapon Type Limit: x>
 * 
 * - Used for: Weapon
 * - This weapon cannot be equipped with other weapons of the same type once
 *   the limited amount has been reached.
 * - Replace 'x' with a number value to determine the weapon type limit.
 * - This can be bypassed using Event Commands and/or Script Calls.
 * - Usage Example: A dualwielding warrior who can only equip one sword and a
 *   dagger but never two swords or two daggers because the swords and daggers
 *   all have the <Equip Weapon Type Limit: 1> notetags on them.
 * 
 * ---
 * 
 * <Equip Armor Type Limit: x>
 * 
 * - Used for: Armor
 * - This armor cannot be equipped with other armors of the same type once the
 *   limited amount has been reached.
 * - Replace 'x' with a number value to determine the armor type limit.
 * - This can be bypassed using Event Commands and/or Script Calls.
 * - Usage Example: People cannot equip more than two glove accessories on at a
 *   time because the glove is a "Glove" armor-type and each glove item has the
 *   <Equip Armor Type Limit: 2> notetags on them.
 * 
 * ---
 *
 * === JavaScript Notetags: Equipment ===
 *
 * The following are notetags made for users with JavaScript knowledge to
 * adjust the parameter through code.
 *
 * ---
 *
 * <JS Parameters>
 *  MaxHP = code;
 *  MaxMP = code;
 *  ATK = code;
 *  DEF = code;
 *  MAT = code;
 *  MDF = code;
 *  AGI = code;
 *  LUK = code;
 * </JS Parameters>
 *
 * - Used for: Weapon, Armor Notetags
 * - Uses JavaScript to determine the values for the basic parameters based on
 *   the code used to calculate its value.
 * - The variables 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI', and
 *   'LUK' are used to determine the finalized value of the parameter. This
 *   variable is case sensitive.
 * - If a parameter is not present, its value will be treated as +0.
 *
 * ---
 *
 * === Status Window Notetags ===
 *
 * The following notetags will affect the Shop Status Window info. If for any
 * reason the data that is displayed is not to your liking or insufficient,
 * you can change it up using the following notetags.
 *
 * ---
 *
 * <Status Info>
 *  key: data
 *  key: data
 *  key: data
 * </Status Info>
 *
 * - Used for: Skill, Item, Weapon, Armor Notetags
 * - If you do not like the generated data that's displayed, you can change it
 *   using this notetag to display what you want.
 * - Replace 'key' with one of the following:
 *   - Consumable
 *   - Quantity
 *   - Occasion
 *   - Scope
 *   - Speed
 *   - Success Rate
 *   - Repeat
 *   - Hit Type
 *   - Element
 *   - Damage Multiplier
 *   - HP Recovery
 *   - MP Recovery
 *   - TP Recovery
 *   - HP Damage
 *   - MP Damage
 *   - TP Damage
 *   - User TP Gain
 *   - Added Effects
 *   - Removed Effects
 * - Replace 'data' with the text data you want to visually appear. You may use
 *   text codes for this.
 * - This only affects info entries that are already visible and won't make
 *   other categories suddenly appear.
 * - Insert or remove as many "key: data" lines as needed.
 *
 * ---
 *
 * <Custom Status Info>
 *  key: data
 *  key: data
 *  key: data
 * </Custom Status Info>
 *
 * - Used for: Skill, Item
 * - If you want custom categories and data to be displayed for your items that
 *   aren't provided by the Shop Status Window Info to begin with, you can use
 *   this notetag to add in your own entries.
 * - Replace 'key' with text of the exact label you want. You may use text
 *   codes for this.
 * - Replace 'data' with text of the exact text data you want. You may use text
 *   codes for this.
 * - Insert or remove as many "key: data" lines as needed.
 *
 * ---
 * 
 * <Shop Picture Name: filename>
 * 
 * - Used for: Skill, Item, Weapon, Armor Notetags
 * - Enables a shop picture for the status window. This image can be seen in
 *   the item scene, shop scene, and skill scene if enabled.
 * - If this notetag is not used, there will be no image.
 * - Replace 'filename' with the filename of the graphic to use from the game
 *   project's img/pictures/ folder. Filenames are case sensitive. Leave out
 *   the filename extension from the notetag.
 * - Use the supporting notetags to determine where the image appears. If not,
 *   they will default to the background, fit to the window dimensions,
 *   centered at the middle of the window.
 * 
 * ---
 * 
 * <Shop Picture Layer: Background>
 * <Shop Picture Layer: Foreground>
 * 
 * - Used for: Skill, Item, Weapon, Armor Notetags
 * - Determines which layer the graphic will be drawn on.
 * - If the background layer is selected, the picture will appear behind the
 *   data text.
 * - If the foreground layer is selected, the picture will appear in front of
 *   the data text.
 * - If this notetag is not used, it will default to the background layer.
 * 
 * ---
 * 
 * <Shop Picture Max Width: x>
 * <Shop Picture Max Height: y>
 * <Shop Picture Max Dimensions: x, y>
 * 
 * - Used for: Skill, Item, Weapon, Armor Notetags
 * - Determines the maximum width and/or height for the image.
 * - This means the image will be automatically scaled proportionally to that
 *   width or height as long as everything else does not break boundaries.
 * - Replace 'x' and 'y' with number values representing the maximum dimensions
 *   the image can be in pixels.
 * - If these notetags are not used, the image will be automatically scaled to
 *   the dimensions of the shop status window.
 * 
 * ---
 * 
 * <Shop Picture Alignment: Left>
 * <Shop Picture Alignment: Center>
 * <Shop Picture Alignment: Right>
 * 
 * - Used for: Skill, Item, Weapon, Armor Notetags
 * - Adjusts the horizontal alignment for the image.
 * - Left, center, right determines how it's aligned horizontally if the
 *   image does not horizontally fit in the width of the window.
 * - If any of these notetags are not used, the image will default to the
 *   'center' alignment.
 * 
 * ---
 * 
 * <Shop Picture Position: Top>
 * <Shop Picture Position: Middle>
 * <Shop Picture Position: Bottom>
 * 
 * - Used for: Skill, Item, Weapon, Armor Notetags
 * - Adjusts the vertical position for the image.
 * - Top, middle, bottom determines how it's positioned vertically if the
 *   image does not vertically fit in the width of the window.
 * - If any of these notetags are not used, the image will default to the
 *   'middle' position.
 * 
 * ---
 * 
 * <Shop Picture Offset X: +x>
 * <Shop Picture Offset X: -x>
 * 
 * <Shop Picture Offset Y: +y>
 * <Shop Picture Offset Y: -y>
 * 
 * <Shop Picture Offset: +x, +y>
 * <Shop Picture Offset: -y, -y>
 * 
 * - Used for: Skill, Item, Weapon, Armor Notetags
 * - Offsets the X and Y positions of the image in the shop status window.
 * - X offsets adjust the horizontal position by x pixels.
 *   - Positive goes right.
 *   - Negative goes left.
 * - Y offsets adjust the horizontal position by y pixels.
 *   - Positive goes down.
 *   - Negative goes up.
 * - Replace 'x' and 'y' with number values representing the pixels to offset
 *   the image by. The '+' and '-' signs are required.
 * - If none of these notetags are used, there will be no offsets.
 * 
 * ---
 * 
 * <Shop Picture Opacity: x>
 * <Shop Picture Opacity: x%>
 * 
 * - Used for: Skill, Item, Weapon, Armor Notetags
 * - Adjusts the opacity of the image used.
 * - When using 'x' and not 'x%', use a number between 0 and 255.
 *   - The closer to 0, the more transparent the image is.
 *   - The closer to 255, the more opaque the image is.
 * - When using 'x%' and not 'x', use a number between 0% and 100%.
 *   - The closer to 0%, the more transparent the image is.
 *   - The closer to 100%, the more opaque the image is.
 * 
 * ---
 *
 * === Shop Menu Notetags ===
 *
 * These notetags adjust how prices and such are managed inside the Shop Menu
 * as well as whether or not some items are visible depending on switch states.
 *
 * ---
 *
 * <Price: x>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Adjusts the buying price for this item.
 * - Replace 'x' with a number depicting the desired value for the buy price.
 * - This allows you to bypass the RPG Maker MZ editor's limitation of 999,999.
 *
 * ---
 *
 * <Can Sell>
 * <Cannot Sell>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Makes the item either always sellable or cannot be sold.
 * - This bypasses the game's internal hard-coding to prevent items with a
 *   price of 0 from being able to be sold.
 * - This bypasses the game's internal hard-coding to always allow items with
 *   a price value of being able to be sold.
 *
 * ---
 *
 * <Sell Price: x>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Changes the sell price to be something different than the default amount.
 * - Replace 'x' with a number depicting the desired value for the sell price.
 *
 * ---
 *
 * <Show Shop Switch: x>
 *
 * <Show Shop All Switches: x,x,x>
 * <Show Shop Any Switches: x,x,x>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Determines the visibility of the shop item based on switches.
 * - Replace 'x' with the switch ID to determine the shop item's visibility.
 * - If 'All' notetag variant is used, item will be hidden until all switches
 *   are ON. Then, it would be shown.
 * - If 'Any' notetag variant is used, item will be shown if any of the
 *   switches are ON. Otherwise, it would be hidden.
 *
 * ---
 *
 * <Hide Shop Switch: x>
 *
 * <Hide Shop All Switches: x,x,x>
 * <Hide Shop Any Switches: x,x,x>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Determines the visibility of the shop item based on switches.
 * - Replace 'x' with the switch ID to determine the shop item's visibility.
 * - If 'All' notetag variant is used, item will be shown until all switches
 *   are ON. Then, it would be hidden.
 * - If 'Any' notetag variant is used, item will be hidden if any of the
 *   switches are ON. Otherwise, it would be shown.
 *
 * ---
 *
 * <Cannot Sell Switch: x>
 *
 * <Cannot Sell All Switches: x,x,x>
 * <Cannot Sell Any Switches: x,x,x>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Determines the sellability of the shop item based on switches.
 * - Replace 'x' with the switch ID to determine the shop item's sellability.
 * - If 'All' notetag variant is used, item cannot be sold until all switches
 *   are ON. Otherwise, it can be sold.
 * - If 'Any' notetag variant is used, item cannot be sold if any of the
 *   switches are ON. Otherwise, it can be sold.
 *
 * ---
 *
 * === JavaScript Notetags: Shop Menu ===
 *
 * The following are notetags made for users with JavaScript knowledge. These
 * notetags are primarily aimed at Buy and Sell prices.
 *
 * ---
 *
 * <JS Buy Price>
 *  code
 *  code
 *  price = code;
 * </JS Buy Price>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Replace 'code' to determine the buying 'price' of the item.
 * - Insert the final buy price into the 'price' variable.
 * - The 'item' variable refers to the item being bought.
 *
 * ---
 *
 * <JS Sell Price>
 *  code
 *  code
 *  price = code;
 * </JS Sell Price>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Replace 'code' to determine the selling 'price' of the item.
 * - Insert the final sell price into the 'price' variable.
 * - The 'item' variable refers to the item being sold.
 *
 * ---
 *
 * ============================================================================
 * Plugin Commands
 * ============================================================================
 *
 * The following are Plugin Commands that come with this plugin. They can be
 * accessed through the Plugin Command event command.
 *
 * ---
 * 
 * === Actor Plugin Commands ===
 * 
 * ---
 *
 * Actor: Change Equip Slots
 * - Forcefully change the actor(s) equip slots.
 * - These will persist through class changes.
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 *
 *   Equip Slots:
 *   - Insert the equip slots you want the actor(s) to have.
 *   - These entries are case-sensitive.
 *
 * ---
 *
 * Actor: Reset Equip Slots
 * - Reset any forced equip slots for the actor(s).
 * - Equip slots will then be based on class.
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 *
 * ---
 * 
 * === Shop Plugin Commands ===
 * 
 * ---
 *
 * Shop: Advanced
 * - Make it easier to put together inventories for a shop.
 * - WARNING: Does not allow for event-specific prices.
 *
 *   Step 1: Item ID's
 *   - Select which Item ID ranges to add.
 *
 *   Step 2: Weapon ID's
 *   - Select which Weapon ID ranges to add.
 *
 *   Step 3: Armor ID's
 *   - Select which Armor ID ranges to add.
 *
 *   Step 4: Purchase Only?
 *   - Make the shop purchase-only?
 * 
 *   Optional:
 * 
 *     Blacklist
 *     - A list of categories to blacklist from the shop.
 *     - Not used if empty. Mark categories with <Category: x>
 * 
 *     Whitelist
 *     - A list of categories to whitelist for the shop.
 *     - Not used if empty. Mark categories with <Category: x>
 *
 * This Plugin Command primarily functions as an alternative to the editor's
 * "Shop Processing" event command as that one requires you to add items one at
 * a time, making it extremely tedious to add large amounts of items. This
 * Plugin Command will mitigate that by allowing ID ranges to determine which
 * items to make available.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Item Menu Settings
 * ============================================================================
 *
 * The Item Menu Settings allow you to adjust specifics on how key objects and
 * windows in the Item Menu Scene operate.
 *
 * ---
 *
 * General Window
 *
 *   Use Updated Layout:
 *   - Use the Updated Item Menu Layout provided by this plugin?
 *   - This will automatically enable the Status Window.
 *   - This will override the Core Engine windows settings.
 *
 *   Layout Style:
 *   - If using an updated layout, how do you want to style the menu scene?
 *     - Upper Help, Left Input
 *     - Upper Help, Right Input
 *     - Lower Help, Left Input
 *     - Lower Help, Right Input
 *
 * ---
 *
 * List Window
 * 
 *   Columns:
 *   - Number of maximum columns.
 *   - If you are using the VisuStella MZ Core Engine and the "Modern Controls"
 *     Plugin Parameter, please read through that section in case you have any
 *     questions about how to switch between categories when using multiple
 *     columns of items at a time.
 *
 * ---
 *
 * Item Quantity
 *
 *   Item Max:
 *   Weapon Max:
 *   Armor Max:
 *   - The default maximum quantity for items, weapons, and/or armors.
 * 
 *   Quantity Format:
 *   - How to display an item's quantity.
 *   - %1 - Item Quantity
 *
 *   Font Size:
 *   - Default font size for item quantity.
 *
 * ---
 *
 * Shop Status Window
 * 
 *   Show in Item Menu?:
 *   - Show the Shop Status Window in the Item Menu?
 *   - This is enabled if the Updated Layout is on.
 *
 *   Adjust List Window?:
 *   - Automatically adjust the Item List Window in the Item Menu if using the
 *     Shop Status Window?
 * 
 *   Background Type:
 *   - Select background type for this window.
 *     - 0 - Window
 *     - 1 - Dim
 *     - 2 - Transparent
 *
 *   JS: X, Y, W, H:
 *   - Code used to determine the dimensions for this Status Window in the
 *     Item Menu.
 *
 * ---
 *
 * Button Assist Window
 *
 *   Switch Category:
 *   - Button assist text used for switching categories.
 *   - For VisuStella MZ's Core Engine's Button Assist Window.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Item Categories
 * ============================================================================
 *
 * Item Categories appear both in the Item Menu Scene and Shop Menu Scene (but
 * only under the Sell command). These Plugin Parameters give you the ability
 * to add in the specific categories you want displayed, remove the ones you
 * don't, and associate them with icons.
 *
 * ---
 *
 * List
 *
 *   Category List
 *   - A list of the item categories displayed in the Item/Shop menus.
 * 
 *     Type:
 *     - A list of the item categories displayed in the Item/Shop menus.
 *     - Replace x with ID numbers or text.
 *     - AllItems, RegularItems, KeyItems
 *     - HiddenItemA, HiddenItemB
 *     - Consumable, Nonconsumable
 *     - AlwaysUsable, BattleUsable, FieldUsable, NeverUsable
 *     - AllWeapons, WType:x
 *     - AllArmors, AType:x, EType:x
 *     - Category:x
 * 
 *     Icon:
 *     - Icon used for this category.
 *     - Use 0 for no icon.
 * 
 *     Visibility Switch:
 *     - This Switch must be turned ON in order for the category to show.
 *     - Use 0 for no Switch requirement.
 *
 *   Style:
 *   - How do you wish to draw categorie entries in the Category Window?
 *   - Text Only: Display only the text.
 *   - Icon Only: Display only the icon.
 *   - Icon + Text: Display the icon first, then the text.
 *   - Auto: Determine which is better to use based on the size of the cell.
 *
 *   Text Alignment
 *   - Decide how you want the text to be aligned.
 *
 * ---
 *
 * Vocabulary
 *
 *   Hidden Item A
 *   Hidden Item B
 *   Consumable
 *   Nonconsumable
 *   Always Usable
 *   Battle Usable
 *   Field Usable
 *   Never Usable
 *   - How these categories are named in the Item Menu.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: NEW! Labels
 * ============================================================================
 *
 * Whenever the player receives a new item(s), a NEW! Label can be placed on
 * top of the item's icon when browsing a menu displaying the item(s). This is
 * a quality of life addition from more modern RPG's to help players figure out
 * what they've recently received. The following are Plugin Parameters made to
 * adjust how the NEW! Labels are handled in-game.
 *
 * ---
 *
 * NEW! Labels
 * 
 *   Use NEW! Labels?:
 *   - Use the NEW! Labels or not?
 * 
 *   Icon:
 *   - The icon index used to represent the NEW! text.
 *   - Use 0 to not draw any icons.
 * 
 *   Text:
 *   - The text written on the NEW! Label.
 * 
 *     Font Color:
 *     - Use #rrggbb for custom colors or regular numbers for text colors from
 *       the Window Skin.
 * 
 *     Font Size:
 *     - The font size used for the NEW! text.
 * 
 *   Fade Limit:
 *   - What's the upper opaque limit before reversing?
 * 
 *   Fade Speed:
 *   - What's the fade speed of the NEW! Label?
 * 
 *   Offset X:
 *   - How much to offset the NEW! Label's X position by.
 * 
 *   Offset Y:
 *   - How much to offset the NEW! Label's Y position by.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Equip Menu Settings
 * ============================================================================
 *
 * These Plugin Parameters adjust the Equipment Menu Scene, ranging from using
 * a more updated and modern layout, changing the styles of other windows, and
 * other key visual aspects of the Equip Menu Scene. Other settings here allow
 * you to adjust how equipment operate under certain rulings, too.
 *
 * ---
 *
 * General
 * 
 *   Use Updated Layout:
 *   - Use the Updated Equip Layout provided by this plugin?
 *   - This will override the Core Engine windows settings.
 * 
 *     Param Font Size:
 *     - The font size used for parameter values.
 * 
 *     Show Menu Portraits?:
 *     - If Main Menu Core is installed, display the Menu Portraits instead of
 *       the actor's face in the status window?
 * 
 *     JS: Portrait Upper:
 *     - If Menu Portraits are available, this is code used to draw the upper
 *       data like this in the Status Window.
 * 
 *     JS: Face Upper:
 *     - If faces used used, this is code used to draw the upper data like this
 *       in the Status Window.
 * 
 *     JS: Parameter Lower:
 *     - Code to determine how parameters are drawn in the Status Window.
 *
 *   Layout Style:
 *   - If using an updated layout, how do you want to style the menu scene?
 *     - Upper Help, Left Input
 *     - Upper Help, Right Input
 *     - Lower Help, Left Input
 *     - Lower Help, Right Input
 * 
 *   Status Window Width:
 *   - The usual width of the status window if using the non-Updated Equip
 *     Menu Layout.
 * 
 *   Show Back Rectangles?:
 *   - Show back rectangles of darker colors to display information better?
 * 
 *     Back Rectangle Color:
 *     - Use #rrggbb for custom colors or regular numbers for text colors
 *       from the Window Skin.
 *
 * ---
 *
 * Command Window
 * 
 *   Style:
 *   - How do you wish to draw commands in the Command Window?
 *   - Text Only: Display only the text.
 *   - Icon Only: Display only the icon.
 *   - Icon + Text: Display the icon first, then the text.
 *   - Auto: Determine which is better to use based on the size of the cell.
 * 
 *   Text Align:
 *   - Text alignment for the Command Window.
 * 
 *   Equip Icon:
 *   - The icon used for the Equip command.
 * 
 *   Add Optimize Command?:
 *   - Add the "Optimize" command to the Command Window?
 * 
 *     Optimize Icon:
 *     - The icon used for the Optimize command.
 * 
 *   Add Clear Command?:
 *   - Add the "Clear" command to the Command Window?
 * 
 *     Clear Icon:
 *     - The icon used for the Clear command.
 *
 * ---
 *
 * Remove Equip
 * 
 *   Icon:
 *   - Icon used for equipment removal.
 * 
 *   Text:
 *   - Text used for equipment removal.
 * 
 *   Use SHIFT Shortcut?:
 *   - Add the "Shift" button as a shortcut key to removing items?
 *
 * ---
 *
 * Rulings
 * 
 *   Equip-Adjust HP/MP:
 *   - Adjust HP/MP differences after changing equips with MaxHP/MaxMP values.
 * 
 *   Non-Removable Types:
 *   - Insert ID's of the Equipment Types that must always have an item
 *     equipped and cannot be empty.
 * 
 *   Non-Optimized Types:
 *   - Insert ID's of the Equipment Types that will be ignored when equipment
 *     is being optimized.
 *
 * ---
 *
 * Button Assist Window
 *
 *   SHIFT: Remove:
 *   - Button assist text used for the SHIFT Remove Shortcut.
 *   - For VisuStella MZ's Core Engine's Button Assist Window.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Shop Menu Settings
 * ============================================================================
 *
 * These Plugin Parameters allow you a number of options to adjust the Shop
 * Menu Scene. These options range from enabling an updated and modern layout,
 * adjust how various key visual aspects appear, and determine how prices can
 * be affected when it comes to selling them or buying them (for coders).
 *
 * ---
 *
 * General
 * 
 *   Use Updated Layout:
 *   - Use the Updated Shop Layout provided by this plugin?
 *   - This will override the Core Engine windows settings.
 *
 *   Layout Style:
 *   - If using an updated layout, how do you want to style the menu scene?
 *     - Upper Help, Left Input
 *     - Upper Help, Right Input
 *     - Lower Help, Left Input
 *     - Lower Help, Right Input
 *
 * ---
 * 
 * Switches:
 * 
 *   Switch: Buy:
 *   - Buying items in the Shop Scene turns this Switch to ON.
 *   - Switch reverts to OFF whenever the Shop Scene opens.
 * 
 *   Switch: Sell
 *   - Selling items in the Shop Scene turns this Switch to ON.
 *   - Switch reverts to OFF whenever the Shop Scene opens.
 * 
 * ---
 *
 * Command Window
 * 
 *   Hide Unavailable?:
 *   - Hide all unavailable commands like when a shop is set to Purchase Only?
 * 
 *   Style:
 *   - How do you wish to draw commands in the Command Window?
 *   - Text Only: Display only the text.
 *   - Icon Only: Display only the icon.
 *   - Icon + Text: Display the icon first, then the text.
 *   - Auto: Determine which is better to use based on the size of the cell.
 * 
 *   Text Align:
 *   - Text alignment for the Command Window.
 * 
 *   Buy Icon:
 *   - The icon used for the Buy command.
 * 
 *   Sell Icon:
 *   - The icon used for the Sell command.
 * 
 *   Cancel Icon:
 *   - The icon used for the Cancel command.
 * 
 *   Rename "Cancel":
 *   - Rename Cancel to something more logical for the Shop Menu Scene.
 *
 * ---
 *
 * Prices
 * 
 *   Sell Price Rate:
 *   - The default sell price rate.
 * 
 *   JS: Buy Price:
 *   - Modificatons made to the buy price before finalizing it.
 * 
 *   JS: Sell Price:
 *   - Modificatons made to the sell price before finalizing it.
 *
 * ---
 *
 * Button Assist Window
 *
 *   Small Increment:
 *   Large Increment:
 *   - Text used for changing amount bought/sold.
 *   - For VisuStella MZ's Core Engine's Button Assist Window.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Shop Status Window
 * ============================================================================
 *
 * These Plugin Parameters focuses on the Shop Status Window and determines how
 * its data is displayed.
 *
 * ---
 *
 * General
 * 
 *   Window Width:
 *   - The usual width of the status window.
 * 
 *   Parameter Font Size:
 *   - Font size used for parameter changes.
 * 
 *   Translucent Opacity:
 *   - Opacity setting used for translucent window objects.
 * 
 *   Show Back Rectangles?:
 *   - Show back rectangles of darker colors to display information better?
 * 
 *     Back Rectangle Color:
 *     - Use #rrggbb for custom colors or regular numbers for text colors
 *       from the Window Skin.
 *
 * ---
 *
 * Equipment Data
 * 
 *   Already Equipped:
 *   - Marker used to show an actor cannot equip an item.
 * 
 *   Can't Equip:
 *   - Marker used to show an actor cannot equip an item.
 * 
 *   No Changes:
 *   - Marker used to show no changes have occurred.
 * 
 *   JS: Draw Equip Data:
 *   - Code used to draw the equipment data for the Shop Status Window.
 *
 * ---
 *
 * Item Data
 * 
 *   Max State/Buff Icons:
 *   - Maximum number of icons that can be displayed for Add/Remove
 *     States/Buffs.
 * 
 *   Multiplier Standard:
 *   - Constant standard to filter out random values when calculating the
 *     damage multiplier.
 * 
 *   JS: Draw Item Data:
 *   - Code used to draw the item data for the Shop Status Window.
 *
 * ---
 *
 * Vocabulary
 * 
 *   Consumable:
 *   Occasions:
 *   Scope:
 *   Speed:
 *   Success Rate:
 *   Repeats:
 *   Hit Type:
 *   Element:
 *   Damage Type:
 *   Effects:
 *   - Vocabulary used for these data entries.
 *   - Some of these have Plugin Parameters have sub-entries.
 * 
 *   NOTE: Regarding Damage Labels
 * 
 *   If Visu_1_BattleCore is installed, priority goes to its Damage Style
 *   settings. The label displayed is based on the damage style settings in
 *   place for that specific skill or item.
 * 
 *   Go to Battle Core > Plugin Parameters > Damage Settings > Style List >
 *   pick the damage style you want to edit > Damage Label and change the
 *   text settings you'd like there.
 *
 * ---
 *
 * ============================================================================
 * Terms of Use
 * ============================================================================
 *
 * 1. These plugins may be used in free or commercial games provided that they
 * have been acquired through legitimate means at VisuStella.com and/or any
 * other official approved VisuStella sources. Exceptions and special
 * circumstances that may prohibit usage will be listed on VisuStella.com.
 * 
 * 2. All of the listed coders found in the Credits section of this plugin must
 * be given credit in your games or credited as a collective under the name:
 * "VisuStella".
 * 
 * 3. You may edit the source code to suit your needs, so long as you do not
 * claim the source code belongs to you. VisuStella also does not take
 * responsibility for the plugin if any changes have been made to the plugin's
 * code, nor does VisuStella take responsibility for user-provided custom code
 * used for custom control effects including advanced JavaScript notetags
 * and/or plugin parameters that allow custom JavaScript code.
 * 
 * 4. You may NOT redistribute these plugins nor take code from this plugin to
 * use as your own. These plugins and their code are only to be downloaded from
 * VisuStella.com and other official/approved VisuStella sources. A list of
 * official/approved sources can also be found on VisuStella.com.
 *
 * 5. VisuStella is not responsible for problems found in your game due to
 * unintended usage, incompatibility problems with plugins outside of the
 * VisuStella MZ library, plugin versions that aren't up to date, nor
 * responsible for the proper working of compatibility patches made by any
 * third parties. VisuStella is not responsible for errors caused by any
 * user-provided custom code used for custom control effects including advanced
 * JavaScript notetags and/or plugin parameters that allow JavaScript code.
 *
 * 6. If a compatibility patch needs to be made through a third party that is
 * unaffiliated with VisuStella that involves using code from the VisuStella MZ
 * library, contact must be made with a member from VisuStella and have it
 * approved. The patch would be placed on VisuStella.com as a free download
 * to the public. Such patches cannot be sold for monetary gain, including
 * commissions, crowdfunding, and/or donations.
 *
 * ============================================================================
 * Credits
 * ============================================================================
 * 
 * If you are using this plugin, credit the following people in your game:
 * 
 * Team VisuStella
 * * Yanfly
 * * Arisu
 * * Olivia
 * * Irina
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 * 
 * Version 1.32: July 23, 2021
 * * Bug Fixes!
 * ** Fixed a bug that would cause armor duplication when changing to classes
 *    with unaligned equipment slot types. Fix made by Arisu.
 * 
 * Version 1.31: July 9, 2021
 * * Feature Update!
 * ** Added a failsafe for price manipulation JavaScript to never have prices
 *    drop below 0 if possible. Update made by Arisu.
 * 
 * Version 1.30: July 2, 2021
 * * Documentation Update!
 * ** Added an extra note to the help file for the following:
 *    Plugin Parameters > Item Menu Settings > List Window > Columns
 * *** If you are using the VisuStella MZ Core Engine and the "Modern Controls"
 *     Plugin Parameter, please read through that section in case you have any
 *     questions about how to switch between categories when using multiple
 *     columns of items at a time.
 *    
 * 
 * Version 1.29: June 25, 2021
 * * Compatibility Update
 * ** Compatibility update with RPG Maker MZ 1.3.0+.
 * * Feature Update!
 * ** Phantom data when changing equipment types in the database should no
 *    longer affect actors with cached equip ID's. Update made by Arisu.
 * 
 * Version 1.28: June 4, 2021
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.27: May 21, 2021
 * * Bug Fixes!
 * ** Using the mouse right click in the Equip Scene while inside of the item
 *    to slot window will no longer exit the Equip Scene. Fix made by Yanfly.
 * 
 * Version 1.26: April 30, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** "VisuStella MZ Compatibility" added VisuMZ_1_BattleCore section regarding
 *    Damage Multiplier and Healing Multiplier vocabulary settings to reduce
 *    commonly asked questions.
 * * New Features!
 * ** New notetags added by Irina and sponsored by Archeia:
 * *** <Shop Picture Name: filename>
 * *** <Shop Picture Layer: x>
 * *** <Shop Picture Max Width: x>
 * *** <Shop Picture Max Height: y>
 * *** <Shop Picture Max Dimensions: x, y>
 * *** <Shop Picture Alignment: x>
 * *** <Shop Picture Position: y>
 * *** <Shop Picture Offset X: +x>
 * *** <Shop Picture Offset X: -x>
 * *** <Shop Picture Offset Y: +y>
 * *** <Shop Picture Offset Y: -y>
 * *** <Shop Picture Offset: +x, +y>
 * *** <Shop Picture Offset: -x, -y>
 * *** <Shop Picture Opacity: x>
 * *** <Shop Picture Opacity: x%>
 * **** Add images from the game project's img/pictures/ folder to display in
 *      the Shop Status Window.
 * 
 * Version 1.25: April 23, 2021
 * * Documentation Update!
 * ** Added clarity to the <param: +x> and <param: -x> notetags:
 * *** These notetags do NOT work with X Parameters, S Parameters, or any
 *     custom parameters. These notetags ONLY work with the base parameters.
 * 
 * Version 1.24: April 16, 2021
 * * Bug Fixes!
 * ** Changing an actor's equipment slots to past their original amount will no
 *    longer yield errors with duplicate slot types. Fix made by Arisu.
 * ** Completely selling an item should now refresh the help window to the new
 *    selected item's help description. Fix made by Arisu.
 * * Optimization Update!
 * ** Non-removable equipment restrictions for the equipment scene are now
 *    better optimized. Update made by Olivia.
 * 
 * Version 1.23: April 2, 2021
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.22: March 26, 2021
 * * Documentation Update!
 * ** Added "VisuStella MZ Compatibility" section for detailed compatibility
 *    explanations with the VisuMZ_4_BreakShields plugin.
 * 
 * Version 1.21: March 5, 2021
 * * Feature Update!
 * ** Custom equipment slots are disabled during Battle Testing for better
 *    accuracy and results.
 * 
 * Version 1.20: February 26, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameters added by Irina and sponsored by AndyL:
 * *** Plugin Parameters > Shop Menu Settings > Switches > Switch: Buy
 * *** Plugin Parameters > Shop Menu Settings > Switches > Switch: Sell
 * **** Buying/selling items in the Shop Scene turns this Switch to ON.
 * **** Switch reverts to OFF whenever the Shop Scene opens.
 * **** These switches can be used after a "Shop Processing" event command to
 *      determine if the player has bought an item, bought and sold an item,
 *      sold an item, or neither.
 * 
 * Version 1.19: January 29, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New notetags added by Irina.
 * *** <Equip Copy Limit: x>
 * **** Sets a maximum number of copies that the actor can wear of this
 *      equipment. Usage Example: Actors can only equip one copy of the
 *      "One-of-a-Kind Ring" on at any time despite having empty accessory
 *      slots because the ring has a <Equip Copy Limit: 1> notetag.
 * *** <Equip Weapon Type Limit: x>
 * **** This weapon cannot be equipped with other weapons of the same type once
 *      the limited amount has been reached. Usage Example: A dualwielding
 *      warrior who can only equip one sword and a dagger but never two swords
 *      or two daggers because the swords and daggers all have the
 *      <Equip Weapon Type Limit: 1> notetags on them.
 * *** <Equip Armor Type Limit: x>
 * **** This armor cannot be equipped with other armors of the same type once
 *      the limited amount has been reached. Usage Example: People cannot equip
 *      more than two glove accessories on at a time because the glove is a
 *      "Glove" armor-type and each glove item has the
 *      <Equip Armor Type Limit: 2> notetags on them.
 * 
 * Version 1.18: January 15, 2021
 * * Bug Fixes!
 * ** Pressing "Shift" to remove equipment will now refresh the status window
 *    unlike before. Fix made by Olivia.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Feature!
 * ** New Plugin Parameters added
 * *** Plugin Parameters > Item Menu Settings > Background Type
 * 
 * Version 1.17: January 1, 2021
 * * Bug Fixes!
 * ** Equipping should be working properly again. Fix made by Yanfly.
 * 
 * Version 1.16: December 25, 2020
 * * Bug Fixes!
 * ** Equip-Adjust HP/MP should work properly now. Fix made by Yanfly.
 * * Documentation Update!
 * ** Added more clarity for <JS Item Enable> to state that if the VisuStella
 *    Battle Core is installed, then all battle scope items are visible, but
 *    not necessarily enabled if they are disabled otherwise.
 * 
 * Version 1.15: December 18, 2020
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: Unusable items on an individual-actor basis will no
 *    longer be overwritten by party-based usability for battle. Fix by Yanfly.
 * * Documentation Update!
 * ** Added more clarity for <JS Item Enable> to state that it removes the
 *    usable item from visibility as well if the actor unable to use it is the
 *    only person in the party.
 * 
 * Version 1.14: December 11, 2020
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.13: December 4, 2020
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * New Features!
 * ** New Plugin Commands added by Arisu!
 * *** Actor: Change Equip Slots
 * *** Actor: Reset Equip Slots
 * **** These plugin commands allow you to forcefully change the equip slots
 *      available to an actor regardless of the slots provided by its class as
 *      well as reset them.
 * 
 * Version 1.12: November 15, 2020
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.11: November 8, 2020
 * * Bug Fix!
 * ** Font size ratio for the shop status window now scales to a hard coded
 *    value to prevent smaller font sizes from expanding icon sizes. Fix made
 *    by Arisu.
 * * Feature Update!
 * ** Currency display in the shop menu is now reflected upon how the plugin
 *    parameters set them to display. Update made by Arisu.
 * 
 * Version 1.10: November 1, 2020
 * * Feature Update!
 * ** Modern Controls compatibility with Core Engine no longer enables the
 *    Item Categories window and child classes to utilize the Home/End keys.
 * 
 * Version 1.09: October 25, 2020
 * * Bug Fixes!
 * ** "All Items" category should now display the "Items" text. Fix by Irina.
 * ** WType, AType, and EType categories now work with text. Fix by Irina.
 *
 * Version 1.08: October 18, 2020
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * 
 * Version 1.07: October 11, 2020
 * * Bug Fixes!
 * ** XParams and SParams in the Window_EquipStatus window will no longer show
 *    a non-percentile difference if the original value is not a whole value.
 *    Fix made by Yanfly.
 * 
 * Version 1.06: October 4, 2020
 * * Bug Fixes!
 * ** Select Item event command now displays the default amount of columns
 *    instead of whatever setting is made with the plugin parameters.
 * 
 * Version 1.05: September 27, 2020
 * * Bug Fixes!
 * ** When using the updated shop layout, leaving the sell option will no
 *    longer cause the dummy window to appear.
 * * Documentation Update
 * ** "Use Updated Layout" plugin parameters now have the added clause:
 *    "This will override the Core Engine windows settings." to reduce
 *    confusion. Added by Irina.
 * 
 * Version 1.04: September 13, 2020
 * * Bug Fixes!
 * ** Pressing Shift to quickly remove equipment should no longer crash the
 *    game. This will also clear the help window text. Fix made by Arisu.
 * 
 * Version 1.03: September 6, 2020
 * * Bug Fixes!
 * ** If both Optimize and Clear commands have been removed and using modern
 *    controls, pressing up at the top of the slot window list will not go to
 *    the window. Fix made by Yanfly.
 * ** If both Optimize and Clear commands have been removed, the window will no
 *    longer appear and the slot window will be moved upward to fill any empty
 *    spaces. Fix made by Yanfly.
 * * New Features!
 * ** New Plugin Parameter added in NEW! Label to let you adjust the font face.
 * ** New Plugin Parameters added in Equip Menu Scene Settings for disabling
 *    the back rectangles and/or changing their colors.
 * ** New Plugin Parameters added in Shop Status Window Settings for disabling
 *    the back rectangles and/or changing their colors.
 * 
 * Version 1.02: August 30, 2020
 * * Documentation Fix!
 * ** Added: NOTE: Regarding Damage Labels
 * *** If Visu_1_BattleCore is installed, priority goes to its Damage Style
 *   settings. The label displayed is based on the damage style settings in
 *   place for that specific skill or item.
 * *** Go to Battle Core > Plugin Parameters > Damage Settings > Style List >
 *   pick the damage style you want to edit > Damage Label and change the
 *   text settings you'd like there.
 * *** Documentation update added by Yanfly.
 * 
 * Version 1.01: August 23, 2020
 * * Added failsafe to prevent non-existent equipment (because the database
 *   entries have been deleted) from being equipped as initial equipment.
 *   Fix made by Olivia.
 *
 * Version 1.00: August 20, 2020
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActorChangeEquipSlots
 * @text Actor: Change Equip Slots
 * @desc Forcefully change the actor(s) equip slots.
 * These will persist through class changes.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 * 
 * @arg Slots:arraystr
 * @text Equip Slots
 * @type string[]
 * @desc Insert the equip slots you want the actor(s) to have.
 * These entries are case-sensitive.
 * @default ["Weapon","Shield","Head","Body","Accessory"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActorResetEquipSlots
 * @text Actor: Reset Equip Slots
 * @desc Reset any forced equip slots for the actor(s).
 * Equip slots will then be based on class.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command BatchShop
 * @text Shop: Advanced
 * @desc Make it easier to put together inventories for a shop.
 * WARNING: Does not allow for event-specific prices.
 *
 * @arg Step1
 * @text Step 1: Item ID's
 *
 * @arg Step1Start:num
 * @text Range Start
 * @parent Step1
 * @type item
 * @desc Select which Item ID to start from.
 * @default 1
 *
 * @arg Step1End:num
 * @text Range End
 * @parent Step1
 * @type item
 * @desc Select which Item ID to end at.
 * @default 4
 *
 * @arg Step2
 * @text Step 2: Weapon ID's
 *
 * @arg Step2Start:num
 * @text Range Start
 * @parent Step2
 * @type weapon
 * @desc Select which Weapon ID to start from.
 * @default 1
 *
 * @arg Step2End:num
 * @text Range End
 * @parent Step2
 * @type weapon
 * @desc Select which Weapon ID to end at.
 * @default 4
 *
 * @arg Step3
 * @text Step 3: Armor ID's
 *
 * @arg Step3Start:num
 * @text Range Start
 * @parent Step3
 * @type armor
 * @desc Select which Armor ID to start from.
 * @default 1
 *
 * @arg Step3End:num
 * @text Range End
 * @parent Step3
 * @type armor
 * @desc Select which Armor ID to end at.
 * @default 4
 *
 * @arg PurchaseOnly:eval
 * @text Step 4: Purchase Only?
 * @type boolean
 * @on Purchase-Only
 * @off Sell Accessible
 * @desc Make the shop purchase-only?
 * @default false
 * 
 * @arg Optional
 * 
 * @arg Blacklist:arraystr
 * @text Blacklisted Categories
 * @parent Optional
 * @type string[]
 * @desc A list of categories to blacklist from the shop.
 * Not used if empty. Mark categories with <Category: x>
 * @default []
 * 
 * @arg Whitelist:arraystr
 * @text Whitelisted Categories
 * @parent Optional
 * @type string[]
 * @desc A list of categories to whitelist for the shop.
 * Not used if empty. Mark categories with <Category: x>
 * @default []
 *
 * @ --------------------------------------------------------------------------
 *
 * @ ==========================================================================
 * @ Plugin Parameters
 * @ ==========================================================================
 *
 * @param BreakHead
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param ItemsEquipsCore
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param ItemScene:struct
 * @text Item Menu Settings
 * @type struct<ItemScene>
 * @desc Change the Item Menu Scene settings.
 * @default {"General":"","EnableLayout:eval":"true","LayoutStyle:str":"upper/left","ListWindow":"","ListWindowCols:num":"1","ItemQt":"","MaxItems:num":"99","MaxWeapons:num":"99","MaxArmors:num":"99","ItemQuantityFmt:str":"×%1","ItemQuantityFontSize:num":"22","ShopStatusWindow":"","ShowShopStatus:eval":"true","ItemSceneAdjustItemList:eval":"true","ItemMenuStatusRect:func":"\"const width = this.statusWidth();\\nconst height = this._itemWindow.height;\\nconst x = Graphics.boxWidth - width;\\nconst y = this._itemWindow.y;\\nreturn new Rectangle(x, y, width, height);\"","ButtonAssist":"","buttonAssistCategory:str":"Switch Category"}
 *
 * @param Categories:struct
 * @text Item Categories
 * @parent ItemScene:struct
 * @type struct<Categories>
 * @desc Change the categories displayed in the Item/Shop menus.
 * @default {"MainList":"","List:arraystruct":"[\"{\\\"Type:str\\\":\\\"FieldUsable\\\",\\\"Icon:num\\\":\\\"208\\\"}\",\"{\\\"Type:str\\\":\\\"BattleUsable\\\",\\\"Icon:num\\\":\\\"218\\\"}\",\"{\\\"Type:str\\\":\\\"NeverUsable\\\",\\\"Icon:num\\\":\\\"302\\\"}\",\"{\\\"Type:str\\\":\\\"AllWeapons\\\",\\\"Icon:num\\\":\\\"97\\\"}\",\"{\\\"Type:str\\\":\\\"EType:2\\\",\\\"Icon:num\\\":\\\"128\\\"}\",\"{\\\"Type:str\\\":\\\"EType:3\\\",\\\"Icon:num\\\":\\\"131\\\"}\",\"{\\\"Type:str\\\":\\\"EType:4\\\",\\\"Icon:num\\\":\\\"137\\\"}\",\"{\\\"Type:str\\\":\\\"EType:5\\\",\\\"Icon:num\\\":\\\"145\\\"}\",\"{\\\"Type:str\\\":\\\"KeyItems\\\",\\\"Icon:num\\\":\\\"195\\\"}\"]","Style:str":"icon","TextAlign:str":"center","Vocabulary":"","HiddenItemA:str":"Special Items","HiddenItemB:str":"Unique Items","Consumable:str":"Consumable","Nonconsumable:str":"Nonconsumable","AlwaysUsable:str":"Usable","BattleUsable:str":"Battle","FieldUsable:str":"Field","NeverUsable:str":"Materials"}
 *
 * @param New:struct
 * @text NEW! Labels
 * @parent ItemScene:struct
 * @type struct<NewLabel>
 * @desc Change how NEW! Labels apply to your game project.
 * @default {"Enable:eval":"true","Icon:num":"0","Text:str":"NEW!","FontColor:str":"17","FontFace:str":"Verdana","FontSize:str":"16","FadeLimit:num":"360","FadeSpeed:num":"4","OffsetX:num":"0","OffsetY:num":"4"}
 *
 * @param EquipScene:struct
 * @text Equip Menu Settings
 * @type struct<EquipScene>
 * @desc Adjust the settings regarding the Equip Menu Scene.
 * @default {"General":"","EnableLayout:eval":"true","ParamValueFontSize:num":"22","MenuPortraits:eval":"true","DrawPortraitJS:func":"\"// Declare Variables\\nconst lineHeight = this.lineHeight();\\nconst padding = this.itemPadding();\\nconst x1 = padding;\\nconst x2 = this.innerWidth - 128 - padding;\\n\\n// Draw Menu Image\\nthis.drawItemActorMenuImage(this._actor, 0, 0, this.innerWidth, this.innerHeight);\\n\\n// Draw Data\\nthis.drawActorName(this._actor, x1, lineHeight * 0);\\nthis.drawActorClass(this._actor, x1, lineHeight * 1);\\nthis.drawActorIcons(this._actor, x1, lineHeight * 2);\\nthis.drawActorLevel(this._actor, x2, lineHeight * 0);\\nthis.placeBasicGauges(this._actor, x2, lineHeight * 1);\"","DrawFaceJS:func":"\"// Declare Variables\\nconst lineHeight = this.lineHeight();\\nconst gaugeLineHeight = this.gaugeLineHeight();\\nconst x = Math.floor(this.innerWidth / 2);\\nconst limitHeight = this.innerHeight - (this.actorParams().length * lineHeight);\\nconst actorX = Math.floor((x - ImageManager.faceWidth) / 2);\\nconst actorY = Math.floor((limitHeight - ImageManager.faceHeight) / 2);\\nlet dataHeight = lineHeight * 3;\\ndataHeight += gaugeLineHeight * ($dataSystem.optDisplayTp ? 3 : 2);\\nconst dataY = Math.floor((limitHeight - dataHeight) / 2);\\n\\n// Draw Data\\nthis.drawActorFace(this._actor, actorX, actorY, ImageManager.faceWidth, ImageManager.faceHeight);\\nthis.drawActorIcons(this._actor, actorX + 16, actorY + ImageManager.faceHeight - lineHeight);\\nthis.drawActorName(this._actor, x, dataY + lineHeight * 0);\\nthis.drawActorLevel(this._actor, x, dataY + lineHeight * 1);\\nthis.drawActorClass(this._actor, x, dataY + lineHeight * 2);\\nthis.placeBasicGauges(this._actor, x, dataY + lineHeight * 3);\"","DrawParamJS:func":"\"// Declare variables\\nconst params = this.actorParams();\\nconst lineHeight = this.lineHeight();\\nconst padding = this.itemPadding();\\nconst baseX = 0;\\nconst baseY = this.innerHeight - params.length * lineHeight;\\nconst baseWidth = this.innerWidth;\\nconst valueFontSize = this.paramValueFontSize();\\n\\n// Calculate Widths\\nlet paramNameWidth = Math.max(...params.map(param => this.textWidth(TextManager.param(param))));\\nparamNameWidth += padding * 2;\\nif (this.isUseParamNamesWithIcons()) {\\n    paramNameWidth += ImageManager.iconWidth + 4;\\n}\\nlet arrowWidth = this.rightArrowWidth();\\nconst totalDivides = this.innerWidth >= 500 ? 3 : 2;\\nlet paramValueWidth = Math.floor((baseWidth - paramNameWidth - arrowWidth) / totalDivides);\\nparamNameWidth = baseWidth - (paramValueWidth * totalDivides) - arrowWidth;\\n\\n// Draw Parameters\\nlet x = baseX;\\nlet y = baseY;\\nlet value = 0;\\nlet diffValue = 0;\\nlet alter = 2;\\nfor (const paramId of params) {\\n    // Draw Param Name\\n    this.drawItemDarkRect(x, y, paramNameWidth, lineHeight, alter);\\n    this.drawUpdatedParamName(paramId, x, y, paramNameWidth);\\n    this.resetFontSettings();\\n    x += paramNameWidth;\\n\\n    // Draw Param Before\\n    this.contents.fontSize = valueFontSize;\\n    this.drawItemDarkRect(x, y, paramValueWidth, lineHeight, alter);\\n    this.drawUpdatedBeforeParamValue(paramId, x, y, paramValueWidth);\\n    this.resetFontSettings();\\n    x += paramValueWidth;\\n\\n    // Draw Arrow\\n    this.drawItemDarkRect(x, y, arrowWidth, lineHeight, alter);\\n    this.drawRightArrow(x, y);\\n    x += arrowWidth;\\n\\n    // Draw Param After\\n    this.contents.fontSize = valueFontSize;\\n    this.drawItemDarkRect(x, y, paramValueWidth, lineHeight, alter);\\n    this.drawUpdatedAfterParamValue(paramId, x, y, paramValueWidth);\\n    x += paramValueWidth;\\n\\n    // Draw Param Change\\n    if (totalDivides > 2) {\\n        this.drawItemDarkRect(x, y, paramValueWidth, lineHeight, alter);\\n        this.drawUpdatedParamValueDiff(paramId, x, y, paramValueWidth);\\n    }\\n\\n    // Prepare Next Parameter\\n    x = baseX;\\n    y += lineHeight;\\n    alter = alter === 2 ? 1 : 2;\\n}\"","LayoutStyle:str":"upper/right","StatusWindowWidth:num":"312","DrawBackRect:eval":"true","BackRectColor:str":"19","Command":"","CmdStyle:str":"auto","CmdTextAlign:str":"center","CmdIconEquip:num":"136","CommandAddOptimize:eval":"false","CmdIconOptimize:num":"137","CommandAddClear:eval":"false","CmdIconClear:num":"135","RemoveEquip":"","RemoveEquipIcon:num":"16","RemoveEquipText:str":"Remove","ShiftShortcutKey:eval":"true","Rulings":"","EquipAdjustHpMp:eval":"true","NonRemoveETypes:arraynum":"[]","NonOptimizeETypes:arraynum":"[]","ButtonAssist":"","buttonAssistRemove:str":"Unequip"}
 *
 * @param ShopScene:struct
 * @text Shop Menu Settings
 * @type struct<ShopScene>
 * @desc Change the Shop Menu Scene settings.
 * @default {"General":"","EnableLayout:eval":"true","LayoutStyle:str":"upper/left","Command":"","CmdHideDisabled:eval":"true","CmdStyle:str":"auto","CmdTextAlign:str":"center","CmdIconBuy:num":"208","CmdIconSell:num":"314","CmdIconCancel:num":"82","CmdCancelRename:str":"Exit","Prices":"","SellPriceRate:num":"0.50","BuyPriceJS:func":"\"// Declare variables\\nlet item = arguments[0];\\nlet price = arguments[1];\\n\\n// Return the finalized price\\nreturn price;\"","SellPriceJS:func":"\"// Declare variables\\nlet item = arguments[0];\\nlet price = arguments[1];\\n\\n// Return the finalized price\\nreturn price;\"","ButtonAssist":"","buttonAssistSmallIncrement:str":"-1/+1","buttonAssistLargeIncrement:str":"-10/+10"}
 *
 * @param StatusWindow:struct
 * @text Shop Status Window
 * @parent ShopScene:struct
 * @type struct<StatusWindow>
 * @desc Change the Item Status Window settings.
 * @default {"General":"","Width:num":"352","ParamChangeFontSize:num":"22","Translucent:num":"64","DrawBackRect:eval":"true","BackRectColor:str":"19","EquipData":"","AlreadyEquipMarker:str":"E","CannotEquipMarker:str":"-","NoChangeMarker:str":"-","DrawEquipData:func":"\"// Set Variables\\nconst lineHeight = this.lineHeight();\\nconst paramheight = this.gaugeLineHeight() + 8;\\nlet x = 0;\\nlet y = 0;\\nlet width = this.innerWidth;\\nlet height = this.innerHeight;\\nlet hw = Math.floor(width / 2);\\nlet hx = x + width - hw;\\n\\n// Draw Item Name, Type, and Quantity\\nthis.drawItemName(this._item, x + this.itemPadding(), y, width - this.itemPadding() * 2);\\nthis.drawItemDarkRect(x, y, width);\\ny += lineHeight;\\nif (this.drawItemEquipType(x, y, hw)) y += 0;\\nif (this.drawItemQuantity(hx, y, hw)) y += lineHeight;\\n\\n// Draw Parameter Names\\nconst params = this.actorParams();\\nconst backY = y;\\ny = height - (params.length * paramheight) - 4;\\nlet paramX = x;\\nlet paramWidth = 0;\\nlet tableY = y;\\nfor (const paramId of params) {\\n    paramWidth = Math.max(this.drawParamName(paramId, x + 4, y + 4, width), paramWidth);\\n    y += paramheight;\\n}\\n\\n// Draw Actor Data\\nconst actorMax = $gameParty.maxBattleMembers();\\nconst actorWidth = Math.floor((width - paramWidth) / actorMax);\\nparamWidth = width - (actorWidth * actorMax);\\nfor (const actor of $gameParty.battleMembers()) {\\n    const index = $gameParty.battleMembers().indexOf(actor);\\n    const actorX = paramX + paramWidth + (index * actorWidth);\\n    this.changePaintOpacity(actor.canEquip(this._item));\\n    this.drawActorCharacter(actor, actorX + (actorWidth / 2), tableY);\\n    let actorY = tableY;\\n\\n    // Draw Parameter Changes\\n    for (const paramId of params) {\\n        const diffY = actorY - ((lineHeight - paramheight) / 2);\\n        this.drawActorParamDifference(actor, paramId, actorX, diffY, actorWidth);\\n        actorY += paramheight;\\n    }\\n}\\n\\n// Draw Back Rectangles\\nthis.drawItemDarkRect(paramX, backY, paramWidth, tableY - backY);\\nfor (let i = 0; i < actorMax; i++) {\\n    const actorX = paramX + paramWidth + (i * actorWidth);\\n    this.drawItemDarkRect(actorX, backY, actorWidth, tableY - backY);\\n}\\nfor (const paramId of params) {\\n    this.drawItemDarkRect(paramX, tableY, paramWidth, paramheight);\\n    for (let i = 0; i < actorMax; i++) {\\n        const actorX = paramX + paramWidth + (i * actorWidth);\\n        this.drawItemDarkRect(actorX, tableY, actorWidth, paramheight);\\n    }\\n    tableY += paramheight;\\n}\"","ItemData":"","ItemGeneral":"","MaxIcons:num":"8","MultiplierStandard:num":"1000000","DrawItemData:func":"\"const lineHeight = this.lineHeight();\\nlet x = 0;\\nlet y = 0;\\nlet width = this.innerWidth;\\nlet height = this.innerHeight;\\nlet hw = Math.floor(width / 2);\\nlet hx = x + width - hw;\\n\\n// Draw Item Name and Quantity\\nthis.drawItemName(this._item, x + this.itemPadding(), y, width - this.itemPadding() * 2);\\nthis.drawItemDarkRect(x, y, width);\\ny += lineHeight;\\n\\n// Draw Main Item Properties\\nif (this.drawItemConsumable(x, y, hw)) y += 0;\\nif (this.drawItemQuantity(hx, y, hw)) y += lineHeight;\\nif (this._item.occasion < 3) {\\n    y = this.drawItemDamage(x, y, width);\\n    y = this.drawItemEffects(x, y, width);\\n}\\ny = this.drawItemCustomEntries(x, y, width);\\n\\n// Draw Remaining Item Properties\\nif (this._item.occasion < 3) {\\n    if (this.drawItemOccasion(x, y, hw)) y += 0;\\n    if (this.drawItemScope(hx, y, hw)) y += lineHeight;\\n    if (this.drawItemHitType(x, y, hw)) y += 0;\\n    if (this.drawItemSuccessRate(hx, y, hw)) y += lineHeight;\\n    if (this.drawItemSpeed(x, y, hw)) y += 0;\\n    if (this.drawItemRepeats(hx, y, hw)) y += lineHeight;\\n}\\n\\n// Fill Rest of the Window\\nthis.drawItemDarkRect(x, y, width, height - y);\"","Vocabulary":"","LabelConsume:str":"Consumable","Consumable:str":"✔","NotConsumable:str":"✘","Occasions":"","Occasion0:str":"Anytime Use","Occasion1:str":"Battle-Only","Occasion2:str":"Field-Only","Occasion3:str":"-","Scope":"","Scope0:str":"No Target","Scope1:str":"1 Foe","Scope2:str":"All Foes","Scope3:str":"Random Foe","Scope4:str":"2 Random Foes","Scope5:str":"3 Random Foes","Scope6:str":"4 Random Foes","Scope7:str":"1 Ally","Scope8:str":"Alive Allies","Scope9:str":"Dead Ally","Scope10:str":"Dead Allies","Scope11:str":"User","Scope12:str":"Any Ally","Scope13:str":"All Allies","Scope14:str":"Everybody","BattleCore":"","ScopeRandomAny:str":"%1 Random Units","ScopeRandomEnemies:str":"%1 Random Foes","ScopeRandomAllies:str":"%1 Random Allies","ScopeAlliesButUser:str":"Other Allies","LabelSpeed:str":"Speed","Speed2000:str":"Fastest","Speed1000:str":"Faster","Speed1:str":"Fast","Speed0:str":"Normal","SpeedNeg999:str":"Slow","SpeedNeg1999:str":"Slower","SpeedNeg2000:str":"Slowest","LabelSuccessRate:str":"Accuracy","LabelRepeats:str":"Hits","LabelHitType:str":"Type","HitType0:str":"Neutral","HitType1:str":"Physical","HitType2:str":"Magical","LabelElement:str":"Element","ElementWeapon:str":"\\I[97]Weapon","ElementNone:str":"\\I[160]No Element","DamageType":"","DamageType1:str":"%1 Damage Multiplier","DamageType2:str":"%1 Damage Multiplier","DamageType3:str":"%1 Recovery Multiplier","DamageType4:str":"%1 Recovery Multiplier","DamageType5:str":"%1 Drain Multiplier","DamageType6:str":"%1 Drain Multiplier","Effects":"","LabelRecoverHP:str":"%1 Recovery","LabelRecoverMP:str":"%1 Recovery","LabelRecoverTP:str":"%1 Recovery","LabelSelfGainTP:str":"User %1","LabelDamageHP:str":"%1 Damage","LabelDamageMP:str":"%1 Damage","LabelDamageTP:str":"%1 Damage","LabelApply:str":"Applies","LabelRemove:str":"Removes"}
 *
 * @param BreakEnd1
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param End Of
 * @default Plugin Parameters
 *
 * @param BreakEnd2
 * @text --------------------------
 * @default ----------------------------------
 *
 */
/* ----------------------------------------------------------------------------
 * Item Menu Scene Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ItemScene:
 *
 * @param General
 *
 * @param EnableLayout:eval
 * @text Use Updated Layout
 * @parent General
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use the Updated Item Menu Layout provided by this plugin?
 * This will override the Core Engine windows settings.
 * @default true
 *
 * @param LayoutStyle:str
 * @text Layout Style
 * @parent General
 * @type select
 * @option Upper Help, Left Input
 * @value upper/left
 * @option Upper Help, Right Input
 * @value upper/right
 * @option Lower Help, Left Input
 * @value lower/left
 * @option Lower Help, Right Input
 * @value lower/right
 * @desc If using an updated layout, how do you want to style
 * the menu scene layout?
 * @default upper/left
 *
 * @param ListWindow
 * @text List Window
 *
 * @param ListWindowCols:num
 * @text Columns
 * @parent ListWindow
 * @type number
 * @min 1
 * @desc Number of maximum columns.
 * @default 1
 *
 * @param ItemQt
 * @text Item Quantity
 *
 * @param MaxItems:num
 * @text Item Max
 * @parent ItemQt
 * @desc The default maximum quantity for items.
 * @default 99
 *
 * @param MaxWeapons:num
 * @text Weapon Max
 * @parent ItemQt
 * @desc The default maximum quantity for weapons.
 * @default 99
 *
 * @param MaxArmors:num
 * @text Armor Max
 * @parent ItemQt
 * @desc The default maximum quantity for armors.
 * @default 99
 *
 * @param ItemQuantityFmt:str
 * @text Quantity Format
 * @parent ItemQt
 * @desc How to display an item's quantity.
 * %1 - Item Quantity
 * @default ×%1
 *
 * @param ItemQuantityFontSize:num
 * @text Font Size
 * @parent ItemQt
 * @desc Default font size for item quantity.
 * @default 22
 *
 * @param ShopStatusWindow
 * @text Shop Status Window
 *
 * @param ShowShopStatus:eval
 * @text Show in Item Menu?
 * @parent ShopStatusWindow
 * @type boolean
 * @on Show
 * @off Don't Show
 * @desc Show the Shop Status Window in the Item Menu?
 * This is enabled if the Updated Layout is on.
 * @default true
 *
 * @param ItemSceneAdjustItemList:eval
 * @text Adjust List Window?
 * @parent ShopStatusWindow
 * @type boolean
 * @on Adjust
 * @off Don't
 * @desc Automatically adjust the Item List Window in the Item Menu if using the Shop Status Window?
 * @default true
 *
 * @param ItemMenuStatusBgType:num
 * @text Background Type
 * @parent ShopStatusWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ItemMenuStatusRect:func
 * @text JS: X, Y, W, H
 * @parent ShopStatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this Status Window in the Item Menu.
 * @default "const width = this.statusWidth();\nconst height = this._itemWindow.height;\nconst x = Graphics.boxWidth - width;\nconst y = this._itemWindow.y;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ButtonAssist
 * @text Button Assist Window
 *
 * @param buttonAssistCategory:str
 * @text Switch Category
 * @parent ButtonAssist
 * @desc Button assist text used for switching categories.
 * For VisuStella MZ's Core Engine's Button Assist Window.
 * @default Switch Category
 *
 */
/* ----------------------------------------------------------------------------
 * Item Categories
 * ----------------------------------------------------------------------------
 */
/*~struct~Categories:
 *
 * @param MainList
 * @text List
 * 
 * @param List:arraystruct
 * @text Category List
 * @parent MainList
 * @type struct<Category>[]
 * @desc A list of the item categories displayed in the Item/Shop menus.
 * @default ["{\"Type:str\":\"RegularItems\",\"Icon:num\":\"208\"}","{\"Type:str\":\"AllWeapons\",\"Icon:num\":\"97\"}","{\"Type:str\":\"AllArmors\",\"Icon:num\":\"137\"}","{\"Type:str\":\"KeyItems\",\"Icon:num\":\"195\"}"]
 *
 * @param Style:str
 * @text Category Style
 * @parent MainList
 * @type select
 * @option Text Only
 * @value text
 * @option Icon Only
 * @value icon
 * @option Icon + Text
 * @value iconText
 * @option Automatic
 * @value auto
 * @desc How do you wish to draw categorie entries in the Category Window?
 * @default icon
 *
 * @param TextAlign:str
 * @text Text Alignment
 * @parent MainList
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc Decide how you want the text to be aligned.
 * @default center
 *
 * @param Vocabulary
 *
 * @param HiddenItemA:str
 * @text Hidden Item A
 * @parent Vocabulary
 * @desc How this category is named in the Item Menu.
 * @default Special Items
 *
 * @param HiddenItemB:str
 * @text Hidden Item B
 * @parent Vocabulary
 * @desc How this category is named in the Item Menu.
 * @default Unique Items
 *
 * @param Consumable:str
 * @text Consumable
 * @parent Vocabulary
 * @desc How this category is named in the Item Menu.
 * @default Consumable
 *
 * @param Nonconsumable:str
 * @text Nonconsumable
 * @parent Vocabulary
 * @desc How this category is named in the Item Menu.
 * @default Nonconsumable
 *
 * @param AlwaysUsable:str
 * @text Always Usable
 * @parent Vocabulary
 * @desc How this category is named in the Item Menu.
 * @default Usable
 *
 * @param BattleUsable:str
 * @text Battle Usable
 * @parent Vocabulary
 * @desc How this category is named in the Item Menu.
 * @default Battle
 *
 * @param FieldUsable:str
 * @text Field Usable
 * @parent Vocabulary
 * @desc How this category is named in the Item Menu.
 * @default Field
 *
 * @param NeverUsable:str
 * @text Never Usable
 * @parent Vocabulary
 * @desc How this category is named in the Item Menu.
 * @default Materials
 *
 */
/* ----------------------------------------------------------------------------
 * Category Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Category:
 *
 * @param Type:str
 * @text Type
 * @type combo
 * @option AllItems
 * @option 
 * @option RegularItems
 * @option KeyItems
 * @option HiddenItemA
 * @option HiddenItemB
 * @option 
 * @option Consumable
 * @option Nonconsumable
 * @option 
 * @option AlwaysUsable
 * @option BattleUsable
 * @option FieldUsable
 * @option NeverUsable
 * @option 
 * @option AllWeapons
 * @option WType:x
 * @option 
 * @option AllArmors
 * @option AType:x
 * @option 
 * @option EType:x
 * @option 
 * @option Category:x
 * @option
 * @desc A list of the item categories displayed in the Item/Shop
 * menus. Replace x with ID numbers or text.
 * @default RegularItems
 *
 * @param Icon:num
 * @text Icon
 * @desc Icon used for this category.
 * Use 0 for no icon.
 * @default 0
 *
 * @param SwitchID:num
 * @text Visibility Switch
 * @type switch
 * @desc This Switch must be turned ON in order for the category to show.
 * Use 0 for no Switch requirement.
 * @default 0
 *
 */
/* ----------------------------------------------------------------------------
 * New Label Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~NewLabel:
 *
 * @param Enable:eval
 * @text Use NEW! Labels?
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use the NEW! Labels or not?
 * @default true
 *
 * @param Icon:num
 * @text Icon
 * @desc The icon index used to represent the NEW! text.
 * Use 0 to not draw any icons.
 * @default 0
 *
 * @param Text:str
 * @text Text
 * @desc The text written on the NEW! Label.
 * @default NEW!
 *
 * @param FontColor:str
 * @text Font Color
 * @parent Text:str
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 17
 *
 * @param FontFace:str
 * @text Font Face
 * @parent Text:str
 * @desc Font face used for the NEW! Label.
 * @default Verdana
 *
 * @param FontSize:str
 * @text Font Size
 * @parent Text:str
 * @desc The font size used for the NEW! text.
 * @default 16
 *
 * @param FadeLimit:num
 * @text Fade Limit
 * @desc What's the upper opaque limit before reversing?
 * @default 360
 *
 * @param FadeSpeed:num
 * @text Fade Speed
 * @desc What's the fade speed of the NEW! Label?
 * @default 4
 *
 * @param OffsetX:num
 * @text Offset X
 * @desc How much to offset the NEW! Label's X position by.
 * @default 0
 *
 * @param OffsetY:num
 * @text Offset Y
 * @desc How much to offset the NEW! Label's Y position by.
 * @default 4
 *
 */
/* ----------------------------------------------------------------------------
 * Equip Menu Scene Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~EquipScene:
 *
 * @param General
 *
 * @param EnableLayout:eval
 * @text Use Updated Layout
 * @parent General
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use the Updated Equip Layout provided by this plugin?
 * This will override the Core Engine windows settings.
 * @default true
 *
 * @param LayoutStyle:str
 * @text Layout Style
 * @parent General
 * @type select
 * @option Upper Help, Left Input
 * @value upper/left
 * @option Upper Help, Right Input
 * @value upper/right
 * @option Lower Help, Left Input
 * @value lower/left
 * @option Lower Help, Right Input
 * @value lower/right
 * @desc If using an updated layout, how do you want to style
 * the menu scene layout?
 * @default upper/right
 *
 * @param ParamValueFontSize:num
 * @text Param Font Size
 * @parent EnableLayout:eval
 * @desc The font size used for parameter values.
 * @default 22
 *
 * @param MenuPortraits:eval
 * @text Show Menu Portraits?
 * @parent EnableLayout:eval
 * @type boolean
 * @on Use Portraits
 * @off Use Faces
 * @desc If Main Menu Core is installed, display the Menu Portraits
 * instead of the actor's face in the status window?
 * @default true
 *
 * @param DrawPortraitJS:func
 * @text JS: Portrait Upper
 * @parent EnableLayout:eval
 * @type note
 * @desc If Menu Portraits are available, this is code used to draw
 * the upper data like this in the Status Window.
 * @default "// Declare Variables\nconst lineHeight = this.lineHeight();\nconst padding = this.itemPadding();\nconst x1 = padding;\nconst x2 = this.innerWidth - 128 - padding;\n\n// Draw Menu Image\nthis.drawItemActorMenuImage(this._actor, 0, 0, this.innerWidth, this.innerHeight);\n\n// Draw Data\nthis.drawActorName(this._actor, x1, lineHeight * 0);\nthis.drawActorClass(this._actor, x1, lineHeight * 1);\nthis.drawActorIcons(this._actor, x1, lineHeight * 2);\nthis.drawActorLevel(this._actor, x2, lineHeight * 0);\nthis.placeBasicGauges(this._actor, x2, lineHeight * 1);"
 *
 * @param DrawFaceJS:func
 * @text JS: Face Upper
 * @parent EnableLayout:eval
 * @type note
 * @desc If faces used used, this is code used to draw the upper
 * data like this in the Status Window.
 * @default "// Declare Variables\nconst lineHeight = this.lineHeight();\nconst gaugeLineHeight = this.gaugeLineHeight();\nconst x = Math.floor(this.innerWidth / 2);\nconst limitHeight = this.innerHeight - (this.actorParams().length * lineHeight);\nconst actorX = Math.floor((x - ImageManager.faceWidth) / 2);\nconst actorY = Math.floor((limitHeight - ImageManager.faceHeight) / 2);\nlet dataHeight = lineHeight * 3;\ndataHeight += gaugeLineHeight * ($dataSystem.optDisplayTp ? 3 : 2);\nconst dataY = Math.floor((limitHeight - dataHeight) / 2);\n\n// Draw Data\nthis.drawActorFace(this._actor, actorX, actorY, ImageManager.faceWidth, ImageManager.faceHeight);\nthis.drawActorIcons(this._actor, actorX + 16, actorY + ImageManager.faceHeight - lineHeight);\nthis.drawActorName(this._actor, x, dataY + lineHeight * 0);\nthis.drawActorLevel(this._actor, x, dataY + lineHeight * 1);\nthis.drawActorClass(this._actor, x, dataY + lineHeight * 2);\nthis.placeBasicGauges(this._actor, x, dataY + lineHeight * 3);"
 *
 * @param DrawParamJS:func
 * @text JS: Parameter Lower
 * @parent EnableLayout:eval
 * @type note
 * @desc Code to determine how parameters are drawn in the
 * Status Window.
 * @default "// Declare variables\nconst params = this.actorParams();\nconst lineHeight = this.lineHeight();\nconst padding = this.itemPadding();\nconst baseX = 0;\nconst baseY = this.innerHeight - params.length * lineHeight;\nconst baseWidth = this.innerWidth;\nconst valueFontSize = this.paramValueFontSize();\n\n// Calculate Widths\nlet paramNameWidth = Math.max(...params.map(param => this.textWidth(TextManager.param(param))));\nparamNameWidth += padding * 2;\nif (this.isUseParamNamesWithIcons()) {\n    paramNameWidth += ImageManager.iconWidth + 4;\n}\nlet arrowWidth = this.rightArrowWidth();\nconst totalDivides = this.innerWidth >= 500 ? 3 : 2;\nlet paramValueWidth = Math.floor((baseWidth - paramNameWidth - arrowWidth) / totalDivides);\nparamNameWidth = baseWidth - (paramValueWidth * totalDivides) - arrowWidth;\n\n// Draw Parameters\nlet x = baseX;\nlet y = baseY;\nlet value = 0;\nlet diffValue = 0;\nlet alter = 2;\nfor (const paramId of params) {\n    // Draw Param Name\n    this.drawItemDarkRect(x, y, paramNameWidth, lineHeight, alter);\n    this.drawUpdatedParamName(paramId, x, y, paramNameWidth);\n    this.resetFontSettings();\n    x += paramNameWidth;\n\n    // Draw Param Before\n    this.contents.fontSize = valueFontSize;\n    this.drawItemDarkRect(x, y, paramValueWidth, lineHeight, alter);\n    this.drawUpdatedBeforeParamValue(paramId, x, y, paramValueWidth);\n    this.resetFontSettings();\n    x += paramValueWidth;\n\n    // Draw Arrow\n    this.drawItemDarkRect(x, y, arrowWidth, lineHeight, alter);\n    this.drawRightArrow(x, y);\n    x += arrowWidth;\n\n    // Draw Param After\n    this.contents.fontSize = valueFontSize;\n    this.drawItemDarkRect(x, y, paramValueWidth, lineHeight, alter);\n    this.drawUpdatedAfterParamValue(paramId, x, y, paramValueWidth);\n    x += paramValueWidth;\n\n    // Draw Param Change\n    if (totalDivides > 2) {\n        this.drawItemDarkRect(x, y, paramValueWidth, lineHeight, alter);\n        this.drawUpdatedParamValueDiff(paramId, x, y, paramValueWidth);\n    }\n\n    // Prepare Next Parameter\n    x = baseX;\n    y += lineHeight;\n    alter = alter === 2 ? 1 : 2;\n}"
 *
 * @param StatusWindowWidth:num
 * @text Status Window Width
 * @parent General
 * @desc The usual width of the status window if using the 
 * non-Updated Equip Menu Layout.
 * @default 312
 *
 * @param DrawBackRect:eval
 * @text Show Back Rectangles?
 * @parent General
 * @type boolean
 * @on Draw
 * @off Don't Draw
 * @desc Show back rectangles of darker colors to display information better?
 * @default true
 *
 * @param BackRectColor:str
 * @text Back Rectangle Color
 * @parent DrawBackRect:eval
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 19
 *
 * @param Command
 * @text Command Window
 *
 * @param CmdStyle:str
 * @text Style
 * @parent Command
 * @type select
 * @option Text Only
 * @value text
 * @option Icon Only
 * @value icon
 * @option Icon + Text
 * @value iconText
 * @option Automatic
 * @value auto
 * @desc How do you wish to draw commands in the Command Window?
 * @default auto
 *
 * @param CmdTextAlign:str
 * @text Text Align
 * @parent Command
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc Text alignment for the Command Window.
 * @default center
 *
 * @param CmdIconEquip:num
 * @text Equip Icon
 * @parent Command
 * @desc The icon used for the Equip command.
 * @default 136
 *
 * @param CommandAddOptimize:eval
 * @text Add Optimize Command?
 * @parent Command
 * @type boolean
 * @on Add
 * @off Don't
 * @desc Add the "Optimize" command to the Command Window?
 * @default true
 *
 * @param CmdIconOptimize:num
 * @text Optimize Icon
 * @parent CommandAddOptimize:eval
 * @desc The icon used for the Optimize command.
 * @default 137
 *
 * @param CommandAddClear:eval
 * @text Add Clear Command?
 * @parent Command
 * @type boolean
 * @on Add
 * @off Don't
 * @desc Add the "Clear" command to the Command Window?
 * @default true
 *
 * @param CmdIconClear:num
 * @text Clear Icon
 * @parent CommandAddClear:eval
 * @desc The icon used for the Clear command.
 * @default 135
 *
 * @param RemoveEquip
 * @text Remove Equip
 *
 * @param RemoveEquipIcon:num
 * @text Icon
 * @parent RemoveEquip
 * @desc Icon used for equipment removal.
 * @default 16
 *
 * @param RemoveEquipText:str
 * @text Text
 * @parent RemoveEquip
 * @desc Text used for equipment removal.
 * @default Remove
 *
 * @param ShiftShortcutKey:eval
 * @text Use SHIFT Shortcut?
 * @parent RemoveEquip
 * @type boolean
 * @on Use
 * @off Don't
 * @desc Add the "Shift" button as a shortcut key to removing items?
 * @default true

 * @param Rulings
 *
 * @param EquipAdjustHpMp:eval
 * @text Equip-Adjust HP/MP
 * @parent Rulings
 * @type boolean
 * @on Adjust
 * @off Don't
 * @desc Adjust HP/MP differences after changing equips with MaxHP/MaxMP values.
 * @default true
 * 
 * @param NonRemoveETypes:arraynum
 * @text Non-Removable Types
 * @parent Rulings
 * @type number[]
 * @min 1
 * @max 100
 * @desc Insert ID's of the Equipment Types that must always have
 * an item equipped and cannot be empty.
 * @default []
 *
 * @param NonOptimizeETypes:arraynum
 * @text Non-Optimized Types
 * @parent Rulings
 * @type number[]
 * @min 1
 * @max 100
 * @desc Insert ID's of the Equipment Types that will be ignored
 * when equipment is being optimized.
 * @default []
 *
 * @param ButtonAssist
 * @text Button Assist Window
 *
 * @param buttonAssistRemove:str
 * @text SHIFT: Remove
 * @parent ButtonAssist
 * @desc Button assist text used for the SHIFT Remove Shortcut.
 * For VisuStella MZ's Core Engine's Button Assist Window.
 * @default Unequip
 * 
 */
/* ----------------------------------------------------------------------------
 * Shop Menu Scene Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ShopScene:
 *
 * @param General
 *
 * @param EnableLayout:eval
 * @text Use Updated Layout
 * @parent General
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use the Updated Shop Layout provided by this plugin?
 * This will override the Core Engine windows settings.
 * @default true
 *
 * @param LayoutStyle:str
 * @text Layout Style
 * @parent General
 * @type select
 * @option Upper Help, Left Input
 * @value upper/left
 * @option Upper Help, Right Input
 * @value upper/right
 * @option Lower Help, Left Input
 * @value lower/left
 * @option Lower Help, Right Input
 * @value lower/right
 * @desc If using an updated layout, how do you want to style
 * the menu scene layout?
 * @default upper/left
 *
 * @param Switches
 *
 * @param SwitchBuy:num
 * @text Switch: Buy
 * @parent Switches
 * @type switch
 * @desc Buying items in the Shop Scene turns this Switch to ON.
 * Switch reverts to OFF whenever the Shop Scene opens.
 * @default 0
 *
 * @param SwitchSell:num
 * @text Switch: Sell
 * @parent Switches
 * @type switch
 * @desc Selling items in the Shop Scene turns this Switch to ON.
 * Switch reverts to OFF whenever the Shop Scene opens.
 * @default 0
 *
 * @param Command
 * @text Command Window
 *
 * @param CmdHideDisabled:eval
 * @text Hide Unavailable?
 * @parent Command
 * @type boolean
 * @on Hide
 * @off Default
 * @desc Hide all unavailable commands like when a shop is set to Purchase Only?
 * @default true
 *
 * @param CmdStyle:str
 * @text Style
 * @parent Command
 * @type select
 * @option Text Only
 * @value text
 * @option Icon Only
 * @value icon
 * @option Icon + Text
 * @value iconText
 * @option Automatic
 * @value auto
 * @desc How do you wish to draw commands in the Command Window?
 * @default auto
 *
 * @param CmdTextAlign:str
 * @text Text Align
 * @parent Command
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc Text alignment for the Command Window.
 * @default center
 *
 * @param CmdIconBuy:num
 * @text Buy Icon
 * @parent Command
 * @desc The icon used for the Buy command.
 * @default 208
 *
 * @param CmdIconSell:num
 * @text Sell Icon
 * @parent Command
 * @desc The icon used for the Sell command.
 * @default 314
 *
 * @param CmdIconCancel:num
 * @text Cancel Icon
 * @parent Command
 * @desc The icon used for the Cancel command.
 * @default 82
 *
 * @param CmdCancelRename:str
 * @text Rename "Cancel"
 * @parent Command
 * @desc Rename Cancel to something more logical for the Shop Menu Scene.
 * @default Exit
 *
 * @param Prices
 *
 * @param SellPriceRate:num
 * @text Sell Price Rate
 * @parent Prices
 * @desc The default sell price rate.
 * @default 0.50
 *
 * @param BuyPriceJS:func
 * @text JS: Buy Price
 * @parent Prices
 * @type note
 * @desc Modificatons made to the buy price before finalizing it.
 * @default "// Declare variables\nlet item = arguments[0];\nlet price = arguments[1];\n\n// Return the finalized price\nreturn price;"
 *
 * @param SellPriceJS:func
 * @text JS: Sell Price
 * @parent Prices
 * @type note
 * @desc Modificatons made to the sell price before finalizing it.
 * @default "// Declare variables\nlet item = arguments[0];\nlet price = arguments[1];\n\n// Return the finalized price\nreturn price;"
 * 
 * @param ButtonAssist
 * @text Button Assist Window
 *
 * @param buttonAssistSmallIncrement:str
 * @text Small Increment
 * @parent ButtonAssist
 * @desc Text used for changing amount bought/sold.
 * For VisuStella MZ's Core Engine's Button Assist Window.
 * @default -1/+1
 *
 * @param buttonAssistLargeIncrement:str
 * @text Large Increment
 * @parent ButtonAssist
 * @desc Text used for changing amount bought/sold.
 * For VisuStella MZ's Core Engine's Button Assist Window.
 * @default -10/+10
 *
 */
/* ----------------------------------------------------------------------------
 * Shop Status Window Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~StatusWindow:
 *
 * @param General
 *
 * @param Width:num
 * @text Window Width
 * @parent General
 * @desc The usual width of the status window.
 * @default 352
 *
 * @param ParamChangeFontSize:num
 * @text Parameter Font Size
 * @parent General
 * @desc Font size used for parameter changes.
 * @default 22
 *
 * @param Translucent:num
 * @text Translucent Opacity
 * @parent General
 * @desc Opacity setting used for translucent window objects.
 * @default 64
 *
 * @param DrawBackRect:eval
 * @text Show Back Rectangles?
 * @parent General
 * @type boolean
 * @on Draw
 * @off Don't Draw
 * @desc Show back rectangles of darker colors to display information better?
 * @default true
 *
 * @param BackRectColor:str
 * @text Back Rectangle Color
 * @parent DrawBackRect:eval
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 19
 *
 * @param EquipData
 * @text Equipment Data
 *
 * @param AlreadyEquipMarker:str
 * @text Already Equipped
 * @parent EquipData
 * @desc Marker used to show an actor cannot equip an item.
 * @default E
 *
 * @param CannotEquipMarker:str
 * @text Can't Equip
 * @parent EquipData
 * @desc Marker used to show an actor cannot equip an item.
 * @default -
 *
 * @param NoChangeMarker:str
 * @text No Changes
 * @parent EquipData
 * @desc Marker used to show no changes have occurred.
 * @default -
 *
 * @param DrawEquipData:func
 * @text JS: Draw Equip Data
 * @parent EquipData
 * @type note
 * @desc Code used to draw the equipment data for the Shop Status Window.
 * @default "// Set Variables\nconst lineHeight = this.lineHeight();\nconst paramheight = this.gaugeLineHeight() + 8;\nlet x = 0;\nlet y = 0;\nlet width = this.innerWidth;\nlet height = this.innerHeight;\nlet hw = Math.floor(width / 2);\nlet hx = x + width - hw;\n\n// Draw Item Name, Type, and Quantity\nthis.drawItemName(this._item, x + this.itemPadding(), y, width - this.itemPadding() * 2);\nthis.drawItemDarkRect(x, y, width);\ny += lineHeight;\nif (this.drawItemEquipType(x, y, hw)) y += 0;\nif (this.drawItemQuantity(hx, y, hw)) y += lineHeight;\n\n// Draw Parameter Names\nconst params = this.actorParams();\nconst backY = y;\ny = height - (params.length * paramheight) - 4;\nlet paramX = x;\nlet paramWidth = 0;\nlet tableY = y;\nfor (const paramId of params) {\n    paramWidth = Math.max(this.drawParamName(paramId, x + 4, y + 4, width), paramWidth);\n    y += paramheight;\n}\n\n// Draw Actor Data\nconst actorMax = $gameParty.maxBattleMembers();\nconst actorWidth = Math.floor((width - paramWidth) / actorMax);\nparamWidth = width - (actorWidth * actorMax);\nfor (const actor of $gameParty.battleMembers()) {\n    const index = $gameParty.battleMembers().indexOf(actor);\n    const actorX = paramX + paramWidth + (index * actorWidth);\n    this.changePaintOpacity(actor.canEquip(this._item));\n    this.drawActorCharacter(actor, actorX + (actorWidth / 2), tableY);\n    let actorY = tableY;\n\n    // Draw Parameter Changes\n    for (const paramId of params) {\n        const diffY = actorY - ((lineHeight - paramheight) / 2);\n        this.drawActorParamDifference(actor, paramId, actorX, diffY, actorWidth);\n        actorY += paramheight;\n    }\n}\n\n// Draw Back Rectangles\nthis.drawItemDarkRect(paramX, backY, paramWidth, tableY - backY);\nfor (let i = 0; i < actorMax; i++) {\n    const actorX = paramX + paramWidth + (i * actorWidth);\n    this.drawItemDarkRect(actorX, backY, actorWidth, tableY - backY);\n}\nfor (const paramId of params) {\n    this.drawItemDarkRect(paramX, tableY, paramWidth, paramheight);\n    for (let i = 0; i < actorMax; i++) {\n        const actorX = paramX + paramWidth + (i * actorWidth);\n        this.drawItemDarkRect(actorX, tableY, actorWidth, paramheight);\n    }\n    tableY += paramheight;\n}"
 *
 * @param ItemData
 * @text Item Data
 *
 * @param ItemGeneral
 * @parent ItemData
 *
 * @param MaxIcons:num
 * @text Max State/Buff Icons
 * @parent ItemGeneral
 * @desc Maximum number of icons that can be displayed for Add/Remove States/Buffs.
 * @default 8
 *
 * @param MultiplierStandard:num
 * @text Multiplier Standard
 * @parent ItemGeneral
 * @desc Constant standard to filter out random values when calculating the damage multiplier.
 * @default 1000000
 *
 * @param DrawItemData:func
 * @text JS: Draw Item Data
 * @parent ItemGeneral
 * @type note
 * @desc Code used to draw the item data for the Shop Status Window.
 * @default "const lineHeight = this.lineHeight();\nlet x = 0;\nlet y = 0;\nlet width = this.innerWidth;\nlet height = this.innerHeight;\nlet hw = Math.floor(width / 2);\nlet hx = x + width - hw;\n\n// Draw Item Name and Quantity\nthis.drawItemName(this._item, x + this.itemPadding(), y, width - this.itemPadding() * 2);\nthis.drawItemDarkRect(x, y, width);\ny += lineHeight;\n\n// Draw Main Item Properties\nif (this.drawItemConsumable(x, y, hw)) y += 0;\nif (this.drawItemQuantity(hx, y, hw)) y += lineHeight;\nif (this._item.occasion < 3) {\n    y = this.drawItemDamage(x, y, width);\n    y = this.drawItemEffects(x, y, width);\n}\ny = this.drawItemCustomEntries(x, y, width);\n\n// Draw Remaining Item Properties\nif (this._item.occasion < 3) {\n    if (this.drawItemOccasion(x, y, hw)) y += 0;\n    if (this.drawItemScope(hx, y, hw)) y += lineHeight;\n    if (this.drawItemHitType(x, y, hw)) y += 0;\n    if (this.drawItemSuccessRate(hx, y, hw)) y += lineHeight;\n    if (this.drawItemSpeed(x, y, hw)) y += 0;\n    if (this.drawItemRepeats(hx, y, hw)) y += lineHeight;\n}\n\n// Fill Rest of the Window\nthis.drawItemDarkRect(x, y, width, height - y);"
 *
 * @param Vocabulary
 * @parent ItemData
 *
 * @param LabelConsume:str
 * @text Consumable
 * @parent Vocabulary
 * @desc Vocabulary used for this data entry.
 * @default Consumable
 *
 * @param Consumable:str
 * @text Yes
 * @parent LabelConsume:str
 * @desc Vocabulary used for this data entry.
 * @default ✔
 *
 * @param NotConsumable:str
 * @text No
 * @parent LabelConsume:str
 * @desc Vocabulary used for this data entry.
 * @default ✘
 *
 * @param Occasions
 * @parent Vocabulary
 *
 * @param Occasion0:str
 * @text Always
 * @parent Occasions
 * @desc Vocabulary used for this data entry.
 * @default Anytime Use
 *
 * @param Occasion1:str
 * @text Battle Screen
 * @parent Occasions
 * @desc Vocabulary used for this data entry.
 * @default Battle-Only
 *
 * @param Occasion2:str
 * @text Menu Screen
 * @parent Occasions
 * @desc Vocabulary used for this data entry.
 * @default Field-Only
 *
 * @param Occasion3:str
 * @text Never
 * @parent Occasions
 * @desc Vocabulary used for this data entry.
 * @default -
 *
 * @param Scope
 * @parent Vocabulary
 *
 * @param Scope0:str
 * @text None
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default No Target
 *
 * @param Scope1:str
 * @text 1 Enemy
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default 1 Foe
 *
 * @param Scope2:str
 * @text All Enemies
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default All Foes
 *
 * @param Scope3:str
 * @text 1 Random Enemy
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default Random Foe
 *
 * @param Scope4:str
 * @text 2 Random Enemies
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default 2 Random Foes
 *
 * @param Scope5:str
 * @text 3 Random Enemies
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default 3 Random Foes
 *
 * @param Scope6:str
 * @text 4 Random Enemies
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default 4 Random Foes
 *
 * @param Scope7:str
 * @text 1 Ally
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default 1 Ally
 *
 * @param Scope8:str
 * @text All Allies
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default Alive Allies
 *
 * @param Scope9:str
 * @text 1 Ally (Dead)
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default Dead Ally
 *
 * @param Scope10:str
 * @text All Allies (Dead)
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default Dead Allies
 *
 * @param Scope11:str
 * @text The User
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default User
 *
 * @param Scope12:str
 * @text 1 Ally (DoA)
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default Any Ally
 *
 * @param Scope13:str
 * @text All Allies (DoA)
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default All Allies
 *
 * @param Scope14:str
 * @text Enemies & Allies
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default Everybody
 *
 * @param BattleCore
 * @text Battle Core Support
 * @parent Vocabulary
 *
 * @param ScopeRandomAny:str
 * @text x Random Any
 * @parent BattleCore
 * @desc Vocabulary used for <Target: x Random Any> notetag.
 * @default %1 Random Units
 *
 * @param ScopeRandomEnemies:str
 * @text x Random Enemies
 * @parent BattleCore
 * @desc Vocabulary used for <Target: x Random Enemies> notetag.
 * @default %1 Random Foes
 *
 * @param ScopeRandomAllies:str
 * @text x Random Allies
 * @parent BattleCore
 * @desc Vocabulary used for <Target: x Random Allies> notetag.
 * @default %1 Random Allies
 *
 * @param ScopeAlliesButUser:str
 * @text All Allies But User
 * @parent BattleCore
 * @desc Vocabulary used for <Target: All Allies But User> notetag.
 * @default Other Allies
 *
 * @param LabelSpeed:str
 * @text Speed
 * @parent Vocabulary
 * @desc Vocabulary used for this data entry.
 * @default Speed
 *
 * @param Speed2000:str
 * @text >= 2000 Speed
 * @parent LabelSpeed:str
 * @desc Vocabulary used for this data entry.
 * @default Fastest
 *
 * @param Speed1000:str
 * @text >= 1000 Speed
 * @parent LabelSpeed:str
 * @desc Vocabulary used for this data entry.
 * @default Faster
 *
 * @param Speed1:str
 * @text >= 1 Speed
 * @parent LabelSpeed:str
 * @desc Vocabulary used for this data entry.
 * @default Fast
 *
 * @param Speed0:str
 * @text == 0 Speed
 * @parent LabelSpeed:str
 * @desc Vocabulary used for this data entry.
 * @default Normal
 *
 * @param SpeedNeg999:str
 * @text >= -999 Speed
 * @parent LabelSpeed:str
 * @desc Vocabulary used for this data entry.
 * @default Slow
 *
 * @param SpeedNeg1999:str
 * @text >= -1999 Speed
 * @parent LabelSpeed:str
 * @desc Vocabulary used for this data entry.
 * @default Slower
 *
 * @param SpeedNeg2000:str
 * @text <= -2000 Speed
 * @parent LabelSpeed:str
 * @desc Vocabulary used for this data entry.
 * @default Slowest
 *
 * @param LabelSuccessRate:str
 * @text Success Rate
 * @parent Vocabulary
 * @desc Vocabulary used for this data entry.
 * @default Accuracy
 *
 * @param LabelRepeats:str
 * @text Repeats
 * @parent Vocabulary
 * @desc Vocabulary used for this data entry.
 * @default Hits
 *
 * @param LabelHitType:str
 * @text Hit Type
 * @parent Vocabulary
 * @desc Vocabulary used for this data entry.
 * @default Type
 *
 * @param HitType0:str
 * @text Certain Hit
 * @parent LabelHitType:str
 * @desc Vocabulary used for this data entry.
 * @default Neutral
 *
 * @param HitType1:str
 * @text Physical
 * @parent LabelHitType:str
 * @desc Vocabulary used for this data entry.
 * @default Physical
 *
 * @param HitType2:str
 * @text Magical
 * @parent LabelHitType:str
 * @desc Vocabulary used for this data entry.
 * @default Magical
 *
 * @param LabelElement:str
 * @text Element
 * @parent Vocabulary
 * @desc Vocabulary used for this data entry.
 * @default Element
 *
 * @param ElementWeapon:str
 * @text Weapon-Based
 * @parent LabelElement:str
 * @desc Vocabulary used for this data entry.
 * @default \I[97]Weapon
 *
 * @param ElementNone:str
 * @text Nonelement Element
 * @parent LabelElement:str
 * @desc Vocabulary used for this data entry.
 * @default \I[160]No Element
 *
 * @param DamageType
 * @text Damage Type
 * @parent Vocabulary
 *
 * @param DamageType1:str
 * @text HP Damage
 * @parent DamageType
 * @desc Vocabulary used for this data entry. If Visu_1_BattleCore
 * is installed, priority goes to its Damage Style settings.
 * @default %1 Damage Multiplier
 *
 * @param DamageType2:str
 * @text MP Damage
 * @parent DamageType
 * @desc Vocabulary used for this data entry. If Visu_1_BattleCore
 * is installed, priority goes to its Damage Style settings.
 * @default %1 Damage Multiplier
 *
 * @param DamageType3:str
 * @text HP Recovery
 * @parent DamageType
 * @desc Vocabulary used for this data entry. If Visu_1_BattleCore
 * is installed, priority goes to its Damage Style settings.
 * @default %1 Recovery Multiplier
 *
 * @param DamageType4:str
 * @text MP Recovery
 * @parent DamageType
 * @desc Vocabulary used for this data entry. If Visu_1_BattleCore
 * is installed, priority goes to its Damage Style settings.
 * @default %1 Recovery Multiplier
 *
 * @param DamageType5:str
 * @text HP Drain
 * @parent DamageType
 * @desc Vocabulary used for this data entry. If Visu_1_BattleCore
 * is installed, priority goes to its Damage Style settings.
 * @default %1 Drain Multiplier
 *
 * @param DamageType6:str
 * @text MP Drain
 * @parent DamageType
 * @desc Vocabulary used for this data entry. If Visu_1_BattleCore
 * is installed, priority goes to its Damage Style settings.
 * @default %1 Drain Multiplier
 *
 * @param Effects
 * @parent Vocabulary
 *
 * @param LabelRecoverHP:str
 * @text Recover HP
 * @parent Effects
 * @desc Vocabulary used for this data entry.
 * @default %1 Recovery
 *
 * @param LabelRecoverMP:str
 * @text Recover MP
 * @parent Effects
 * @desc Vocabulary used for this data entry.
 * @default %1 Recovery
 *
 * @param LabelRecoverTP:str
 * @text Recover TP
 * @parent Effects
 * @desc Vocabulary used for this data entry.
 * @default %1 Recovery
 *
 * @param LabelSelfGainTP:str
 * @text Self Gain TP
 * @parent Effects
 * @desc Vocabulary used for this data entry.
 * @default User %1
 *
 * @param LabelDamageHP:str
 * @text Damage HP
 * @parent Effects
 * @desc Vocabulary used for this data entry.
 * @default %1 Damage
 *
 * @param LabelDamageMP:str
 * @text Damage MP
 * @parent Effects
 * @desc Vocabulary used for this data entry.
 * @default %1 Damage
 *
 * @param LabelDamageTP:str
 * @text Damage TP
 * @parent Effects
 * @desc Vocabulary used for this data entry.
 * @default %1 Damage
 *
 * @param LabelApply:str
 * @text Add State/Buff
 * @parent Effects
 * @desc Vocabulary used for this data entry.
 * @default Applies
 *
 * @param LabelRemove:str
 * @text Remove State/Buff
 * @parent Effects
 * @desc Vocabulary used for this data entry.
 * @default Removes
 *
 */
//=============================================================================

const _0x362a=['processCursorHomeEndTrigger','JlWgU','EquipAdjustHpMp','lineHeight','Game_Actor_tradeItemWithParty','categoryStyleCheck','defaultItemMax','QYWXS','YTzvE','weapon','statusWidth','NNFTS','actor','drawItemEffectsMpDamage','processCursorMove','isUseParamNamesWithIcons','_tempActor','mainFontSize','helpAreaHeight','REMOVED\x20EFFECTS','getItemEffectsHpRecoveryLabel','pagedown','drawPossession','DAMAGE\x20MULTIPLIER','discardEquip','DPgvG','hideAdditionalSprites','BorderRegExp','resetShopSwitches','postCreateItemWindowModernControls','postCreateSlotWindowItemsEquipsCore','getItemScopeText','RhMPx','occasion','kjDPB','TP\x20DAMAGE','maxVisibleItems','cqACw','TP\x20RECOVERY','Step3End','maxBattleMembers','refresh','cursorDown','HePue','calcWindowHeight','flatHP','getItemEffectsTpRecoveryText','getItemEffectsMpDamageText','\x5cI[%1]','NonRemoveETypes','fill','canEquip','sellPriceRate','getItemEffectsSelfTpGainLabel','Scene_Shop_sellingPrice','WPYXg','?????','LabelDamageHP','price','DrawFaceJS','ParamValueFontSize','isUseItemsEquipsCoreUpdatedLayout','Scene_Equip_createSlotWindow','maqdl','mNvkP','tnHHG','BattleUsable','NhApQ','selfTP','_calculatingJSParameters','isItem','isTriggered','scrollTo','olAIk','ARRAYJSON','zZJLc','VGuIx','ocVLW','_handlers','getNextAvailableEtypeId','Width','contentsBack','canConsumeItem','ItemQuantityFontSize','SdadP','changeEquip','pageup','splice','formula','Scene_Boot_onDatabaseLoaded','269482EafKzO','setShopStatusWindowMode','_slotWindow','XgfNe','push','Game_BattlerBase_param','CmdStyle','equipAdjustHpMp','item-%1','gOpPX','gZLPJ','playOkSound','onTouchSelectModern','addClearCommand','VaFtj','ItemQuantityFmt','USER\x20TP\x20GAIN','buttonAssistKey3','makeDeepCopy','VzwhC','length','zXqPS','updateCommandNameWindow','KeyItemProtect','Game_Actor_forceChangeEquip','CmdTextAlign','Step3Start','GeGCl','statusWindowRect','etypeId','paramchangeTextColor','auto','isOpenAndActive','flatMP','DrawItemData','getColor','_scene','elements','ERQbw','NonOptimizeETypes','Game_Actor_changeEquip','setItemWindow','RcsRU','KRwfB','contents','CmdCancelRename','getItemEffects','eZogt','Scene_Shop_create','limitedPageUpDownSceneCheck','onCategoryOk','eyxDr','bCgEz','removeState','item','bestEquipItem','_resetFontSize','0000','equipSlots','battleMembers','match','tQjDT','index','getInputMultiButtonStrings','_customItemInfo','getItemEffectsHpDamageText','drawItemEffectsAddedStatesBuffs','ParseClassNotetags','updateChangedSlots','_bypassNewLabel','processShiftRemoveShortcut','Ffcky','constructor','qnwin','setStatusWindow','psKhg','isEquipCommandEnabled','vjhHE','slotWindowRectItemsEquipsCore','drawItemEquipType','visible','gcyZm','max','getItemEffectsTpDamageText','XNViZ','NoChangeMarker','prototype','onCategoryCancelItemsEquipsCore','_slotId','EnableLayout','AaZeC','buttonAssistKey1','NtKaV','Parse_Notetags_ParamValues','_money','bGuHt','Scene_Shop_createCategoryWindow','shouldCommandWindowExist','FieldUsable','rSnee','blhzR','gainTP','New','MRpcP','forceChangeEquipSlots','ODZZG','SwitchBuy','changePaintOpacity','placeItemNewLabel','rateMP','HodFL','Window_ItemList_maxCols','right','categoryItemTypes','Scene_Equip_commandEquip','getItemEffectsRemovedStatesBuffsText','kPpQz','setMp','HLvvz','DrawPortraitJS','JwKAH','EoYei','PegtW','doSell','vMZIm','cancel','loadCharacter','oojvI','gainItem','Step2End','maxItemAmount','elementId','(+%1)','drawItemCustomEntryLine','isCancelled','successRate','TfIfF','XVMCm','postCreateSellWindowItemsEquipsCore','clearNewLabelFromItem','fillRect','addLoadListener','_bypassReleaseUnequippableItemsItemsEquipsCore','tNcGO','kNBJy','getMenuImage','getItemSpeedText','fontSize','commandStyle','update','hitIndex','hitType','addEquipCommand','isEnabled','Scene_Shop_createSellWindow','Scene_Item_createCategoryWindow','updatedLayoutStyle','LabelSelfGainTP','getItemEffectsSelfTpGainText','addCommand','ZkAqd','Scene_Shop_goldWindowRect','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','kFpdX','onSlotOkAutoSelect','_doubleTouch','modifiedBuyPriceItemsEquipsCore','activateSellWindow','nhxIu','6543cJDERD','drawItemDarkRect','DrawIcons','NwMEz','ifHGD','sell','mpRate','MaxArmors','onCategoryCancel','iyWgU','drawItemData','uhgCy','clearNewItem','FRnyM','Window_ShopBuy_price','object','baseSellingPrice','isHandled','VisuMZ_1_MainMenuCore','EFFECT_ADD_BUFF','call','Scene_Equip_statusWindowRect','onSlotCancel','bohNs','createNewLabelSprite','floor','vzDmY','setObject','Pfwrg','addStateBuffChanges','VxUpl','RegularItems','cursorPagedown','drawIcon','isPressed','_dummyWindow','ARRAYSTRUCT','SpeedNeg1999','drawItemEffectsHpRecovery','createCommandNameWindow','itemTextAlign','Step1Start','ScopeRandomAllies','kMknE','nonOptimizeEtypes','addWindow','AlwaysUsable','drawItemCustomEntries','Scene_Equip_itemWindowRect','itemEnableJS','possession','updateHelp','meetsItemConditionsJS','SOPwx','QGZJJ','HiddenItemA','getItemDamageElementLabel','LabelHitType','ggZPT','nlBds','CmdHideDisabled','cfucu','Cwnqm','format','meetsItemConditionsNotetags','zgXEV','Icon','createCategoryWindow','MP\x20DAMAGE','isArmor','processHandling','KylcK','cursorUp','adjustItemWidthByStatus','DOUrf','cursorRight','AllWeapons','_sellWindow','gvCOJ','mainAreaTop','HiddenItemB','effects','makeItemData','windowPadding','FontSize','qpaxs','PnJNN','VgMMi','create','rleJA','previousActor','DrawEquipData','Scene_Load_reloadMapIfUpdated','Parse_Notetags_Category','getItemEffectsTpRecoveryLabel','1uTxYHy','equip','isEquipChangeOk','STR','cunGN','helpWindowRectItemsEquipsCore','value','type','commandEquip','dataId','Scene_Shop_onSellCancel','Window_ShopBuy_refresh','EFFECT_RECOVER_HP','categories','getItemDamageAmountTextOriginal','loadFaceImages','WXVnc','ItemScene','fdonS','drawRemoveItem','deselect','Game_Actor_discardEquip','NeverUsable','equipSlotIndex','ActorResetEquipSlots','buttonAssistRemove','atk','MDF','gaugeBackColor','drawActorCharacter','getItemEffectsMpRecoveryText','vWjSW','UcFLF','includes','optimize','drawItemConsumable','drawItemSpeed','Game_BattlerBase_meetsItemConditions','aTnTw','processCursorSpecialCheckModernControls','drawItemStyleIconText','isMainMenuCoreMenuImageOptionAvailable','isPageChangeRequested','CoreEngine','VLbjQ','VUjjv','ListWindowCols','jxCHG','Type','isCursorMovable','prepareItemCustomData','min','buyWindowRectItemsEquipsCore','powerUpColor','MaxIcons','NGVAQ','ziXEP','clear','isShiftShortcutKeyForRemove','equips','bind','drawItemName','Window_Selectable_setHelpWindowItem','_newLabelOpacity','background','RJfTq','ParseArmorNotetags','itemDataFontSize','drawItemStyleIcon','process_VisuMZ_ItemsEquipsCore_RegExp','geUpdatedLayoutStatusWidth','ParamChangeFontSize','reloadMapIfUpdated','height','ARRAYEVAL','paramId','drawItemDamageElement','cewOb','textSizeEx','currentSymbol','refreshCursor','LabelDamageTP','playBuzzerSound','drawText','bRuRe','UAXrh','BuyPriceJS','resetFontSettings','OWHOj','cyCMG','createStatusWindow','Window_ShopCommand_initialize','drawItemRepeats','JqxyY','allowCommandWindowCursorUp','OfrVy','ScopeAlliesButUser','isShowNew','drawItemOccasion','RxUDR','jUkZm','drawNewLabelIcon','Scene_Equip_onSlotOk','MP\x20RECOVERY','commandStyleCheck','paramJS','BatchShop','updateCategoryNameWindow','17027AVwRQw','buttonAssistText1','getItemEffectsAddedStatesBuffsLabel','DamageType%1','Nonconsumable','mRIiv','onSellOk','isRightInputMode','aRINK','width','onBuyCancel','Scene_Shop_commandSell','characterName','isEquipCommandAdded','onMenuImageLoad','Scene_Item_itemWindowRect','updateNewLabelOpacity','FcPIw','value1','abnyY','DqkdJ','UaSDS','gSCQG','drawItemDamageAmount','OtUlX','isBuyCommandEnabled','fontFace','drawItemEffectsMpRecovery','getItemOccasionText','A%1','WzEwW','mhp','optimizeEquipments','activate','prepareNextScene','toLowerCase','trim','_shopStatusMenuMode','Speed1000','5YzmiRx','yUVHG','drawEquipData','process_VisuMZ_ItemsEquipsCore_EquipSlots','blt','getItemEffectsRemovedStatesBuffsLabel','ScopeRandomAny','buttonAssistCategory','Scene_Shop_buyWindowRect','DrawParamJS','addChild','hide','determineBaseSellingPrice','indexOf','commandWindowRect','currencyUnit','newLabelEnabled','RJkSk','Whitelist','rqTgZ','kwyJn','changeBuff','YXxBs','<%1:[\x20]([\x5c+\x5c-]\x5cd+)>','drawItemEffectsHpDamage','Scene_Shop_onSellOk','TCvzd','param','Window_Selectable_refresh','uiInputPosition','drawItemHitType','Parse_Notetags_EnableJS','(%1)','zySyX','log','hKAZO','slotWindowRect','getItemDamageAmountText','MaxItems','Scene_Shop_doSell','fdEVo','parse','EGgYF','KeyItems','isHoverEnabled','znBsf','convertInitEquipsToItems','getItemDamageAmountLabelOriginal','addCancelCommand','versionId','checkShiftRemoveShortcut','dohAv','initialize','paramPlus','setHandler','_numberWindow','categoryNameWindowDrawText','LabelSuccessRate','CwMbY','isRepeated','isOpen','vFNqA','Consumable','RemoveEquipIcon','parameters','statusWindowRectItemsEquipsCore','AllArmors','CONSUMABLE','EFFECT_ADD_DEBUFF','getItemRepeatsText','ZQlWC','smoothScrollTo','HIT\x20TYPE','BmIFO','onBuyCancelItemsEquipsCore','nextActor','_buyWindow','changeTextColor','Parse_Notetags_Prices','placeNewLabel','BackRectColor','Scene_Item_categoryWindowRect','commandName','getMatchingInitEquip','FontColor','process_VisuMZ_ItemsEquipsCore_Notetags','drawUpdatedAfterParamValue','_newLabelOpacityUpperLimit','JvZtF','+%1%','forceChangeEquip','MktCo','getItemHitTypeText','buttonAssistOffset3','makeCommandList','systemColor','OUlZB','_forcedSlots','icon','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','getItemDamageAmountLabelBattleCore','FadeLimit','lIBRJ','isOptimizeCommandEnabled','Slots','CTiFD','Scene_Shop_sellWindowRect','Scene_Shop_activateSellWindow','mainCommandWidth','postCreateItemsEquipsCore','categoryWindowRect','Game_Party_initialize','code','addInnerChild','drawNewLabelText','getTextColor','isShiftRemoveShortcutEnabled','buttonAssistSlotWindowShift','LabelRecoverMP','categoryWindowRectItemsEquipsCore','NUM','OnEqV','isClearCommandAdded','drawItemCost','isPlaytest','Scene_Shop_onBuyCancel','EFFECT_REMOVE_STATE','LabelApply','MPpwx','ATK','replace','isClearCommandEnabled','loadSystem','BrZwX','Chduz','commandBuy','iconWidth','EFFECT_RECOVER_MP','itemPadding','setTopRow','lkvNd','nSXTF','smallParamFontSize','itemHasEquipLimit','maxItems','exit','addSellCommand','sellingPrice','getItemColor','×%1','ceil','iconHeight','textWidth','repeats','jvnzy','ShiftShortcutKey','REPEAT','_goods','eXxyG','XXTMz','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','XdoLb','fZKNh','_shopStatusMenuAlly','hPZkl','iVlfF','CzvYg','oIYZA','addOptimizeCommand','276LkDufN','MaxMP','Parse_Notetags_Batch','drawCurrencyValue','commandNameWindowDrawText','drawUpdatedBeforeParamValue','doBuy','+%1','down','StRsx','Scene_Shop_onCategoryCancel','getItemEffectsHpRecoveryText','setBackgroundType','bQZQw','StatusWindow','adjustHiddenShownGoods','consumable','FiSwL','setNewItem','isBattleTest','members','LUK','OCCASION','numberWindowRect','mmp','giLar','version','KTflN','isEquipItem','powerDownColor','setTempActor','VisuMZ_1_BattleCore','faevL','TextAlign','normalColor','getItemEffectsMpDamageLabel','hideNewLabelSprites','keyItem','KamuY','onDatabaseLoaded','AHTcf','getDamageStyle','commandSell','isKeyItem','registerCommand','isBottomHelpMode','initNewItemsList','IconSet','Parse_Notetags_ParamJS','playCursorSound','FadeSpeed','meetsItemConditions','XPPRs','pJDCK','CommandAddOptimize','Scene_Shop_numberWindowRect','rIikZ','OMPiG','tbGwH','values','ItemSceneAdjustItemList','removeStateBuffChanges','ELYrD','getItemConsumableLabel','CommandAddClear','EquipScene','_categoryWindow','isClearEquipOk','prepare','ELEMENT','YlJAC','getItemDamageAmountLabel','left','HARJR','sellWindowRectItemsEquipsCore','processTouchModernControls','pGZeK','HP\x20RECOVERY','ShopScene','_list','weaponTypes','LabelConsume','gaugeLineHeight','round','HitType%1','commandBuyItemsEquipsCore','deactivate','numItems','YFPYe','Window_ItemCategory_initialize','XaLiA','Window_ItemList_drawItem','gGrQj','FNxfT','allowCreateStatusWindow','forceResetEquipSlots','Window_EquipCommand_initialize','drawUpdatedParamValueDiff','KQVcL','armorTypes','_itemData','createSlotWindow','CILjo','LSBRx','getItemQuantityText','damageColor','text','Scene_ItemBase_activateItemWindow','helpWindowRect','split','Window_Selectable_initialize','Scene_Shop_statusWindowRect','RVqJV','UIxPF','ShowShopStatus','ErNJJ','kjdNp','CmdIconBuy','ADDED\x20EFFECTS','isOptimizeEquipOk','addState','boxWidth','DqzSX','MaxWeapons','clamp','isCommandEnabled','colSpacing','_item','QGxSO','mgnBo','commandNameWindowCenter','_newLabelOpacityChange','initNewLabelSprites','LayoutStyle','removeBuff','SwitchSell','MenuPortraits','mainFontFace','paintOpacity','resetTextColor','drawItemNumber','SpeedNeg999','Window_ShopSell_isEnabled','AllItems','1158YLVIGv','categoryNameWindowDrawBackground','getItemConsumableText','drawParamText','_categoryNameWindow','itemLineRect','drawCustomShopGraphicLoad','buttonAssistText3','uiEHB','drawItemActorMenuImage','_statusWindow','_buyWindowLastIndex','aIzzT','drawItem','drawItemEffectsSelfTpGain','fNfum','_tempActorB','releaseUnequippableItems','setHp','isOptimizeCommandAdded','goBRX','XJdoR','itemWindowRectItemsEquipsCore','Qwsyb','drawItemScope','nonRemovableEtypes','wqWoF','LabelRemove','drawItemEffectsTpDamage','Scene_Item_createItemWindow','maxCols','YByQd','HZgSR','atypeId','ConvertParams','MaxHP','Settings','prepareNewEquipSlotsOnLoad','RegExp','clearEquipments','MdoVr','onTouchSelect','EFFECT_REMOVE_DEBUFF','Dytro','iconText','_goodsCount','IaZlU','OffsetX','getItemEffectsAddedStatesBuffsText','Step1End','smoothSelect','aHhpR','Enable','onSellCancel','itemAt','WbZVK','%1%','_equips','setValue','#%1','isDualWield','processDrawIcon','289668zzxmlR','Step2Start','revertGlobalNamespaceVariables','LabelRecoverTP','FYETR','QcPJq','ctqit','drawItemKeyData','commandWindowRectItemsEquipsCore','ActorChangeEquipSlots','mainAreaHeight','createBitmap','SUCCESS\x20RATE','rHWLS','value2','qXFCm','hvzZQ','uiMenuStyle','initEquips','categoryNameWindowCenter','drawCustomShopGraphic','fontSizeRatio','status','IrnSG','onTouchSelectModernControls','ExtDisplayedParams','drawTextEx','\x5cI[%1]%2','_buttonAssistWindow','Actors','VlaZS','cursorPageup','opacity','uWmCb','onActorChange','qrQvE','IncludeShopItem','onSlotOk','show','SPEED','ElementWeapon','changeEquipById','createSellWindow','itemWindowRect','LyCBS','zmXdr','QoL','setupItemDamageTempActors','center','Param','_commandWindow','CmdIconEquip','isSceneShop','CmdIconOptimize','createCategoryNameWindow','EVAL','150537qlJEuQ','yQaKT','drawParamName','armor-%1','buttonAssistText2','bxxer','drawParamsItemsEquipsCore','actorParams','getItemSuccessRateText','params','Scope%1','NfwXp','Scene_Equip_slotWindowRect','isNewItem','Game_Party_gainItem','EFFECT_GAIN_TP','loadPicture','_newItemsList','_newLabelSprites','isWeapon','cctPN','VkDdS','QbpcK','categoryStyle','buttonAssistItemListRequirement','iGMJo','prepareRefreshItemsEquipsCoreLayout','name','rateHP','setItem','onTouchOk','ItemMenuStatusRect','allowShiftScrolling','ARRAYSTR','NztQI','callUpdateHelp','bitmap','innerHeight','IEbTL','GMDaJ','CmdIconSell','isSellCommandEnabled','Scene_Shop_doBuy','Scene_Equip_create','pAqnu','ylEqn','setHelpWindowItem','kwldy','EqWId','paramValueFontSize','StatusWindowWidth','Speed0','buttonAssistSmallIncrement','MRKEB','VAuDC','WMHNk','goldWindowRect','bsNpy','%1-%2','translucentOpacity','DrawBackRect','iSRQx','Speed1','Scene_Equip_onSlotCancel','getItemSpeedLabel','toUpperCase','itypeId','IfrAu','isEquipped','GjKmi','damage','aJHeI','LqDjA','pop','HP\x20DAMAGE','getInputButtonString','hideDisabledCommands','SellPriceJS','buy','PurchaseOnly','foreground','_commandNameWindow','ONSDU','DEF','tradeItemWithParty','isSoleArmorType','MhoFy','ZVfPE','wtypeId','refreshActorEquipSlotsIfUpdated','addBuyCommand','ywRAP','onSellOkItemsEquipsCore','ThqTY','middle','removeDebuff','buffIconIndex','YxwRq','getItemEffectsMpRecoveryLabel','ARRAYNUM','JSON','AHzmS','\x5cb%1\x5cb','currentClass','ParseItemNotetags','isGoodShown','ItemsEquipsCore','map','refreshItemsEquipsCoreNoMenuImage','Game_Actor_paramPlus','getItemSuccessRateLabel','isUseModernControls','Damage\x20Formula\x20Error\x20for\x20%1','pvluw','Occasion%1','popScene','ScopeRandomEnemies','getItemEffectsTpDamageLabel','Window_Selectable_update','NotConsumable','iconIndex','vrYrC','mnOWz','Scene_Shop_categoryWindowRect','LabelElement','VisuMZ_0_CoreEngine','ApQVI','OffsetY','buttonAssistLargeIncrement','select','cursorLeft','paramValueByName','uiHelpPosition','ElementNone','ErJza','Window_EquipStatus_refresh','updateMoneyAmount','WxUhA','EXQSu','_actor','active','postCreateCategoryWindowItemsEquipsCore','note','UQoyy','qxiiZ','isSoleWeaponType','IOMTG','ekVwV','Window_EquipItem_isEnabled','EGXmt','_resetFontColor','isHovered','mrTlK','getItemHitTypeLabel','W%1','drawItemEffectsTpRecovery','getItemDamageElementText','buyWindowRect','MAT','643532qXubVt','qeqUp','commandSellItemsEquipsCore','Categories','CannotEquipMarker','wuiPb','fNFuG','Scene_Shop_commandBuy','setCategory','processCursorMoveModernControls','categoryList','uYDab','optKeyItemsNumber','textColor','eGlQt','drawItemEffectsRemovedStatesBuffs','equipTypes','_category','drawActorParamDifference','drawItemQuantity','AqEiM','MOfLw','yPKxb','Scene_Shop_commandWindowRect','MxMFp','zFvto','shift','goldWindowRectItemsEquipsCore','commandNameWindowDrawBackground','getItemsEquipsCoreBackColor2','kYvjj','EquipParams','WWcFq','canUse','gSoBb','getItemEffectsHpDamageLabel','MANUAL','remove','cWBqQ','Window_ItemList_updateHelp','qaBBu','Window_EquipItem_includes','ItLoi','uoJkT','SellPriceRate','ParseWeaponNotetags','UArov','innerWidth','Window_ItemCategory_setItemWindow','FontFace','activateItemWindow','AlreadyEquipMarker','UkMYg','Scene_Item_create','Parse_Notetags_EquipSlots','_itemWindow','isClicked','checkItemConditionsSwitchNotetags','Ezspu','getItemsEquipsCoreBackColor1','weapon-%1','_data','iyUJl','helpAreaTop','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20MaxHP\x20=\x200;\x20let\x20MaxMP\x20=\x200;\x20let\x20ATK\x20=\x200;\x20let\x20DEF\x20=\x200;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20MAT\x20=\x200;\x20let\x20MDF\x20=\x200;\x20let\x20AGI\x20=\x200;\x20let\x20LUK\x20=\x200;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20[MaxHP,\x20MaxMP,\x20ATK,\x20DEF,\x20MAT,\x20MDF,\x20AGI,\x20LUK][paramId];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20','DTrIT','FSWSz','cazZD','numberWindowRectItemsEquipsCore','Scene_Equip_commandWindowRect','uMPzU','Speed2000','_tempActorA','ZKGOQ'];const _0x1087a8=_0x3468;(function(_0x4b1297,_0x574aff){const _0x1cccc6=_0x3468;while(!![]){try{const _0x5559fe=-parseInt(_0x1cccc6(0x47c))+-parseInt(_0x1cccc6(0x163))*parseInt(_0x1cccc6(0x18a))+-parseInt(_0x1cccc6(0x339))+-parseInt(_0x1cccc6(0x525))+parseInt(_0x1cccc6(0x233))*parseInt(_0x1cccc6(0x2c3))+-parseInt(_0x1cccc6(0x301))+-parseInt(_0x1cccc6(0x3d8))*-parseInt(_0x1cccc6(0x584));if(_0x5559fe===_0x574aff)break;else _0x4b1297['push'](_0x4b1297['shift']());}catch(_0x557b69){_0x4b1297['push'](_0x4b1297['shift']());}}}(_0x362a,0x277ef));function _0x3468(_0x250155,_0x4b5b3f){return _0x3468=function(_0x362a52,_0x3468b3){_0x362a52=_0x362a52-0x149;let _0x19bbca=_0x362a[_0x362a52];return _0x19bbca;},_0x3468(_0x250155,_0x4b5b3f);}var label='ItemsEquipsCore',tier=tier||0x0,dependencies=[],pluginData=$plugins['filter'](function(_0x33f686){const _0x47523d=_0x3468;return _0x33f686[_0x47523d(0x317)]&&_0x33f686['description'][_0x47523d(0x5a5)]('['+label+']');})[0x0];VisuMZ[label][_0x1087a8(0x2e7)]=VisuMZ[label][_0x1087a8(0x2e7)]||{},VisuMZ[_0x1087a8(0x2e5)]=function(_0x394a2f,_0x5456d7){const _0x25bbec=_0x1087a8;for(const _0x16d6fc in _0x5456d7){if(_0x25bbec(0x541)!==_0x25bbec(0x1d3)){if(_0x16d6fc[_0x25bbec(0x4b8)](/(.*):(.*)/i)){const _0x281476=String(RegExp['$1']),_0x77d76c=String(RegExp['$2'])[_0x25bbec(0x37a)]()[_0x25bbec(0x187)]();let _0x4287f8,_0x12ee65,_0x4dd272;switch(_0x77d76c){case _0x25bbec(0x202):_0x4287f8=_0x5456d7[_0x16d6fc]!==''?Number(_0x5456d7[_0x16d6fc]):0x0;break;case _0x25bbec(0x39c):_0x12ee65=_0x5456d7[_0x16d6fc]!==''?JSON[_0x25bbec(0x1b3)](_0x5456d7[_0x16d6fc]):[],_0x4287f8=_0x12ee65[_0x25bbec(0x3a4)](_0x204252=>Number(_0x204252));break;case _0x25bbec(0x338):_0x4287f8=_0x5456d7[_0x16d6fc]!==''?eval(_0x5456d7[_0x16d6fc]):null;break;case _0x25bbec(0x5ce):_0x12ee65=_0x5456d7[_0x16d6fc]!==''?JSON['parse'](_0x5456d7[_0x16d6fc]):[],_0x4287f8=_0x12ee65['map'](_0xd3fedb=>eval(_0xd3fedb));break;case _0x25bbec(0x39d):_0x4287f8=_0x5456d7[_0x16d6fc]!==''?JSON[_0x25bbec(0x1b3)](_0x5456d7[_0x16d6fc]):'';break;case _0x25bbec(0x46c):_0x12ee65=_0x5456d7[_0x16d6fc]!==''?JSON[_0x25bbec(0x1b3)](_0x5456d7[_0x16d6fc]):[],_0x4287f8=_0x12ee65[_0x25bbec(0x3a4)](_0x3961af=>JSON['parse'](_0x3961af));break;case'FUNC':_0x4287f8=_0x5456d7[_0x16d6fc]!==''?new Function(JSON[_0x25bbec(0x1b3)](_0x5456d7[_0x16d6fc])):new Function('return\x200');break;case'ARRAYFUNC':_0x12ee65=_0x5456d7[_0x16d6fc]!==''?JSON[_0x25bbec(0x1b3)](_0x5456d7[_0x16d6fc]):[],_0x4287f8=_0x12ee65[_0x25bbec(0x3a4)](_0x27c45a=>new Function(JSON[_0x25bbec(0x1b3)](_0x27c45a)));break;case _0x25bbec(0x587):_0x4287f8=_0x5456d7[_0x16d6fc]!==''?String(_0x5456d7[_0x16d6fc]):'';break;case _0x25bbec(0x35a):_0x12ee65=_0x5456d7[_0x16d6fc]!==''?JSON[_0x25bbec(0x1b3)](_0x5456d7[_0x16d6fc]):[],_0x4287f8=_0x12ee65['map'](_0x204a63=>String(_0x204a63));break;case'STRUCT':_0x4dd272=_0x5456d7[_0x16d6fc]!==''?JSON[_0x25bbec(0x1b3)](_0x5456d7[_0x16d6fc]):{},_0x394a2f[_0x281476]={},VisuMZ['ConvertParams'](_0x394a2f[_0x281476],_0x4dd272);continue;case _0x25bbec(0x549):_0x12ee65=_0x5456d7[_0x16d6fc]!==''?JSON['parse'](_0x5456d7[_0x16d6fc]):[],_0x4287f8=_0x12ee65['map'](_0x477db5=>VisuMZ[_0x25bbec(0x2e5)]({},JSON[_0x25bbec(0x1b3)](_0x477db5)));break;default:continue;}_0x394a2f[_0x281476]=_0x4287f8;}}else{const _0x2208a1=_0x129dc0(_0x194069['$1']);let _0x297555=this[_0x25bbec(0x2b2)],_0x3d39fa=_0x5f3d46*this[_0x25bbec(0x456)]();try{_0x60d026(_0x2208a1);}catch(_0x1f2b30){if(_0x45095c['isPlaytest']())_0x4adbf7[_0x25bbec(0x1ac)](_0x1f2b30);}if(_0x5e947c(_0x3d39fa))_0x3d39fa=0x0;return _0x5701fe[_0x25bbec(0x53e)](_0x3d39fa);}}return _0x394a2f;},(_0x1b0ab5=>{const _0x826e96=_0x1087a8,_0x2d0f6e=_0x1b0ab5[_0x826e96(0x354)];for(const _0x3f2a47 of dependencies){if(_0x826e96(0x5b3)===_0x826e96(0x5b3)){if(!Imported[_0x3f2a47]){if('IaZlU'===_0x826e96(0x2f1)){alert(_0x826e96(0x51e)[_0x826e96(0x564)](_0x2d0f6e,_0x3f2a47)),SceneManager[_0x826e96(0x21b)]();break;}else _0x1bed33[_0x826e96(0x547)](_0x826e96(0x3f2))&&this[_0x826e96(0x359)]()?this[_0x826e96(0x545)]():this[_0x826e96(0x44c)](_0x5dec71['isTriggered'](_0x826e96(0x23b)));}}else{if(this[_0x826e96(0x4ba)]()!==0x0)return![];const _0x5373c6=_0x4da74c[_0x826e96(0x3a3)][_0x826e96(0x2e7)][_0x826e96(0x274)];if(!_0x5373c6['CommandAddOptimize']&&!_0x5373c6['CommandAddClear'])return![];return _0x3c41a6[_0x826e96(0x469)]('up');}}const _0x2f9d7e=_0x1b0ab5['description'];if(_0x2f9d7e[_0x826e96(0x4b8)](/\[Version[ ](.*?)\]/i)){if(_0x826e96(0x41b)!==_0x826e96(0x412)){const _0x434eba=Number(RegExp['$1']);if(_0x434eba!==VisuMZ[label][_0x826e96(0x24d)]){if(_0x826e96(0x53c)!==_0x826e96(0x390))alert(_0x826e96(0x1ed)['format'](_0x2d0f6e,_0x434eba)),SceneManager['exit']();else return _0x18a749[_0x826e96(0x5af)]&&_0x57648f[_0x826e96(0x5af)][_0x826e96(0x2e7)][_0x826e96(0x32f)][_0x826e96(0x493)]&&_0x3d1c1e[_0x826e96(0x25e)](this[_0x826e96(0x2b2)])?![]:this[_0x826e96(0x2b2)]['consumable'];}}else{_0xa73507+=_0x826e96(0x452)[_0x826e96(0x564)](_0x1efde7[_0x826e96(0x3b1)]),_0x4784d0++;if(_0x589860>=_0x505d88)return _0x5627b2;}}if(_0x2f9d7e[_0x826e96(0x4b8)](/\[Tier[ ](\d+)\]/i)){if(_0x826e96(0x14b)!==_0x826e96(0x2d7)){const _0x305d32=Number(RegExp['$1']);_0x305d32<tier?(alert(_0x826e96(0x22a)[_0x826e96(0x564)](_0x2d0f6e,_0x305d32,tier)),SceneManager[_0x826e96(0x21b)]()):tier=Math[_0x826e96(0x4ce)](_0x305d32,tier);}else this[_0x826e96(0x357)]();}VisuMZ[_0x826e96(0x2e5)](VisuMZ[label]['Settings'],_0x1b0ab5[_0x826e96(0x1ca)]);})(pluginData),PluginManager[_0x1087a8(0x25f)](pluginData['name'],_0x1087a8(0x30a),_0x1463c7=>{const _0x4efd1e=_0x1087a8;VisuMZ[_0x4efd1e(0x2e5)](_0x1463c7,_0x1463c7);const _0x4dd6bf=_0x1463c7[_0x4efd1e(0x31e)][_0x4efd1e(0x3a4)](_0x463024=>$gameActors[_0x4efd1e(0x42e)](_0x463024)),_0x2db899=_0x1463c7[_0x4efd1e(0x1f2)][_0x4efd1e(0x3a4)](_0x413609=>$dataSystem[_0x4efd1e(0x3e8)][_0x4efd1e(0x197)](_0x413609[_0x4efd1e(0x187)]()));for(const _0x128979 of _0x4dd6bf){if(!_0x128979)continue;_0x128979[_0x4efd1e(0x4e4)](_0x2db899);}}),PluginManager[_0x1087a8(0x25f)](pluginData['name'],_0x1087a8(0x59c),_0x155bd5=>{const _0x139819=_0x1087a8;VisuMZ['ConvertParams'](_0x155bd5,_0x155bd5);const _0x362955=_0x155bd5[_0x139819(0x31e)]['map'](_0xc9daf1=>$gameActors[_0x139819(0x42e)](_0xc9daf1));for(const _0x46c3b6 of _0x362955){if(!_0x46c3b6)continue;_0x46c3b6[_0x139819(0x292)]();}}),PluginManager[_0x1087a8(0x25f)](pluginData[_0x1087a8(0x354)],_0x1087a8(0x161),_0x53c3f4=>{const _0x5431a7=_0x1087a8;VisuMZ[_0x5431a7(0x2e5)](_0x53c3f4,_0x53c3f4);const _0x3c4a8b=[],_0x571525=_0x53c3f4['Blacklist'][_0x5431a7(0x3a4)](_0x76617=>_0x76617[_0x5431a7(0x37a)]()[_0x5431a7(0x187)]()),_0x234c67=_0x53c3f4[_0x5431a7(0x19c)][_0x5431a7(0x3a4)](_0x1b100f=>_0x1b100f['toUpperCase']()[_0x5431a7(0x187)]()),_0x33a2b7=_0x53c3f4[_0x5431a7(0x2f4)]>=_0x53c3f4['Step1Start']?_0x53c3f4[_0x5431a7(0x54e)]:_0x53c3f4[_0x5431a7(0x2f4)],_0xb084d2=_0x53c3f4[_0x5431a7(0x2f4)]>=_0x53c3f4[_0x5431a7(0x54e)]?_0x53c3f4['Step1End']:_0x53c3f4[_0x5431a7(0x54e)],_0x438b44=Array(_0xb084d2-_0x33a2b7+0x1)[_0x5431a7(0x454)]()[_0x5431a7(0x3a4)]((_0x825e56,_0x41428d)=>_0x33a2b7+_0x41428d);for(const _0x30b943 of _0x438b44){const _0x4072d1=$dataItems[_0x30b943];if(!_0x4072d1)continue;if(!VisuMZ[_0x5431a7(0x3a3)][_0x5431a7(0x325)](_0x4072d1,_0x571525,_0x234c67))continue;_0x3c4a8b[_0x5431a7(0x480)]([0x0,_0x30b943,0x0,_0x4072d1[_0x5431a7(0x45c)]]);}const _0x1ea283=_0x53c3f4[_0x5431a7(0x4fd)]>=_0x53c3f4[_0x5431a7(0x302)]?_0x53c3f4[_0x5431a7(0x302)]:_0x53c3f4[_0x5431a7(0x4fd)],_0x449538=_0x53c3f4[_0x5431a7(0x4fd)]>=_0x53c3f4[_0x5431a7(0x302)]?_0x53c3f4[_0x5431a7(0x4fd)]:_0x53c3f4['Step2Start'],_0xbdc6bd=Array(_0x449538-_0x1ea283+0x1)[_0x5431a7(0x454)]()[_0x5431a7(0x3a4)]((_0x5bd822,_0x60ab20)=>_0x1ea283+_0x60ab20);for(const _0x217e50 of _0xbdc6bd){const _0x31b0c6=$dataWeapons[_0x217e50];if(!_0x31b0c6)continue;if(!VisuMZ[_0x5431a7(0x3a3)][_0x5431a7(0x325)](_0x31b0c6,_0x571525,_0x234c67))continue;_0x3c4a8b[_0x5431a7(0x480)]([0x1,_0x217e50,0x0,_0x31b0c6[_0x5431a7(0x45c)]]);}const _0x14fb52=_0x53c3f4[_0x5431a7(0x449)]>=_0x53c3f4[_0x5431a7(0x496)]?_0x53c3f4[_0x5431a7(0x496)]:_0x53c3f4['Step3End'],_0x5d3fa9=_0x53c3f4[_0x5431a7(0x449)]>=_0x53c3f4[_0x5431a7(0x496)]?_0x53c3f4['Step3End']:_0x53c3f4[_0x5431a7(0x496)],_0x5ad423=Array(_0x5d3fa9-_0x14fb52+0x1)[_0x5431a7(0x454)]()['map']((_0x22ad8e,_0x231c64)=>_0x14fb52+_0x231c64);for(const _0x4cc3e0 of _0x5ad423){if(_0x5431a7(0x1a4)===_0x5431a7(0x459)){const _0x47407b=_0x5431a7(0x249);if(this[_0x5431a7(0x4bc)][_0x47407b])return this[_0x5431a7(0x4bc)][_0x47407b];const _0x36680d=_0x398d4d['ItemsEquipsCore'][_0x5431a7(0x2e7)][_0x5431a7(0x241)],_0x490805=_0x5431a7(0x3ab)[_0x5431a7(0x564)](this['_item'][_0x5431a7(0x443)]);return _0x36680d[_0x490805];}else{const _0x288cc9=$dataArmors[_0x4cc3e0];if(!_0x288cc9)continue;if(!VisuMZ[_0x5431a7(0x3a3)][_0x5431a7(0x325)](_0x288cc9,_0x571525,_0x234c67))continue;_0x3c4a8b[_0x5431a7(0x480)]([0x2,_0x4cc3e0,0x0,_0x288cc9[_0x5431a7(0x45c)]]);}}SceneManager[_0x5431a7(0x480)](Scene_Shop),SceneManager[_0x5431a7(0x185)](_0x3c4a8b,_0x53c3f4[_0x5431a7(0x388)]);}),VisuMZ['ItemsEquipsCore']['IncludeShopItem']=function(_0x234604,_0x599b7a,_0xac1db9){const _0x4c964f=_0x1087a8;if(_0x234604[_0x4c964f(0x354)][_0x4c964f(0x187)]()==='')return![];if(_0x234604[_0x4c964f(0x354)][_0x4c964f(0x4b8)](/-----/i))return![];const _0x33d192=_0x234604[_0x4c964f(0x591)];if(_0x599b7a[_0x4c964f(0x490)]>0x0){if(_0x4c964f(0x57a)!=='qpaxs')_0x13ffae[_0x4c964f(0x4d2)]['isRightInputMode']['call'](this);else for(const _0x4554f7 of _0x599b7a){if(!_0x4554f7)continue;if(_0x33d192[_0x4c964f(0x5a5)](_0x4554f7))return![];}}if(_0xac1db9[_0x4c964f(0x490)]>0x0){for(const _0x2cf242 of _0xac1db9){if(!_0x2cf242)continue;if(_0x33d192[_0x4c964f(0x5a5)](_0x2cf242))return!![];}return![];}return!![];},VisuMZ[_0x1087a8(0x3a3)][_0x1087a8(0x47b)]=Scene_Boot[_0x1087a8(0x4d2)]['onDatabaseLoaded'],Scene_Boot[_0x1087a8(0x4d2)][_0x1087a8(0x25a)]=function(){const _0x4697a4=_0x1087a8;this['process_VisuMZ_ItemsEquipsCore_RegExp'](),VisuMZ[_0x4697a4(0x3a3)]['Scene_Boot_onDatabaseLoaded']['call'](this),this['process_VisuMZ_ItemsEquipsCore_Notetags']();},Scene_Boot['prototype'][_0x1087a8(0x5c9)]=function(){const _0x40f637=_0x1087a8;VisuMZ[_0x40f637(0x3a3)][_0x40f637(0x2e9)]={},VisuMZ[_0x40f637(0x3a3)]['RegExp'][_0x40f637(0x3f7)]=[],VisuMZ[_0x40f637(0x3a3)][_0x40f637(0x2e9)]['BorderRegExp']=[];const _0xf46641=[_0x40f637(0x2e6),'MaxMP',_0x40f637(0x20b),_0x40f637(0x38c),_0x40f637(0x3d7),_0x40f637(0x59f),'AGI',_0x40f637(0x248)];for(const _0xfbd8b4 of _0xf46641){const _0x3363f5=_0x40f637(0x1a1)[_0x40f637(0x564)](_0xfbd8b4);VisuMZ[_0x40f637(0x3a3)][_0x40f637(0x2e9)][_0x40f637(0x3f7)][_0x40f637(0x480)](new RegExp(_0x3363f5,'i'));const _0x2533d2=_0x40f637(0x39f)[_0x40f637(0x564)](_0xfbd8b4);VisuMZ[_0x40f637(0x3a3)][_0x40f637(0x2e9)][_0x40f637(0x43d)][_0x40f637(0x480)](new RegExp(_0x2533d2,'g'));}},Scene_Boot['prototype'][_0x1087a8(0x1df)]=function(){const _0xf3311c=_0x1087a8;if(VisuMZ['ParseAllNotetags'])return;this[_0xf3311c(0x18d)]();const _0x1b2cd2=[$dataItems,$dataWeapons,$dataArmors];for(const _0x24d364 of _0x1b2cd2){for(const _0xce6fc0 of _0x24d364){if(_0xf3311c(0x2e2)!==_0xf3311c(0x2e2))return _0x384236[_0xf3311c(0x3a3)][_0xf3311c(0x192)][_0xf3311c(0x539)](this);else{if(!_0xce6fc0)continue;VisuMZ[_0xf3311c(0x3a3)][_0xf3311c(0x582)](_0xce6fc0,_0x24d364),VisuMZ[_0xf3311c(0x3a3)][_0xf3311c(0x1d8)](_0xce6fc0,_0x24d364),VisuMZ[_0xf3311c(0x3a3)][_0xf3311c(0x4d9)](_0xce6fc0,_0x24d364),VisuMZ[_0xf3311c(0x3a3)][_0xf3311c(0x263)](_0xce6fc0,_0x24d364),VisuMZ[_0xf3311c(0x3a3)][_0xf3311c(0x1a9)](_0xce6fc0,_0x24d364);}}}},Scene_Boot[_0x1087a8(0x4d2)][_0x1087a8(0x18d)]=function(){const _0x433d49=_0x1087a8;for(const _0x31af0c of $dataClasses){if(!_0x31af0c)continue;VisuMZ[_0x433d49(0x3a3)][_0x433d49(0x40e)](_0x31af0c);}},VisuMZ[_0x1087a8(0x3a3)][_0x1087a8(0x4bf)]=VisuMZ[_0x1087a8(0x4bf)],VisuMZ[_0x1087a8(0x4bf)]=function(_0x3405d2){const _0x4257a4=_0x1087a8;VisuMZ[_0x4257a4(0x3a3)][_0x4257a4(0x4bf)][_0x4257a4(0x539)](this,_0x3405d2),VisuMZ[_0x4257a4(0x3a3)]['Parse_Notetags_EquipSlots'](_0x3405d2);},VisuMZ[_0x1087a8(0x3a3)][_0x1087a8(0x3a1)]=VisuMZ[_0x1087a8(0x3a1)],VisuMZ[_0x1087a8(0x3a1)]=function(_0x50d80c){const _0x5b6ea4=_0x1087a8;VisuMZ[_0x5b6ea4(0x3a3)]['ParseItemNotetags'][_0x5b6ea4(0x539)](this,_0x50d80c),VisuMZ[_0x5b6ea4(0x3a3)]['Parse_Notetags_Batch'](_0x50d80c,$dataItems);},VisuMZ[_0x1087a8(0x3a3)][_0x1087a8(0x405)]=VisuMZ[_0x1087a8(0x405)],VisuMZ[_0x1087a8(0x405)]=function(_0x8b97a2){const _0x2046ea=_0x1087a8;VisuMZ[_0x2046ea(0x3a3)][_0x2046ea(0x405)][_0x2046ea(0x539)](this,_0x8b97a2),VisuMZ[_0x2046ea(0x3a3)][_0x2046ea(0x235)](_0x8b97a2,$dataWeapons);},VisuMZ['ItemsEquipsCore'][_0x1087a8(0x5c6)]=VisuMZ[_0x1087a8(0x5c6)],VisuMZ[_0x1087a8(0x5c6)]=function(_0x81d0b6){const _0x57f82a=_0x1087a8;VisuMZ[_0x57f82a(0x3a3)]['ParseArmorNotetags'][_0x57f82a(0x539)](this,_0x81d0b6),VisuMZ[_0x57f82a(0x3a3)][_0x57f82a(0x235)](_0x81d0b6,$dataArmors);},VisuMZ['ItemsEquipsCore'][_0x1087a8(0x40e)]=function(_0x5c7251){const _0x56ff5b=_0x1087a8;_0x5c7251[_0x56ff5b(0x4b6)]=[];if(!BattleManager[_0x56ff5b(0x246)]()&&_0x5c7251[_0x56ff5b(0x3c7)][_0x56ff5b(0x4b8)](/<EQUIP SLOTS>\s*([\s\S]*)\s*<\/EQUIP SLOTS>/i)){const _0x32933e=String(RegExp['$1'])[_0x56ff5b(0x2a0)](/[\r\n]+/);for(const _0x2179d8 of _0x32933e){const _0x39ecf6=$dataSystem['equipTypes']['indexOf'](_0x2179d8[_0x56ff5b(0x187)]());if(_0x39ecf6>0x0)_0x5c7251['equipSlots'][_0x56ff5b(0x480)](_0x39ecf6);}}else{if('lhCzo'===_0x56ff5b(0x4a7)){_0x1cb189=_0x3efa94||this['lineHeight'](),this['contentsBack'][_0x56ff5b(0x2bd)]=0xa0;const _0x1b7913=_0x3b5e95[_0x56ff5b(0x5a0)]();this['contentsBack']['fillRect'](_0x1e9965+0x1,_0x3e927e+0x1,_0x5684ea-0x2,_0x207db0-0x2,_0x1b7913),this[_0x56ff5b(0x473)][_0x56ff5b(0x2bd)]=0xff;}else for(const _0x133cbd of $dataSystem[_0x56ff5b(0x3e8)]){if(_0x56ff5b(0x34d)===_0x56ff5b(0x34d)){const _0x560d1b=$dataSystem[_0x56ff5b(0x3e8)][_0x56ff5b(0x197)](_0x133cbd['trim']());if(_0x560d1b>0x0)_0x5c7251[_0x56ff5b(0x4b6)][_0x56ff5b(0x480)](_0x560d1b);}else{if(!_0x5d6dbc[_0x56ff5b(0x58a)](_0x20e718))return![];}}}},VisuMZ[_0x1087a8(0x3a3)][_0x1087a8(0x235)]=function(_0x5857da,_0x32d001){const _0x2cc298=_0x1087a8;VisuMZ[_0x2cc298(0x3a3)][_0x2cc298(0x582)](_0x5857da,_0x32d001),VisuMZ[_0x2cc298(0x3a3)][_0x2cc298(0x1d8)](_0x5857da,_0x32d001),VisuMZ[_0x2cc298(0x3a3)][_0x2cc298(0x4d9)](_0x5857da,_0x32d001),VisuMZ['ItemsEquipsCore'][_0x2cc298(0x263)](_0x5857da,_0x32d001),VisuMZ[_0x2cc298(0x3a3)][_0x2cc298(0x1a9)](_0x5857da,_0x32d001);},VisuMZ[_0x1087a8(0x3a3)][_0x1087a8(0x582)]=function(_0x45ad0a,_0x3c5d96){const _0x48762e=_0x1087a8;_0x45ad0a[_0x48762e(0x591)]=[];const _0x2c5cd5=_0x45ad0a[_0x48762e(0x3c7)],_0x4707cf=_0x2c5cd5['match'](/<(?:CATEGORY|CATEGORIES):[ ](.*)>/gi);if(_0x4707cf)for(const _0x23ca00 of _0x4707cf){if(_0x48762e(0x3c8)==='UQoyy'){_0x23ca00[_0x48762e(0x4b8)](/<(?:CATEGORY|CATEGORIES):[ ](.*)>/gi);const _0x5abcbe=String(RegExp['$1'])['toUpperCase']()[_0x48762e(0x187)]()[_0x48762e(0x2a0)](',');for(const _0xb13651 of _0x5abcbe){_0x48762e(0x372)!==_0x48762e(0x372)?(_0x413a70===this[_0x48762e(0x4ba)]()&&(this[_0x48762e(0x521)]=!![]),this[_0x48762e(0x184)](),this['select'](_0x26dd06)):_0x45ad0a['categories']['push'](_0xb13651[_0x48762e(0x187)]());}}else{const _0x30e89e=0x0,_0xa16e11=this[_0x48762e(0x574)](),_0x3ed53f=_0x2ac09d['boxWidth'],_0x383efc=this[_0x48762e(0x44e)](0x1,!![]);return new _0xc42a1(_0x30e89e,_0xa16e11,_0x3ed53f,_0x383efc);}}if(_0x2c5cd5[_0x48762e(0x4b8)](/<(?:CATEGORY|CATEGORIES)>\s*([\s\S]*)\s*<\/(?:CATEGORY|CATEGORIES)>/i)){if(_0x48762e(0x524)!==_0x48762e(0x524))return _0x19cdb3[_0x48762e(0x3a3)][_0x48762e(0x2e7)][_0x48762e(0x274)]['CmdStyle'];else{const _0x5bacc8=RegExp['$1'][_0x48762e(0x2a0)](/[\r\n]+/);for(const _0x22d7cb of _0x5bacc8){if(_0x48762e(0x3de)===_0x48762e(0x22e))return!![];else _0x45ad0a[_0x48762e(0x591)][_0x48762e(0x480)](_0x22d7cb[_0x48762e(0x37a)]()[_0x48762e(0x187)]());}}}},VisuMZ[_0x1087a8(0x3a3)]['Parse_Notetags_Prices']=function(_0x2175f5,_0x2a26f2){const _0x987370=_0x1087a8;_0x2175f5[_0x987370(0x3c7)][_0x987370(0x4b8)](/<PRICE:[ ](\d+)>/i)&&(_0x987370(0x3bf)!==_0x987370(0x51c)?_0x2175f5[_0x987370(0x45c)]=Number(RegExp['$1']):(!this[_0x987370(0x536)]('pagedown')&&_0x28b9d7[_0x987370(0x469)](_0x987370(0x437))&&this[_0x987370(0x545)](),!this[_0x987370(0x536)](_0x987370(0x478))&&_0x5cd4a4[_0x987370(0x469)](_0x987370(0x478))&&this['cursorPageup']()));},VisuMZ[_0x1087a8(0x3a3)]['Parse_Notetags_ParamValues']=function(_0x32de45,_0x44aedc){const _0x400fb0=_0x1087a8;if(_0x44aedc===$dataItems)return;for(let _0x5a21b9=0x0;_0x5a21b9<0x8;_0x5a21b9++){const _0x24efc0=VisuMZ[_0x400fb0(0x3a3)]['RegExp']['EquipParams'][_0x5a21b9];_0x32de45[_0x400fb0(0x3c7)][_0x400fb0(0x4b8)](_0x24efc0)&&(_0x32de45[_0x400fb0(0x342)][_0x5a21b9]=parseInt(RegExp['$1']));}},VisuMZ['ItemsEquipsCore'][_0x1087a8(0x160)]={},VisuMZ['ItemsEquipsCore'][_0x1087a8(0x263)]=function(_0x758110,_0x4a224e){const _0x1d98cc=_0x1087a8;if(_0x4a224e===$dataItems)return;if(_0x758110[_0x1d98cc(0x3c7)][_0x1d98cc(0x4b8)](/<JS PARAMETERS>\s*([\s\S]*)\s*<\/JS PARAMETERS>/i)){const _0x3272d4=String(RegExp['$1']),_0x45b8da=(_0x4a224e===$dataWeapons?_0x1d98cc(0x3d3):_0x1d98cc(0x180))[_0x1d98cc(0x564)](_0x758110['id']),_0x4ed8ed=_0x1d98cc(0x418)[_0x1d98cc(0x564)](_0x3272d4);for(let _0x5918df=0x0;_0x5918df<0x8;_0x5918df++){if(_0x1d98cc(0x271)!==_0x1d98cc(0x2a7)){if(_0x3272d4[_0x1d98cc(0x4b8)](VisuMZ['ItemsEquipsCore'][_0x1d98cc(0x2e9)]['BorderRegExp'][_0x5918df])){if(_0x1d98cc(0x573)!=='gvCOJ')return _0x310c32['getInputButtonString'](_0x1d98cc(0x3f2));else{const _0x39c20f=_0x1d98cc(0x373)[_0x1d98cc(0x564)](_0x45b8da,_0x5918df);VisuMZ[_0x1d98cc(0x3a3)][_0x1d98cc(0x160)][_0x39c20f]=new Function(_0x1d98cc(0x4b2),_0x1d98cc(0x5cf),_0x4ed8ed);}}}else{const _0x101967='MP\x20DAMAGE';if(this[_0x1d98cc(0x297)][_0x1d98cc(0x4e9)]>=0x0&&this['_itemData']['flatMP']>=0x0&&!this[_0x1d98cc(0x4bc)][_0x101967])return![];const _0x5b44e1=this[_0x1d98cc(0x256)]();this[_0x1d98cc(0x308)](_0x5b44e1,_0x4e4b85,_0x482651,_0x37be99,!![]);const _0x5cee93=this['getItemEffectsMpDamageText']();return this['changeTextColor'](_0x260e65[_0x1d98cc(0x29c)](0x2)),this[_0x1d98cc(0x308)](_0x5cee93,_0x5a1e4a,_0x16f9ef,_0x254fe2,![],_0x1d98cc(0x4ec)),this[_0x1d98cc(0x526)](_0x56d924,_0x3a0291,_0x550bec),this['resetFontSettings'](),!![];}}}},VisuMZ['ItemsEquipsCore'][_0x1087a8(0x556)]={},VisuMZ['ItemsEquipsCore'][_0x1087a8(0x1a9)]=function(_0x4d647c,_0x555e0a){const _0x5582ac=_0x1087a8;if(_0x555e0a!==$dataItems)return;if(_0x4d647c[_0x5582ac(0x3c7)]['match'](/<JS ITEM ENABLE>\s*([\s\S]*)\s*<\/JS ITEM ENABLE>/i)){const _0x1b27f3=String(RegExp['$1']),_0x54b682='\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20enabled\x20=\x20true;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20enabled;\x0a\x20\x20\x20\x20\x20\x20\x20\x20'[_0x5582ac(0x564)](_0x1b27f3);VisuMZ[_0x5582ac(0x3a3)][_0x5582ac(0x556)][_0x4d647c['id']]=new Function(_0x5582ac(0x4b2),_0x54b682);}},DataManager['isKeyItem']=function(_0x490402){const _0x954bbc=_0x1087a8;return this[_0x954bbc(0x468)](_0x490402)&&_0x490402['itypeId']===0x2;},DataManager[_0x1087a8(0x4fe)]=function(_0x1313a8){const _0xd10d31=_0x1087a8;if(!_0x1313a8){if(_0xd10d31(0x34f)===_0xd10d31(0x34f))return 0x63;else{const _0x50dedc=this[_0xd10d31(0x1dc)](_0xd737a);if(_0x50dedc[_0xd10d31(0x4b8)](/\\I\[(\d+)\]/i)){const _0x3e1e91=this['itemLineRect'](_0x5481c5),_0x4e0f26=this[_0xd10d31(0x5d2)](_0x50dedc)[_0xd10d31(0x16c)];return _0x4e0f26<=_0x3e1e91[_0xd10d31(0x16c)]?_0xd10d31(0x2ef):_0xd10d31(0x1ec);}}}else{if(_0x1313a8[_0xd10d31(0x3c7)]['match'](/<MAX:[ ](\d+)>/i)){if('aTnTw'===_0xd10d31(0x5aa))return parseInt(RegExp['$1']);else _0x28f432=_0x3c8f34[_0xd10d31(0x3bc)](_0xbdb446),_0x54b044=_0x37cb3e-_0x19bfa3[_0xd10d31(0x3bc)](_0x1f632e),this['changeTextColor'](_0x4ada69[_0xd10d31(0x49a)](_0x13cd5c)),_0x2fe7ca=(_0x4bb980>=0x0?'+':'')+_0xa23a87['ConvertNumberToString'](_0x1f5162,0x0,_0x2543d9);}else return this[_0xd10d31(0x428)](_0x1313a8);}},DataManager[_0x1087a8(0x428)]=function(_0x5b6adf){const _0x34e22f=_0x1087a8;if(this[_0x34e22f(0x468)](_0x5b6adf))return _0x34e22f(0x324)!==_0x34e22f(0x324)?_0x25b727[_0x34e22f(0x3a3)][_0x34e22f(0x2e7)][_0x34e22f(0x274)][_0x34e22f(0x453)]:VisuMZ['ItemsEquipsCore'][_0x34e22f(0x2e7)][_0x34e22f(0x595)][_0x34e22f(0x1b0)];else{if(this[_0x34e22f(0x34c)](_0x5b6adf))return VisuMZ[_0x34e22f(0x3a3)][_0x34e22f(0x2e7)]['ItemScene'][_0x34e22f(0x2ae)];else{if(this[_0x34e22f(0x56a)](_0x5b6adf)){if(_0x34e22f(0x416)!==_0x34e22f(0x4f5))return VisuMZ[_0x34e22f(0x3a3)][_0x34e22f(0x2e7)][_0x34e22f(0x595)][_0x34e22f(0x52c)];else _0x1db20c=_0x16420f[_0x34e22f(0x286)]((this['innerWidth']-_0x42ac69)/0x2);}}}},ColorManager[_0x1087a8(0x21e)]=function(_0x31ea66){const _0x5964f7=_0x1087a8;if(!_0x31ea66){if(_0x5964f7(0x259)===_0x5964f7(0x259))return this[_0x5964f7(0x255)]();else this[_0x5964f7(0x514)](),this[_0x5964f7(0x232)](),this[_0x5964f7(0x489)]();}else{if(_0x31ea66[_0x5964f7(0x3c7)][_0x5964f7(0x4b8)](/<COLOR:[ ](\d+)>/i))return this[_0x5964f7(0x3e5)](Number(RegExp['$1'])['clamp'](0x0,0x1f));else return _0x31ea66[_0x5964f7(0x3c7)][_0x5964f7(0x4b8)](/<COLOR:[ ]#(.*)>/i)?'zZJLc'!==_0x5964f7(0x46d)?this[_0x5964f7(0x45f)]()?this['helpWindowRectItemsEquipsCore']():_0x3f0d52[_0x5964f7(0x4d2)]['helpWindowRect'][_0x5964f7(0x539)](this):'#'+String(RegExp['$1']):this[_0x5964f7(0x255)]();}},ColorManager[_0x1087a8(0x49f)]=function(_0x383843){const _0x28c327=_0x1087a8;return _0x383843=String(_0x383843),_0x383843['match'](/#(.*)/i)?_0x28c327(0x2fe)[_0x28c327(0x564)](String(RegExp['$1'])):this[_0x28c327(0x3e5)](Number(_0x383843));},SceneManager[_0x1087a8(0x335)]=function(){const _0x214fce=_0x1087a8;return this[_0x214fce(0x4a0)]&&this['_scene'][_0x214fce(0x4c4)]===Scene_Shop;},Game_Temp[_0x1087a8(0x4d2)]['newLabelEnabled']=function(){const _0x13ee45=_0x1087a8;if(this['_bypassNewLabel'])return![];return VisuMZ[_0x13ee45(0x3a3)]['Settings']['New'][_0x13ee45(0x2f7)];},VisuMZ['ShopMenuStatusStandard']=VisuMZ['ItemsEquipsCore'][_0x1087a8(0x2e7)]['StatusWindow']['MultiplierStandard'],VisuMZ[_0x1087a8(0x3a3)][_0x1087a8(0x481)]=Game_BattlerBase['prototype'][_0x1087a8(0x1a5)],Game_BattlerBase['prototype'][_0x1087a8(0x1a5)]=function(_0x3ae7e8){const _0x550e00=_0x1087a8;if(this['_shopStatusMenuMode']){if(_0x550e00(0x491)!==_0x550e00(0x491)){const _0x2bd4ad=this['_newLabelSprites'];if(_0x2bd4ad[_0x3e92b7])return _0x2bd4ad[_0x1df9e7];else{const _0x2133b7=new _0x6f3cb7();return _0x2bd4ad[_0x530293]=_0x2133b7,this[_0x550e00(0x1fb)](_0x2133b7),_0x2133b7;}}else return this['_shopStatusMenuAlly']?VisuMZ['ShopMenuStatusStandard']:0x1;}else return VisuMZ['ItemsEquipsCore']['Game_BattlerBase_param'][_0x550e00(0x539)](this,_0x3ae7e8);},VisuMZ['ItemsEquipsCore'][_0x1087a8(0x5a9)]=Game_BattlerBase['prototype'][_0x1087a8(0x266)],Game_BattlerBase[_0x1087a8(0x4d2)][_0x1087a8(0x266)]=function(_0x3e1570){const _0xff2d84=_0x1087a8;if(!_0x3e1570)return![];if(!VisuMZ['ItemsEquipsCore'][_0xff2d84(0x5a9)]['call'](this,_0x3e1570))return![];if(!this[_0xff2d84(0x565)](_0x3e1570))return![];if(!this[_0xff2d84(0x559)](_0x3e1570))return![];return!![];},Game_BattlerBase[_0x1087a8(0x4d2)][_0x1087a8(0x565)]=function(_0x2d67db){const _0x1722e8=_0x1087a8;if(!this[_0x1722e8(0x411)](_0x2d67db))return![];return!![];},Game_BattlerBase[_0x1087a8(0x4d2)]['checkItemConditionsSwitchNotetags']=function(_0x293083){const _0x4366b0=_0x1087a8,_0x5350d4=_0x293083[_0x4366b0(0x3c7)];if(_0x5350d4['match'](/<ENABLE[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x370bd8=JSON[_0x4366b0(0x1b3)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x241b7f of _0x370bd8){if(!$gameSwitches['value'](_0x241b7f))return![];}return!![];}if(_0x5350d4[_0x4366b0(0x4b8)](/<ENABLE ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if('cWSDA'!=='Cucwi'){const _0x2b60b9=JSON[_0x4366b0(0x1b3)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0xe632e5 of _0x2b60b9){if(_0x4366b0(0x465)!==_0x4366b0(0x465)){_0x3d9468[_0x4366b0(0x3a3)][_0x4366b0(0x2e9)]={},_0x2008b0['ItemsEquipsCore'][_0x4366b0(0x2e9)][_0x4366b0(0x3f7)]=[],_0x4b8611[_0x4366b0(0x3a3)][_0x4366b0(0x2e9)][_0x4366b0(0x43d)]=[];const _0x6ccfd3=[_0x4366b0(0x2e6),_0x4366b0(0x234),_0x4366b0(0x20b),_0x4366b0(0x38c),_0x4366b0(0x3d7),_0x4366b0(0x59f),'AGI',_0x4366b0(0x248)];for(const _0x2d8469 of _0x6ccfd3){const _0x485fdf=_0x4366b0(0x1a1)[_0x4366b0(0x564)](_0x2d8469);_0x25fdd2[_0x4366b0(0x3a3)][_0x4366b0(0x2e9)][_0x4366b0(0x3f7)]['push'](new _0x1a426a(_0x485fdf,'i'));const _0x3cfc79=_0x4366b0(0x39f)[_0x4366b0(0x564)](_0x2d8469);_0x4bd4ff[_0x4366b0(0x3a3)][_0x4366b0(0x2e9)][_0x4366b0(0x43d)]['push'](new _0x3e8b4a(_0x3cfc79,'g'));}}else{if(!$gameSwitches[_0x4366b0(0x58a)](_0xe632e5))return![];}}return!![];}else{if(this[_0x4366b0(0x467)])return 0x0;const _0x2bcafe=(_0x5d5a71[_0x4366b0(0x34c)](_0x1f9e0d)?_0x4366b0(0x3d3):_0x4366b0(0x180))[_0x4366b0(0x564)](_0x195bbc['id']),_0x19c474=_0x4366b0(0x373)[_0x4366b0(0x564)](_0x2bcafe,_0x468de1);if(_0x2ca929['ItemsEquipsCore'][_0x4366b0(0x160)][_0x19c474]){this[_0x4366b0(0x467)]=!![];const _0x3d0e4e=_0x2efead[_0x4366b0(0x3a3)][_0x4366b0(0x160)][_0x19c474][_0x4366b0(0x539)](this,_0x41d0c7,_0x227b33);return this[_0x4366b0(0x467)]=![],_0x3d0e4e;}else return 0x0;}}if(_0x5350d4[_0x4366b0(0x4b8)](/<ENABLE ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x4366b0(0x36e)===_0x4366b0(0x5b1))return _0x246935['ItemsEquipsCore']['Settings'][_0x4366b0(0x274)]['CommandAddOptimize'];else{const _0x384b4f=JSON['parse']('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x426a15 of _0x384b4f){if($gameSwitches[_0x4366b0(0x58a)](_0x426a15))return!![];}return![];}}if(_0x5350d4[_0x4366b0(0x4b8)](/<DISABLE[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x4366b0(0x380)!==_0x4366b0(0x402)){const _0x174a44=JSON[_0x4366b0(0x1b3)]('['+RegExp['$1'][_0x4366b0(0x4b8)](/\d+/g)+']');for(const _0x11b57d of _0x174a44){if(_0x4366b0(0x4b0)!==_0x4366b0(0x4b0))return _0x926ae7[_0x4366b0(0x4d2)][_0x4366b0(0x2b1)][_0x4366b0(0x539)](this);else{if(!$gameSwitches[_0x4366b0(0x58a)](_0x11b57d))return!![];}}return![];}else{const _0x25edcf=_0x3e21f6[_0x17f202];if(_0x25edcf&&_0x25edcf[_0x4366b0(0x3b1)]>0x0){_0x50860c+=_0x4366b0(0x452)[_0x4366b0(0x564)](_0x25edcf[_0x4366b0(0x3b1)]),_0x52192f++;if(_0x5bfb9b>=_0x3ba67e)return _0x12d8bd;}}}if(_0x5350d4['match'](/<DISABLE ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x4366b0(0x4ea)!==_0x4366b0(0x23c)){const _0x533475=JSON[_0x4366b0(0x1b3)]('['+RegExp['$1'][_0x4366b0(0x4b8)](/\d+/g)+']');for(const _0x5dcb4d of _0x533475){if('pGZeK'===_0x4366b0(0x27f)){if(!$gameSwitches[_0x4366b0(0x58a)](_0x5dcb4d))return!![];}else{const _0x33db4a=_0x4366b0(0x48c);if(this[_0x4366b0(0x297)][_0x4366b0(0x466)]===0x0&&!this[_0x4366b0(0x4bc)][_0x33db4a])return![];const _0x706551=this[_0x4366b0(0x457)]();this[_0x4366b0(0x308)](_0x706551,_0x2d4e66,_0x78ebcf,_0x123b70,!![]);const _0x276deb=this['getItemEffectsSelfTpGainText']();return this['_itemData']['selfTP']>0x0?this[_0x4366b0(0x1d7)](_0x42d5fe[_0x4366b0(0x5b9)]()):this[_0x4366b0(0x1d7)](_0x26bee3[_0x4366b0(0x250)]()),this[_0x4366b0(0x308)](_0x276deb,_0x393604,_0x5c4d19,_0x158222,![],'right'),this[_0x4366b0(0x526)](_0x398fb6,_0x352333,_0x1614d1),this[_0x4366b0(0x14e)](),!![];}}return![];}else return this[_0x4366b0(0x3e5)](_0x5716b8(_0x2b5fdd));}if(_0x5350d4['match'](/<DISABLE ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if('vWjSW'===_0x4366b0(0x5a3)){const _0x2ddbdf=JSON[_0x4366b0(0x1b3)]('['+RegExp['$1'][_0x4366b0(0x4b8)](/\d+/g)+']');for(const _0x4a7ce7 of _0x2ddbdf){if($gameSwitches[_0x4366b0(0x58a)](_0x4a7ce7))return![];}return!![];}else return _0x84e99f[_0x4366b0(0x3a3)]['Settings'][_0x4366b0(0x241)][_0x4366b0(0x3b0)];}return!![];},Game_BattlerBase[_0x1087a8(0x4d2)][_0x1087a8(0x559)]=function(_0x8e8318){const _0x2c66a=_0x1087a8,_0x28e676=_0x8e8318[_0x2c66a(0x3c7)],_0x311aa1=VisuMZ[_0x2c66a(0x3a3)][_0x2c66a(0x556)];if(_0x311aa1[_0x8e8318['id']]){if(_0x2c66a(0x4d8)!=='NtKaV'){const _0x313dcd=_0x2bef6c[_0x2c66a(0x4d2)][_0x2c66a(0x399)](0x1,_0xd083b4);if(_0x313dcd>0x0){_0x46b38a+='\x5cI[%1]'[_0x2c66a(0x564)](_0x313dcd),_0x26c455++;if(_0x4bc932>=_0x2eab5d)return _0x23f2c0;}}else return _0x311aa1[_0x8e8318['id']][_0x2c66a(0x539)](this,_0x8e8318);}else return!![];},Game_Actor[_0x1087a8(0x4d2)][_0x1087a8(0x313)]=function(_0x2854eb){const _0x3370ae=_0x1087a8;_0x2854eb=this[_0x3370ae(0x1b8)](_0x2854eb);const _0x293e20=this['equipSlots']();this[_0x3370ae(0x2fc)]=[];for(let _0x21fa40=0x0;_0x21fa40<_0x293e20[_0x3370ae(0x490)];_0x21fa40++){_0x3370ae(0x2d2)!==_0x3370ae(0x2d2)?(this[_0x3370ae(0x1d6)][_0x3370ae(0x195)](),this[_0x3370ae(0x333)][_0x3370ae(0x195)]()):this[_0x3370ae(0x2fc)][_0x21fa40]=new Game_Item();}for(let _0x150d6d=0x0;_0x150d6d<_0x293e20[_0x3370ae(0x490)];_0x150d6d++){if(_0x3370ae(0x394)===_0x3370ae(0x366))_0x45411a[_0x3370ae(0x3a3)][_0x3370ae(0x2e7)][_0x3370ae(0x274)][_0x3370ae(0x45d)][_0x3370ae(0x539)](this),this[_0x3370ae(0x33f)]();else{const _0x7e311b=_0x293e20[_0x150d6d],_0x53d296=this[_0x3370ae(0x1dd)](_0x2854eb,_0x7e311b);if(this[_0x3370ae(0x455)](_0x53d296))this[_0x3370ae(0x2fc)][_0x150d6d][_0x3370ae(0x540)](_0x53d296);}}this[_0x3370ae(0x2d4)](!![]),this[_0x3370ae(0x44b)]();},Game_Actor[_0x1087a8(0x4d2)]['convertInitEquipsToItems']=function(_0x57f99f){const _0x7cbe18=_0x1087a8,_0x854aed=[];for(let _0x5588ab=0x0;_0x5588ab<_0x57f99f[_0x7cbe18(0x490)];_0x5588ab++){if(_0x7cbe18(0x39a)==='YxwRq'){const _0x431580=_0x57f99f[_0x5588ab];if(_0x431580<=0x0)continue;const _0x1980ad=$dataSystem['equipTypes'][_0x5588ab+0x1];if(_0x1980ad===$dataSystem[_0x7cbe18(0x3e8)][0x1]||_0x5588ab===0x1&&this['isDualWield']())_0x7cbe18(0x2fa)==='WbZVK'?_0x854aed[_0x7cbe18(0x480)]($dataWeapons[_0x431580]):(this[_0x7cbe18(0x3a8)]()&&(this[_0x7cbe18(0x333)][_0x7cbe18(0x598)](),this[_0x7cbe18(0x333)]['deactivate']()),_0xb1bc72[_0x7cbe18(0x3a3)][_0x7cbe18(0x4ee)][_0x7cbe18(0x539)](this));else{if(BattleManager[_0x7cbe18(0x246)]()){const _0x147373=$dataArmors[_0x431580];if(_0x147373[_0x7cbe18(0x499)]===_0x5588ab+0x1){if(_0x7cbe18(0x20f)!==_0x7cbe18(0x560))_0x854aed[_0x7cbe18(0x480)](_0x147373);else return _0x7cbe18(0x29d);}}else{const _0x4b245c=$dataArmors[_0x431580];if(_0x4b245c['etypeId']===_0x5588ab+0x1){if(_0x7cbe18(0x563)==='MwGCe')return;else _0x854aed[_0x7cbe18(0x480)](_0x4b245c);}}}}else{const _0x4119fe=_0x41f80c[_0x7cbe18(0x3dc)];this[_0x7cbe18(0x14a)](_0x4119fe,_0x25515f,_0x2509df,_0x9b4742,_0x7cbe18(0x331));}}return _0x854aed;},Game_Actor[_0x1087a8(0x4d2)][_0x1087a8(0x1dd)]=function(_0x40e523,_0xc9c3a5){const _0x54a41c=_0x1087a8;for(const _0x1cfcbd of _0x40e523){if(_0x54a41c(0x4c5)!=='VycEv'){if(!_0x1cfcbd)continue;if(_0x1cfcbd[_0x54a41c(0x499)]===_0xc9c3a5)return _0x40e523[_0x54a41c(0x479)](_0x40e523['indexOf'](_0x1cfcbd),0x1),_0x1cfcbd;}else{const _0xaea97a=this[_0x54a41c(0x2c8)](this[_0x54a41c(0x4ba)]());let _0x57bcec=this[_0x54a41c(0x1dc)](this[_0x54a41c(0x4ba)]());_0x57bcec=_0x57bcec[_0x54a41c(0x20c)](/\\I\[(\d+)\]/gi,''),_0x42c198[_0x54a41c(0x14e)](),this[_0x54a41c(0x2c4)](_0x57bcec,_0xaea97a),this[_0x54a41c(0x1c2)](_0x57bcec,_0xaea97a),this[_0x54a41c(0x314)](_0x57bcec,_0xaea97a);}}return null;},Game_Actor['prototype']['equipSlots']=function(){const _0x5516e5=_0x1087a8,_0x515ac6=JsonEx[_0x5516e5(0x48e)](this['_forcedSlots']||this[_0x5516e5(0x3a0)]()[_0x5516e5(0x4b6)]);if(_0x515ac6[_0x5516e5(0x490)]>=0x2&&this[_0x5516e5(0x2ff)]())_0x515ac6[0x1]=0x1;return _0x515ac6;},Game_Actor[_0x1087a8(0x4d2)][_0x1087a8(0x4e4)]=function(_0x345c54){const _0x1e0590=_0x1087a8;_0x345c54[_0x1e0590(0x3fd)](0x0),_0x345c54[_0x1e0590(0x3fd)](-0x1),this[_0x1e0590(0x1eb)]=_0x345c54,this[_0x1e0590(0x44b)](),this[_0x1e0590(0x4c0)]();},Game_Actor[_0x1087a8(0x4d2)][_0x1087a8(0x292)]=function(){const _0xeabfb3=_0x1087a8;this[_0xeabfb3(0x1eb)]=undefined,this[_0xeabfb3(0x44b)](),this['updateChangedSlots']();},Game_Actor['prototype'][_0x1087a8(0x4c0)]=function(){const _0x42abaf=_0x1087a8;let _0x1493bf=this[_0x42abaf(0x4b6)]()[_0x42abaf(0x490)];while(this['_equips']['length']>_0x1493bf){if(_0x42abaf(0x4c3)!==_0x42abaf(0x4c3))return _0x5b10dc[_0x42abaf(0x3a3)][_0x42abaf(0x2e7)]['ItemScene'][_0x42abaf(0x2b8)];else{const _0x5ded71=this[_0x42abaf(0x2fc)][this[_0x42abaf(0x2fc)][_0x42abaf(0x490)]-0x1];_0x5ded71&&_0x5ded71[_0x42abaf(0x534)]()&&$gameParty[_0x42abaf(0x4fc)](_0x5ded71[_0x42abaf(0x534)](),0x1),this[_0x42abaf(0x2fc)]['pop']();}}while(_0x1493bf>this[_0x42abaf(0x2fc)][_0x42abaf(0x490)]){this[_0x42abaf(0x2fc)]['push'](new Game_Item());}},Game_Actor[_0x1087a8(0x4d2)][_0x1087a8(0x2e8)]=function(){const _0x5e6bee=_0x1087a8,_0x10d347=this[_0x5e6bee(0x4b6)]();for(let _0x477459=0x0;_0x477459<_0x10d347['length'];_0x477459++){if(!this[_0x5e6bee(0x2fc)][_0x477459])this[_0x5e6bee(0x2fc)][_0x477459]=new Game_Item();}this[_0x5e6bee(0x2d4)](![]),this[_0x5e6bee(0x44b)]();},VisuMZ[_0x1087a8(0x3a3)]['Game_Actor_changeEquip']=Game_Actor[_0x1087a8(0x4d2)][_0x1087a8(0x477)],Game_Actor[_0x1087a8(0x4d2)][_0x1087a8(0x477)]=function(_0x4e9487,_0x565fb6){const _0xa551ae=_0x1087a8;if(!this['_tempActor']){if(_0xa551ae(0x3dd)===_0xa551ae(0x3dd)){const _0x8c4f5f=JsonEx[_0xa551ae(0x48e)](this);_0x8c4f5f[_0xa551ae(0x432)]=!![],VisuMZ[_0xa551ae(0x3a3)][_0xa551ae(0x4a4)][_0xa551ae(0x539)](this,_0x4e9487,_0x565fb6),this[_0xa551ae(0x483)](_0x8c4f5f);}else _0xc766c0[_0xa551ae(0x480)](_0x160919);}else VisuMZ[_0xa551ae(0x3a3)]['Game_Actor_changeEquip'][_0xa551ae(0x539)](this,_0x4e9487,_0x565fb6);},VisuMZ[_0x1087a8(0x3a3)][_0x1087a8(0x494)]=Game_Actor[_0x1087a8(0x4d2)][_0x1087a8(0x1e4)],Game_Actor['prototype']['forceChangeEquip']=function(_0x4759b3,_0x4cc1d7){const _0x5b8f2f=_0x1087a8;if(!this[_0x5b8f2f(0x432)]){const _0x301937=JsonEx['makeDeepCopy'](this);_0x301937[_0x5b8f2f(0x432)]=!![],VisuMZ[_0x5b8f2f(0x3a3)][_0x5b8f2f(0x494)][_0x5b8f2f(0x539)](this,_0x4759b3,_0x4cc1d7),this['equipAdjustHpMp'](_0x301937);}else VisuMZ[_0x5b8f2f(0x3a3)][_0x5b8f2f(0x494)][_0x5b8f2f(0x539)](this,_0x4759b3,_0x4cc1d7);},VisuMZ[_0x1087a8(0x3a3)][_0x1087a8(0x599)]=Game_Actor[_0x1087a8(0x4d2)]['discardEquip'],Game_Actor['prototype'][_0x1087a8(0x43a)]=function(_0x4cef5d){const _0x181752=_0x1087a8;if(!this[_0x181752(0x432)]){const _0x506aa8=JsonEx[_0x181752(0x48e)](this);_0x506aa8['_tempActor']=!![],VisuMZ[_0x181752(0x3a3)][_0x181752(0x599)][_0x181752(0x539)](this,_0x4cef5d),this['equipAdjustHpMp'](_0x506aa8);}else{if(_0x181752(0x32e)==='zmXdr')VisuMZ['ItemsEquipsCore']['Game_Actor_discardEquip'][_0x181752(0x539)](this,_0x4cef5d);else return this[_0x181752(0x45f)]()?this[_0x181752(0x1cb)]():_0xc08d6f['ItemsEquipsCore'][_0x181752(0x2a2)][_0x181752(0x539)](this);}},Game_Actor['prototype'][_0x1087a8(0x2d4)]=function(_0x3a9a5d){const _0x4cb223=_0x1087a8;if(this[_0x4cb223(0x50a)])return;for(;;){const _0x2778f0=this['equipSlots'](),_0x2de6d0=this[_0x4cb223(0x5bf)](),_0x591ad2=_0x2de6d0[_0x4cb223(0x490)];let _0x56e503=![];for(let _0x257d42=0x0;_0x257d42<_0x591ad2;_0x257d42++){if(_0x4cb223(0x4c7)==='psKhg'){const _0x399964=_0x2de6d0[_0x257d42];if(_0x399964&&(!this[_0x4cb223(0x455)](_0x399964)||_0x399964[_0x4cb223(0x499)]!==_0x2778f0[_0x257d42])){!_0x3a9a5d&&this[_0x4cb223(0x38d)](null,_0x399964);if(!this[_0x4cb223(0x432)]){const _0x115552=JsonEx['makeDeepCopy'](this);_0x115552[_0x4cb223(0x432)]=!![],this[_0x4cb223(0x2fc)][_0x257d42][_0x4cb223(0x540)](null),this[_0x4cb223(0x50a)]=!![],this['equipAdjustHpMp'](_0x115552),this[_0x4cb223(0x50a)]=undefined;}else this[_0x4cb223(0x2fc)][_0x257d42][_0x4cb223(0x540)](null);_0x56e503=!![];}}else{if(_0x599906[_0x4cb223(0x4a0)][_0x4cb223(0x4c4)]===_0x4a4f9d)return _0x56055a[_0x4cb223(0x3a3)][_0x4cb223(0x4eb)][_0x4cb223(0x539)](this);else return _0x3ea2f4[_0x4cb223(0x4a0)][_0x4cb223(0x4c4)]===_0x432ec2?_0x1c24dc['ItemsEquipsCore']['Window_ItemList_maxCols'][_0x4cb223(0x539)](this):_0x3e49de[_0x4cb223(0x3a3)][_0x4cb223(0x2e7)]['ItemScene']['ListWindowCols'];}}if(!_0x56e503)break;}},Game_Actor['prototype']['equipAdjustHpMp']=function(_0x2b8d0){const _0x4bbbc0=_0x1087a8;if(this[_0x4bbbc0(0x432)])return;if(!VisuMZ[_0x4bbbc0(0x3a3)]['Settings'][_0x4bbbc0(0x274)][_0x4bbbc0(0x424)])return;const _0x4a1651=Math[_0x4bbbc0(0x286)](_0x2b8d0['hpRate']()*this[_0x4bbbc0(0x182)]),_0x120e33=Math['round'](_0x2b8d0[_0x4bbbc0(0x52b)]()*this[_0x4bbbc0(0x24b)]);if(this['hp']>0x0)this[_0x4bbbc0(0x2d5)](_0x4a1651);if(this['mp']>0x0)this[_0x4bbbc0(0x4f1)](_0x120e33);},Game_Actor[_0x1087a8(0x4d2)][_0x1087a8(0x2ea)]=function(){const _0x4187b4=_0x1087a8,_0x4ef45e=this['equipSlots']()[_0x4187b4(0x490)];for(let _0x4e926e=0x0;_0x4e926e<_0x4ef45e;_0x4e926e++){if(_0x4187b4(0x52e)!==_0x4187b4(0x3c3)){if(this[_0x4187b4(0x276)](_0x4e926e))this[_0x4187b4(0x477)](_0x4e926e,null);}else _0xf76326['categories'][_0x4187b4(0x480)](_0x52f592[_0x4187b4(0x37a)]()[_0x4187b4(0x187)]());}},Game_Actor['prototype'][_0x1087a8(0x276)]=function(_0x1243be){const _0x1c689e=_0x1087a8;if(this[_0x1c689e(0x2dc)]()[_0x1c689e(0x5a5)](this[_0x1c689e(0x4b6)]()[_0x1243be])){if(_0x1c689e(0x429)!=='QYWXS'){if(this[_0x1c689e(0x351)]())return _0x1083fe['ItemsEquipsCore'][_0x1c689e(0x2e7)][_0x1c689e(0x595)][_0x1c689e(0x191)];else{if(this['_numberWindow']&&this[_0x1c689e(0x1c1)][_0x1c689e(0x3c5)])return _0x2e99ee[_0x1c689e(0x3a3)][_0x1c689e(0x2e7)][_0x1c689e(0x281)][_0x1c689e(0x36d)];}return _0x54480c[_0x1c689e(0x4d2)][_0x1c689e(0x164)][_0x1c689e(0x539)](this);}else return![];}else return this[_0x1c689e(0x586)](_0x1243be);},Game_Actor['prototype'][_0x1087a8(0x2dc)]=function(){const _0xbd9cc7=_0x1087a8;return VisuMZ[_0xbd9cc7(0x3a3)][_0xbd9cc7(0x2e7)]['EquipScene'][_0xbd9cc7(0x453)];},Game_Actor[_0x1087a8(0x4d2)][_0x1087a8(0x183)]=function(){const _0x41f7f2=_0x1087a8,_0x5590ed=this['equipSlots']()[_0x41f7f2(0x490)];for(let _0x228ff8=0x0;_0x228ff8<_0x5590ed;_0x228ff8++){if(this['isOptimizeEquipOk'](_0x228ff8))this[_0x41f7f2(0x477)](_0x228ff8,null);}for(let _0x55d657=0x0;_0x55d657<_0x5590ed;_0x55d657++){if('lwRMx'!==_0x41f7f2(0x530)){if(this[_0x41f7f2(0x2aa)](_0x55d657))this[_0x41f7f2(0x477)](_0x55d657,this[_0x41f7f2(0x4b3)](_0x55d657));}else{if(!_0x3f836b[_0x41f7f2(0x58a)](_0x372c13))return![];}}},Game_Actor[_0x1087a8(0x4d2)][_0x1087a8(0x2aa)]=function(_0x5f3862){const _0x503248=_0x1087a8;return this[_0x503248(0x551)]()[_0x503248(0x5a5)](this[_0x503248(0x4b6)]()[_0x5f3862])?![]:this['isEquipChangeOk'](_0x5f3862);},Game_Actor[_0x1087a8(0x4d2)][_0x1087a8(0x551)]=function(){const _0x26e3a1=_0x1087a8;return VisuMZ[_0x26e3a1(0x3a3)]['Settings'][_0x26e3a1(0x274)][_0x26e3a1(0x4a3)];},VisuMZ[_0x1087a8(0x3a3)][_0x1087a8(0x426)]=Game_Actor[_0x1087a8(0x4d2)][_0x1087a8(0x38d)],Game_Actor['prototype'][_0x1087a8(0x38d)]=function(_0x2bdf90,_0xc0c5b5){const _0x3802cc=_0x1087a8;if(this[_0x3802cc(0x432)])return![];$gameTemp[_0x3802cc(0x4c1)]=!![];const _0x53b32f=VisuMZ[_0x3802cc(0x3a3)]['Game_Actor_tradeItemWithParty']['call'](this,_0x2bdf90,_0xc0c5b5);return $gameTemp[_0x3802cc(0x4c1)]=![],_0x53b32f;},Game_Actor[_0x1087a8(0x4d2)][_0x1087a8(0x32a)]=function(_0x351b9e,_0x5a247e){const _0x2cace7=_0x1087a8,_0x1c2cf5=this[_0x2cace7(0x471)](_0x351b9e);if(_0x1c2cf5<0x0)return;const _0x387b2d=_0x351b9e===0x1?$dataWeapons[_0x5a247e]:$dataArmors[_0x5a247e];this[_0x2cace7(0x477)](_0x1c2cf5,_0x387b2d);},Game_Actor[_0x1087a8(0x4d2)]['getNextAvailableEtypeId']=function(_0x13f531){const _0x3d191d=_0x1087a8;let _0x523db7=0x0;const _0x508204=this['equipSlots'](),_0x430e1d=this['equips']();for(let _0x37ed9b=0x0;_0x37ed9b<_0x508204['length'];_0x37ed9b++){if(_0x3d191d(0x4f8)===_0x3d191d(0x4f8)){if(_0x508204[_0x37ed9b]===_0x13f531){_0x523db7=_0x37ed9b;if(!_0x430e1d[_0x37ed9b])return _0x523db7;}}else{const _0x30cdfc=this[_0x3d191d(0x2f9)](_0xb89393);_0x30cdfc?_0x49a480[_0x3d191d(0x4d2)][_0x3d191d(0x2d0)][_0x3d191d(0x539)](this,_0x32329c):this['drawRemoveItem'](_0x37281c);}}return _0x523db7;},VisuMZ['ItemsEquipsCore'][_0x1087a8(0x3a6)]=Game_Actor['prototype'][_0x1087a8(0x1bf)],Game_Actor[_0x1087a8(0x4d2)]['paramPlus']=function(_0x15bc44){const _0x261ac3=_0x1087a8;let _0x1e015b=VisuMZ[_0x261ac3(0x3a3)]['Game_Actor_paramPlus']['call'](this,_0x15bc44);for(const _0x2564d8 of this['equips']()){if(_0x2564d8)_0x1e015b+=this['paramPlusItemsEquipsCoreCustomJS'](_0x2564d8,_0x15bc44);}return _0x1e015b;},Game_Actor['prototype']['paramPlusItemsEquipsCoreCustomJS']=function(_0x4baf11,_0x47e3a2){const _0x78f7f8=_0x1087a8;if(this[_0x78f7f8(0x467)])return 0x0;const _0x42ac3d=(DataManager['isWeapon'](_0x4baf11)?_0x78f7f8(0x3d3):_0x78f7f8(0x180))[_0x78f7f8(0x564)](_0x4baf11['id']),_0x4abc=_0x78f7f8(0x373)[_0x78f7f8(0x564)](_0x42ac3d,_0x47e3a2);if(VisuMZ[_0x78f7f8(0x3a3)][_0x78f7f8(0x160)][_0x4abc]){if(_0x78f7f8(0x50b)===_0x78f7f8(0x50b)){this[_0x78f7f8(0x467)]=!![];const _0x33fa9c=VisuMZ['ItemsEquipsCore']['paramJS'][_0x4abc][_0x78f7f8(0x539)](this,_0x4baf11,_0x47e3a2);return this['_calculatingJSParameters']=![],_0x33fa9c;}else{const _0x4e2236=_0x42ce5b[_0x78f7f8(0x3a3)][_0x78f7f8(0x172)][_0x78f7f8(0x539)](this);return this['allowCreateStatusWindow']()&&this[_0x78f7f8(0x56e)]()&&(_0x4e2236[_0x78f7f8(0x16c)]-=this['statusWidth']()),_0x4e2236;}}else return 0x0;},Game_Actor[_0x1087a8(0x4d2)]['setShopStatusWindowMode']=function(_0x3ec321){const _0xfcbbb9=_0x1087a8;this[_0xfcbbb9(0x188)]=!![],this[_0xfcbbb9(0x22d)]=_0x3ec321;},VisuMZ[_0x1087a8(0x3a3)][_0x1087a8(0x1f9)]=Game_Party[_0x1087a8(0x4d2)]['initialize'],Game_Party[_0x1087a8(0x4d2)][_0x1087a8(0x1be)]=function(){const _0x981062=_0x1087a8;VisuMZ[_0x981062(0x3a3)][_0x981062(0x1f9)][_0x981062(0x539)](this),this['initNewItemsList']();},Game_Party[_0x1087a8(0x4d2)]['initNewItemsList']=function(){this['_newItemsList']=[];},Game_Party['prototype'][_0x1087a8(0x346)]=function(_0x48ec36){const _0x5f011f=_0x1087a8;if(!$gameTemp[_0x5f011f(0x19a)]())return![];if(this[_0x5f011f(0x34a)]===undefined)this[_0x5f011f(0x261)]();let _0x336fc0='';if(DataManager[_0x5f011f(0x468)](_0x48ec36))_0x336fc0='item-%1'['format'](_0x48ec36['id']);else{if(DataManager[_0x5f011f(0x34c)](_0x48ec36))_0x336fc0=_0x5f011f(0x414)[_0x5f011f(0x564)](_0x48ec36['id']);else{if(DataManager[_0x5f011f(0x56a)](_0x48ec36)){if(_0x5f011f(0x486)===_0x5f011f(0x299)){const _0x4f04ca='REMOVED\x20EFFECTS';if(!this[_0x5f011f(0x297)]['removeStateBuffChanges']&&!this[_0x5f011f(0x4bc)][_0x4f04ca])return![];const _0xd55a4d=this[_0x5f011f(0x18f)]();this[_0x5f011f(0x308)](_0xd55a4d,_0xbed89e,_0x221fd3,_0x3c3021,!![]);const _0xa09890=this['getItemEffectsRemovedStatesBuffsText']();return this[_0x5f011f(0x308)](_0xa09890,_0x5c58d1,_0x2dc0f3,_0x251ad5,![],'right'),this[_0x5f011f(0x526)](_0x590aee,_0x705378,_0x46c747),this['resetFontSettings'](),!![];}else _0x336fc0='armor-%1'[_0x5f011f(0x564)](_0x48ec36['id']);}else return;}}return this[_0x5f011f(0x34a)][_0x5f011f(0x5a5)](_0x336fc0);},Game_Party[_0x1087a8(0x4d2)][_0x1087a8(0x245)]=function(_0x24266e){const _0x23fc31=_0x1087a8;if(!$gameTemp['newLabelEnabled']())return;if(this['_newItemsList']===undefined)this[_0x23fc31(0x261)]();let _0x31e9d2='';if(DataManager[_0x23fc31(0x468)](_0x24266e))_0x31e9d2=_0x23fc31(0x484)[_0x23fc31(0x564)](_0x24266e['id']);else{if(DataManager[_0x23fc31(0x34c)](_0x24266e))_0x23fc31(0x462)===_0x23fc31(0x462)?_0x31e9d2=_0x23fc31(0x414)['format'](_0x24266e['id']):this[_0x23fc31(0x44c)](_0x397476[_0x23fc31(0x469)](_0x23fc31(0x23b)));else{if(DataManager[_0x23fc31(0x56a)](_0x24266e))_0x31e9d2=_0x23fc31(0x33c)[_0x23fc31(0x564)](_0x24266e['id']);else return;}}if(!this[_0x23fc31(0x34a)][_0x23fc31(0x5a5)](_0x31e9d2))this[_0x23fc31(0x34a)]['push'](_0x31e9d2);},Game_Party[_0x1087a8(0x4d2)][_0x1087a8(0x531)]=function(_0x5dd7e8){const _0x11d9e4=_0x1087a8;if(!$gameTemp[_0x11d9e4(0x19a)]())return;if(this[_0x11d9e4(0x34a)]===undefined)this[_0x11d9e4(0x261)]();let _0x5ed6d8='';if(DataManager['isItem'](_0x5dd7e8))_0x5ed6d8=_0x11d9e4(0x484)['format'](_0x5dd7e8['id']);else{if(DataManager[_0x11d9e4(0x34c)](_0x5dd7e8))_0x5ed6d8=_0x11d9e4(0x414)['format'](_0x5dd7e8['id']);else{if(DataManager['isArmor'](_0x5dd7e8))_0x5ed6d8='armor-%1'[_0x11d9e4(0x564)](_0x5dd7e8['id']);else return;}}this[_0x11d9e4(0x34a)]['includes'](_0x5ed6d8)&&this[_0x11d9e4(0x34a)][_0x11d9e4(0x479)](this['_newItemsList'][_0x11d9e4(0x197)](_0x5ed6d8),0x1);},VisuMZ[_0x1087a8(0x3a3)]['Game_Party_gainItem']=Game_Party['prototype'][_0x1087a8(0x4fc)],Game_Party['prototype'][_0x1087a8(0x4fc)]=function(_0x54d412,_0x5351e8,_0x2ba3f3){const _0x258fae=_0x1087a8,_0x366832=this['numItems'](_0x54d412);VisuMZ[_0x258fae(0x3a3)][_0x258fae(0x347)][_0x258fae(0x539)](this,_0x54d412,_0x5351e8,_0x2ba3f3);if(this[_0x258fae(0x28a)](_0x54d412)>_0x366832)this[_0x258fae(0x245)](_0x54d412);},Game_Party['prototype'][_0x1087a8(0x21a)]=function(_0x42969e){return DataManager['maxItemAmount'](_0x42969e);},VisuMZ['ItemsEquipsCore'][_0x1087a8(0x29e)]=Scene_ItemBase[_0x1087a8(0x4d2)][_0x1087a8(0x40a)],Scene_ItemBase[_0x1087a8(0x4d2)]['activateItemWindow']=function(){const _0x2373f4=_0x1087a8;VisuMZ[_0x2373f4(0x3a3)][_0x2373f4(0x29e)]['call'](this),this['_itemWindow'][_0x2373f4(0x35c)]();},Scene_Item[_0x1087a8(0x4d2)][_0x1087a8(0x260)]=function(){const _0x3ad341=_0x1087a8;if(ConfigManager['uiMenuStyle']&&ConfigManager[_0x3ad341(0x3bd)]!==undefined)return ConfigManager['uiHelpPosition'];else{if(this[_0x3ad341(0x45f)]())return this[_0x3ad341(0x518)]()['match'](/LOWER/i);else Scene_ItemBase[_0x3ad341(0x4d2)][_0x3ad341(0x16a)]['call'](this);}},Scene_Item['prototype'][_0x1087a8(0x16a)]=function(){const _0x1edcf0=_0x1087a8;if(ConfigManager[_0x1edcf0(0x312)]&&ConfigManager[_0x1edcf0(0x1a7)]!==undefined)return ConfigManager[_0x1edcf0(0x1a7)];else{if(this[_0x1edcf0(0x45f)]())return this[_0x1edcf0(0x518)]()[_0x1edcf0(0x4b8)](/RIGHT/i);else'Rtagv'!==_0x1edcf0(0x3f6)?Scene_ItemBase[_0x1edcf0(0x4d2)][_0x1edcf0(0x16a)][_0x1edcf0(0x539)](this):this[_0x1edcf0(0x545)]();}},Scene_Item[_0x1087a8(0x4d2)]['updatedLayoutStyle']=function(){const _0x266b7d=_0x1087a8;return VisuMZ[_0x266b7d(0x3a3)]['Settings'][_0x266b7d(0x595)]['LayoutStyle'];},Scene_Item[_0x1087a8(0x4d2)][_0x1087a8(0x3a8)]=function(){const _0x225c99=_0x1087a8;return this[_0x225c99(0x275)]&&this[_0x225c99(0x275)][_0x225c99(0x3a8)]();},Scene_Item['prototype'][_0x1087a8(0x45f)]=function(){const _0x31caa3=_0x1087a8;return VisuMZ['ItemsEquipsCore'][_0x31caa3(0x2e7)]['ItemScene'][_0x31caa3(0x4d5)];},VisuMZ['ItemsEquipsCore'][_0x1087a8(0x40d)]=Scene_Item['prototype'][_0x1087a8(0x57d)],Scene_Item[_0x1087a8(0x4d2)][_0x1087a8(0x57d)]=function(){const _0x175fc5=_0x1087a8;VisuMZ[_0x175fc5(0x3a3)][_0x175fc5(0x40d)][_0x175fc5(0x539)](this),this[_0x175fc5(0x3a8)]()&&this[_0x175fc5(0x4ae)]();},Scene_Item[_0x1087a8(0x4d2)][_0x1087a8(0x29f)]=function(){const _0xa57010=_0x1087a8;if(this['isUseItemsEquipsCoreUpdatedLayout']()){if(_0xa57010(0x224)!=='tshQo')return this[_0xa57010(0x589)]();else{if(this['_itemData'][_0xa57010(0x19f)][_0x2c3fb5]!==0x0)this['_itemData'][_0xa57010(0x542)]=!![];}}else return Scene_ItemBase[_0xa57010(0x4d2)][_0xa57010(0x29f)][_0xa57010(0x539)](this);},Scene_Item['prototype'][_0x1087a8(0x589)]=function(){const _0x313298=_0x1087a8,_0x1012cb=0x0,_0x3278d5=this[_0x313298(0x417)](),_0x36a10a=Graphics['boxWidth'],_0x51bfff=this[_0x313298(0x434)]();return new Rectangle(_0x1012cb,_0x3278d5,_0x36a10a,_0x51bfff);},VisuMZ[_0x1087a8(0x3a3)][_0x1087a8(0x517)]=Scene_Item[_0x1087a8(0x4d2)]['createCategoryWindow'],Scene_Item[_0x1087a8(0x4d2)]['createCategoryWindow']=function(){const _0x3b8409=_0x1087a8;VisuMZ[_0x3b8409(0x3a3)][_0x3b8409(0x517)][_0x3b8409(0x539)](this);if(this[_0x3b8409(0x3a8)]()){if(_0x3b8409(0x36f)===_0x3b8409(0x231)){_0x294e10[_0x3b8409(0x3b6)]?(_0x4a1777=this[_0x3b8409(0x3c4)]['paramValueByName'](_0x2aaae4,![]),_0x19270d=this[_0x3b8409(0x432)][_0x3b8409(0x3bc)](_0x54d219,![]),_0x1d126a=_0x12ad00(this[_0x3b8409(0x3c4)][_0x3b8409(0x3bc)](_0x526746,!![]))[_0x3b8409(0x4b8)](/([%％])/i)):(_0x4c6b72=this['_actor'][_0x3b8409(0x1a5)](_0xbdeef9),_0x5b2cb2=this[_0x3b8409(0x432)][_0x3b8409(0x1a5)](_0x562d8c),_0x2c9119=_0x277e22%0x1!==0x0||_0x16e2c2%0x1!==0x0);const _0x22f389=_0x3bd9ad,_0x2b1f1e=_0x411047,_0x567ddd=_0x2b1f1e-_0x22f389;let _0x30b787=_0x567ddd;if(_0x233ccc)_0x30b787=_0x1a20ab[_0x3b8409(0x286)](_0x567ddd*0x64)+'%';_0x567ddd!==0x0&&(this[_0x3b8409(0x1d7)](_0x58ddbf[_0x3b8409(0x49a)](_0x567ddd)),_0x30b787=(_0x567ddd>0x0?_0x3b8409(0x500):'(%1)')['format'](_0x30b787),this[_0x3b8409(0x14a)](_0x30b787,_0x561402+_0x4fbff6,_0x22a0e1,_0x4e0aae,_0x3b8409(0x27b)));}else this[_0x3b8409(0x3c6)]();}},Scene_Item[_0x1087a8(0x4d2)][_0x1087a8(0x3c6)]=function(){const _0x5b81a0=_0x1087a8;delete this[_0x5b81a0(0x275)][_0x5b81a0(0x470)]['ok'],delete this[_0x5b81a0(0x275)][_0x5b81a0(0x470)][_0x5b81a0(0x4f9)];},VisuMZ['ItemsEquipsCore'][_0x1087a8(0x1db)]=Scene_Item['prototype'][_0x1087a8(0x1f8)],Scene_Item[_0x1087a8(0x4d2)][_0x1087a8(0x1f8)]=function(){const _0x3ae8b9=_0x1087a8;return this[_0x3ae8b9(0x45f)]()?this[_0x3ae8b9(0x201)]():VisuMZ[_0x3ae8b9(0x3a3)][_0x3ae8b9(0x1db)]['call'](this);},Scene_Item[_0x1087a8(0x4d2)][_0x1087a8(0x201)]=function(){const _0x4cb104=_0x1087a8,_0x4d1f1b=0x0,_0x2ac31f=this['mainAreaTop'](),_0x30c0fe=Graphics[_0x4cb104(0x2ac)],_0x521a01=this[_0x4cb104(0x44e)](0x1,!![]);return new Rectangle(_0x4d1f1b,_0x2ac31f,_0x30c0fe,_0x521a01);},VisuMZ[_0x1087a8(0x3a3)]['Scene_Item_createItemWindow']=Scene_Item[_0x1087a8(0x4d2)]['createItemWindow'],Scene_Item[_0x1087a8(0x4d2)]['createItemWindow']=function(){const _0x28df15=_0x1087a8;VisuMZ[_0x28df15(0x3a3)][_0x28df15(0x2e0)]['call'](this),this[_0x28df15(0x3a8)]()&&this[_0x28df15(0x43f)](),this['allowCreateStatusWindow']()&&this[_0x28df15(0x151)]();},VisuMZ[_0x1087a8(0x3a3)][_0x1087a8(0x172)]=Scene_Item[_0x1087a8(0x4d2)]['itemWindowRect'],Scene_Item[_0x1087a8(0x4d2)]['itemWindowRect']=function(){const _0x794dde=_0x1087a8;if(this[_0x794dde(0x45f)]())return this[_0x794dde(0x2d9)]();else{if(_0x794dde(0x56f)!==_0x794dde(0x56f))_0x482429=_0x3f0bfa[_0x794dde(0x42b)];else{const _0x4549ff=VisuMZ[_0x794dde(0x3a3)][_0x794dde(0x172)][_0x794dde(0x539)](this);return this[_0x794dde(0x291)]()&&this[_0x794dde(0x56e)]()&&(_0x794dde(0x442)!=='RhMPx'?_0x511717=0x0:_0x4549ff[_0x794dde(0x16c)]-=this[_0x794dde(0x42c)]()),_0x4549ff;}}},Scene_Item[_0x1087a8(0x4d2)][_0x1087a8(0x2d9)]=function(){const _0x1f5287=_0x1087a8,_0x1ee5c3=this[_0x1f5287(0x16a)]()?this[_0x1f5287(0x42c)]():0x0,_0x3bf924=this[_0x1f5287(0x275)]['y']+this['_categoryWindow'][_0x1f5287(0x5cd)],_0x2a3b48=Graphics[_0x1f5287(0x2ac)]-this[_0x1f5287(0x42c)](),_0x1b3a61=this['mainAreaBottom']()-_0x3bf924;return new Rectangle(_0x1ee5c3,_0x3bf924,_0x2a3b48,_0x1b3a61);},Scene_Item[_0x1087a8(0x4d2)][_0x1087a8(0x43f)]=function(){const _0x36ada9=_0x1087a8;this[_0x36ada9(0x40f)]['setHandler'](_0x36ada9(0x4f9),this[_0x36ada9(0x3ac)][_0x36ada9(0x5c0)](this));},Scene_Item[_0x1087a8(0x4d2)][_0x1087a8(0x291)]=function(){const _0xcf7a11=_0x1087a8;if(this[_0xcf7a11(0x45f)]()){if(_0xcf7a11(0x2cb)===_0xcf7a11(0x2cb))return!![];else for(const _0x42c197 of _0x48288c['equipTypes']){const _0x134066=_0x43a49f[_0xcf7a11(0x3e8)][_0xcf7a11(0x197)](_0x42c197[_0xcf7a11(0x187)]());if(_0x134066>0x0)_0x12d75e[_0xcf7a11(0x4b6)][_0xcf7a11(0x480)](_0x134066);}}else return'NztQI'===_0xcf7a11(0x35b)?VisuMZ[_0xcf7a11(0x3a3)]['Settings'][_0xcf7a11(0x595)][_0xcf7a11(0x2a5)]:_0x448469[_0xcf7a11(0x3a3)]['Settings'][_0xcf7a11(0x241)][_0xcf7a11(0x209)];},Scene_Item[_0x1087a8(0x4d2)][_0x1087a8(0x56e)]=function(){const _0x1e8c85=_0x1087a8;return VisuMZ[_0x1e8c85(0x3a3)][_0x1e8c85(0x2e7)][_0x1e8c85(0x595)][_0x1e8c85(0x26f)];},Scene_Item[_0x1087a8(0x4d2)][_0x1087a8(0x151)]=function(){const _0x5831e9=_0x1087a8,_0x584bf3=this[_0x5831e9(0x498)]();this[_0x5831e9(0x2cd)]=new Window_ShopStatus(_0x584bf3),this[_0x5831e9(0x552)](this[_0x5831e9(0x2cd)]),this[_0x5831e9(0x40f)]['setStatusWindow'](this['_statusWindow']);const _0xa2b5cb=VisuMZ[_0x5831e9(0x3a3)][_0x5831e9(0x2e7)][_0x5831e9(0x595)]['ItemMenuStatusBgType'];this[_0x5831e9(0x2cd)][_0x5831e9(0x23f)](_0xa2b5cb||0x0);},Scene_Item[_0x1087a8(0x4d2)]['statusWindowRect']=function(){const _0x4254d=_0x1087a8;if(this[_0x4254d(0x45f)]()){if('JVfkR'!==_0x4254d(0x33a))return this[_0x4254d(0x1cb)]();else _0xb9585d[_0x4254d(0x4d2)]['processCursorMoveModernControls'][_0x4254d(0x539)](this);}else return VisuMZ[_0x4254d(0x3a3)][_0x4254d(0x2e7)][_0x4254d(0x595)][_0x4254d(0x358)][_0x4254d(0x539)](this);},Scene_Item[_0x1087a8(0x4d2)][_0x1087a8(0x1cb)]=function(){const _0x1f8aa7=_0x1087a8,_0x3de026=this['statusWidth'](),_0x223b9e=this[_0x1f8aa7(0x40f)]['height'],_0x3e5fb7=this[_0x1f8aa7(0x16a)]()?0x0:Graphics[_0x1f8aa7(0x2ac)]-this['statusWidth'](),_0x2bf977=this[_0x1f8aa7(0x40f)]['y'];return new Rectangle(_0x3e5fb7,_0x2bf977,_0x3de026,_0x223b9e);},Scene_Item[_0x1087a8(0x4d2)][_0x1087a8(0x42c)]=function(){const _0x442db0=_0x1087a8;return Scene_Shop[_0x442db0(0x4d2)][_0x442db0(0x42c)]();},Scene_Item[_0x1087a8(0x4d2)][_0x1087a8(0x351)]=function(){const _0x281b3b=_0x1087a8;if(!this[_0x281b3b(0x518)]())return![];if(!this['isUseModernControls']())return![];if(!this[_0x281b3b(0x40f)])return![];if(!this[_0x281b3b(0x40f)][_0x281b3b(0x3c5)])return![];return this[_0x281b3b(0x518)]()&&this[_0x281b3b(0x3a8)]();},Scene_Item[_0x1087a8(0x4d2)][_0x1087a8(0x4d7)]=function(){const _0xfaf991=_0x1087a8;if(this[_0xfaf991(0x351)]())return this[_0xfaf991(0x40f)][_0xfaf991(0x2e1)]()===0x1?_0xfaf991(0x318)===_0xfaf991(0x318)?TextManager[_0xfaf991(0x4bb)](_0xfaf991(0x27b),_0xfaf991(0x4ec)):_0x292126[_0xfaf991(0x537)]&&this[_0xfaf991(0x3c4)][_0xfaf991(0x50d)]()!==''&&_0x2a0925['ItemsEquipsCore'][_0xfaf991(0x2e7)]['EquipScene'][_0xfaf991(0x2bb)]:TextManager[_0xfaf991(0x4bb)](_0xfaf991(0x478),_0xfaf991(0x437));return Scene_ItemBase['prototype']['buttonAssistKey1']['call'](this);},Scene_Item[_0x1087a8(0x4d2)]['buttonAssistText1']=function(){const _0x16a77e=_0x1087a8;if(this['buttonAssistItemListRequirement']())return VisuMZ[_0x16a77e(0x3a3)][_0x16a77e(0x2e7)]['ItemScene'][_0x16a77e(0x191)];return Scene_ItemBase[_0x16a77e(0x4d2)][_0x16a77e(0x164)][_0x16a77e(0x539)](this);},Scene_Equip[_0x1087a8(0x4d2)]['isBottomHelpMode']=function(){const _0x2db40a=_0x1087a8;if(ConfigManager['uiMenuStyle']&&ConfigManager['uiHelpPosition']!==undefined)return ConfigManager[_0x2db40a(0x3bd)];else{if(this[_0x2db40a(0x45f)]())return _0x2db40a(0x26c)!==_0x2db40a(0x3c2)?this[_0x2db40a(0x518)]()[_0x2db40a(0x4b8)](/LOWER/i):this['categoryWindowRectItemsEquipsCore']();else Scene_MenuBase[_0x2db40a(0x4d2)][_0x2db40a(0x16a)][_0x2db40a(0x539)](this);}},Scene_Equip[_0x1087a8(0x4d2)]['isRightInputMode']=function(){const _0x24eaf1=_0x1087a8;if(ConfigManager[_0x24eaf1(0x312)]&&ConfigManager[_0x24eaf1(0x1a7)]!==undefined)return'VdONm'!==_0x24eaf1(0x19d)?ConfigManager[_0x24eaf1(0x1a7)]:this[_0x24eaf1(0x2b2)][_0x24eaf1(0x45c)]*this[_0x24eaf1(0x456)]();else{if(this[_0x24eaf1(0x45f)]())return this['updatedLayoutStyle']()[_0x24eaf1(0x4b8)](/RIGHT/i);else Scene_MenuBase['prototype'][_0x24eaf1(0x16a)][_0x24eaf1(0x539)](this);}},Scene_Equip['prototype'][_0x1087a8(0x518)]=function(){const _0x5cc7cd=_0x1087a8;return VisuMZ['ItemsEquipsCore']['Settings'][_0x5cc7cd(0x274)][_0x5cc7cd(0x2b8)];},Scene_Equip['prototype'][_0x1087a8(0x3a8)]=function(){const _0x4b28fd=_0x1087a8;return this[_0x4b28fd(0x333)]&&this['_commandWindow'][_0x4b28fd(0x3a8)]();},Scene_Equip[_0x1087a8(0x4d2)]['isUseItemsEquipsCoreUpdatedLayout']=function(){const _0x1209b0=_0x1087a8;return VisuMZ[_0x1209b0(0x3a3)][_0x1209b0(0x2e7)][_0x1209b0(0x274)][_0x1209b0(0x4d5)];},VisuMZ['ItemsEquipsCore'][_0x1087a8(0x364)]=Scene_Equip[_0x1087a8(0x4d2)][_0x1087a8(0x57d)],Scene_Equip[_0x1087a8(0x4d2)][_0x1087a8(0x57d)]=function(){const _0x18369c=_0x1087a8;VisuMZ[_0x18369c(0x3a3)][_0x18369c(0x364)][_0x18369c(0x539)](this);if(this[_0x18369c(0x3a8)]()){if('HARJR'!==_0x18369c(0x27c))return this['_list']?this['maxItems']():0x4;else this[_0x18369c(0x58c)]();}},Scene_Equip[_0x1087a8(0x4d2)]['helpWindowRect']=function(){const _0x1e8f6e=_0x1087a8;return this[_0x1e8f6e(0x45f)]()?this[_0x1e8f6e(0x589)]():Scene_MenuBase[_0x1e8f6e(0x4d2)][_0x1e8f6e(0x29f)][_0x1e8f6e(0x539)](this);},Scene_Equip['prototype'][_0x1087a8(0x589)]=function(){const _0x337b61=_0x1087a8,_0x37d1db=0x0,_0x52e534=this[_0x337b61(0x417)](),_0x57303e=Graphics[_0x337b61(0x2ac)],_0x1c6743=this[_0x337b61(0x434)]();return new Rectangle(_0x37d1db,_0x52e534,_0x57303e,_0x1c6743);},VisuMZ[_0x1087a8(0x3a3)]['Scene_Equip_statusWindowRect']=Scene_Equip[_0x1087a8(0x4d2)]['statusWindowRect'],Scene_Equip[_0x1087a8(0x4d2)][_0x1087a8(0x498)]=function(){const _0x29f2da=_0x1087a8;return this[_0x29f2da(0x45f)]()?this[_0x29f2da(0x1cb)]():_0x29f2da(0x150)!==_0x29f2da(0x2da)?VisuMZ[_0x29f2da(0x3a3)][_0x29f2da(0x53a)][_0x29f2da(0x539)](this):this[_0x29f2da(0x40f)][_0x29f2da(0x2e1)]()===0x1?_0x19075b['getInputMultiButtonStrings']('left',_0x29f2da(0x4ec)):_0x267587[_0x29f2da(0x4bb)](_0x29f2da(0x478),_0x29f2da(0x437));},Scene_Equip[_0x1087a8(0x4d2)][_0x1087a8(0x1cb)]=function(){const _0x21ad00=_0x1087a8,_0x369b1a=this[_0x21ad00(0x16a)]()?0x0:Graphics['boxWidth']-this[_0x21ad00(0x42c)](),_0x242d00=this[_0x21ad00(0x574)](),_0x2e5727=this[_0x21ad00(0x42c)](),_0x35e43a=this[_0x21ad00(0x30b)]();return new Rectangle(_0x369b1a,_0x242d00,_0x2e5727,_0x35e43a);},VisuMZ[_0x1087a8(0x3a3)][_0x1087a8(0x41d)]=Scene_Equip[_0x1087a8(0x4d2)][_0x1087a8(0x198)],Scene_Equip['prototype'][_0x1087a8(0x198)]=function(){const _0x14153a=_0x1087a8;return this[_0x14153a(0x45f)]()?this[_0x14153a(0x309)]():'dUHsR'!=='DWZCa'?VisuMZ[_0x14153a(0x3a3)][_0x14153a(0x41d)]['call'](this):_0x120afe[_0x14153a(0x3b6)]&&_0x2799fb[_0x14153a(0x4d2)][_0x14153a(0x3a8)][_0x14153a(0x539)](this);},Scene_Equip[_0x1087a8(0x4d2)]['shouldCommandWindowExist']=function(){const _0x4aaba8=_0x1087a8,_0x57018d=VisuMZ[_0x4aaba8(0x3a3)]['Settings'][_0x4aaba8(0x274)];return _0x57018d['CommandAddOptimize']||_0x57018d[_0x4aaba8(0x273)];},Scene_Equip[_0x1087a8(0x4d2)][_0x1087a8(0x309)]=function(){const _0x10c8b6=_0x1087a8,_0x71fff6=this[_0x10c8b6(0x4dd)](),_0x1658c6=this[_0x10c8b6(0x16a)]()?this[_0x10c8b6(0x42c)]():0x0,_0x8cc0bb=this[_0x10c8b6(0x574)](),_0x2c9d29=Graphics[_0x10c8b6(0x2ac)]-this[_0x10c8b6(0x42c)](),_0x20aefc=_0x71fff6?this[_0x10c8b6(0x44e)](0x1,!![]):0x0;return new Rectangle(_0x1658c6,_0x8cc0bb,_0x2c9d29,_0x20aefc);},VisuMZ[_0x1087a8(0x3a3)][_0x1087a8(0x460)]=Scene_Equip[_0x1087a8(0x4d2)]['createSlotWindow'],Scene_Equip['prototype'][_0x1087a8(0x298)]=function(){const _0x1dc58b=_0x1087a8;VisuMZ[_0x1dc58b(0x3a3)]['Scene_Equip_createSlotWindow'][_0x1dc58b(0x539)](this),this[_0x1dc58b(0x3a8)]()&&this['postCreateSlotWindowItemsEquipsCore']();},VisuMZ[_0x1087a8(0x3a3)]['Scene_Equip_slotWindowRect']=Scene_Equip[_0x1087a8(0x4d2)][_0x1087a8(0x1ae)],Scene_Equip[_0x1087a8(0x4d2)][_0x1087a8(0x1ae)]=function(){const _0x3cfd64=_0x1087a8;if(this['isUseItemsEquipsCoreUpdatedLayout']())return'sEtMW'!==_0x3cfd64(0x2ad)?this[_0x3cfd64(0x4ca)]():_0x1c75a1[_0x3cfd64(0x53e)](_0x328ed9[_0x3cfd64(0x2ac)]/0x2);else{if('pMAHB'==='XFnpd')this[_0x3cfd64(0x1f7)]();else return VisuMZ[_0x3cfd64(0x3a3)][_0x3cfd64(0x345)]['call'](this);}},Scene_Equip[_0x1087a8(0x4d2)]['slotWindowRectItemsEquipsCore']=function(){const _0x2fd2f8=_0x1087a8,_0x2821ba=this['commandWindowRect'](),_0x3cccf8=this[_0x2fd2f8(0x16a)]()?this[_0x2fd2f8(0x42c)]():0x0,_0x303521=_0x2821ba['y']+_0x2821ba[_0x2fd2f8(0x5cd)],_0x40892a=Graphics[_0x2fd2f8(0x2ac)]-this[_0x2fd2f8(0x42c)](),_0x58122f=this[_0x2fd2f8(0x30b)]()-_0x2821ba[_0x2fd2f8(0x5cd)];return new Rectangle(_0x3cccf8,_0x303521,_0x40892a,_0x58122f);},VisuMZ['ItemsEquipsCore'][_0x1087a8(0x555)]=Scene_Equip[_0x1087a8(0x4d2)][_0x1087a8(0x32c)],Scene_Equip[_0x1087a8(0x4d2)][_0x1087a8(0x32c)]=function(){const _0x16bf80=_0x1087a8;return this[_0x16bf80(0x45f)]()?_0x16bf80(0x38f)!=='MhoFy'?_0x44e078[_0x16bf80(0x3a3)][_0x16bf80(0x26a)][_0x16bf80(0x539)](this):this[_0x16bf80(0x1ae)]():VisuMZ[_0x16bf80(0x3a3)][_0x16bf80(0x555)][_0x16bf80(0x539)](this);},Scene_Equip[_0x1087a8(0x4d2)][_0x1087a8(0x42c)]=function(){const _0x3b3c3a=_0x1087a8;if(this[_0x3b3c3a(0x45f)]())return this[_0x3b3c3a(0x5ca)]();else{if('pPJjg'==='PqsUU'){if(!_0x1c8e2e['value'](_0x5f8e37))return![];}else return VisuMZ['ItemsEquipsCore'][_0x3b3c3a(0x2e7)][_0x3b3c3a(0x274)][_0x3b3c3a(0x36b)];}},Scene_Equip[_0x1087a8(0x4d2)][_0x1087a8(0x5ca)]=function(){const _0x3ccd6d=_0x1087a8;return Math[_0x3ccd6d(0x53e)](Graphics[_0x3ccd6d(0x2ac)]/0x2);},Scene_Equip['prototype'][_0x1087a8(0x440)]=function(){const _0x3466a4=_0x1087a8;this[_0x3466a4(0x47e)][_0x3466a4(0x1c0)](_0x3466a4(0x4f9),this[_0x3466a4(0x3ac)][_0x3466a4(0x5c0)](this)),this[_0x3466a4(0x47e)][_0x3466a4(0x1c0)](_0x3466a4(0x437),this[_0x3466a4(0x1d5)][_0x3466a4(0x5c0)](this)),this[_0x3466a4(0x47e)]['setHandler']('pageup',this[_0x3466a4(0x57f)][_0x3466a4(0x5c0)](this));},VisuMZ['ItemsEquipsCore'][_0x1087a8(0x4ee)]=Scene_Equip[_0x1087a8(0x4d2)][_0x1087a8(0x58c)],Scene_Equip['prototype'][_0x1087a8(0x58c)]=function(){const _0x5c368c=_0x1087a8;if(this[_0x5c368c(0x3a8)]()){if(_0x5c368c(0x240)!=='bQZQw'){const _0x2b68b8=_0x172235[_0x5c368c(0x3e8)][_0x5c368c(0x197)](_0x3c5b88['trim']());if(_0x2b68b8>0x0)_0x3c4895[_0x5c368c(0x4b6)][_0x5c368c(0x480)](_0x2b68b8);}else this[_0x5c368c(0x333)][_0x5c368c(0x598)](),this[_0x5c368c(0x333)][_0x5c368c(0x289)]();}VisuMZ['ItemsEquipsCore'][_0x5c368c(0x4ee)][_0x5c368c(0x539)](this);},VisuMZ[_0x1087a8(0x3a3)][_0x1087a8(0x15d)]=Scene_Equip[_0x1087a8(0x4d2)][_0x1087a8(0x326)],Scene_Equip[_0x1087a8(0x4d2)][_0x1087a8(0x326)]=function(){const _0xadb9a4=_0x1087a8;this[_0xadb9a4(0x47e)][_0xadb9a4(0x4ba)]()>=0x0?(VisuMZ[_0xadb9a4(0x3a3)][_0xadb9a4(0x15d)][_0xadb9a4(0x539)](this),this[_0xadb9a4(0x520)]()):(this[_0xadb9a4(0x47e)][_0xadb9a4(0x2f5)](0x0),this[_0xadb9a4(0x47e)][_0xadb9a4(0x184)]());},Scene_Equip[_0x1087a8(0x4d2)][_0x1087a8(0x520)]=function(){const _0x8b2391=_0x1087a8;this[_0x8b2391(0x40f)][_0x8b2391(0x44b)]();const _0x5c35e9=this[_0x8b2391(0x47e)][_0x8b2391(0x4b2)](),_0x2ae1d0=this[_0x8b2391(0x40f)]['_data']['indexOf'](_0x5c35e9),_0x362319=Math[_0x8b2391(0x53e)](this[_0x8b2391(0x40f)]['maxVisibleItems']()/0x2)-0x1;this['_itemWindow'][_0x8b2391(0x2f5)](_0x2ae1d0>=0x0?_0x2ae1d0:0x0),this[_0x8b2391(0x40f)][_0x8b2391(0x215)](this[_0x8b2391(0x40f)][_0x8b2391(0x4ba)]()-_0x362319);},VisuMZ[_0x1087a8(0x3a3)][_0x1087a8(0x378)]=Scene_Equip['prototype']['onSlotCancel'],Scene_Equip[_0x1087a8(0x4d2)]['onSlotCancel']=function(){const _0x219297=_0x1087a8;VisuMZ['ItemsEquipsCore'][_0x219297(0x378)][_0x219297(0x539)](this),this['isUseModernControls']()&&('oojvI'!==_0x219297(0x4fb)?this[_0x219297(0x52d)]():(this['_commandWindow'][_0x219297(0x2f5)](0x0),this['_slotWindow'][_0x219297(0x289)]()));},VisuMZ[_0x1087a8(0x3a3)]['Scene_Equip_onActorChange']=Scene_Equip[_0x1087a8(0x4d2)][_0x1087a8(0x323)],Scene_Equip[_0x1087a8(0x4d2)]['onActorChange']=function(){const _0x52dce1=_0x1087a8;VisuMZ['ItemsEquipsCore']['Scene_Equip_onActorChange'][_0x52dce1(0x539)](this),this[_0x52dce1(0x3a8)]()&&(this[_0x52dce1(0x333)][_0x52dce1(0x289)](),this[_0x52dce1(0x333)]['deselect'](),this[_0x52dce1(0x47e)][_0x52dce1(0x2f5)](0x0),this['_slotWindow'][_0x52dce1(0x184)]());},Scene_Equip[_0x1087a8(0x4d2)][_0x1087a8(0x1ff)]=function(){const _0x4cfd66=_0x1087a8;if(!this['_slotWindow'])return![];if(!this[_0x4cfd66(0x47e)][_0x4cfd66(0x3c5)])return![];return this[_0x4cfd66(0x47e)][_0x4cfd66(0x1fe)]();},Scene_Equip[_0x1087a8(0x4d2)][_0x1087a8(0x48d)]=function(){const _0x568149=_0x1087a8;if(this['buttonAssistSlotWindowShift']()){if(_0x568149(0x4cd)!==_0x568149(0x19e))return TextManager[_0x568149(0x384)](_0x568149(0x3f2));else this[_0x568149(0x56d)](_0x3ed778[_0x568149(0x469)]('up'));}return Scene_MenuBase[_0x568149(0x4d2)][_0x568149(0x48d)][_0x568149(0x539)](this);},Scene_Equip[_0x1087a8(0x4d2)]['buttonAssistText3']=function(){const _0x3d40e4=_0x1087a8;if(this[_0x3d40e4(0x1ff)]())return VisuMZ[_0x3d40e4(0x3a3)][_0x3d40e4(0x2e7)][_0x3d40e4(0x274)]['buttonAssistRemove'];return Scene_MenuBase[_0x3d40e4(0x4d2)][_0x3d40e4(0x2ca)][_0x3d40e4(0x539)](this);},Scene_Equip[_0x1087a8(0x4d2)][_0x1087a8(0x1e7)]=function(){const _0x22a60b=_0x1087a8;if(this[_0x22a60b(0x1ff)]())return this[_0x22a60b(0x31d)][_0x22a60b(0x16c)]/0x5/-0x3;return Scene_MenuBase[_0x22a60b(0x4d2)][_0x22a60b(0x1e7)][_0x22a60b(0x539)](this);},Scene_Equip['prototype']['popScene']=function(){const _0x369697=_0x1087a8;SceneManager[_0x369697(0x382)]();},VisuMZ['ItemsEquipsCore'][_0x1087a8(0x581)]=Scene_Load['prototype']['reloadMapIfUpdated'],Scene_Load[_0x1087a8(0x4d2)][_0x1087a8(0x5cc)]=function(){const _0x47230a=_0x1087a8;VisuMZ[_0x47230a(0x3a3)][_0x47230a(0x581)]['call'](this),this[_0x47230a(0x392)]();},Scene_Load['prototype'][_0x1087a8(0x392)]=function(){const _0x2a5863=_0x1087a8;if($gameSystem[_0x2a5863(0x1bb)]()!==$dataSystem[_0x2a5863(0x1bb)])for(const _0x32f358 of $gameActors[_0x2a5863(0x415)]){if(_0x2a5863(0x244)===_0x2a5863(0x244)){if(_0x32f358)_0x32f358[_0x2a5863(0x2e8)]();}else{const _0x5080f2=_0x69560c[_0x2a5863(0x557)];this[_0x2a5863(0x308)](_0x5080f2,_0x1c2069,_0x4d88a5,_0xcf415,!![]);const _0x44b72a=this[_0x2a5863(0x29b)]();this[_0x2a5863(0x308)](_0x44b72a,_0x3f7c87,_0x212e53,_0x328ce9,![],_0x2a5863(0x4ec));}}},Scene_Shop[_0x1087a8(0x4d2)][_0x1087a8(0x260)]=function(){const _0x3fdf71=_0x1087a8;if(ConfigManager[_0x3fdf71(0x312)]&&ConfigManager[_0x3fdf71(0x3bd)]!==undefined)return ConfigManager[_0x3fdf71(0x3bd)];else{if(this[_0x3fdf71(0x45f)]())return'WeFqH'===_0x3fdf71(0x2cf)?![]:this[_0x3fdf71(0x518)]()[_0x3fdf71(0x4b8)](/LOWER/i);else Scene_MenuBase[_0x3fdf71(0x4d2)]['isRightInputMode'][_0x3fdf71(0x539)](this);}},Scene_Shop[_0x1087a8(0x4d2)][_0x1087a8(0x16a)]=function(){const _0x66a9a5=_0x1087a8;if(ConfigManager[_0x66a9a5(0x312)]&&ConfigManager['uiInputPosition']!==undefined){if('FuQoG'!=='RrSWN')return ConfigManager[_0x66a9a5(0x1a7)];else this['onBuyCancelItemsEquipsCore']();}else{if(this[_0x66a9a5(0x45f)]())return this[_0x66a9a5(0x518)]()['match'](/RIGHT/i);else Scene_MenuBase[_0x66a9a5(0x4d2)][_0x66a9a5(0x16a)][_0x66a9a5(0x539)](this);}},Scene_Shop[_0x1087a8(0x4d2)][_0x1087a8(0x518)]=function(){const _0x5e5514=_0x1087a8;return VisuMZ['ItemsEquipsCore'][_0x5e5514(0x2e7)][_0x5e5514(0x281)]['LayoutStyle'];},Scene_Shop['prototype'][_0x1087a8(0x3a8)]=function(){const _0x19c8eb=_0x1087a8;return this[_0x19c8eb(0x275)]&&this[_0x19c8eb(0x275)][_0x19c8eb(0x3a8)]();},Scene_Shop['prototype'][_0x1087a8(0x45f)]=function(){const _0x3e78be=_0x1087a8;return VisuMZ['ItemsEquipsCore'][_0x3e78be(0x2e7)][_0x3e78be(0x281)][_0x3e78be(0x4d5)];},VisuMZ[_0x1087a8(0x3a3)]['Scene_Shop_prepare']=Scene_Shop[_0x1087a8(0x4d2)]['prepare'],Scene_Shop[_0x1087a8(0x4d2)][_0x1087a8(0x277)]=function(_0x4da4c8,_0x3653f2){const _0x55278a=_0x1087a8;_0x4da4c8=JsonEx[_0x55278a(0x48e)](_0x4da4c8),VisuMZ['ItemsEquipsCore']['Scene_Shop_prepare'][_0x55278a(0x539)](this,_0x4da4c8,_0x3653f2),this[_0x55278a(0x242)]();},Scene_Shop[_0x1087a8(0x4d2)][_0x1087a8(0x242)]=function(){const _0x3caa3b=_0x1087a8;this[_0x3caa3b(0x2f0)]=0x0;for(const _0x48f7b0 of this[_0x3caa3b(0x227)]){if(_0x3caa3b(0x156)===_0x3caa3b(0x4a6))_0x451ee6+=_0x3caa3b(0x23a)['format'](this[_0x3caa3b(0x297)][_0x3caa3b(0x466)]);else{if(this[_0x3caa3b(0x3a2)](_0x48f7b0))this[_0x3caa3b(0x2f0)]++;else{if(_0x3caa3b(0x562)===_0x3caa3b(0x562))_0x48f7b0[0x0]=-0x1;else return this[_0x3caa3b(0x518)]()[_0x3caa3b(0x4b8)](/RIGHT/i);}}}},Scene_Shop[_0x1087a8(0x4d2)][_0x1087a8(0x3a2)]=function(_0x4459f2){const _0x357b71=_0x1087a8;if(_0x4459f2[0x0]>0x2||_0x4459f2[0x0]<0x0)return![];const _0x1f5b62=[$dataItems,$dataWeapons,$dataArmors][_0x4459f2[0x0]][_0x4459f2[0x1]];if(!_0x1f5b62)return![];const _0x424691=_0x1f5b62[_0x357b71(0x3c7)]||'';if(_0x424691[_0x357b71(0x4b8)](/<SHOW SHOP[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x288362=JSON[_0x357b71(0x1b3)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x858651 of _0x288362){if(_0x357b71(0x3b3)!=='vRFOO'){if(!$gameSwitches['value'](_0x858651))return![];}else{const _0x5bc813=_0x2fabf1[_0x357b71(0x4b7)]()[_0x357b71(0x197)](_0x3fc795),_0x1c2704=_0x587875+_0x246c19+_0x5bc813*_0x272f9c;this[_0x357b71(0x4e7)](_0xe77a30[_0x357b71(0x455)](this[_0x357b71(0x2b2)])),this[_0x357b71(0x5a1)](_0x56f43c,_0x1c2704+_0x22c400/0x2,_0x3c65d3);let _0x117d06=_0x121730;for(const _0x76f35d of _0x1e9c34){const _0x47de16=_0x117d06-(_0x1101c4-_0x4cf579)/0x2;this['drawActorParamDifference'](_0x7cb7a9,_0x76f35d,_0x1c2704,_0x47de16,_0x52ae88),_0x117d06+=_0x109370;}}}return!![];}if(_0x424691['match'](/<SHOW SHOP ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x62d259=JSON[_0x357b71(0x1b3)]('['+RegExp['$1'][_0x357b71(0x4b8)](/\d+/g)+']');for(const _0x2d4810 of _0x62d259){if(_0x357b71(0x41a)!==_0x357b71(0x41a))return this[_0x357b71(0x4ba)]();else{if(!$gameSwitches['value'](_0x2d4810))return![];}}return!![];}if(_0x424691[_0x357b71(0x4b8)](/<SHOW SHOP ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x357b71(0x4e5)!==_0x357b71(0x423)){const _0x55385f=JSON['parse']('['+RegExp['$1'][_0x357b71(0x4b8)](/\d+/g)+']');for(const _0x507f0e of _0x55385f){if($gameSwitches[_0x357b71(0x58a)](_0x507f0e))return!![];}return![];}else{if(_0x9843c4[_0x24c207]===_0x5cb618){_0x861c0a=_0x31b186;if(!_0x33aa3e[_0x581363])return _0x19ade5;}}}if(_0x424691['match'](/<HIDE SHOP[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x357b71(0x447)===_0x357b71(0x1e5)){const _0x3581d8=_0x383cc4(_0xb9b3f9['$1'])['toUpperCase']()[_0x357b71(0x187)](),_0x43d075=_0x15f193(_0x464a41['$2'])[_0x357b71(0x187)]();this[_0x357b71(0x4bc)][_0x3581d8]=_0x43d075;}else{const _0x1216ff=JSON[_0x357b71(0x1b3)]('['+RegExp['$1'][_0x357b71(0x4b8)](/\d+/g)+']');for(const _0x2d8fd7 of _0x1216ff){if(_0x357b71(0x476)===_0x357b71(0x476)){if(!$gameSwitches[_0x357b71(0x58a)](_0x2d8fd7))return!![];}else this[_0x357b71(0x1be)](...arguments);}return![];}}if(_0x424691[_0x357b71(0x4b8)](/<HIDE SHOP ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if('avDzc'!==_0x357b71(0x3b2)){const _0x58cc03=JSON['parse']('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x34caae of _0x58cc03){if(!$gameSwitches[_0x357b71(0x58a)](_0x34caae))return!![];}return![];}else return this[_0x357b71(0x5b8)]();}if(_0x424691[_0x357b71(0x4b8)](/<HIDE SHOP ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x5151f1=JSON[_0x357b71(0x1b3)]('['+RegExp['$1'][_0x357b71(0x4b8)](/\d+/g)+']');for(const _0x339490 of _0x5151f1){if($gameSwitches[_0x357b71(0x58a)](_0x339490))return![];}return!![];}return!![];},VisuMZ[_0x1087a8(0x3a3)][_0x1087a8(0x4ac)]=Scene_Shop[_0x1087a8(0x4d2)][_0x1087a8(0x57d)],Scene_Shop[_0x1087a8(0x4d2)][_0x1087a8(0x57d)]=function(){const _0x248683=_0x1087a8;VisuMZ[_0x248683(0x3a3)][_0x248683(0x4ac)][_0x248683(0x539)](this),this[_0x248683(0x45f)]()&&this[_0x248683(0x1f7)](),this['resetShopSwitches']();},Scene_Shop[_0x1087a8(0x4d2)][_0x1087a8(0x1f7)]=function(){const _0x4ab1b0=_0x1087a8;this[_0x4ab1b0(0x548)][_0x4ab1b0(0x195)](),this[_0x4ab1b0(0x1d6)][_0x4ab1b0(0x327)](),this[_0x4ab1b0(0x1d6)]['deselect'](),this[_0x4ab1b0(0x2cd)][_0x4ab1b0(0x327)]();},Scene_Shop[_0x1087a8(0x4d2)][_0x1087a8(0x29f)]=function(){const _0x3a2952=_0x1087a8;return this[_0x3a2952(0x45f)]()?this[_0x3a2952(0x589)]():Scene_MenuBase[_0x3a2952(0x4d2)][_0x3a2952(0x29f)][_0x3a2952(0x539)](this);},Scene_Shop[_0x1087a8(0x4d2)]['helpWindowRectItemsEquipsCore']=function(){const _0x340f7e=_0x1087a8,_0x265835=0x0,_0x41dbdb=this[_0x340f7e(0x417)](),_0x523fa2=Graphics[_0x340f7e(0x2ac)],_0x533727=this[_0x340f7e(0x434)]();return new Rectangle(_0x265835,_0x41dbdb,_0x523fa2,_0x533727);},VisuMZ[_0x1087a8(0x3a3)][_0x1087a8(0x51d)]=Scene_Shop['prototype'][_0x1087a8(0x371)],Scene_Shop[_0x1087a8(0x4d2)][_0x1087a8(0x371)]=function(){const _0x4e3855=_0x1087a8;return this[_0x4e3855(0x45f)]()?this[_0x4e3855(0x3f3)]():VisuMZ[_0x4e3855(0x3a3)]['Scene_Shop_goldWindowRect'][_0x4e3855(0x539)](this);},Scene_Shop[_0x1087a8(0x4d2)][_0x1087a8(0x3f3)]=function(){const _0x24650c=_0x1087a8,_0x43e511=this[_0x24650c(0x1f6)](),_0x5b2098=this['calcWindowHeight'](0x1,!![]),_0xc8f23d=this['isRightInputMode']()?0x0:Graphics[_0x24650c(0x2ac)]-_0x43e511,_0x5341f3=this[_0x24650c(0x574)]();return new Rectangle(_0xc8f23d,_0x5341f3,_0x43e511,_0x5b2098);},VisuMZ['ItemsEquipsCore']['Scene_Shop_commandWindowRect']=Scene_Shop[_0x1087a8(0x4d2)][_0x1087a8(0x198)],Scene_Shop[_0x1087a8(0x4d2)][_0x1087a8(0x198)]=function(){const _0x3efc66=_0x1087a8;return this[_0x3efc66(0x45f)]()?this[_0x3efc66(0x309)]():VisuMZ[_0x3efc66(0x3a3)][_0x3efc66(0x3ef)]['call'](this);},Scene_Shop['prototype']['commandWindowRectItemsEquipsCore']=function(){const _0x25dd0c=_0x1087a8,_0x280f2b=this[_0x25dd0c(0x16a)]()?this[_0x25dd0c(0x1f6)]():0x0,_0x5889dd=this[_0x25dd0c(0x574)](),_0x2fa4ef=Graphics[_0x25dd0c(0x2ac)]-this[_0x25dd0c(0x1f6)](),_0x34d2e2=this[_0x25dd0c(0x44e)](0x1,!![]);return new Rectangle(_0x280f2b,_0x5889dd,_0x2fa4ef,_0x34d2e2);},VisuMZ[_0x1087a8(0x3a3)][_0x1087a8(0x26a)]=Scene_Shop[_0x1087a8(0x4d2)]['numberWindowRect'],Scene_Shop[_0x1087a8(0x4d2)][_0x1087a8(0x24a)]=function(){const _0x232dab=_0x1087a8;return this['isUseItemsEquipsCoreUpdatedLayout']()?this['numberWindowRectItemsEquipsCore']():VisuMZ['ItemsEquipsCore']['Scene_Shop_numberWindowRect'][_0x232dab(0x539)](this);},Scene_Shop[_0x1087a8(0x4d2)][_0x1087a8(0x41c)]=function(){const _0x2ef440=_0x1087a8,_0x144cff=this[_0x2ef440(0x333)]['y']+this[_0x2ef440(0x333)][_0x2ef440(0x5cd)],_0x3eee5f=Graphics['boxWidth']-this[_0x2ef440(0x42c)](),_0x3dc98d=this[_0x2ef440(0x16a)]()?Graphics[_0x2ef440(0x2ac)]-_0x3eee5f:0x0,_0x1872a2=this[_0x2ef440(0x30b)]()-this[_0x2ef440(0x333)]['height'];return new Rectangle(_0x3dc98d,_0x144cff,_0x3eee5f,_0x1872a2);},VisuMZ['ItemsEquipsCore'][_0x1087a8(0x2a2)]=Scene_Shop[_0x1087a8(0x4d2)]['statusWindowRect'],Scene_Shop['prototype'][_0x1087a8(0x498)]=function(){const _0x36471d=_0x1087a8;return this[_0x36471d(0x45f)]()?this[_0x36471d(0x1cb)]():VisuMZ[_0x36471d(0x3a3)]['Scene_Shop_statusWindowRect']['call'](this);},Scene_Shop[_0x1087a8(0x4d2)][_0x1087a8(0x1cb)]=function(){const _0x492a1a=_0x1087a8,_0x5ca2ba=this[_0x492a1a(0x42c)](),_0x5cd0ae=this['mainAreaHeight']()-this[_0x492a1a(0x333)][_0x492a1a(0x5cd)],_0x5b86a5=this['isRightInputMode']()?0x0:Graphics[_0x492a1a(0x2ac)]-_0x5ca2ba,_0x13f93e=this['_commandWindow']['y']+this[_0x492a1a(0x333)][_0x492a1a(0x5cd)];return new Rectangle(_0x5b86a5,_0x13f93e,_0x5ca2ba,_0x5cd0ae);},VisuMZ[_0x1087a8(0x3a3)]['Scene_Shop_buyWindowRect']=Scene_Shop[_0x1087a8(0x4d2)][_0x1087a8(0x3d6)],Scene_Shop['prototype'][_0x1087a8(0x3d6)]=function(){const _0x54cdf4=_0x1087a8;return this['isUseItemsEquipsCoreUpdatedLayout']()?this[_0x54cdf4(0x5b8)]():_0x54cdf4(0x3f8)!==_0x54cdf4(0x3f8)?_0x43dcd8[_0x54cdf4(0x4a1)][this[_0x54cdf4(0x2b2)][_0x54cdf4(0x37f)][_0x54cdf4(0x4ff)]]:VisuMZ[_0x54cdf4(0x3a3)][_0x54cdf4(0x192)][_0x54cdf4(0x539)](this);},Scene_Shop[_0x1087a8(0x4d2)]['buyWindowRectItemsEquipsCore']=function(){const _0x360848=_0x1087a8,_0x331d63=this['_commandWindow']['y']+this[_0x360848(0x333)]['height'],_0xc0cfb6=Graphics[_0x360848(0x2ac)]-this[_0x360848(0x42c)](),_0x5ebf20=this['mainAreaHeight']()-this[_0x360848(0x333)][_0x360848(0x5cd)],_0x2a6173=this[_0x360848(0x16a)]()?Graphics['boxWidth']-_0xc0cfb6:0x0;return new Rectangle(_0x2a6173,_0x331d63,_0xc0cfb6,_0x5ebf20);},VisuMZ[_0x1087a8(0x3a3)][_0x1087a8(0x4dc)]=Scene_Shop[_0x1087a8(0x4d2)]['createCategoryWindow'],Scene_Shop[_0x1087a8(0x4d2)][_0x1087a8(0x568)]=function(){const _0x774868=_0x1087a8;VisuMZ[_0x774868(0x3a3)][_0x774868(0x4dc)][_0x774868(0x539)](this),this[_0x774868(0x3a8)]()&&this[_0x774868(0x3c6)]();},VisuMZ[_0x1087a8(0x3a3)][_0x1087a8(0x3b4)]=Scene_Shop[_0x1087a8(0x4d2)]['categoryWindowRect'],Scene_Shop[_0x1087a8(0x4d2)]['categoryWindowRect']=function(){const _0x2b4d29=_0x1087a8;return this[_0x2b4d29(0x45f)]()?this['categoryWindowRectItemsEquipsCore']():VisuMZ[_0x2b4d29(0x3a3)]['Scene_Shop_categoryWindowRect'][_0x2b4d29(0x539)](this);},Scene_Shop['prototype'][_0x1087a8(0x201)]=function(){const _0x140d4a=_0x1087a8,_0x5cef89=this['_commandWindow']['y'],_0x50937e=this[_0x140d4a(0x333)]['width'],_0x48bc19=this['calcWindowHeight'](0x1,!![]),_0x5b969e=this[_0x140d4a(0x16a)]()?Graphics[_0x140d4a(0x2ac)]-_0x50937e:0x0;return new Rectangle(_0x5b969e,_0x5cef89,_0x50937e,_0x48bc19);},Scene_Shop[_0x1087a8(0x4d2)][_0x1087a8(0x3c6)]=function(){const _0x265ad9=_0x1087a8;delete this['_categoryWindow']['_handlers']['ok'],delete this[_0x265ad9(0x275)][_0x265ad9(0x470)]['cancel'];},VisuMZ[_0x1087a8(0x3a3)][_0x1087a8(0x516)]=Scene_Shop['prototype'][_0x1087a8(0x32b)],Scene_Shop['prototype'][_0x1087a8(0x32b)]=function(){const _0x576779=_0x1087a8;VisuMZ[_0x576779(0x3a3)]['Scene_Shop_createSellWindow'][_0x576779(0x539)](this);if(this[_0x576779(0x45f)]()){if('NvCxm'!=='NvCxm')return _0x49e113[_0x576779(0x3a3)][_0x576779(0x345)][_0x576779(0x539)](this);else this[_0x576779(0x506)]();}},VisuMZ[_0x1087a8(0x3a3)]['Scene_Shop_sellWindowRect']=Scene_Shop[_0x1087a8(0x4d2)]['sellWindowRect'],Scene_Shop[_0x1087a8(0x4d2)]['sellWindowRect']=function(){const _0x4bfc5a=_0x1087a8;return this[_0x4bfc5a(0x45f)]()?this[_0x4bfc5a(0x27d)]():VisuMZ['ItemsEquipsCore'][_0x4bfc5a(0x1f4)][_0x4bfc5a(0x539)](this);},Scene_Shop[_0x1087a8(0x4d2)][_0x1087a8(0x27d)]=function(){const _0x386375=_0x1087a8,_0xe318c3=this[_0x386375(0x275)]['y']+this[_0x386375(0x275)][_0x386375(0x5cd)],_0x182c42=Graphics['boxWidth']-this[_0x386375(0x42c)](),_0x2408f4=this[_0x386375(0x30b)]()-this[_0x386375(0x275)][_0x386375(0x5cd)],_0x6562de=this['isRightInputMode']()?Graphics[_0x386375(0x2ac)]-_0x182c42:0x0;return new Rectangle(_0x6562de,_0xe318c3,_0x182c42,_0x2408f4);},Scene_Shop[_0x1087a8(0x4d2)]['postCreateSellWindowItemsEquipsCore']=function(){const _0x1efb86=_0x1087a8;this['_sellWindow'][_0x1efb86(0x4c6)](this[_0x1efb86(0x2cd)]);},Scene_Shop[_0x1087a8(0x4d2)]['statusWidth']=function(){const _0x5ccd99=_0x1087a8;return VisuMZ[_0x5ccd99(0x3a3)][_0x5ccd99(0x2e7)][_0x5ccd99(0x241)][_0x5ccd99(0x472)];},VisuMZ['ItemsEquipsCore'][_0x1087a8(0x1f5)]=Scene_Shop[_0x1087a8(0x4d2)][_0x1087a8(0x523)],Scene_Shop[_0x1087a8(0x4d2)][_0x1087a8(0x523)]=function(){const _0x3e7446=_0x1087a8;VisuMZ[_0x3e7446(0x3a3)]['Scene_Shop_activateSellWindow'][_0x3e7446(0x539)](this),this[_0x3e7446(0x45f)]()&&this[_0x3e7446(0x2cd)][_0x3e7446(0x327)](),this[_0x3e7446(0x572)][_0x3e7446(0x558)]();},VisuMZ['ItemsEquipsCore'][_0x1087a8(0x3df)]=Scene_Shop[_0x1087a8(0x4d2)][_0x1087a8(0x211)],Scene_Shop[_0x1087a8(0x4d2)]['commandBuy']=function(){const _0x2c8568=_0x1087a8;VisuMZ['ItemsEquipsCore']['Scene_Shop_commandBuy'][_0x2c8568(0x539)](this);if(this[_0x2c8568(0x45f)]()){if('UIxPF'===_0x2c8568(0x2a4))this['commandBuyItemsEquipsCore']();else{if(_0x220ef0[_0x2c8568(0x312)]&&_0x3c8fb0[_0x2c8568(0x1a7)]!==_0x108df4)return _0x4b2ade[_0x2c8568(0x1a7)];else{if(this[_0x2c8568(0x45f)]())return this[_0x2c8568(0x518)]()[_0x2c8568(0x4b8)](/RIGHT/i);else _0x70816b['prototype'][_0x2c8568(0x16a)]['call'](this);}}}},Scene_Shop[_0x1087a8(0x4d2)][_0x1087a8(0x288)]=function(){const _0x2d921e=_0x1087a8;this[_0x2d921e(0x2ce)]=this[_0x2d921e(0x2ce)]||0x0,this['_buyWindow'][_0x2d921e(0x2f5)](this[_0x2d921e(0x2ce)]);},VisuMZ[_0x1087a8(0x3a3)]['Scene_Shop_commandSell']=Scene_Shop[_0x1087a8(0x4d2)][_0x1087a8(0x25d)],Scene_Shop[_0x1087a8(0x4d2)][_0x1087a8(0x25d)]=function(){const _0x3b4aee=_0x1087a8;VisuMZ['ItemsEquipsCore'][_0x3b4aee(0x16e)][_0x3b4aee(0x539)](this),this['isUseItemsEquipsCoreUpdatedLayout']()&&this[_0x3b4aee(0x3da)](),this[_0x3b4aee(0x3a8)]()&&(this[_0x3b4aee(0x275)][_0x3b4aee(0x2f5)](0x0),this[_0x3b4aee(0x4ae)]());},Scene_Shop[_0x1087a8(0x4d2)]['commandSellItemsEquipsCore']=function(){const _0x4d6e00=_0x1087a8;this['_buyWindow']['hide'](),this[_0x4d6e00(0x333)][_0x4d6e00(0x195)]();},VisuMZ[_0x1087a8(0x3a3)][_0x1087a8(0x207)]=Scene_Shop[_0x1087a8(0x4d2)][_0x1087a8(0x16d)],Scene_Shop[_0x1087a8(0x4d2)]['onBuyCancel']=function(){const _0x4a720d=_0x1087a8;VisuMZ[_0x4a720d(0x3a3)]['Scene_Shop_onBuyCancel'][_0x4a720d(0x539)](this),this['isUseItemsEquipsCoreUpdatedLayout']()&&(_0x4a720d(0x528)!==_0x4a720d(0x528)?_0x1941be=_0x3cb999(_0x1b0937['$1']):this[_0x4a720d(0x1d4)]());},Scene_Shop['prototype'][_0x1087a8(0x1d4)]=function(){const _0x2a7dc3=_0x1087a8;this[_0x2a7dc3(0x2ce)]=this[_0x2a7dc3(0x1d6)][_0x2a7dc3(0x4ba)](),this[_0x2a7dc3(0x1d6)][_0x2a7dc3(0x327)](),this['_buyWindow'][_0x2a7dc3(0x598)](),this['_buyWindow'][_0x2a7dc3(0x1d1)](0x0,0x0),this[_0x2a7dc3(0x2cd)][_0x2a7dc3(0x327)](),this['_dummyWindow'][_0x2a7dc3(0x195)]();},VisuMZ['ItemsEquipsCore'][_0x1087a8(0x23d)]=Scene_Shop[_0x1087a8(0x4d2)][_0x1087a8(0x52d)],Scene_Shop[_0x1087a8(0x4d2)][_0x1087a8(0x52d)]=function(){const _0x535eeb=_0x1087a8;VisuMZ[_0x535eeb(0x3a3)][_0x535eeb(0x23d)]['call'](this),this[_0x535eeb(0x45f)]()&&this[_0x535eeb(0x4d3)]();},Scene_Shop[_0x1087a8(0x4d2)][_0x1087a8(0x4d3)]=function(){const _0x406432=_0x1087a8;this[_0x406432(0x1d6)]['show'](),this[_0x406432(0x333)][_0x406432(0x327)]();},VisuMZ[_0x1087a8(0x3a3)][_0x1087a8(0x1a3)]=Scene_Shop['prototype'][_0x1087a8(0x169)],Scene_Shop[_0x1087a8(0x4d2)]['onSellOk']=function(){const _0x283e07=_0x1087a8;VisuMZ[_0x283e07(0x3a3)]['Scene_Shop_onSellOk'][_0x283e07(0x539)](this);if(this[_0x283e07(0x45f)]()){if(_0x283e07(0x22f)===_0x283e07(0x22f))this['onSellOkItemsEquipsCore']();else{const _0x1b5f89=_0x5c550e(_0x20d3bc['$1'])||0x1;if(_0x184468>=_0x1b5f89)return!![];}}},Scene_Shop['prototype'][_0x1087a8(0x395)]=function(){const _0x53dbe1=_0x1087a8;this['_categoryWindow'][_0x53dbe1(0x327)]();},VisuMZ[_0x1087a8(0x3a3)]['Scene_Shop_onSellCancel']=Scene_Shop[_0x1087a8(0x4d2)][_0x1087a8(0x2f8)],Scene_Shop['prototype']['onSellCancel']=function(){const _0xa8b988=_0x1087a8;VisuMZ[_0xa8b988(0x3a3)][_0xa8b988(0x58e)][_0xa8b988(0x539)](this),this[_0xa8b988(0x3a8)]()&&('cVwLb'==='zdSCo'?(this[_0xa8b988(0x47e)][_0xa8b988(0x2f5)](0x0),this['_slotWindow'][_0xa8b988(0x184)]()):this[_0xa8b988(0x52d)]()),this[_0xa8b988(0x45f)]()&&this[_0xa8b988(0x548)][_0xa8b988(0x195)]();},VisuMZ[_0x1087a8(0x3a3)][_0x1087a8(0x458)]=Scene_Shop[_0x1087a8(0x4d2)][_0x1087a8(0x21d)],Scene_Shop[_0x1087a8(0x4d2)]['sellingPrice']=function(){const _0x26fe3c=_0x1087a8;let _0x383e4a=this[_0x26fe3c(0x196)]();const _0x319285=this[_0x26fe3c(0x2b2)];return _0x383e4a=VisuMZ[_0x26fe3c(0x3a3)][_0x26fe3c(0x2e7)][_0x26fe3c(0x281)][_0x26fe3c(0x386)]['call'](this,_0x319285,_0x383e4a),_0x383e4a;},Scene_Shop[_0x1087a8(0x4d2)]['determineBaseSellingPrice']=function(){const _0x333c43=_0x1087a8;let _0x2c8cf7=this[_0x333c43(0x2b2)][_0x333c43(0x45c)];if(!this[_0x333c43(0x2b2)])return 0x0;else{if(this[_0x333c43(0x2b2)][_0x333c43(0x3c7)]['match'](/<JS SELL PRICE>\s*([\s\S]*)\s*<\/JS SELL PRICE>/i)){if(_0x333c43(0x3cb)!==_0x333c43(0x3cb))this[_0x333c43(0x14a)](_0x3a05af[_0x333c43(0x1a5)](_0x57390f),_0x465c98+_0x56dfdd,_0x11ad27,_0x513ec2);else{const _0x2b7908=String(RegExp['$1']);let _0x488225=this[_0x333c43(0x2b2)],_0x5f0464=_0x2c8cf7*this[_0x333c43(0x456)]();try{'qaBBu'===_0x333c43(0x400)?eval(_0x2b7908):(_0x3e184c[_0x333c43(0x469)](_0x333c43(0x437))&&this[_0x333c43(0x545)](),_0x17cead[_0x333c43(0x469)]('pageup')&&this['cursorPageup']());}catch(_0xa2031d){if($gameTemp[_0x333c43(0x206)]())console[_0x333c43(0x1ac)](_0xa2031d);}if(isNaN(_0x5f0464))_0x5f0464=0x0;return Math[_0x333c43(0x53e)](_0x5f0464);}}else{if(this[_0x333c43(0x2b2)][_0x333c43(0x3c7)][_0x333c43(0x4b8)](/<SELL PRICE:[ ](\d+)>/i)){if(_0x333c43(0x360)===_0x333c43(0x46b))_0x3c4ac8[_0x333c43(0x4d2)]['activate'][_0x333c43(0x539)](this),this['_categoryWindow']&&this[_0x333c43(0x275)][_0x333c43(0x3a8)]()&&this[_0x333c43(0x275)][_0x333c43(0x184)]();else return parseInt(RegExp['$1']);}else return Math['floor'](this[_0x333c43(0x535)]());}}},Scene_Shop[_0x1087a8(0x4d2)]['baseSellingPrice']=function(){const _0x52db19=_0x1087a8;return this[_0x52db19(0x2b2)][_0x52db19(0x45c)]*this[_0x52db19(0x456)]();},Scene_Shop[_0x1087a8(0x4d2)][_0x1087a8(0x456)]=function(){const _0x4f20de=_0x1087a8;return VisuMZ['ItemsEquipsCore'][_0x4f20de(0x2e7)][_0x4f20de(0x281)][_0x4f20de(0x404)];},Scene_Shop[_0x1087a8(0x4d2)][_0x1087a8(0x351)]=function(){const _0x270cdd=_0x1087a8;if(!this['updatedLayoutStyle']())return![];if(!this['isUseModernControls']())return![];if(!this['_sellWindow'])return![];if(!this['_sellWindow'][_0x270cdd(0x3c5)])return![];return this[_0x270cdd(0x518)]()&&this['isUseModernControls']();},Scene_Shop[_0x1087a8(0x4d2)][_0x1087a8(0x4d7)]=function(){const _0x1d7d0b=_0x1087a8;if(this[_0x1d7d0b(0x351)]())return this[_0x1d7d0b(0x572)][_0x1d7d0b(0x2e1)]()===0x1?_0x1d7d0b(0x48f)===_0x1d7d0b(0x48f)?TextManager[_0x1d7d0b(0x4bb)](_0x1d7d0b(0x27b),_0x1d7d0b(0x4ec)):_0x5166f4[_0x1d7d0b(0x4d2)][_0x1d7d0b(0x29f)][_0x1d7d0b(0x539)](this):_0x1d7d0b(0x1a0)!=='ZuvlZ'?TextManager[_0x1d7d0b(0x4bb)]('pageup',_0x1d7d0b(0x437)):_0x272879[_0x1d7d0b(0x42e)]()[_0x1d7d0b(0x3f9)](_0x268808);else{if(this[_0x1d7d0b(0x1c1)]&&this[_0x1d7d0b(0x1c1)][_0x1d7d0b(0x3c5)])return TextManager[_0x1d7d0b(0x4bb)](_0x1d7d0b(0x27b),_0x1d7d0b(0x4ec));}return Scene_MenuBase[_0x1d7d0b(0x4d2)][_0x1d7d0b(0x4d7)][_0x1d7d0b(0x539)](this);},Scene_Shop[_0x1087a8(0x4d2)]['buttonAssistKey2']=function(){const _0x2d98e4=_0x1087a8;if(this[_0x2d98e4(0x1c1)]&&this['_numberWindow'][_0x2d98e4(0x3c5)]){if(_0x2d98e4(0x588)===_0x2d98e4(0x588))return TextManager[_0x2d98e4(0x4bb)]('up',_0x2d98e4(0x23b));else{const _0x2d8209=_0x173d3a(_0x5f2d20['$1'])||0x1;if(_0x407fba>=_0x2d8209)return!![];}}return Scene_MenuBase[_0x2d98e4(0x4d2)]['buttonAssistKey2'][_0x2d98e4(0x539)](this);},Scene_Shop[_0x1087a8(0x4d2)][_0x1087a8(0x164)]=function(){const _0x5b12a1=_0x1087a8;if(this[_0x5b12a1(0x351)]())return VisuMZ[_0x5b12a1(0x3a3)][_0x5b12a1(0x2e7)]['ItemScene'][_0x5b12a1(0x191)];else{if(this['_numberWindow']&&this['_numberWindow'][_0x5b12a1(0x3c5)]){if(_0x5b12a1(0x28b)===_0x5b12a1(0x497)){_0x2d7230+=_0x5b12a1(0x452)[_0x5b12a1(0x564)](_0x1416ef),_0x36d024++;if(_0x2d93d2>=_0xad352b)return _0x5b8f3e;}else return VisuMZ['ItemsEquipsCore'][_0x5b12a1(0x2e7)][_0x5b12a1(0x281)]['buttonAssistSmallIncrement'];}}return Scene_MenuBase[_0x5b12a1(0x4d2)]['buttonAssistText1'][_0x5b12a1(0x539)](this);},Scene_Shop[_0x1087a8(0x4d2)][_0x1087a8(0x33d)]=function(){const _0x4c92bb=_0x1087a8;if(this['_numberWindow']&&this[_0x4c92bb(0x1c1)][_0x4c92bb(0x3c5)])return VisuMZ['ItemsEquipsCore'][_0x4c92bb(0x2e7)]['ShopScene'][_0x4c92bb(0x3b9)];return Scene_MenuBase['prototype'][_0x4c92bb(0x33d)]['call'](this);},Scene_Shop[_0x1087a8(0x4d2)][_0x1087a8(0x43e)]=function(){const _0x285d2e=_0x1087a8;if(!SceneManager[_0x285d2e(0x335)]())return;const _0xdad5f5=VisuMZ[_0x285d2e(0x3a3)][_0x285d2e(0x2e7)][_0x285d2e(0x281)];if(_0xdad5f5['SwitchBuy']){if(_0x285d2e(0x210)===_0x285d2e(0x3e6))return _0x38dd84[_0x285d2e(0x4bb)]('up',_0x285d2e(0x23b));else $gameSwitches[_0x285d2e(0x2fd)](_0xdad5f5[_0x285d2e(0x4e6)],![]);}_0xdad5f5[_0x285d2e(0x2ba)]&&(_0x285d2e(0x178)===_0x285d2e(0x594)?_0x44aec2['gainItem'](_0x1eaf34[_0x285d2e(0x534)](),0x1):$gameSwitches[_0x285d2e(0x2fd)](_0xdad5f5['SwitchSell'],![]));},VisuMZ[_0x1087a8(0x3a3)][_0x1087a8(0x363)]=Scene_Shop[_0x1087a8(0x4d2)][_0x1087a8(0x239)],Scene_Shop['prototype']['doBuy']=function(_0x4238a4){const _0x211fe7=_0x1087a8;VisuMZ[_0x211fe7(0x3a3)][_0x211fe7(0x363)]['call'](this,_0x4238a4);if(_0x4238a4<=0x0)return;const _0x1a3a7e=VisuMZ['ItemsEquipsCore'][_0x211fe7(0x2e7)][_0x211fe7(0x281)];_0x1a3a7e['SwitchBuy']&&$gameSwitches[_0x211fe7(0x2fd)](_0x1a3a7e[_0x211fe7(0x4e6)],!![]);},VisuMZ['ItemsEquipsCore'][_0x1087a8(0x1b1)]=Scene_Shop['prototype']['doSell'],Scene_Shop['prototype'][_0x1087a8(0x4f7)]=function(_0x31d49b){const _0x4cc523=_0x1087a8;VisuMZ[_0x4cc523(0x3a3)][_0x4cc523(0x1b1)]['call'](this,_0x31d49b);if(_0x31d49b<=0x0)return;const _0x236abb=VisuMZ['ItemsEquipsCore']['Settings'][_0x4cc523(0x281)];if(_0x236abb[_0x4cc523(0x4e6)]){if('VLbjQ'!==_0x4cc523(0x5b0)){const _0x4d598c=_0x5de8b5[_0x4cc523(0x1b3)]('['+_0x25d83a['$1'][_0x4cc523(0x4b8)](/\d+/g)+']');for(const _0x351a6b of _0x4d598c){if(_0xc40b43['value'](_0x351a6b))return![];}}else $gameSwitches['setValue'](_0x236abb[_0x4cc523(0x2ba)],!![]);}};function Sprite_NewLabel(){const _0x11e4c2=_0x1087a8;this[_0x11e4c2(0x1be)](...arguments);}Sprite_NewLabel[_0x1087a8(0x4d2)]=Object[_0x1087a8(0x57d)](Sprite[_0x1087a8(0x4d2)]),Sprite_NewLabel[_0x1087a8(0x4d2)]['constructor']=Sprite_NewLabel,Sprite_NewLabel[_0x1087a8(0x4d2)]['initialize']=function(){const _0x2a545f=_0x1087a8;Sprite[_0x2a545f(0x4d2)][_0x2a545f(0x1be)]['call'](this),this[_0x2a545f(0x30c)]();},Sprite_NewLabel[_0x1087a8(0x4d2)][_0x1087a8(0x30c)]=function(){const _0x172413=_0x1087a8,_0x5ba63b=ImageManager[_0x172413(0x212)],_0x279746=ImageManager['iconHeight'];this[_0x172413(0x35d)]=new Bitmap(_0x5ba63b,_0x279746),this[_0x172413(0x15c)](),this['drawNewLabelText']();},Sprite_NewLabel[_0x1087a8(0x4d2)][_0x1087a8(0x15c)]=function(){const _0x19b345=_0x1087a8,_0x1da659=VisuMZ[_0x19b345(0x3a3)][_0x19b345(0x2e7)]['New'][_0x19b345(0x567)];if(_0x1da659<=0x0)return;const _0x3f46e5=ImageManager[_0x19b345(0x20e)](_0x19b345(0x262)),_0x511ce4=ImageManager[_0x19b345(0x212)],_0x562d21=ImageManager[_0x19b345(0x221)],_0x4165d9=_0x1da659%0x10*_0x511ce4,_0x45ebf4=Math[_0x19b345(0x53e)](_0x1da659/0x10)*_0x562d21;this[_0x19b345(0x35d)][_0x19b345(0x18e)](_0x3f46e5,_0x4165d9,_0x45ebf4,_0x511ce4,_0x562d21,0x0,0x0);},Sprite_NewLabel[_0x1087a8(0x4d2)][_0x1087a8(0x1fc)]=function(){const _0x32c97f=_0x1087a8,_0x1a4946=VisuMZ[_0x32c97f(0x3a3)]['Settings'][_0x32c97f(0x4e2)],_0x1a845f=_0x1a4946['Text'];if(_0x1a845f==='')return;const _0x545664=ImageManager[_0x32c97f(0x212)],_0x6a8c97=ImageManager['iconHeight'];this[_0x32c97f(0x35d)][_0x32c97f(0x17d)]=_0x1a4946[_0x32c97f(0x409)]||$gameSystem[_0x32c97f(0x2bc)](),this[_0x32c97f(0x35d)][_0x32c97f(0x3e5)]=this[_0x32c97f(0x1fd)](),this[_0x32c97f(0x35d)][_0x32c97f(0x50f)]=_0x1a4946[_0x32c97f(0x579)],this[_0x32c97f(0x35d)][_0x32c97f(0x14a)](_0x1a845f,0x0,_0x6a8c97/0x2,_0x545664,_0x6a8c97/0x2,_0x32c97f(0x331));},Sprite_NewLabel['prototype'][_0x1087a8(0x1fd)]=function(){const _0x25d006=_0x1087a8,_0x3748ec=VisuMZ[_0x25d006(0x3a3)]['Settings'][_0x25d006(0x4e2)][_0x25d006(0x1de)];return _0x3748ec[_0x25d006(0x4b8)](/#(.*)/i)?'#'+String(RegExp['$1']):ColorManager['textColor'](_0x3748ec);},Window_Base[_0x1087a8(0x4d2)][_0x1087a8(0x5c1)]=function(_0x306463,_0x4e7fa3,_0x514573,_0x5e84b4){const _0x3db5f6=_0x1087a8;if(_0x306463){const _0x4363ef=_0x514573+(this[_0x3db5f6(0x425)]()-ImageManager[_0x3db5f6(0x221)])/0x2,_0x327aa7=ImageManager[_0x3db5f6(0x212)]+0x4,_0x594643=Math[_0x3db5f6(0x4ce)](0x0,_0x5e84b4-_0x327aa7);this[_0x3db5f6(0x1d7)](ColorManager[_0x3db5f6(0x21e)](_0x306463)),this[_0x3db5f6(0x546)](_0x306463[_0x3db5f6(0x3b1)],_0x4e7fa3,_0x4363ef),this['drawText'](_0x306463[_0x3db5f6(0x354)],_0x4e7fa3+_0x327aa7,_0x514573,_0x594643),this[_0x3db5f6(0x2be)]();}},Window_Base['prototype'][_0x1087a8(0x2bf)]=function(_0x205592,_0x585669,_0x3eccad,_0x5ad793){const _0x3f9121=_0x1087a8;if(this['isDrawItemNumber'](_0x205592)){if(_0x3f9121(0x5d1)!==_0x3f9121(0x3ce)){this[_0x3f9121(0x14e)]();const _0x42bb06=VisuMZ['ItemsEquipsCore'][_0x3f9121(0x2e7)][_0x3f9121(0x595)],_0x394849=_0x42bb06[_0x3f9121(0x48b)],_0x47bc42=_0x394849[_0x3f9121(0x564)]($gameParty[_0x3f9121(0x28a)](_0x205592));this[_0x3f9121(0x4a8)][_0x3f9121(0x50f)]=_0x42bb06[_0x3f9121(0x475)],this[_0x3f9121(0x14a)](_0x47bc42,_0x585669,_0x3eccad,_0x5ad793,'right'),this[_0x3f9121(0x14e)]();}else _0x24a1e8=_0x49f7da[_0x3f9121(0x258)];}},Window_Base[_0x1087a8(0x4d2)]['isDrawItemNumber']=function(_0x1c3284){const _0x12500a=_0x1087a8;if(DataManager[_0x12500a(0x25e)](_0x1c3284))return $dataSystem[_0x12500a(0x3e4)];return!![];},Window_Base[_0x1087a8(0x4d2)][_0x1087a8(0x526)]=function(_0x2965f1,_0x46bb46,_0x378526,_0x4459c2,_0x294833){const _0x4f66f8=_0x1087a8;_0x294833=Math[_0x4f66f8(0x4ce)](_0x294833||0x1,0x1);while(_0x294833--){if(_0x4f66f8(0x25b)!==_0x4f66f8(0x370)){_0x4459c2=_0x4459c2||this[_0x4f66f8(0x425)](),this['contentsBack'][_0x4f66f8(0x2bd)]=0xa0;const _0x34b4a0=ColorManager[_0x4f66f8(0x5a0)]();this['contentsBack'][_0x4f66f8(0x508)](_0x2965f1+0x1,_0x46bb46+0x1,_0x378526-0x2,_0x4459c2-0x2,_0x34b4a0),this['contentsBack']['paintOpacity']=0xff;}else this[_0x4f66f8(0x2c6)](_0x5cdcf6+_0x86bde1,_0x1ab7d5,_0x3c6235,_0x160d53,![]);}},VisuMZ[_0x1087a8(0x3a3)][_0x1087a8(0x2a1)]=Window_Selectable[_0x1087a8(0x4d2)]['initialize'],Window_Selectable[_0x1087a8(0x4d2)][_0x1087a8(0x1be)]=function(_0x3652ba){const _0x320f7e=_0x1087a8;this[_0x320f7e(0x2b7)](),VisuMZ[_0x320f7e(0x3a3)][_0x320f7e(0x2a1)]['call'](this,_0x3652ba);},Window_Selectable[_0x1087a8(0x4d2)][_0x1087a8(0x2b7)]=function(){const _0x5990a6=_0x1087a8;this[_0x5990a6(0x34b)]={},this[_0x5990a6(0x5c3)]=0xff,this[_0x5990a6(0x2b6)]=VisuMZ['ItemsEquipsCore']['Settings'][_0x5990a6(0x4e2)][_0x5990a6(0x265)],this[_0x5990a6(0x1e1)]=VisuMZ[_0x5990a6(0x3a3)][_0x5990a6(0x2e7)][_0x5990a6(0x4e2)][_0x5990a6(0x1ef)];},Window_Selectable[_0x1087a8(0x4d2)][_0x1087a8(0x158)]=function(){return![];},VisuMZ['ItemsEquipsCore'][_0x1087a8(0x5c2)]=Window_Selectable[_0x1087a8(0x4d2)]['setHelpWindowItem'],Window_Selectable[_0x1087a8(0x4d2)][_0x1087a8(0x367)]=function(_0x53cdc8){const _0x20b439=_0x1087a8;VisuMZ['ItemsEquipsCore'][_0x20b439(0x5c2)]['call'](this,_0x53cdc8);if(this[_0x20b439(0x158)]())this['clearNewLabelFromItem'](_0x53cdc8);},Window_Selectable[_0x1087a8(0x4d2)][_0x1087a8(0x507)]=function(_0x6c861f){const _0xbc4f19=_0x1087a8;if(!_0x6c861f)return;$gameParty[_0xbc4f19(0x531)](_0x6c861f);let _0x461eab='';if(DataManager[_0xbc4f19(0x468)](_0x6c861f))_0x461eab=_0xbc4f19(0x484)[_0xbc4f19(0x564)](_0x6c861f['id']);else{if(DataManager[_0xbc4f19(0x34c)](_0x6c861f)){if(_0xbc4f19(0x1b2)!==_0xbc4f19(0x3e3))_0x461eab=_0xbc4f19(0x414)[_0xbc4f19(0x564)](_0x6c861f['id']);else{const _0xbfdcc9=this['commandStyle'](),_0xdf13cc=_0x12d5ff['ItemsEquipsCore']['Settings']['ShopScene']['CmdIconSell'],_0x456b31=_0xbfdcc9===_0xbc4f19(0x29d)?_0x9a689d[_0xbc4f19(0x52a)]:_0xbc4f19(0x31c)[_0xbc4f19(0x564)](_0xdf13cc,_0xdb75a1['sell']),_0x2fa26c=this[_0xbc4f19(0x362)]();if(this[_0xbc4f19(0x385)]()&&!_0x2fa26c)return;this['addCommand'](_0x456b31,'sell',_0x2fa26c);}}else{if(DataManager[_0xbc4f19(0x56a)](_0x6c861f))_0x461eab=_0xbc4f19(0x33c)[_0xbc4f19(0x564)](_0x6c861f['id']);else return;}}const _0x277ed0=this[_0xbc4f19(0x34b)][_0x461eab];if(_0x277ed0)_0x277ed0[_0xbc4f19(0x195)]();},VisuMZ['ItemsEquipsCore'][_0x1087a8(0x1a6)]=Window_Selectable[_0x1087a8(0x4d2)]['refresh'],Window_Selectable[_0x1087a8(0x4d2)]['refresh']=function(){const _0x5d00b1=_0x1087a8;this[_0x5d00b1(0x257)](),VisuMZ[_0x5d00b1(0x3a3)][_0x5d00b1(0x1a6)][_0x5d00b1(0x539)](this);},Window_Selectable[_0x1087a8(0x4d2)][_0x1087a8(0x257)]=function(){const _0x1bc8ea=_0x1087a8;for(const _0xc66daf of Object[_0x1bc8ea(0x26e)](this[_0x1bc8ea(0x34b)])){_0xc66daf[_0x1bc8ea(0x195)]();}},VisuMZ[_0x1087a8(0x3a3)][_0x1087a8(0x3af)]=Window_Selectable['prototype'][_0x1087a8(0x511)],Window_Selectable[_0x1087a8(0x4d2)][_0x1087a8(0x511)]=function(){const _0xab9391=_0x1087a8;this[_0xab9391(0x173)](),VisuMZ['ItemsEquipsCore'][_0xab9391(0x3af)][_0xab9391(0x539)](this);},Window_Selectable['prototype']['updateNewLabelOpacity']=function(){const _0x5e1182=_0x1087a8;if(!this['isShowNew']())return;const _0x269408=this[_0x5e1182(0x1e1)];this[_0x5e1182(0x5c3)]+=this[_0x5e1182(0x2b6)];(this[_0x5e1182(0x5c3)]>=_0x269408||this[_0x5e1182(0x5c3)]<=0x0)&&(this[_0x5e1182(0x2b6)]*=-0x1);this[_0x5e1182(0x5c3)]=this[_0x5e1182(0x5c3)][_0x5e1182(0x2af)](0x0,_0x269408);for(const _0x4c2389 of Object['values'](this[_0x5e1182(0x34b)])){_0x4c2389[_0x5e1182(0x321)]=this[_0x5e1182(0x5c3)];}},Window_Selectable['prototype'][_0x1087a8(0x53d)]=function(_0x5770f5){const _0x504bf1=_0x1087a8,_0x43018b=this[_0x504bf1(0x34b)];if(_0x43018b[_0x5770f5]){if(_0x504bf1(0x310)!==_0x504bf1(0x310)){if(!_0xc825f1[_0x504bf1(0x58a)](_0x5768c3))return![];}else return _0x43018b[_0x5770f5];}else{if(_0x504bf1(0x53f)!==_0x504bf1(0x2eb)){const _0x591be4=new Sprite_NewLabel();return _0x43018b[_0x5770f5]=_0x591be4,this[_0x504bf1(0x1fb)](_0x591be4),_0x591be4;}else{const _0x1b6085=this['itemLineRect'](_0x8fbbc5),_0x56c512=this['commandName'](_0x5173c4),_0x2b9c28=this[_0x504bf1(0x5d2)](_0x56c512)['width'];this[_0x504bf1(0x4e7)](this[_0x504bf1(0x2b0)](_0x33c240));const _0x115154=this[_0x504bf1(0x54d)]();if(_0x115154===_0x504bf1(0x4ec))this[_0x504bf1(0x31b)](_0x56c512,_0x1b6085['x']+_0x1b6085[_0x504bf1(0x16c)]-_0x2b9c28,_0x1b6085['y'],_0x2b9c28);else{if(_0x115154==='center'){const _0x426782=_0x1b6085['x']+_0x38e4ad[_0x504bf1(0x53e)]((_0x1b6085[_0x504bf1(0x16c)]-_0x2b9c28)/0x2);this[_0x504bf1(0x31b)](_0x56c512,_0x426782,_0x1b6085['y'],_0x2b9c28);}else this[_0x504bf1(0x31b)](_0x56c512,_0x1b6085['x'],_0x1b6085['y'],_0x2b9c28);}}}},Window_Selectable[_0x1087a8(0x4d2)][_0x1087a8(0x1d9)]=function(_0x127d21,_0x6d12d0,_0x366db5){const _0x469ca9=_0x1087a8;let _0x4a34c8='';if(DataManager[_0x469ca9(0x468)](_0x127d21))_0x4a34c8='item-%1'['format'](_0x127d21['id']);else{if(DataManager[_0x469ca9(0x34c)](_0x127d21)){if(_0x469ca9(0x3ee)!==_0x469ca9(0x174))_0x4a34c8=_0x469ca9(0x414)[_0x469ca9(0x564)](_0x127d21['id']);else return _0x4aba4c[_0x469ca9(0x3a3)][_0x469ca9(0x3ef)][_0x469ca9(0x539)](this);}else{if(DataManager[_0x469ca9(0x56a)](_0x127d21))_0x469ca9(0x2f6)!==_0x469ca9(0x1f3)?_0x4a34c8=_0x469ca9(0x33c)[_0x469ca9(0x564)](_0x127d21['id']):this[_0x469ca9(0x319)](![]);else return;}}const _0x32ba23=this[_0x469ca9(0x53d)](_0x4a34c8);_0x32ba23['move'](_0x6d12d0,_0x366db5),_0x32ba23[_0x469ca9(0x327)](),_0x32ba23['opacity']=this[_0x469ca9(0x5c3)];},Window_ItemCategory['categoryList']=VisuMZ[_0x1087a8(0x3a3)][_0x1087a8(0x2e7)][_0x1087a8(0x3db)]['List'],Window_ItemCategory[_0x1087a8(0x4ed)]=[_0x1087a8(0x55c),_0x1087a8(0x575),_0x1087a8(0x167),_0x1087a8(0x1c8),_0x1087a8(0x553),_0x1087a8(0x464),_0x1087a8(0x4de),_0x1087a8(0x59a)],VisuMZ[_0x1087a8(0x3a3)][_0x1087a8(0x28c)]=Window_ItemCategory[_0x1087a8(0x4d2)][_0x1087a8(0x1be)],Window_ItemCategory[_0x1087a8(0x4d2)][_0x1087a8(0x1be)]=function(_0x5f46ed){const _0x390199=_0x1087a8;VisuMZ[_0x390199(0x3a3)][_0x390199(0x28c)][_0x390199(0x539)](this,_0x5f46ed),this[_0x390199(0x337)](_0x5f46ed);},Window_ItemCategory[_0x1087a8(0x4d2)][_0x1087a8(0x337)]=function(_0x5951ff){const _0x3399a3=_0x1087a8,_0x55bb35=new Rectangle(0x0,0x0,_0x5951ff[_0x3399a3(0x16c)],_0x5951ff['height']);this['_categoryNameWindow']=new Window_Base(_0x55bb35),this[_0x3399a3(0x2c7)][_0x3399a3(0x321)]=0x0,this[_0x3399a3(0x194)](this[_0x3399a3(0x2c7)]),this[_0x3399a3(0x162)]();},Window_ItemCategory[_0x1087a8(0x4d2)][_0x1087a8(0x3a8)]=function(){const _0x3d4b82=_0x1087a8;return Imported[_0x3d4b82(0x3b6)]&&Window_HorzCommand['prototype']['isUseModernControls']['call'](this);},Window_ItemCategory['prototype'][_0x1087a8(0x422)]=function(){},Window_ItemCategory[_0x1087a8(0x4d2)]['playOkSound']=function(){const _0x12e91b=_0x1087a8;if(!this[_0x12e91b(0x3a8)]())Window_HorzCommand['prototype'][_0x12e91b(0x487)]['call'](this);},Window_ItemCategory[_0x1087a8(0x4d2)][_0x1087a8(0x2e1)]=function(){const _0x54dcb2=_0x1087a8;return this[_0x54dcb2(0x282)]?this['maxItems']():0x4;},Window_ItemCategory['prototype'][_0x1087a8(0x511)]=function(){const _0x1c00c5=_0x1087a8;Window_HorzCommand[_0x1c00c5(0x4d2)][_0x1c00c5(0x511)][_0x1c00c5(0x539)](this);if(this[_0x1c00c5(0x40f)]){if(_0x1c00c5(0x1e2)!==_0x1c00c5(0x1e2)){if(this[_0x1c00c5(0x468)](_0x5c7686))return _0x390285['ItemsEquipsCore'][_0x1c00c5(0x2e7)][_0x1c00c5(0x595)][_0x1c00c5(0x1b0)];else{if(this[_0x1c00c5(0x34c)](_0x1586f1))return _0x3061fb[_0x1c00c5(0x3a3)]['Settings'][_0x1c00c5(0x595)][_0x1c00c5(0x2ae)];else{if(this[_0x1c00c5(0x56a)](_0x276622))return _0x3cfb5d[_0x1c00c5(0x3a3)][_0x1c00c5(0x2e7)][_0x1c00c5(0x595)]['MaxArmors'];}}}else this[_0x1c00c5(0x40f)][_0x1c00c5(0x3e0)](this['currentExt']());}},Window_ItemCategory[_0x1087a8(0x4d2)][_0x1087a8(0x3e1)]=function(){const _0x3b418c=_0x1087a8;if(this['isCursorMovable']()){if(_0x3b418c(0x48a)===_0x3b418c(0x1d0)){this[_0x3b418c(0x40f)][_0x3b418c(0x44b)]();const _0x38a910=this['_slotWindow'][_0x3b418c(0x4b2)](),_0x5243ea=this[_0x3b418c(0x40f)][_0x3b418c(0x415)][_0x3b418c(0x197)](_0x38a910),_0x468ddd=_0x466a45[_0x3b418c(0x53e)](this[_0x3b418c(0x40f)][_0x3b418c(0x446)]()/0x2)-0x1;this[_0x3b418c(0x40f)][_0x3b418c(0x2f5)](_0x5243ea>=0x0?_0x5243ea:0x0),this['_itemWindow'][_0x3b418c(0x215)](this[_0x3b418c(0x40f)][_0x3b418c(0x4ba)]()-_0x468ddd);}else{const _0x267c3b=this[_0x3b418c(0x4ba)]();if(this[_0x3b418c(0x40f)]&&this[_0x3b418c(0x40f)][_0x3b418c(0x2e1)]()<=0x1){if(Input['isRepeated'](_0x3b418c(0x4ec))){if(_0x3b418c(0x4e0)!==_0x3b418c(0x4e0))return _0x2236b0[_0x3b418c(0x3a3)]['Scene_Equip_commandWindowRect'][_0x3b418c(0x539)](this);else this[_0x3b418c(0x570)](Input[_0x3b418c(0x469)](_0x3b418c(0x4ec)));}Input[_0x3b418c(0x1c5)](_0x3b418c(0x27b))&&this[_0x3b418c(0x3bb)](Input[_0x3b418c(0x469)](_0x3b418c(0x27b)));}else{if(this['_itemWindow']&&this[_0x3b418c(0x40f)][_0x3b418c(0x2e1)]()>0x1){if(Input[_0x3b418c(0x1c5)](_0x3b418c(0x437))&&!Input[_0x3b418c(0x547)](_0x3b418c(0x3f2))){if(_0x3b418c(0x4b9)===_0x3b418c(0x5bc))return this[_0x3b418c(0x1cb)]();else this[_0x3b418c(0x570)](Input[_0x3b418c(0x469)]('pagedown'));}Input[_0x3b418c(0x1c5)](_0x3b418c(0x478))&&!Input[_0x3b418c(0x547)](_0x3b418c(0x3f2))&&(_0x3b418c(0x529)===_0x3b418c(0x529)?this[_0x3b418c(0x3bb)](Input['isTriggered'](_0x3b418c(0x478))):this['playCursorSound']());}}this['index']()!==_0x267c3b&&this[_0x3b418c(0x264)]();}}},Window_ItemCategory[_0x1087a8(0x4d2)][_0x1087a8(0x56b)]=function(){const _0x5df811=_0x1087a8;if(this['isUseModernControls']())return;Window_HorzCommand[_0x5df811(0x4d2)][_0x5df811(0x56b)][_0x5df811(0x539)](this);},Window_ItemCategory[_0x1087a8(0x4d2)][_0x1087a8(0x1b6)]=function(){const _0x5d1183=_0x1087a8;if(this[_0x5d1183(0x3a8)]()){if(_0x5d1183(0x2b3)==='BYOrQ'){const _0x700514=_0x2ac902[_0x5d1183(0x1b3)]('['+_0x3a129c['$1'][_0x5d1183(0x4b8)](/\d+/g)+']');for(const _0x1c3138 of _0x700514){if(!_0x3eb760[_0x5d1183(0x58a)](_0x1c3138))return![];}return!![];}else return![];}else return _0x5d1183(0x1ad)!==_0x5d1183(0x181)?Window_HorzCommand[_0x5d1183(0x4d2)][_0x5d1183(0x1b6)][_0x5d1183(0x539)](this):_0x24302e[_0x5d1183(0x3a3)]['Scene_Shop_goldWindowRect'][_0x5d1183(0x539)](this);},Window_ItemCategory[_0x1087a8(0x4d2)][_0x1087a8(0x27e)]=function(){const _0x4ef521=_0x1087a8;if(this[_0x4ef521(0x49c)]()){if(_0x4ef521(0x43b)!==_0x4ef521(0x365)){TouchInput['isTriggered']()&&(_0x4ef521(0x1f0)!==_0x4ef521(0x1f0)?this['postCreateCategoryWindowItemsEquipsCore']():this['onTouchSelect'](!![]));if(TouchInput[_0x4ef521(0x410)]())_0x4ef521(0x3d1)!==_0x4ef521(0x22c)?this[_0x4ef521(0x357)]():this['drawRemoveItem'](_0x11c219);else TouchInput[_0x4ef521(0x502)]()&&this['onTouchCancel']();}else return!![];}},Window_ItemCategory[_0x1087a8(0x4d2)]['onTouchSelect']=function(_0x48ed49){const _0x538124=_0x1087a8;this['isUseModernControls']()?this[_0x538124(0x488)](!![]):Window_HorzCommand[_0x538124(0x4d2)][_0x538124(0x2ec)][_0x538124(0x539)](this,_0x48ed49);},Window_ItemCategory[_0x1087a8(0x4d2)][_0x1087a8(0x488)]=function(_0x2428a8){const _0x12a34a=_0x1087a8;this[_0x12a34a(0x521)]=![];if(this[_0x12a34a(0x5b5)]()){if(_0x12a34a(0x229)==='XXTMz'){const _0x303405=this['index'](),_0x3b58cd=this[_0x12a34a(0x512)]();if(_0x3b58cd>=0x0&&_0x3b58cd!==this[_0x12a34a(0x4ba)]()){if(_0x12a34a(0x17b)!==_0x12a34a(0x17b))return _0xf5409f['VisuMZ_0_CoreEngine']?_0xd2622f[_0x12a34a(0x5af)][_0x12a34a(0x2e7)]['Param']['ExtDisplayedParams']:[0x0,0x1,0x2,0x3,0x4,0x5,0x6,0x7];else this[_0x12a34a(0x3ba)](_0x3b58cd);}_0x2428a8&&this['index']()!==_0x303405&&this[_0x12a34a(0x264)]();}else{const _0xd09f92=_0x12a34a(0x383);if(this[_0x12a34a(0x297)]['rateHP']>=0x0&&this['_itemData']['flatHP']>=0x0&&!this['_customItemInfo'][_0xd09f92])return![];const _0x55f15a=this['getItemEffectsHpDamageLabel']();this[_0x12a34a(0x308)](_0x55f15a,_0x29f58b,_0x8f483d,_0x42da84,!![]);const _0x3e8ac7=this[_0x12a34a(0x4bd)]();return this[_0x12a34a(0x1d7)](_0x17f231['damageColor'](0x0)),this['drawItemKeyData'](_0x3e8ac7,_0x1f251a,_0x4e0aa0,_0x4bb621,![],_0x12a34a(0x4ec)),this[_0x12a34a(0x526)](_0x2c149f,_0x21f363,_0x30e578),this['resetFontSettings'](),!![];}}},Window_ItemCategory[_0x1087a8(0x4d2)][_0x1087a8(0x1e8)]=function(){const _0x5a5a05=_0x1087a8;for(const _0x59c4f7 of Window_ItemCategory[_0x5a5a05(0x3e2)]){_0x5a5a05(0x4f2)!==_0x5a5a05(0x5bb)?this['addItemCategory'](_0x59c4f7):(_0x20fc92['ItemsEquipsCore'][_0x5a5a05(0x364)][_0x5a5a05(0x539)](this),this[_0x5a5a05(0x3a8)]()&&this['commandEquip']());}this[_0x5a5a05(0x3ba)](this['index']());},Window_ItemCategory[_0x1087a8(0x4d2)]['addItemCategory']=function(_0x7a345){const _0x36b392=_0x1087a8,_0x11daf0=_0x7a345[_0x36b392(0x5b4)],_0x5c3712=_0x7a345['Icon'],_0x3336d1=_0x7a345['SwitchID']||0x0;if(_0x3336d1>0x0&&!$gameSwitches['value'](_0x3336d1))return;let _0x5823c6='',_0x13d2a0='category',_0xd51ee3=_0x11daf0;if(_0x11daf0[_0x36b392(0x4b8)](/Category:(.*)/i))_0x5823c6=String(RegExp['$1'])[_0x36b392(0x187)]();else{if(Window_ItemCategory['categoryItemTypes'][_0x36b392(0x5a5)](_0x11daf0))_0x5823c6=VisuMZ[_0x36b392(0x3a3)][_0x36b392(0x2e7)][_0x36b392(0x3db)][_0x11daf0];else{if([_0x36b392(0x2c2),_0x36b392(0x544)][_0x36b392(0x5a5)](_0x11daf0))_0x36b392(0x46e)===_0x36b392(0x46e)?_0x5823c6=TextManager[_0x36b392(0x4b2)]:this[_0x36b392(0x264)]();else{if(_0x11daf0===_0x36b392(0x1b5)){if(_0x36b392(0x3aa)!==_0x36b392(0x3aa))return _0x36b392(0x1ec);else _0x5823c6=TextManager['keyItem'];}else{if(_0x11daf0==='AllWeapons'){if(_0x36b392(0x461)===_0x36b392(0x3cc))return _0x36b392(0x1ec);else _0x5823c6=TextManager[_0x36b392(0x42b)];}else{if(_0x11daf0===_0x36b392(0x1cc)){if(_0x36b392(0x305)===_0x36b392(0x30e)){_0x129672=this[_0x36b392(0x1b8)](_0x55ace1);const _0x1c7731=this[_0x36b392(0x4b6)]();this[_0x36b392(0x2fc)]=[];for(let _0x4198b9=0x0;_0x4198b9<_0x1c7731[_0x36b392(0x490)];_0x4198b9++){this[_0x36b392(0x2fc)][_0x4198b9]=new _0x359d24();}for(let _0x41e1ef=0x0;_0x41e1ef<_0x1c7731[_0x36b392(0x490)];_0x41e1ef++){const _0x20085f=_0x1c7731[_0x41e1ef],_0x503f92=this[_0x36b392(0x1dd)](_0x582956,_0x20085f);if(this[_0x36b392(0x455)](_0x503f92))this[_0x36b392(0x2fc)][_0x41e1ef][_0x36b392(0x540)](_0x503f92);}this[_0x36b392(0x2d4)](!![]),this[_0x36b392(0x44b)]();}else _0x5823c6=TextManager['armor'];}else{if(_0x11daf0[_0x36b392(0x4b8)](/WTYPE:(\d+)/i))_0x5823c6=$dataSystem[_0x36b392(0x283)][Number(RegExp['$1'])]||'';else{if(_0x11daf0[_0x36b392(0x4b8)](/ATYPE:(\d+)/i)){if(_0x36b392(0x3fe)===_0x36b392(0x3fe))_0x5823c6=$dataSystem[_0x36b392(0x296)][Number(RegExp['$1'])]||'';else{const _0x3dee56=_0x6bdacf['makeDeepCopy'](this);_0x3dee56[_0x36b392(0x432)]=!![],_0x803c93['ItemsEquipsCore'][_0x36b392(0x494)][_0x36b392(0x539)](this,_0x14efd2,_0x3c2fa7),this[_0x36b392(0x483)](_0x3dee56);}}else{if(_0x11daf0['match'](/ETYPE:(\d+)/i)){if(_0x36b392(0x2a6)!==_0x36b392(0x2a6)){const _0x482cd6=_0x10f0c6(_0x37d784['$1'])||0x1;if(_0x362963>=_0x482cd6)return!![];}else _0x5823c6=$dataSystem['equipTypes'][Number(RegExp['$1'])]||'';}}}}}}}}}_0x5c3712>0x0&&this[_0x36b392(0x350)]()!==_0x36b392(0x29d)&&(_0x5823c6='\x5cI[%1]%2'['format'](_0x5c3712,_0x5823c6)),this[_0x36b392(0x51b)](_0x5823c6,_0x13d2a0,!![],_0xd51ee3);},Window_ItemCategory[_0x1087a8(0x4d2)][_0x1087a8(0x54d)]=function(){const _0x373133=_0x1087a8;return VisuMZ[_0x373133(0x3a3)]['Settings'][_0x373133(0x3db)][_0x373133(0x254)];},Window_ItemCategory['prototype']['drawItem']=function(_0xa858d8){const _0x38b7b6=_0x1087a8,_0x4588ca=this[_0x38b7b6(0x427)](_0xa858d8);if(_0x4588ca===_0x38b7b6(0x2ef))this['drawItemStyleIconText'](_0xa858d8);else{if(_0x4588ca===_0x38b7b6(0x1ec))this[_0x38b7b6(0x5c8)](_0xa858d8);else{if(_0x38b7b6(0x179)!=='gSCQG')return _0x2d193b['ItemsEquipsCore'][_0x38b7b6(0x2e7)][_0x38b7b6(0x241)][_0x38b7b6(0x55e)];else Window_HorzCommand[_0x38b7b6(0x4d2)]['drawItem']['call'](this,_0xa858d8);}}},Window_ItemCategory[_0x1087a8(0x4d2)][_0x1087a8(0x350)]=function(){const _0x3af9ee=_0x1087a8;return VisuMZ[_0x3af9ee(0x3a3)]['Settings'][_0x3af9ee(0x3db)]['Style'];},Window_ItemCategory[_0x1087a8(0x4d2)][_0x1087a8(0x427)]=function(_0x45eb9c){const _0x346554=_0x1087a8;if(_0x45eb9c<0x0)return _0x346554(0x29d);const _0x167029=this[_0x346554(0x350)]();if(_0x167029!==_0x346554(0x49b))return _0x167029;else{if('YlPYn'!=='Hzuwi'){const _0xab6b52=this['commandName'](_0x45eb9c);if(_0xab6b52[_0x346554(0x4b8)](/\\I\[(\d+)\]/i)){if(_0x346554(0x344)===_0x346554(0x344)){const _0x192c7e=this[_0x346554(0x2c8)](_0x45eb9c),_0x2f6436=this[_0x346554(0x5d2)](_0xab6b52)['width'];return _0x2f6436<=_0x192c7e[_0x346554(0x16c)]?_0x346554(0x2ef):_0x346554(0x31f)!==_0x346554(0x31f)?_0x57206a[_0x346554(0x4d2)][_0x346554(0x515)][_0x346554(0x539)](this,_0x2148f5):_0x346554(0x1ec);}else return this[_0x346554(0x45f)]()?this[_0x346554(0x589)]():_0x64fc12[_0x346554(0x4d2)][_0x346554(0x29f)][_0x346554(0x539)](this);}else return'text';}else{const _0x488dc8=_0x55f6f0[_0x346554(0x3a3)]['Settings'][_0x346554(0x241)]['LabelRecoverMP'];return _0x488dc8[_0x346554(0x564)](_0x23f4a5['mp']);}}},Window_ItemCategory[_0x1087a8(0x4d2)][_0x1087a8(0x5ac)]=function(_0x30f92d){const _0xc987b5=_0x1087a8,_0x280024=this[_0xc987b5(0x2c8)](_0x30f92d),_0xefa0b=this['commandName'](_0x30f92d),_0xbcae76=this['textSizeEx'](_0xefa0b)[_0xc987b5(0x16c)];this[_0xc987b5(0x4e7)](this[_0xc987b5(0x2b0)](_0x30f92d));const _0x24d56b=this['itemTextAlign']();if(_0x24d56b===_0xc987b5(0x4ec))this[_0xc987b5(0x31b)](_0xefa0b,_0x280024['x']+_0x280024[_0xc987b5(0x16c)]-_0xbcae76,_0x280024['y'],_0xbcae76);else{if(_0x24d56b===_0xc987b5(0x331)){const _0xf84d3c=_0x280024['x']+Math[_0xc987b5(0x53e)]((_0x280024[_0xc987b5(0x16c)]-_0xbcae76)/0x2);this[_0xc987b5(0x31b)](_0xefa0b,_0xf84d3c,_0x280024['y'],_0xbcae76);}else this[_0xc987b5(0x31b)](_0xefa0b,_0x280024['x'],_0x280024['y'],_0xbcae76);}},Window_ItemCategory[_0x1087a8(0x4d2)]['drawItemStyleIcon']=function(_0x2db9b1){const _0x55b149=_0x1087a8,_0x448fdc=this[_0x55b149(0x1dc)](_0x2db9b1);if(_0x448fdc[_0x55b149(0x4b8)](/\\I\[(\d+)\]/i)){const _0xe0c44a=Number(RegExp['$1'])||0x0,_0x313631=this[_0x55b149(0x2c8)](_0x2db9b1),_0x1e76a8=_0x313631['x']+Math[_0x55b149(0x53e)]((_0x313631[_0x55b149(0x16c)]-ImageManager[_0x55b149(0x212)])/0x2),_0x1c77dc=_0x313631['y']+(_0x313631[_0x55b149(0x5cd)]-ImageManager[_0x55b149(0x221)])/0x2;this[_0x55b149(0x546)](_0xe0c44a,_0x1e76a8,_0x1c77dc);}},VisuMZ[_0x1087a8(0x3a3)][_0x1087a8(0x408)]=Window_ItemCategory[_0x1087a8(0x4d2)][_0x1087a8(0x4a5)],Window_ItemCategory[_0x1087a8(0x4d2)][_0x1087a8(0x4a5)]=function(_0x323780){const _0x435fa8=_0x1087a8;VisuMZ[_0x435fa8(0x3a3)][_0x435fa8(0x408)][_0x435fa8(0x539)](this,_0x323780),_0x323780[_0x435fa8(0x275)]=this;},Window_ItemCategory[_0x1087a8(0x4d2)][_0x1087a8(0x35c)]=function(){const _0x34b5d0=_0x1087a8;Window_HorzCommand[_0x34b5d0(0x4d2)][_0x34b5d0(0x35c)][_0x34b5d0(0x539)](this);if(this[_0x34b5d0(0x2c7)])this['updateCategoryNameWindow']();},Window_ItemCategory[_0x1087a8(0x4d2)][_0x1087a8(0x162)]=function(){const _0x69fb32=_0x1087a8,_0x35164e=this[_0x69fb32(0x2c7)];_0x35164e[_0x69fb32(0x4a8)][_0x69fb32(0x5bd)]();const _0x4a4afe=this[_0x69fb32(0x427)](this['index']());if(_0x4a4afe===_0x69fb32(0x1ec)){const _0x549f4f=this[_0x69fb32(0x2c8)](this['index']());let _0x2cbb6b=this[_0x69fb32(0x1dc)](this['index']());_0x2cbb6b=_0x2cbb6b[_0x69fb32(0x20c)](/\\I\[(\d+)\]/gi,''),_0x35164e[_0x69fb32(0x14e)](),this[_0x69fb32(0x2c4)](_0x2cbb6b,_0x549f4f),this['categoryNameWindowDrawText'](_0x2cbb6b,_0x549f4f),this['categoryNameWindowCenter'](_0x2cbb6b,_0x549f4f);}},Window_ItemCategory['prototype']['categoryNameWindowDrawBackground']=function(_0x2da291,_0x54bf2c){},Window_ItemCategory[_0x1087a8(0x4d2)][_0x1087a8(0x1c2)]=function(_0x14b9c8,_0x498dc9){const _0x3fca70=_0x1087a8,_0x5b0cba=this[_0x3fca70(0x2c7)];_0x5b0cba[_0x3fca70(0x14a)](_0x14b9c8,0x0,_0x498dc9['y'],_0x5b0cba[_0x3fca70(0x407)],_0x3fca70(0x331));},Window_ItemCategory[_0x1087a8(0x4d2)]['categoryNameWindowCenter']=function(_0x4599ee,_0xf49308){const _0x2fc74b=_0x1087a8,_0x217ffe=this[_0x2fc74b(0x2c7)],_0x21333b=$gameSystem[_0x2fc74b(0x578)](),_0x898d1f=_0xf49308['x']+Math[_0x2fc74b(0x53e)](_0xf49308['width']/0x2)+_0x21333b;_0x217ffe['x']=_0x217ffe[_0x2fc74b(0x16c)]/-0x2+_0x898d1f,_0x217ffe['y']=Math[_0x2fc74b(0x53e)](_0xf49308[_0x2fc74b(0x5cd)]/0x2);},Window_ItemList['prototype'][_0x1087a8(0x3e1)]=function(){const _0x20cf9f=_0x1087a8;if(this[_0x20cf9f(0x5b5)]()){if(_0x20cf9f(0x306)!==_0x20cf9f(0x306))return _0x129dbe[_0x20cf9f(0x3a3)][_0x20cf9f(0x2e7)][_0x20cf9f(0x595)]['ShowShopStatus'];else{const _0x3c344b=this[_0x20cf9f(0x4ba)]();if(this[_0x20cf9f(0x2e1)]()<=0x1)!this[_0x20cf9f(0x536)]('pagedown')&&Input[_0x20cf9f(0x469)](_0x20cf9f(0x437))&&(_0x20cf9f(0x352)===_0x20cf9f(0x352)?this[_0x20cf9f(0x545)]():(_0x50f57d[_0x20cf9f(0x3a3)][_0x20cf9f(0x207)][_0x20cf9f(0x539)](this),this[_0x20cf9f(0x45f)]()&&this['onBuyCancelItemsEquipsCore']())),!this[_0x20cf9f(0x536)](_0x20cf9f(0x478))&&Input['isTriggered'](_0x20cf9f(0x478))&&this[_0x20cf9f(0x320)]();else{if(this[_0x20cf9f(0x2e1)]()>0x1){Input[_0x20cf9f(0x1c5)](_0x20cf9f(0x4ec))&&this[_0x20cf9f(0x570)](Input[_0x20cf9f(0x469)]('right'));Input[_0x20cf9f(0x1c5)]('left')&&this[_0x20cf9f(0x3bb)](Input[_0x20cf9f(0x469)](_0x20cf9f(0x27b)));if(this[_0x20cf9f(0x4ad)]()){if(_0x20cf9f(0x1b7)!==_0x20cf9f(0x29a))Input[_0x20cf9f(0x469)]('pagedown')&&Input[_0x20cf9f(0x547)](_0x20cf9f(0x3f2))&&this[_0x20cf9f(0x545)](),Input[_0x20cf9f(0x469)](_0x20cf9f(0x478))&&Input['isPressed'](_0x20cf9f(0x3f2))&&this[_0x20cf9f(0x320)]();else return 0x63;}else Input[_0x20cf9f(0x469)](_0x20cf9f(0x437))&&this[_0x20cf9f(0x545)](),Input['isTriggered'](_0x20cf9f(0x478))&&this[_0x20cf9f(0x320)]();}}if(Input[_0x20cf9f(0x1c5)](_0x20cf9f(0x23b))){if('Ukeit'!==_0x20cf9f(0x56c))Input[_0x20cf9f(0x547)](_0x20cf9f(0x3f2))&&this[_0x20cf9f(0x359)]()?this['cursorPagedown']():this[_0x20cf9f(0x44c)](Input[_0x20cf9f(0x469)]('down'));else{const _0x55a0ae=_0x3c6e70[_0x20cf9f(0x48e)](this);_0x55a0ae[_0x20cf9f(0x432)]=!![],_0x2aa47b[_0x20cf9f(0x3a3)][_0x20cf9f(0x4a4)]['call'](this,_0x579868,_0x3a33fb),this['equipAdjustHpMp'](_0x55a0ae);}}Input['isRepeated']('up')&&(Input[_0x20cf9f(0x547)](_0x20cf9f(0x3f2))&&this[_0x20cf9f(0x359)]()?_0x20cf9f(0x4e3)!==_0x20cf9f(0x4e3)?this[_0x20cf9f(0x2b6)]*=-0x1:this['cursorPageup']():this['cursorUp'](Input[_0x20cf9f(0x469)]('up')));if(Imported['VisuMZ_0_CoreEngine']){if('XdoLb'===_0x20cf9f(0x22b))this[_0x20cf9f(0x422)]();else return _0x9f5e11[_0x20cf9f(0x3bd)];}this[_0x20cf9f(0x4ba)]()!==_0x3c344b&&this[_0x20cf9f(0x264)]();}}},Window_ItemList[_0x1087a8(0x4d2)][_0x1087a8(0x4ad)]=function(){const _0xb8b944=_0x1087a8,_0x3369ea=SceneManager[_0xb8b944(0x4a0)],_0x1a8626=[Scene_Item,Scene_Shop];return _0x1a8626[_0xb8b944(0x5a5)](_0x3369ea[_0xb8b944(0x4c4)]);},Window_ItemList[_0x1087a8(0x4d2)]['activate']=function(){const _0x231ad=_0x1087a8;Window_Selectable[_0x231ad(0x4d2)][_0x231ad(0x184)][_0x231ad(0x539)](this);if(this['_categoryWindow']&&this[_0x231ad(0x275)][_0x231ad(0x3a8)]()){if(_0x231ad(0x37c)!=='IfrAu'){if(!this['checkItemConditionsSwitchNotetags'](_0x1f04e1))return![];return!![];}else this[_0x231ad(0x275)][_0x231ad(0x184)]();}},Window_ItemList['prototype']['deactivate']=function(){const _0x4e3ece=_0x1087a8;Window_Selectable[_0x4e3ece(0x4d2)][_0x4e3ece(0x289)][_0x4e3ece(0x539)](this),this['_categoryWindow']&&this[_0x4e3ece(0x275)][_0x4e3ece(0x3a8)]()&&this['_categoryWindow'][_0x4e3ece(0x289)]();},Window_ItemList[_0x1087a8(0x4d2)][_0x1087a8(0x3e0)]=function(_0x1498c2){const _0x29bfdf=_0x1087a8;this[_0x29bfdf(0x3e9)]!==_0x1498c2&&(this[_0x29bfdf(0x3e9)]=_0x1498c2,this[_0x29bfdf(0x44b)](),this['_categoryWindow']&&this[_0x29bfdf(0x275)][_0x29bfdf(0x3a8)]()?this[_0x29bfdf(0x2f5)](0x0):_0x29bfdf(0x3d9)!==_0x29bfdf(0x3d9)?(_0x266d1b[_0x29bfdf(0x3a3)][_0x29bfdf(0x2e0)][_0x29bfdf(0x539)](this),this[_0x29bfdf(0x3a8)]()&&this[_0x29bfdf(0x43f)](),this['allowCreateStatusWindow']()&&this['createStatusWindow']()):this[_0x29bfdf(0x46a)](0x0,0x0));},VisuMZ[_0x1087a8(0x3a3)][_0x1087a8(0x4eb)]=Window_ItemList['prototype'][_0x1087a8(0x2e1)],Window_ItemList[_0x1087a8(0x4d2)][_0x1087a8(0x2e1)]=function(){const _0x47260b=_0x1087a8;if(SceneManager['_scene'][_0x47260b(0x4c4)]===Scene_Battle)return _0x47260b(0x295)!==_0x47260b(0x46f)?VisuMZ[_0x47260b(0x3a3)][_0x47260b(0x4eb)][_0x47260b(0x539)](this):_0xf941d3['_scene'][_0x47260b(0x2f0)]>0x0;else return SceneManager[_0x47260b(0x4a0)][_0x47260b(0x4c4)]===Scene_Map?VisuMZ[_0x47260b(0x3a3)]['Window_ItemList_maxCols'][_0x47260b(0x539)](this):VisuMZ[_0x47260b(0x3a3)]['Settings'][_0x47260b(0x595)][_0x47260b(0x5b2)];},VisuMZ[_0x1087a8(0x3a3)]['Window_ItemList_colSpacing']=Window_ItemList[_0x1087a8(0x4d2)][_0x1087a8(0x2b1)],Window_ItemList[_0x1087a8(0x4d2)][_0x1087a8(0x2b1)]=function(){const _0x459866=_0x1087a8;if(this[_0x459866(0x2e1)]()<=0x1)return Window_Selectable[_0x459866(0x4d2)]['colSpacing'][_0x459866(0x539)](this);else{if('zgXEV'===_0x459866(0x566))return VisuMZ[_0x459866(0x3a3)]['Window_ItemList_colSpacing'][_0x459866(0x539)](this);else{_0x5abf19[_0x459866(0x4d2)][_0x459866(0x35c)]['call'](this);if(this[_0x459866(0x38a)])this[_0x459866(0x492)]();}}},Window_ItemList[_0x1087a8(0x4d2)][_0x1087a8(0x5a5)]=function(_0xd67ed6){const _0x48ca3e=_0x1087a8;switch(this[_0x48ca3e(0x3e9)]){case _0x48ca3e(0x2c2):return DataManager[_0x48ca3e(0x468)](_0xd67ed6);case _0x48ca3e(0x544):return DataManager['isItem'](_0xd67ed6)&&_0xd67ed6['itypeId']===0x1;case _0x48ca3e(0x1b5):return DataManager['isItem'](_0xd67ed6)&&_0xd67ed6[_0x48ca3e(0x37b)]===0x2;case _0x48ca3e(0x55c):return DataManager[_0x48ca3e(0x468)](_0xd67ed6)&&_0xd67ed6[_0x48ca3e(0x37b)]===0x3;case _0x48ca3e(0x575):return DataManager[_0x48ca3e(0x468)](_0xd67ed6)&&_0xd67ed6[_0x48ca3e(0x37b)]===0x4;case'Consumable':return DataManager[_0x48ca3e(0x468)](_0xd67ed6)&&_0xd67ed6['consumable'];case _0x48ca3e(0x167):return DataManager[_0x48ca3e(0x468)](_0xd67ed6)&&!_0xd67ed6[_0x48ca3e(0x243)];case _0x48ca3e(0x553):return DataManager[_0x48ca3e(0x468)](_0xd67ed6)&&[0x0][_0x48ca3e(0x5a5)](_0xd67ed6[_0x48ca3e(0x443)]);case _0x48ca3e(0x464):return DataManager[_0x48ca3e(0x468)](_0xd67ed6)&&[0x0,0x1][_0x48ca3e(0x5a5)](_0xd67ed6[_0x48ca3e(0x443)]);case _0x48ca3e(0x4de):return DataManager['isItem'](_0xd67ed6)&&[0x0,0x2]['includes'](_0xd67ed6[_0x48ca3e(0x443)]);case _0x48ca3e(0x59a):return DataManager[_0x48ca3e(0x468)](_0xd67ed6)&&[0x3][_0x48ca3e(0x5a5)](_0xd67ed6['occasion']);case _0x48ca3e(0x571):return DataManager['isWeapon'](_0xd67ed6);case _0x48ca3e(0x1cc):return DataManager[_0x48ca3e(0x56a)](_0xd67ed6);default:if(this[_0x48ca3e(0x3e9)][_0x48ca3e(0x4b8)](/WTYPE:(\d+)/i))return _0x48ca3e(0x2a3)!==_0x48ca3e(0x55b)?DataManager[_0x48ca3e(0x34c)](_0xd67ed6)&&_0xd67ed6[_0x48ca3e(0x391)]===Number(RegExp['$1']):![];else{if(this['_category'][_0x48ca3e(0x4b8)](/WTYPE:(.*)/i)){const _0x3c7b68=$dataSystem['weaponTypes']['indexOf'](String(RegExp['$1'])['trim']());return DataManager[_0x48ca3e(0x34c)](_0xd67ed6)&&_0xd67ed6[_0x48ca3e(0x391)]===_0x3c7b68;}else{if(this[_0x48ca3e(0x3e9)][_0x48ca3e(0x4b8)](/ATYPE:(\d+)/i))return DataManager['isArmor'](_0xd67ed6)&&_0xd67ed6['atypeId']===Number(RegExp['$1']);else{if(this[_0x48ca3e(0x3e9)]['match'](/ATYPE:(.*)/i)){const _0x3b051d=$dataSystem['armorTypes']['indexOf'](String(RegExp['$1'])[_0x48ca3e(0x187)]());return DataManager['isArmor'](_0xd67ed6)&&_0xd67ed6[_0x48ca3e(0x2e4)]===_0x3b051d;}else{if(this[_0x48ca3e(0x3e9)]['match'](/ETYPE:(\d+)/i))return!!_0xd67ed6&&_0xd67ed6[_0x48ca3e(0x499)]===Number(RegExp['$1']);else{if(this[_0x48ca3e(0x3e9)][_0x48ca3e(0x4b8)](/ETYPE:(.*)/i)){if('kNBJy'!==_0x48ca3e(0x50c)){const _0x2cdf03=_0x3027b2['x']+_0x391da0['floor']((_0x47fcba[_0x48ca3e(0x16c)]-_0x4ada21)/0x2);this['drawTextEx'](_0x3ab4da,_0x2cdf03,_0x23c79a['y'],_0x593ced);}else{const _0x155376=$dataSystem['equipTypes'][_0x48ca3e(0x197)](String(RegExp['$1'])[_0x48ca3e(0x187)]());return DataManager[_0x48ca3e(0x56a)](_0xd67ed6)&&_0xd67ed6[_0x48ca3e(0x499)]===_0x155376;}}else{if(this[_0x48ca3e(0x3e9)][_0x48ca3e(0x4b8)](/Category:(.*)/i))return!!_0xd67ed6&&_0xd67ed6[_0x48ca3e(0x591)][_0x48ca3e(0x5a5)](String(RegExp['$1'])[_0x48ca3e(0x37a)]()[_0x48ca3e(0x187)]());}}}}}}}return![];},Window_ItemList[_0x1087a8(0x4d2)]['isShowNew']=function(){return!![];},VisuMZ[_0x1087a8(0x3a3)][_0x1087a8(0x28e)]=Window_ItemList[_0x1087a8(0x4d2)][_0x1087a8(0x2d0)],Window_ItemList[_0x1087a8(0x4d2)][_0x1087a8(0x2d0)]=function(_0x32d376){const _0x5932b7=_0x1087a8;VisuMZ['ItemsEquipsCore'][_0x5932b7(0x28e)][_0x5932b7(0x539)](this,_0x32d376),this[_0x5932b7(0x4e8)](_0x32d376);},Window_ItemList[_0x1087a8(0x4d2)][_0x1087a8(0x2bf)]=function(_0xb6e749,_0xc48ff9,_0x1771fe,_0x53a6d5){const _0x2a2f09=_0x1087a8;Window_Selectable[_0x2a2f09(0x4d2)]['drawItemNumber'][_0x2a2f09(0x539)](this,_0xb6e749,_0xc48ff9,_0x1771fe,_0x53a6d5);},Window_ItemList['prototype'][_0x1087a8(0x4e8)]=function(_0x3cabce){const _0x539627=_0x1087a8,_0x5841ac=this[_0x539627(0x2f9)](_0x3cabce);if(!_0x5841ac||!this[_0x539627(0x158)]())return;if(!$gameParty[_0x539627(0x346)](_0x5841ac))return;const _0x11c4ff=this[_0x539627(0x2c8)](_0x3cabce),_0x39180f=_0x11c4ff['x'],_0x127100=_0x11c4ff['y']+(this[_0x539627(0x425)]()-ImageManager['iconHeight'])/0x2,_0x1f0017=VisuMZ[_0x539627(0x3a3)][_0x539627(0x2e7)][_0x539627(0x4e2)][_0x539627(0x2f2)],_0xf81e14=VisuMZ['ItemsEquipsCore'][_0x539627(0x2e7)][_0x539627(0x4e2)][_0x539627(0x3b8)];this[_0x539627(0x1d9)](_0x5841ac,_0x39180f+_0x1f0017,_0x127100+_0xf81e14);},Window_ItemList['prototype'][_0x1087a8(0x4c6)]=function(_0x51ba33){const _0x58227e=_0x1087a8;this[_0x58227e(0x2cd)]=_0x51ba33,this[_0x58227e(0x35c)]();},VisuMZ['ItemsEquipsCore'][_0x1087a8(0x3ff)]=Window_ItemList[_0x1087a8(0x4d2)][_0x1087a8(0x558)],Window_ItemList[_0x1087a8(0x4d2)]['updateHelp']=function(){const _0x304e69=_0x1087a8;VisuMZ[_0x304e69(0x3a3)]['Window_ItemList_updateHelp']['call'](this),this[_0x304e69(0x2cd)]&&this[_0x304e69(0x2cd)][_0x304e69(0x4c4)]===Window_ShopStatus&&this['_statusWindow'][_0x304e69(0x356)](this[_0x304e69(0x4b2)]());},Window_BattleItem[_0x1087a8(0x4d2)][_0x1087a8(0x515)]=function(_0x4ebbc3){const _0xb5e638=_0x1087a8;if(BattleManager['actor']()){if(_0xb5e638(0x2d8)!==_0xb5e638(0x28d))return BattleManager['actor']()[_0xb5e638(0x3f9)](_0x4ebbc3);else{const _0x403e15=this[_0xb5e638(0x2f9)](_0x58be0a);if(!_0x403e15||!this[_0xb5e638(0x158)]())return;if(!_0x2c446e['isNewItem'](_0x403e15))return;const _0x1c18d2=this[_0xb5e638(0x2c8)](_0x1613a5),_0x5ed6aa=_0x1c18d2['x'],_0x5ab515=_0x1c18d2['y']+(this[_0xb5e638(0x425)]()-_0x266be4[_0xb5e638(0x221)])/0x2,_0x44946c=_0x3f4df4[_0xb5e638(0x3a3)][_0xb5e638(0x2e7)]['New'][_0xb5e638(0x2f2)],_0x5a0e94=_0x224222[_0xb5e638(0x3a3)][_0xb5e638(0x2e7)][_0xb5e638(0x4e2)][_0xb5e638(0x3b8)];this[_0xb5e638(0x1d9)](_0x403e15,_0x5ed6aa+_0x44946c,_0x5ab515+_0x5a0e94);}}else return Window_ItemList[_0xb5e638(0x4d2)][_0xb5e638(0x515)][_0xb5e638(0x539)](this,_0x4ebbc3);},Window_EventItem['prototype']['isShowNew']=function(){return![];},Window_EquipStatus[_0x1087a8(0x4d2)][_0x1087a8(0x45f)]=function(){const _0x4929dd=_0x1087a8;return VisuMZ['ItemsEquipsCore']['Settings'][_0x4929dd(0x274)][_0x4929dd(0x4d5)];},VisuMZ['ItemsEquipsCore'][_0x1087a8(0x3c0)]=Window_EquipStatus[_0x1087a8(0x4d2)][_0x1087a8(0x44b)],Window_EquipStatus['prototype'][_0x1087a8(0x44b)]=function(){const _0x2c1f07=_0x1087a8;this[_0x2c1f07(0x43c)](),this[_0x2c1f07(0x14e)]();if(this[_0x2c1f07(0x3c4)])this['_actor'][_0x2c1f07(0x44b)]();if(this['isUseItemsEquipsCoreUpdatedLayout']())this[_0x2c1f07(0x353)]();else{if(_0x2c1f07(0x532)===_0x2c1f07(0x2e3)){const _0x4cf032=_0x2c1f07(0x445);if(this[_0x2c1f07(0x297)][_0x2c1f07(0x4e1)]>=0x0&&!this['_customItemInfo'][_0x4cf032])return![];const _0x1619f6=this[_0x2c1f07(0x3ae)]();this[_0x2c1f07(0x308)](_0x1619f6,_0x5315a6,_0x3d3f56,_0x434b06,!![]);const _0x15d460=this['getItemEffectsTpDamageText']();return this[_0x2c1f07(0x1d7)](_0x4fc536[_0x2c1f07(0x250)]()),this[_0x2c1f07(0x308)](_0x15d460,_0x3c4ff5,_0x25c497,_0x3ad42b,![],_0x2c1f07(0x4ec)),this[_0x2c1f07(0x526)](_0x1557bc,_0x2de041,_0x50179c),this[_0x2c1f07(0x14e)](),!![];}else VisuMZ[_0x2c1f07(0x3a3)][_0x2c1f07(0x3c0)]['call'](this);}},Window_EquipStatus[_0x1087a8(0x4d2)][_0x1087a8(0x353)]=function(){const _0x36ee6d=_0x1087a8;this[_0x36ee6d(0x4a8)]['clear']();if(!this['_actor'])return;if(this[_0x36ee6d(0x5ad)]()){const _0x59108b=ImageManager['loadPicture'](this[_0x36ee6d(0x3c4)][_0x36ee6d(0x50d)]());_0x59108b[_0x36ee6d(0x509)](this['onMenuImageLoad']['bind'](this));}else this['refreshItemsEquipsCoreNoMenuImage']();},Window_EquipStatus['prototype'][_0x1087a8(0x5ad)]=function(){const _0x129be5=_0x1087a8;return Imported[_0x129be5(0x537)]&&this[_0x129be5(0x3c4)]['getMenuImage']()!==''&&VisuMZ[_0x129be5(0x3a3)][_0x129be5(0x2e7)]['EquipScene']['MenuPortraits'];},Window_EquipStatus[_0x1087a8(0x4d2)]['onMenuImageLoad']=function(){const _0x360cb9=_0x1087a8;VisuMZ[_0x360cb9(0x3a3)][_0x360cb9(0x2e7)][_0x360cb9(0x274)][_0x360cb9(0x4f3)][_0x360cb9(0x539)](this),this[_0x360cb9(0x33f)]();},Window_EquipStatus[_0x1087a8(0x4d2)][_0x1087a8(0x3a5)]=function(){const _0x5e04c9=_0x1087a8;VisuMZ[_0x5e04c9(0x3a3)][_0x5e04c9(0x2e7)][_0x5e04c9(0x274)][_0x5e04c9(0x45d)][_0x5e04c9(0x539)](this),this[_0x5e04c9(0x33f)]();},Window_EquipStatus[_0x1087a8(0x4d2)][_0x1087a8(0x33f)]=function(){const _0x57e433=_0x1087a8;this[_0x57e433(0x14e)](),VisuMZ[_0x57e433(0x3a3)][_0x57e433(0x2e7)][_0x57e433(0x274)][_0x57e433(0x193)][_0x57e433(0x539)](this);},Window_EquipStatus[_0x1087a8(0x4d2)]['drawItemActorMenuImage']=function(_0x54a492,_0xd39de6,_0x572830,_0x444b08,_0x497b6f){const _0x2230de=_0x1087a8,_0x4e2818=ImageManager['loadPicture'](_0x54a492[_0x2230de(0x50d)]()),_0x8946c6=this[_0x2230de(0x407)]-_0x4e2818[_0x2230de(0x16c)];_0xd39de6+=_0x8946c6/0x2;if(_0x8946c6<0x0)_0x444b08-=_0x8946c6;Window_StatusBase[_0x2230de(0x4d2)][_0x2230de(0x2cc)]['call'](this,_0x54a492,_0xd39de6,_0x572830,_0x444b08,_0x497b6f);},Window_EquipStatus[_0x1087a8(0x4d2)][_0x1087a8(0x340)]=function(){const _0xf4ea0c=_0x1087a8;return Imported['VisuMZ_0_CoreEngine']?VisuMZ['CoreEngine'][_0xf4ea0c(0x2e7)][_0xf4ea0c(0x332)][_0xf4ea0c(0x31a)]:[0x0,0x1,0x2,0x3,0x4,0x5,0x6,0x7];},Window_EquipStatus[_0x1087a8(0x4d2)][_0x1087a8(0x36a)]=function(){const _0x56443f=_0x1087a8;return VisuMZ[_0x56443f(0x3a3)][_0x56443f(0x2e7)][_0x56443f(0x274)][_0x56443f(0x45e)];},Window_EquipStatus[_0x1087a8(0x4d2)][_0x1087a8(0x431)]=function(){const _0xb58da=_0x1087a8;return Imported[_0xb58da(0x3b6)]&&VisuMZ[_0xb58da(0x5af)]['Settings'][_0xb58da(0x332)][_0xb58da(0x527)];},Window_EquipStatus[_0x1087a8(0x4d2)]['drawUpdatedParamName']=function(_0x26a25b,_0x35e6b2,_0x5d89a1,_0x1567ce){const _0x1c46f4=_0x1087a8,_0x33b394=this[_0x1c46f4(0x214)]();if(Imported[_0x1c46f4(0x3b6)])this[_0x1c46f4(0x2c6)](_0x35e6b2+_0x33b394,_0x5d89a1,_0x1567ce,_0x26a25b,![]);else{if('zFvto'===_0x1c46f4(0x3f1))this['drawText'](TextManager['param'](_0x26a25b),_0x35e6b2+_0x33b394,_0x5d89a1,_0x1567ce);else{_0x54ce9a=_0x996fd9[_0x1c46f4(0x4ce)](_0x9fda7a||0x1,0x1);while(_0xfbc1ef--){_0x3eacd5=_0x840feb||this['lineHeight'](),this[_0x1c46f4(0x473)][_0x1c46f4(0x2bd)]=0xa0;const _0x3b3982=_0x423a82[_0x1c46f4(0x5a0)]();this[_0x1c46f4(0x473)][_0x1c46f4(0x508)](_0x30ef4a+0x1,_0x5e3cb3+0x1,_0x57acf4-0x2,_0x23b358-0x2,_0x3b3982),this[_0x1c46f4(0x473)]['paintOpacity']=0xff;}}}},Window_EquipStatus['prototype'][_0x1087a8(0x238)]=function(_0x3a2d48,_0x3654aa,_0x1aa375,_0x3723c5){const _0x11650f=_0x1087a8,_0x4570c6=this[_0x11650f(0x214)]();let _0x4d96e6=0x0;Imported[_0x11650f(0x3b6)]?_0x4d96e6=this[_0x11650f(0x3c4)][_0x11650f(0x3bc)](_0x3a2d48,!![]):_0x4d96e6=this['_actor']['param'](_0x3a2d48);const _0x55728e=_0x4d96e6;this[_0x11650f(0x14a)](_0x4d96e6,_0x3654aa,_0x1aa375,_0x3723c5-_0x4570c6,_0x11650f(0x4ec));},Window_EquipStatus[_0x1087a8(0x4d2)][_0x1087a8(0x1e0)]=function(_0x33734e,_0x1b4861,_0x5a2687,_0x3bd860){const _0x8e462b=_0x1087a8,_0x1bd917=this[_0x8e462b(0x214)]();let _0x487920=0x0,_0x237060=0x0,_0xe01316='';if(this[_0x8e462b(0x432)]){Imported[_0x8e462b(0x3b6)]?'SOPwx'!==_0x8e462b(0x55a)?this[_0x8e462b(0x572)][_0x8e462b(0x4c6)](this[_0x8e462b(0x2cd)]):(_0x487920=this[_0x8e462b(0x3c4)][_0x8e462b(0x3bc)](_0x33734e,![]),_0x237060=this[_0x8e462b(0x432)][_0x8e462b(0x3bc)](_0x33734e,![]),_0xe01316=this[_0x8e462b(0x432)][_0x8e462b(0x3bc)](_0x33734e,!![])):_0x8e462b(0x4f6)==='ntNPb'?(_0x193e40[_0x8e462b(0x3a3)]['Window_ItemList_updateHelp'][_0x8e462b(0x539)](this),this[_0x8e462b(0x2cd)]&&this[_0x8e462b(0x2cd)][_0x8e462b(0x4c4)]===_0x18187d&&this['_statusWindow'][_0x8e462b(0x356)](this['item']())):(_0x487920=this[_0x8e462b(0x3c4)][_0x8e462b(0x1a5)](_0x33734e),_0x237060=this[_0x8e462b(0x432)]['param'](_0x33734e),_0xe01316=this[_0x8e462b(0x432)][_0x8e462b(0x1a5)](_0x33734e));const _0xd8d03a=_0x487920,_0x31d530=_0x237060;diffValue=_0x31d530-_0xd8d03a,this[_0x8e462b(0x1d7)](ColorManager[_0x8e462b(0x49a)](diffValue)),this[_0x8e462b(0x14a)](_0xe01316,_0x1b4861,_0x5a2687,_0x3bd860-_0x1bd917,_0x8e462b(0x4ec));}},Window_EquipStatus[_0x1087a8(0x4d2)][_0x1087a8(0x294)]=function(_0x5e2497,_0x1c626b,_0x33fd9f,_0xa7aece){const _0x47fb93=_0x1087a8,_0x34d187=this['itemPadding']();let _0x25af07=0x0,_0xbf4d17=0x0,_0x2730cd=![];if(this[_0x47fb93(0x432)]){Imported[_0x47fb93(0x3b6)]?_0x47fb93(0x421)!=='ZKGOQ'?(this[_0x47fb93(0x1eb)]=_0x2ee07e,this['refresh'](),this[_0x47fb93(0x4c0)]()):(_0x25af07=this[_0x47fb93(0x3c4)][_0x47fb93(0x3bc)](_0x5e2497,![]),_0xbf4d17=this[_0x47fb93(0x432)][_0x47fb93(0x3bc)](_0x5e2497,![]),_0x2730cd=String(this[_0x47fb93(0x3c4)][_0x47fb93(0x3bc)](_0x5e2497,!![]))[_0x47fb93(0x4b8)](/([%％])/i)):(_0x25af07=this[_0x47fb93(0x3c4)][_0x47fb93(0x1a5)](_0x5e2497),_0xbf4d17=this['_tempActor'][_0x47fb93(0x1a5)](_0x5e2497),_0x2730cd=_0x25af07%0x1!==0x0||_0xbf4d17%0x1!==0x0);const _0x38ea94=_0x25af07,_0x195722=_0xbf4d17,_0x426d16=_0x195722-_0x38ea94;let _0x22443d=_0x426d16;if(_0x2730cd)_0x22443d=Math[_0x47fb93(0x286)](_0x426d16*0x64)+'%';if(_0x426d16!==0x0){if('RXLZj'!==_0x47fb93(0x230))this['changeTextColor'](ColorManager[_0x47fb93(0x49a)](_0x426d16)),_0x22443d=(_0x426d16>0x0?'(+%1)':_0x47fb93(0x1aa))[_0x47fb93(0x564)](_0x22443d),this[_0x47fb93(0x14a)](_0x22443d,_0x1c626b+_0x34d187,_0x33fd9f,_0xa7aece,_0x47fb93(0x27b));else return _0x5ed121[_0x47fb93(0x3a3)]['Scene_Shop_sellWindowRect'][_0x47fb93(0x539)](this);}}},Window_EquipStatus[_0x1087a8(0x4d2)][_0x1087a8(0x526)]=function(_0x54c676,_0xaa338,_0x20baeb,_0x43b4f7,_0x37e906){const _0x3b5066=_0x1087a8;if(VisuMZ[_0x3b5066(0x3a3)][_0x3b5066(0x2e7)][_0x3b5066(0x274)][_0x3b5066(0x375)]===![])return;_0x37e906=Math[_0x3b5066(0x4ce)](_0x37e906||0x1,0x1);while(_0x37e906--){if(_0x3b5066(0x3b7)!==_0x3b5066(0x485)){_0x43b4f7=_0x43b4f7||this[_0x3b5066(0x425)](),this[_0x3b5066(0x4a8)][_0x3b5066(0x2bd)]=0xa0;const _0x80ccf0=ColorManager['getItemsEquipsCoreBackColor2']();this['contents'][_0x3b5066(0x508)](_0x54c676+0x1,_0xaa338+0x1,_0x20baeb-0x2,_0x43b4f7-0x2,_0x80ccf0),this[_0x3b5066(0x4a8)][_0x3b5066(0x2bd)]=0xff;}else return this['_list']?this['_list'][_0x3b5066(0x490)]:0x3;}},ColorManager[_0x1087a8(0x3f5)]=function(){const _0x42ff8a=_0x1087a8,_0x26a69d=VisuMZ[_0x42ff8a(0x3a3)][_0x42ff8a(0x2e7)]['EquipScene'];let _0x5df70e=_0x26a69d['BackRectColor']!==undefined?_0x26a69d[_0x42ff8a(0x1da)]:0x13;return ColorManager[_0x42ff8a(0x49f)](_0x5df70e);},VisuMZ[_0x1087a8(0x3a3)][_0x1087a8(0x293)]=Window_EquipCommand[_0x1087a8(0x4d2)][_0x1087a8(0x1be)],Window_EquipCommand['prototype']['initialize']=function(_0x10c00b){const _0x1a02c0=_0x1087a8;VisuMZ['ItemsEquipsCore'][_0x1a02c0(0x293)]['call'](this,_0x10c00b),this['createCommandNameWindow'](_0x10c00b);},Window_EquipCommand[_0x1087a8(0x4d2)][_0x1087a8(0x54c)]=function(_0x5bfa96){const _0x49c921=_0x1087a8,_0x3ef060=new Rectangle(0x0,0x0,_0x5bfa96[_0x49c921(0x16c)],_0x5bfa96[_0x49c921(0x5cd)]);this[_0x49c921(0x38a)]=new Window_Base(_0x3ef060),this[_0x49c921(0x38a)][_0x49c921(0x321)]=0x0,this[_0x49c921(0x194)](this[_0x49c921(0x38a)]),this[_0x49c921(0x492)]();},Window_EquipCommand['prototype']['callUpdateHelp']=function(){const _0x3e9ac4=_0x1087a8;Window_HorzCommand[_0x3e9ac4(0x4d2)][_0x3e9ac4(0x35c)][_0x3e9ac4(0x539)](this);if(this[_0x3e9ac4(0x38a)])this[_0x3e9ac4(0x492)]();},Window_EquipCommand[_0x1087a8(0x4d2)][_0x1087a8(0x492)]=function(){const _0x1c4acd=_0x1087a8,_0x114433=this[_0x1c4acd(0x38a)];_0x114433['contents'][_0x1c4acd(0x5bd)]();const _0x1a6779=this[_0x1c4acd(0x15f)](this[_0x1c4acd(0x4ba)]());if(_0x1a6779===_0x1c4acd(0x1ec)){if(_0x1c4acd(0x403)===_0x1c4acd(0x403)){const _0xac664a=this[_0x1c4acd(0x2c8)](this['index']());let _0x471cf1=this[_0x1c4acd(0x1dc)](this[_0x1c4acd(0x4ba)]());_0x471cf1=_0x471cf1[_0x1c4acd(0x20c)](/\\I\[(\d+)\]/gi,''),_0x114433[_0x1c4acd(0x14e)](),this[_0x1c4acd(0x3f4)](_0x471cf1,_0xac664a),this['commandNameWindowDrawText'](_0x471cf1,_0xac664a),this[_0x1c4acd(0x2b5)](_0x471cf1,_0xac664a);}else this[_0x1c4acd(0x422)]();}},Window_EquipCommand['prototype'][_0x1087a8(0x3f4)]=function(_0x562518,_0x4095a8){},Window_EquipCommand[_0x1087a8(0x4d2)][_0x1087a8(0x237)]=function(_0x32b3a9,_0x1e6c64){const _0x29005b=_0x1087a8,_0x5eff47=this[_0x29005b(0x38a)];_0x5eff47['drawText'](_0x32b3a9,0x0,_0x1e6c64['y'],_0x5eff47[_0x29005b(0x407)],_0x29005b(0x331));},Window_EquipCommand[_0x1087a8(0x4d2)]['commandNameWindowCenter']=function(_0x4f5118,_0x1f102b){const _0x5cbc07=_0x1087a8,_0x1cbbf8=this[_0x5cbc07(0x38a)],_0x248165=$gameSystem[_0x5cbc07(0x578)](),_0x5c8813=_0x1f102b['x']+Math[_0x5cbc07(0x53e)](_0x1f102b[_0x5cbc07(0x16c)]/0x2)+_0x248165;_0x1cbbf8['x']=_0x1cbbf8[_0x5cbc07(0x16c)]/-0x2+_0x5c8813,_0x1cbbf8['y']=Math[_0x5cbc07(0x53e)](_0x1f102b['height']/0x2);},Window_EquipCommand[_0x1087a8(0x4d2)][_0x1087a8(0x3a8)]=function(){const _0x443e52=_0x1087a8;return Imported[_0x443e52(0x3b6)]&&Window_HorzCommand[_0x443e52(0x4d2)]['isUseModernControls'][_0x443e52(0x539)](this);},Window_EquipCommand['prototype'][_0x1087a8(0x487)]=function(){const _0x59b379=_0x1087a8;if(this[_0x59b379(0x5d3)]()==='equip')Window_HorzCommand[_0x59b379(0x4d2)][_0x59b379(0x487)]['call'](this);},Window_EquipCommand['prototype'][_0x1087a8(0x3e1)]=function(){const _0x205722=_0x1087a8;!this[_0x205722(0x5ab)]()&&(_0x205722(0x444)!=='kjDPB'?this[_0x205722(0x395)]():Window_HorzCommand[_0x205722(0x4d2)][_0x205722(0x3e1)]['call'](this));},Window_EquipCommand[_0x1087a8(0x4d2)][_0x1087a8(0x5ab)]=function(){const _0x4b0ff1=_0x1087a8;if(!this[_0x4b0ff1(0x5b5)]())return![];if(SceneManager['_scene'][_0x4b0ff1(0x4c4)]!==Scene_Equip)return![];return Input[_0x4b0ff1(0x469)]('down')&&('JqxyY'===_0x4b0ff1(0x154)?(this['playCursorSound'](),SceneManager[_0x4b0ff1(0x4a0)]['commandEquip'](),SceneManager[_0x4b0ff1(0x4a0)]['_slotWindow'][_0x4b0ff1(0x2f5)](-0x1)):(_0x5a9bfc[_0x4b0ff1(0x3a3)][_0x4b0ff1(0x408)]['call'](this,_0x2af84c),_0x461028[_0x4b0ff1(0x275)]=this)),![];},Window_EquipCommand['prototype'][_0x1087a8(0x2e1)]=function(){const _0x5b9feb=_0x1087a8;return this['_list']?this[_0x5b9feb(0x282)][_0x5b9feb(0x490)]:0x3;},Window_EquipCommand['prototype']['processTouchModernControls']=function(){const _0x3941f8=_0x1087a8;if(this[_0x3941f8(0x1c6)]()&&this[_0x3941f8(0x4cc)]&&SceneManager[_0x3941f8(0x4a0)]['constructor']===Scene_Equip){if('VxUpl'===_0x3941f8(0x543)){if(this[_0x3941f8(0x1b6)]()&&TouchInput[_0x3941f8(0x3d0)]())this[_0x3941f8(0x319)](![]);else TouchInput[_0x3941f8(0x469)]()&&this['onTouchSelectModernControls'](!![]);if(TouchInput[_0x3941f8(0x410)]()){if('gSoBb'!==_0x3941f8(0x3fa)){if(_0x5afe2b['value'](_0x34cb4e))return![];}else this['onTouchOk']();}}else _0x19e2d7[_0x3941f8(0x3a3)][_0x3941f8(0x3a1)][_0x3941f8(0x539)](this,_0x31ac6f),_0x4409e2[_0x3941f8(0x3a3)]['Parse_Notetags_Batch'](_0x557e12,_0x5ef4af);}},Window_EquipCommand[_0x1087a8(0x4d2)][_0x1087a8(0x319)]=function(_0x1278a0){const _0x37ee1a=_0x1087a8;this[_0x37ee1a(0x521)]=![];const _0x27f157=this[_0x37ee1a(0x4ba)](),_0x44dcee=this[_0x37ee1a(0x512)](),_0x51b5c9=SceneManager[_0x37ee1a(0x4a0)][_0x37ee1a(0x47e)];if(_0x51b5c9[_0x37ee1a(0x1c6)]()&&_0x51b5c9[_0x37ee1a(0x4cc)]){if(_0x37ee1a(0x369)!=='EqWId')return this[_0x37ee1a(0x589)]();else{if(_0x44dcee>=0x0){if(_0x37ee1a(0x14c)===_0x37ee1a(0x419))return this[_0x37ee1a(0x45f)]()?this['goldWindowRectItemsEquipsCore']():_0xeb0dc2[_0x37ee1a(0x3a3)][_0x37ee1a(0x51d)][_0x37ee1a(0x539)](this);else _0x44dcee===this[_0x37ee1a(0x4ba)]()&&(this[_0x37ee1a(0x521)]=!![]),this[_0x37ee1a(0x184)](),this[_0x37ee1a(0x3ba)](_0x44dcee);}else _0x51b5c9[_0x37ee1a(0x512)]()>=0x0&&(this['deactivate'](),this['deselect']());}}_0x1278a0&&this[_0x37ee1a(0x4ba)]()!==_0x27f157&&(_0x37ee1a(0x42a)!=='YTzvE'?_0x282416=_0x5e2c86(_0x1eb8fe['$1']):this[_0x37ee1a(0x264)]());},Window_EquipCommand[_0x1087a8(0x4d2)][_0x1087a8(0x1e8)]=function(){const _0x5d33b2=_0x1087a8;this[_0x5d33b2(0x514)](),this[_0x5d33b2(0x232)](),this[_0x5d33b2(0x489)]();},Window_EquipCommand['prototype'][_0x1087a8(0x44b)]=function(){const _0x3ed042=_0x1087a8;Window_HorzCommand[_0x3ed042(0x4d2)][_0x3ed042(0x44b)][_0x3ed042(0x539)](this),this[_0x3ed042(0x5d4)]();},Window_EquipCommand[_0x1087a8(0x4d2)]['addEquipCommand']=function(){const _0x2abd6f=_0x1087a8;if(!this[_0x2abd6f(0x170)]())return;const _0x1304a1=this[_0x2abd6f(0x510)](),_0x437b42=VisuMZ[_0x2abd6f(0x3a3)][_0x2abd6f(0x2e7)]['EquipScene'][_0x2abd6f(0x334)],_0x49d58c=_0x1304a1==='text'?TextManager['equip2']:_0x2abd6f(0x31c)['format'](_0x437b42,TextManager['equip2']),_0x348adc=this[_0x2abd6f(0x4c8)]();this[_0x2abd6f(0x51b)](_0x49d58c,_0x2abd6f(0x585),_0x348adc);},Window_EquipCommand[_0x1087a8(0x4d2)][_0x1087a8(0x170)]=function(){const _0x30f773=_0x1087a8;return!this[_0x30f773(0x3a8)]();},Window_EquipCommand[_0x1087a8(0x4d2)][_0x1087a8(0x4c8)]=function(){return!![];},Window_EquipCommand[_0x1087a8(0x4d2)][_0x1087a8(0x232)]=function(){const _0x5d2ae9=_0x1087a8;if(!this[_0x5d2ae9(0x2d6)]())return;const _0x20580f=this['commandStyle'](),_0x173384=VisuMZ[_0x5d2ae9(0x3a3)][_0x5d2ae9(0x2e7)][_0x5d2ae9(0x274)][_0x5d2ae9(0x336)],_0x564a91=_0x20580f===_0x5d2ae9(0x29d)?TextManager[_0x5d2ae9(0x5a6)]:_0x5d2ae9(0x31c)[_0x5d2ae9(0x564)](_0x173384,TextManager[_0x5d2ae9(0x5a6)]),_0xfefeb1=this[_0x5d2ae9(0x1f1)]();this[_0x5d2ae9(0x51b)](_0x564a91,_0x5d2ae9(0x5a6),_0xfefeb1);},Window_EquipCommand[_0x1087a8(0x4d2)][_0x1087a8(0x2d6)]=function(){const _0x2d06c6=_0x1087a8;return VisuMZ['ItemsEquipsCore']['Settings'][_0x2d06c6(0x274)][_0x2d06c6(0x269)];},Window_EquipCommand[_0x1087a8(0x4d2)]['isOptimizeCommandEnabled']=function(){return!![];},Window_EquipCommand[_0x1087a8(0x4d2)]['addClearCommand']=function(){const _0x3bfcf4=_0x1087a8;if(!this[_0x3bfcf4(0x204)]())return;const _0x5190a3=this[_0x3bfcf4(0x510)](),_0x304566=VisuMZ['ItemsEquipsCore'][_0x3bfcf4(0x2e7)][_0x3bfcf4(0x274)]['CmdIconClear'],_0x1daba8=_0x5190a3===_0x3bfcf4(0x29d)?TextManager[_0x3bfcf4(0x5bd)]:_0x3bfcf4(0x31c)[_0x3bfcf4(0x564)](_0x304566,TextManager[_0x3bfcf4(0x5bd)]),_0x159970=this[_0x3bfcf4(0x20d)]();this['addCommand'](_0x1daba8,_0x3bfcf4(0x5bd),_0x159970);},Window_EquipCommand[_0x1087a8(0x4d2)]['isClearCommandAdded']=function(){const _0x216d0c=_0x1087a8;return VisuMZ[_0x216d0c(0x3a3)][_0x216d0c(0x2e7)][_0x216d0c(0x274)][_0x216d0c(0x273)];},Window_EquipCommand[_0x1087a8(0x4d2)][_0x1087a8(0x20d)]=function(){return!![];},Window_EquipCommand[_0x1087a8(0x4d2)][_0x1087a8(0x54d)]=function(){const _0x31054d=_0x1087a8;return VisuMZ['ItemsEquipsCore'][_0x31054d(0x2e7)][_0x31054d(0x274)][_0x31054d(0x495)];},Window_EquipCommand['prototype'][_0x1087a8(0x2d0)]=function(_0x59021a){const _0x3300dc=_0x1087a8,_0xd4cc5d=this['commandStyleCheck'](_0x59021a);if(_0xd4cc5d==='iconText')this[_0x3300dc(0x5ac)](_0x59021a);else{if(_0xd4cc5d===_0x3300dc(0x1ec))this[_0x3300dc(0x5c8)](_0x59021a);else{if(_0x3300dc(0x44d)!==_0x3300dc(0x44d)){const _0x551616=this[_0x3300dc(0x2c8)](_0x4acf46),_0x276e01=this[_0x3300dc(0x5d2)](_0x2caed5)[_0x3300dc(0x16c)];return _0x276e01<=_0x551616['width']?_0x3300dc(0x2ef):_0x3300dc(0x1ec);}else Window_HorzCommand[_0x3300dc(0x4d2)][_0x3300dc(0x2d0)][_0x3300dc(0x539)](this,_0x59021a);}}},Window_EquipCommand[_0x1087a8(0x4d2)][_0x1087a8(0x510)]=function(){const _0x296f8c=_0x1087a8;return VisuMZ[_0x296f8c(0x3a3)]['Settings'][_0x296f8c(0x274)][_0x296f8c(0x482)];},Window_EquipCommand[_0x1087a8(0x4d2)]['commandStyleCheck']=function(_0x181d58){const _0x2fcca7=_0x1087a8;if(_0x181d58<0x0)return _0x2fcca7(0x29d);const _0x46bc11=this[_0x2fcca7(0x510)]();if(_0x46bc11!=='auto')return _0x46bc11;else{if(this[_0x2fcca7(0x21a)]()>0x0){if(_0x2fcca7(0x1c7)!=='uqGUS'){const _0x2de8ad=this[_0x2fcca7(0x1dc)](_0x181d58);if(_0x2de8ad['match'](/\\I\[(\d+)\]/i)){const _0x440b61=this['itemLineRect'](_0x181d58),_0x8d589=this[_0x2fcca7(0x5d2)](_0x2de8ad)[_0x2fcca7(0x16c)];return _0x8d589<=_0x440b61[_0x2fcca7(0x16c)]?'iconText':_0x2fcca7(0x1ec);}}else{if(!this[_0x2fcca7(0x577)]())return _0x3d3183;if(this[_0x2fcca7(0x54b)](_0x303cfb,_0x1bbebe,_0x2ca75b))_0xebc10d+=this[_0x2fcca7(0x425)]();if(this[_0x2fcca7(0x17e)](_0x325538,_0x514916,_0x5917ed))_0x257a23+=this[_0x2fcca7(0x425)]();if(this[_0x2fcca7(0x3d4)](_0x354e77,_0x478b45,_0x1e4cab))_0x2aa513+=this[_0x2fcca7(0x425)]();if(this[_0x2fcca7(0x1a2)](_0x33018b,_0xa008ae,_0x164729))_0x89b76e+=this['lineHeight']();if(this[_0x2fcca7(0x42f)](_0x2f99d1,_0x5a4fbd,_0x59c385))_0x3b6d36+=this[_0x2fcca7(0x425)]();if(this[_0x2fcca7(0x2df)](_0x361ab2,_0x853203,_0x273363))_0x2bfb2c+=this['lineHeight']();if(this[_0x2fcca7(0x2d1)](_0x9860e3,_0x2e7d05,_0x26b86a))_0x3d1c87+=this[_0x2fcca7(0x425)]();if(this[_0x2fcca7(0x4be)](_0x57c275,_0x5b7db9,_0x189d47))_0x570430+=this['lineHeight']();if(this[_0x2fcca7(0x3e7)](_0x51b50c,_0x1f72f4,_0xd0e21b))_0x106d48+=this[_0x2fcca7(0x425)]();return this[_0x2fcca7(0x14e)](),_0x598f15;}}}return'text';},Window_EquipCommand[_0x1087a8(0x4d2)][_0x1087a8(0x5ac)]=function(_0x40da4f){const _0x3a8397=_0x1087a8,_0x2c4d6e=this[_0x3a8397(0x2c8)](_0x40da4f),_0x48e8b9=this['commandName'](_0x40da4f),_0x4495e9=this[_0x3a8397(0x5d2)](_0x48e8b9)[_0x3a8397(0x16c)];this[_0x3a8397(0x4e7)](this[_0x3a8397(0x2b0)](_0x40da4f));const _0x28c271=this[_0x3a8397(0x54d)]();if(_0x28c271===_0x3a8397(0x4ec)){if(_0x3a8397(0x596)!==_0x3a8397(0x228))this[_0x3a8397(0x31b)](_0x48e8b9,_0x2c4d6e['x']+_0x2c4d6e['width']-_0x4495e9,_0x2c4d6e['y'],_0x4495e9);else{const _0x3b2cbf=_0x10a5c0[_0x3a8397(0x4d2)][_0x3a8397(0x399)](-0x1,_0x1a6fd1);if(_0x3b2cbf>0x0){_0x52f6cc+='\x5cI[%1]'[_0x3a8397(0x564)](_0x3b2cbf),_0x466682++;if(_0x5d6385>=_0x1d80de)return _0x47ec59;}}}else{if(_0x28c271===_0x3a8397(0x331)){if(_0x3a8397(0x26b)!==_0x3a8397(0x26d)){const _0x2db5cd=_0x2c4d6e['x']+Math['floor']((_0x2c4d6e[_0x3a8397(0x16c)]-_0x4495e9)/0x2);this['drawTextEx'](_0x48e8b9,_0x2db5cd,_0x2c4d6e['y'],_0x4495e9);}else{if(this[_0x3a8397(0x432)])return![];_0x1b7a4a[_0x3a8397(0x4c1)]=!![];const _0x191012=_0x3e6bda['ItemsEquipsCore'][_0x3a8397(0x426)][_0x3a8397(0x539)](this,_0x5ecd0e,_0x100302);return _0x599ee5['_bypassNewLabel']=![],_0x191012;}}else this['drawTextEx'](_0x48e8b9,_0x2c4d6e['x'],_0x2c4d6e['y'],_0x4495e9);}},Window_EquipCommand[_0x1087a8(0x4d2)][_0x1087a8(0x5c8)]=function(_0x5204da){const _0xfdd013=_0x1087a8;this[_0xfdd013(0x1dc)](_0x5204da)[_0xfdd013(0x4b8)](/\\I\[(\d+)\]/i);const _0x5953e4=Number(RegExp['$1'])||0x0,_0x39de67=this[_0xfdd013(0x2c8)](_0x5204da),_0x533cdd=_0x39de67['x']+Math['floor']((_0x39de67[_0xfdd013(0x16c)]-ImageManager[_0xfdd013(0x212)])/0x2),_0x4f229d=_0x39de67['y']+(_0x39de67[_0xfdd013(0x5cd)]-ImageManager[_0xfdd013(0x221)])/0x2;this[_0xfdd013(0x546)](_0x5953e4,_0x533cdd,_0x4f229d);},Window_EquipSlot['prototype'][_0x1087a8(0x3a8)]=function(){const _0x316f31=_0x1087a8;return Imported[_0x316f31(0x3b6)]&&Window_HorzCommand['prototype']['isUseModernControls'][_0x316f31(0x539)](this);},Window_EquipSlot[_0x1087a8(0x4d2)][_0x1087a8(0x184)]=function(){const _0x50ccf0=_0x1087a8;Window_StatusBase[_0x50ccf0(0x4d2)][_0x50ccf0(0x184)][_0x50ccf0(0x539)](this),this[_0x50ccf0(0x35c)]();},Window_EquipSlot['prototype'][_0x1087a8(0x430)]=function(){const _0x41133e=_0x1087a8;Window_StatusBase[_0x41133e(0x4d2)][_0x41133e(0x430)][_0x41133e(0x539)](this),this[_0x41133e(0x1bc)]();},Window_EquipSlot[_0x1087a8(0x4d2)][_0x1087a8(0x1bc)]=function(){const _0x5a660f=_0x1087a8;if(!this[_0x5a660f(0x1fe)]())return;if(Input['isTriggered']('shift')&&this[_0x5a660f(0x4b2)]()){if(_0x5a660f(0x4d6)!=='AaZeC')this[_0x5a660f(0x18c)]();else{const _0x382b2a=SceneManager[_0x5a660f(0x4a0)][_0x5a660f(0x3c4)];if(_0x382b2a){if(_0x5a660f(0x4db)===_0x5a660f(0x4db))this['canShiftRemoveEquipment'](this['index']())?(this[_0x5a660f(0x4c2)](),this[_0x5a660f(0x558)]()):_0x5a660f(0x279)!==_0x5a660f(0x24e)?this[_0x5a660f(0x149)]():this[_0x5a660f(0x264)]();else return;}}}},Window_EquipSlot[_0x1087a8(0x4d2)]['canShiftRemoveEquipment']=function(_0x113f95){const _0x174ded=_0x1087a8,_0x3653f0=SceneManager[_0x174ded(0x4a0)][_0x174ded(0x3c4)];if(!_0x3653f0)return;if(!_0x3653f0['isEquipChangeOk'](this[_0x174ded(0x4ba)]())){if(_0x174ded(0x40c)!=='xYsWd')return![];else this[_0x174ded(0x31b)](_0x3bb885,_0x27ba49['x'],_0x3608f5['y'],_0x2c9cd1);}const _0x4f4526=_0x3653f0[_0x174ded(0x4b6)]()[this[_0x174ded(0x4ba)]()];if(_0x3653f0[_0x174ded(0x2dc)]()[_0x174ded(0x5a5)](_0x4f4526))return![];return!![];;},Window_EquipSlot[_0x1087a8(0x4d2)][_0x1087a8(0x4c2)]=function(){const _0x19fabb=_0x1087a8;SoundManager['playEquip']();const _0x3c55cf=SceneManager[_0x19fabb(0x4a0)]['_actor'];_0x3c55cf[_0x19fabb(0x477)](this[_0x19fabb(0x4ba)](),null),this[_0x19fabb(0x44b)](),this[_0x19fabb(0x40f)][_0x19fabb(0x44b)](),this[_0x19fabb(0x35c)]();const _0x7be396=SceneManager['_scene'][_0x19fabb(0x2cd)];if(_0x7be396)_0x7be396[_0x19fabb(0x44b)]();},Window_EquipSlot[_0x1087a8(0x4d2)][_0x1087a8(0x1fe)]=function(){const _0x322500=_0x1087a8;if(!this[_0x322500(0x3c5)])return![];if(!VisuMZ[_0x322500(0x3a3)][_0x322500(0x2e7)][_0x322500(0x274)]['ShiftShortcutKey'])return![];return!![];},Window_EquipSlot['prototype']['processCursorMoveModernControls']=function(){const _0x2d89a4=_0x1087a8;!this[_0x2d89a4(0x5ab)]()&&(_0x2d89a4(0x4f0)!=='kPpQz'?_0x146975=_0x2d89a4(0x414)['format'](_0x977d4d['id']):Window_StatusBase['prototype']['processCursorMoveModernControls'][_0x2d89a4(0x539)](this));},Window_EquipSlot['prototype'][_0x1087a8(0x5ab)]=function(){const _0x3845e9=_0x1087a8;if(!this['isCursorMovable']())return![];if(SceneManager['_scene'][_0x3845e9(0x4c4)]!==Scene_Equip)return![];if(this['allowCommandWindowCursorUp']()){if(_0x3845e9(0x176)!==_0x3845e9(0x176)){if(_0x1f22e7['isPlaytest']())_0x415392[_0x3845e9(0x1ac)](_0x2084c0);}else return this[_0x3845e9(0x264)](),Input['clear'](),SceneManager[_0x3845e9(0x4a0)][_0x3845e9(0x53b)](),![];}else{if(Input[_0x3845e9(0x1c5)](_0x3845e9(0x23b))){if(_0x3845e9(0x51f)!=='kFpdX'){const _0x4be6e8=this['commandStyle'](),_0x55bb15=_0x170857[_0x3845e9(0x3a3)][_0x3845e9(0x2e7)][_0x3845e9(0x281)][_0x3845e9(0x2a8)],_0x3d41fa=_0x4be6e8===_0x3845e9(0x29d)?_0x1cc5eb[_0x3845e9(0x387)]:_0x3845e9(0x31c)['format'](_0x55bb15,_0x5de6da['buy']),_0x15f186=this[_0x3845e9(0x17c)]();if(this['hideDisabledCommands']()&&!_0x15f186)return;this[_0x3845e9(0x51b)](_0x3d41fa,'buy',_0x15f186);}else{const _0x4223cf=this[_0x3845e9(0x4ba)]();return Input[_0x3845e9(0x547)]('shift')?this[_0x3845e9(0x545)]():this[_0x3845e9(0x44c)](Input[_0x3845e9(0x469)](_0x3845e9(0x23b))),this[_0x3845e9(0x4ba)]()!==_0x4223cf&&this[_0x3845e9(0x264)](),!![];}}else{if(this[_0x3845e9(0x5be)]()&&Input[_0x3845e9(0x469)](_0x3845e9(0x3f2))){if(_0x3845e9(0x15a)!==_0x3845e9(0x504))return!![];else{const _0x5a42ab=this[_0x3845e9(0x15f)](_0xb7864);if(_0x5a42ab===_0x3845e9(0x2ef))this['drawItemStyleIconText'](_0x2e006c);else _0x5a42ab===_0x3845e9(0x1ec)?this[_0x3845e9(0x5c8)](_0x2e94f2):_0x52e23d[_0x3845e9(0x4d2)][_0x3845e9(0x2d0)][_0x3845e9(0x539)](this,_0x1766c0);}}}}return![];},Window_EquipSlot[_0x1087a8(0x4d2)][_0x1087a8(0x155)]=function(){const _0x44fbab=_0x1087a8;if(this[_0x44fbab(0x4ba)]()!==0x0)return![];const _0x1ebea7=VisuMZ[_0x44fbab(0x3a3)][_0x44fbab(0x2e7)][_0x44fbab(0x274)];if(!_0x1ebea7[_0x44fbab(0x269)]&&!_0x1ebea7[_0x44fbab(0x273)])return![];return Input['isTriggered']('up');},Window_EquipSlot[_0x1087a8(0x4d2)][_0x1087a8(0x5be)]=function(){const _0x471b51=_0x1087a8;return VisuMZ['ItemsEquipsCore']['Settings'][_0x471b51(0x274)][_0x471b51(0x225)];},Window_EquipSlot[_0x1087a8(0x4d2)]['processTouchModernControls']=function(){const _0x3464a5=_0x1087a8;if(this[_0x3464a5(0x1c6)]()&&this[_0x3464a5(0x4cc)]&&SceneManager[_0x3464a5(0x4a0)]['constructor']===Scene_Equip){if(_0x3464a5(0x57c)!==_0x3464a5(0x1c4)){if(this[_0x3464a5(0x1b6)]()&&TouchInput[_0x3464a5(0x3d0)]())this[_0x3464a5(0x319)](![]);else TouchInput['isTriggered']()&&(_0x3464a5(0x1b4)===_0x3464a5(0x1b4)?this[_0x3464a5(0x319)](!![]):this['drawItemStyleIconText'](_0x45f577));if(TouchInput[_0x3464a5(0x410)]())this[_0x3464a5(0x357)]();else TouchInput[_0x3464a5(0x502)]()&&this['onTouchCancel']();}else{const _0x216b2b=this[_0x3464a5(0x3d2)]();this['drawItemKeyData'](_0x216b2b,_0x471807,_0x4d1391,_0x3da5cc,!![]);const _0x1b3e23=this['getItemHitTypeText']();return this[_0x3464a5(0x308)](_0x1b3e23,_0x2ddd08,_0x54799e,_0x469284,![],'right'),this[_0x3464a5(0x526)](_0x5b0074,_0x3ae069,_0x1bda5d),this['resetFontSettings'](),!![];}}},Window_EquipSlot['prototype'][_0x1087a8(0x319)]=function(_0x1728a7){const _0x2fc6f0=_0x1087a8;this[_0x2fc6f0(0x521)]=![];const _0x511793=this['index'](),_0x3da2af=this[_0x2fc6f0(0x512)](),_0x4e4b5c=SceneManager['_scene'][_0x2fc6f0(0x333)];if(_0x4e4b5c[_0x2fc6f0(0x1c6)]()&&_0x4e4b5c[_0x2fc6f0(0x4cc)]){if(_0x3da2af>=0x0){if(_0x3da2af===this[_0x2fc6f0(0x4ba)]()){if('pJDCK'!==_0x2fc6f0(0x268)){_0x33afad[_0x2fc6f0(0x469)]()&&this[_0x2fc6f0(0x2ec)](!![]);if(_0x5029e0['isClicked']())this[_0x2fc6f0(0x357)]();else _0x473869[_0x2fc6f0(0x502)]()&&this['onTouchCancel']();}else this[_0x2fc6f0(0x521)]=!![];}this['activate'](),this[_0x2fc6f0(0x3ba)](_0x3da2af);}else _0x4e4b5c[_0x2fc6f0(0x512)]()>=0x0&&(_0x2fc6f0(0x38b)!=='ONSDU'?(_0x53c3af+=_0x11bf5a(_0x2889ba['$1']),_0x48d66d+=_0x5ad7dd(_0x4daabd['$2'])):(this[_0x2fc6f0(0x289)](),this[_0x2fc6f0(0x598)]()));}_0x1728a7&&this[_0x2fc6f0(0x4ba)]()!==_0x511793&&this['playCursorSound']();},Window_EquipSlot['prototype']['equipSlotIndex']=function(){const _0x4b7983=_0x1087a8;return this[_0x4b7983(0x4ba)]();},VisuMZ[_0x1087a8(0x3a3)][_0x1087a8(0x401)]=Window_EquipItem['prototype'][_0x1087a8(0x5a5)],Window_EquipItem['prototype'][_0x1087a8(0x5a5)]=function(_0x3b5409){const _0x5b24ce=_0x1087a8;return _0x3b5409===null&&this[_0x5b24ce(0x2dc)]()['includes'](this[_0x5b24ce(0x499)]())?![]:VisuMZ[_0x5b24ce(0x3a3)]['Window_EquipItem_includes']['call'](this,_0x3b5409);},VisuMZ['ItemsEquipsCore'][_0x1087a8(0x3cd)]=Window_EquipItem[_0x1087a8(0x4d2)][_0x1087a8(0x515)],Window_EquipItem['prototype'][_0x1087a8(0x515)]=function(_0x5019c0){const _0x5ce99a=_0x1087a8;if(_0x5019c0&&this[_0x5ce99a(0x3c4)]){if(this[_0x5ce99a(0x219)](_0x5019c0))return![];if(this[_0x5ce99a(0x3ca)](_0x5019c0))return![];if(this[_0x5ce99a(0x38e)](_0x5019c0))return![];}if(!_0x5019c0){if(_0x5ce99a(0x311)===_0x5ce99a(0x20a)){if(this[_0x5ce99a(0x2b2)]['damage'][_0x5ce99a(0x58b)]<=0x0)return _0x3f2e5f;if(this[_0x5ce99a(0x5d0)](_0x221cb8,_0x56f334,_0x358f10))_0x593b95+=this['lineHeight']();if(this[_0x5ce99a(0x17a)](_0x669865,_0x480f98,_0x38041d))_0x5055cd+=this[_0x5ce99a(0x425)]();return this[_0x5ce99a(0x14e)](),_0x107d34;}else return!this[_0x5ce99a(0x2dc)]()['includes'](this[_0x5ce99a(0x499)]());}return VisuMZ[_0x5ce99a(0x3a3)]['Window_EquipItem_isEnabled'][_0x5ce99a(0x539)](this,_0x5019c0);},Window_EquipItem[_0x1087a8(0x4d2)][_0x1087a8(0x219)]=function(_0xa8e62){const _0x428d08=_0x1087a8,_0x1113ee=_0xa8e62['note'];if(_0x1113ee['match'](/<EQUIP COPY LIMIT:[ ](\d+)>/i)){const _0x9463f4=Number(RegExp['$1'])||0x1;let _0x4181a9=0x0;const _0x206637=this['_actor'][_0x428d08(0x5bf)](),_0x145b12=SceneManager[_0x428d08(0x4a0)][_0x428d08(0x47e)][_0x428d08(0x59b)]();_0x206637[_0x145b12]=null;for(const _0x37e69f of _0x206637){if(!_0x37e69f)continue;if(DataManager[_0x428d08(0x34c)](_0xa8e62)===DataManager[_0x428d08(0x34c)](_0x37e69f)){if(_0xa8e62['id']===_0x37e69f['id'])_0x4181a9+=0x1;}}return _0x4181a9>=_0x9463f4;}else return![];},Window_EquipItem[_0x1087a8(0x4d2)]['isSoleWeaponType']=function(_0x380b63){const _0x16e001=_0x1087a8;if(!DataManager[_0x16e001(0x34c)](_0x380b63))return![];const _0x255299=/<EQUIP WEAPON TYPE LIMIT:[ ](\d+)>/i;let _0x4f5fe7=0x0;const _0x425f07=this[_0x16e001(0x3c4)][_0x16e001(0x5bf)](),_0x19628b=SceneManager[_0x16e001(0x4a0)][_0x16e001(0x47e)]['equipSlotIndex']();_0x425f07[_0x19628b]=null;for(const _0x1d3e7b of _0x425f07){if(_0x16e001(0x41e)==='uMPzU'){if(!_0x1d3e7b)continue;if(!DataManager[_0x16e001(0x34c)](_0x1d3e7b))continue;if(_0x380b63[_0x16e001(0x391)]===_0x1d3e7b[_0x16e001(0x391)]){_0x4f5fe7+=0x1;if(_0x380b63[_0x16e001(0x3c7)][_0x16e001(0x4b8)](_0x255299)){const _0x41ee78=Number(RegExp['$1'])||0x1;if(_0x4f5fe7>=_0x41ee78)return!![];}if(_0x1d3e7b[_0x16e001(0x3c7)]['match'](_0x255299)){if(_0x16e001(0x406)==='UArov'){const _0xf4f35=Number(RegExp['$1'])||0x1;if(_0x4f5fe7>=_0xf4f35)return!![];}else{const _0x8df1b1=this[_0x16e001(0x4dd)](),_0x1ff23f=this[_0x16e001(0x16a)]()?this[_0x16e001(0x42c)]():0x0,_0x240c50=this[_0x16e001(0x574)](),_0x479562=_0x10b1d6[_0x16e001(0x2ac)]-this[_0x16e001(0x42c)](),_0x19274d=_0x8df1b1?this[_0x16e001(0x44e)](0x1,!![]):0x0;return new _0x418cd2(_0x1ff23f,_0x240c50,_0x479562,_0x19274d);}}}}else this[_0x16e001(0x47e)][_0x16e001(0x1c0)](_0x16e001(0x4f9),this[_0x16e001(0x3ac)][_0x16e001(0x5c0)](this)),this[_0x16e001(0x47e)][_0x16e001(0x1c0)](_0x16e001(0x437),this['nextActor'][_0x16e001(0x5c0)](this)),this[_0x16e001(0x47e)]['setHandler'](_0x16e001(0x478),this[_0x16e001(0x57f)][_0x16e001(0x5c0)](this));}return![];},Window_EquipItem['prototype'][_0x1087a8(0x38e)]=function(_0x232612){const _0x1bf3f6=_0x1087a8;if(!DataManager[_0x1bf3f6(0x56a)](_0x232612))return![];const _0x2fc449=/<EQUIP ARMOR TYPE LIMIT:[ ](\d+)>/i;let _0x3db19a=0x0;const _0x4ce3c0=this[_0x1bf3f6(0x3c4)]['equips'](),_0x43850b=SceneManager[_0x1bf3f6(0x4a0)]['_slotWindow'][_0x1bf3f6(0x59b)]();_0x4ce3c0[_0x43850b]=null;for(const _0x2fb331 of _0x4ce3c0){if(!_0x2fb331)continue;if(!DataManager[_0x1bf3f6(0x56a)](_0x2fb331))continue;if(_0x232612['atypeId']===_0x2fb331[_0x1bf3f6(0x2e4)]){if(_0x1bf3f6(0x322)!==_0x1bf3f6(0x15b)){_0x3db19a+=0x1;if(_0x232612[_0x1bf3f6(0x3c7)][_0x1bf3f6(0x4b8)](_0x2fc449)){const _0xe120e6=Number(RegExp['$1'])||0x1;if(_0x3db19a>=_0xe120e6)return!![];}if(_0x2fb331['note']['match'](_0x2fc449)){if('EUuCo'!==_0x1bf3f6(0x16b)){const _0x365609=Number(RegExp['$1'])||0x1;if(_0x3db19a>=_0x365609)return!![];}else _0x20f91d['ItemsEquipsCore'][_0x1bf3f6(0x293)][_0x1bf3f6(0x539)](this,_0x267209),this[_0x1bf3f6(0x54c)](_0x3ae508);}}else this[_0x1bf3f6(0x2cd)][_0x1bf3f6(0x356)](this[_0x1bf3f6(0x4b2)]());}}return![];},Window_EquipItem[_0x1087a8(0x4d2)][_0x1087a8(0x2dc)]=function(){const _0x450d12=_0x1087a8;return VisuMZ[_0x450d12(0x3a3)][_0x450d12(0x2e7)][_0x450d12(0x274)][_0x450d12(0x453)];},Window_EquipItem[_0x1087a8(0x4d2)][_0x1087a8(0x2d0)]=function(_0x39fca7){const _0x12c76e=_0x1087a8,_0x5266f4=this[_0x12c76e(0x2f9)](_0x39fca7);_0x5266f4?Window_ItemList[_0x12c76e(0x4d2)][_0x12c76e(0x2d0)][_0x12c76e(0x539)](this,_0x39fca7):this['drawRemoveItem'](_0x39fca7);},Window_EquipItem[_0x1087a8(0x4d2)][_0x1087a8(0x597)]=function(_0x15ff74){const _0x32f9eb=_0x1087a8;this['changePaintOpacity'](this[_0x32f9eb(0x515)](null));const _0x22ecd6=VisuMZ['ItemsEquipsCore'][_0x32f9eb(0x2e7)][_0x32f9eb(0x274)],_0x1a6ef9=this[_0x32f9eb(0x2c8)](_0x15ff74),_0x4a8091=_0x1a6ef9['y']+(this[_0x32f9eb(0x425)]()-ImageManager[_0x32f9eb(0x221)])/0x2,_0x55d34a=ImageManager[_0x32f9eb(0x212)]+0x4,_0xeb6992=Math[_0x32f9eb(0x4ce)](0x0,_0x1a6ef9[_0x32f9eb(0x16c)]-_0x55d34a);this['resetTextColor'](),this[_0x32f9eb(0x546)](_0x22ecd6[_0x32f9eb(0x1c9)],_0x1a6ef9['x'],_0x4a8091),this[_0x32f9eb(0x14a)](_0x22ecd6['RemoveEquipText'],_0x1a6ef9['x']+_0x55d34a,_0x1a6ef9['y'],_0xeb6992),this['changePaintOpacity'](!![]);},Window_EquipItem[_0x1087a8(0x4d2)][_0x1087a8(0x558)]=function(){const _0x435343=_0x1087a8;Window_ItemList[_0x435343(0x4d2)][_0x435343(0x558)]['call'](this);if(this[_0x435343(0x3c4)]&&this[_0x435343(0x2cd)]&&this[_0x435343(0x4d4)]>=0x0){const _0x454a20=JsonEx[_0x435343(0x48e)](this['_actor']);_0x454a20['_tempActor']=!![],_0x454a20[_0x435343(0x1e4)](this[_0x435343(0x4d4)],this[_0x435343(0x4b2)]()),this[_0x435343(0x2cd)][_0x435343(0x251)](_0x454a20);}},VisuMZ['ItemsEquipsCore'][_0x1087a8(0x152)]=Window_ShopCommand[_0x1087a8(0x4d2)]['initialize'],Window_ShopCommand[_0x1087a8(0x4d2)][_0x1087a8(0x1be)]=function(_0x358a23){const _0x468b37=_0x1087a8;VisuMZ[_0x468b37(0x3a3)][_0x468b37(0x152)]['call'](this,_0x358a23),this[_0x468b37(0x54c)](_0x358a23);},Window_ShopCommand['prototype']['createCommandNameWindow']=function(_0x3e7851){const _0x52c199=_0x1087a8,_0x123d43=new Rectangle(0x0,0x0,_0x3e7851[_0x52c199(0x16c)],_0x3e7851[_0x52c199(0x5cd)]);this['_commandNameWindow']=new Window_Base(_0x123d43),this[_0x52c199(0x38a)]['opacity']=0x0,this[_0x52c199(0x194)](this[_0x52c199(0x38a)]),this[_0x52c199(0x492)]();},Window_ShopCommand[_0x1087a8(0x4d2)][_0x1087a8(0x35c)]=function(){const _0x43f271=_0x1087a8;Window_HorzCommand[_0x43f271(0x4d2)][_0x43f271(0x35c)][_0x43f271(0x539)](this);if(this['_commandNameWindow'])this[_0x43f271(0x492)]();},Window_ShopCommand[_0x1087a8(0x4d2)][_0x1087a8(0x492)]=function(){const _0x339424=_0x1087a8,_0x58de5b=this['_commandNameWindow'];_0x58de5b[_0x339424(0x4a8)][_0x339424(0x5bd)]();const _0x3d938a=this[_0x339424(0x15f)](this['index']());if(_0x3d938a===_0x339424(0x1ec)){const _0x203755=this['itemLineRect'](this[_0x339424(0x4ba)]());let _0x4e70ec=this[_0x339424(0x1dc)](this[_0x339424(0x4ba)]());_0x4e70ec=_0x4e70ec[_0x339424(0x20c)](/\\I\[(\d+)\]/gi,''),_0x58de5b[_0x339424(0x14e)](),this['commandNameWindowDrawBackground'](_0x4e70ec,_0x203755),this['commandNameWindowDrawText'](_0x4e70ec,_0x203755),this['commandNameWindowCenter'](_0x4e70ec,_0x203755);}},Window_ShopCommand[_0x1087a8(0x4d2)]['commandNameWindowDrawBackground']=function(_0x24df56,_0x20906a){},Window_ShopCommand[_0x1087a8(0x4d2)][_0x1087a8(0x237)]=function(_0x20f4d1,_0x5de8b6){const _0x466243=_0x1087a8,_0x2ed134=this[_0x466243(0x38a)];_0x2ed134['drawText'](_0x20f4d1,0x0,_0x5de8b6['y'],_0x2ed134['innerWidth'],'center');},Window_ShopCommand[_0x1087a8(0x4d2)][_0x1087a8(0x2b5)]=function(_0x5696bf,_0x7c200e){const _0x4a3485=_0x1087a8,_0x177835=this['_commandNameWindow'],_0x1a5cbf=$gameSystem[_0x4a3485(0x578)](),_0x582b3a=_0x7c200e['x']+Math[_0x4a3485(0x53e)](_0x7c200e[_0x4a3485(0x16c)]/0x2)+_0x1a5cbf;_0x177835['x']=_0x177835[_0x4a3485(0x16c)]/-0x2+_0x582b3a,_0x177835['y']=Math[_0x4a3485(0x53e)](_0x7c200e['height']/0x2);},Window_ShopCommand[_0x1087a8(0x4d2)][_0x1087a8(0x2e1)]=function(){const _0x2dd166=_0x1087a8;return this['_list']?this['_list'][_0x2dd166(0x490)]:0x3;},Window_ShopCommand['prototype'][_0x1087a8(0x385)]=function(){const _0x1aeb14=_0x1087a8;return VisuMZ[_0x1aeb14(0x3a3)][_0x1aeb14(0x2e7)][_0x1aeb14(0x281)][_0x1aeb14(0x561)];},Window_ShopCommand[_0x1087a8(0x4d2)]['makeCommandList']=function(){const _0x3f66a0=_0x1087a8;this[_0x3f66a0(0x393)](),this[_0x3f66a0(0x21c)](),this['addCancelCommand']();},Window_ShopCommand[_0x1087a8(0x4d2)]['refresh']=function(){const _0x431d2a=_0x1087a8;Window_HorzCommand[_0x431d2a(0x4d2)][_0x431d2a(0x44b)]['call'](this),this[_0x431d2a(0x5d4)]();},Window_ShopCommand['prototype']['addBuyCommand']=function(){const _0x6b41e7=_0x1087a8,_0x3b6fc4=this[_0x6b41e7(0x510)](),_0x125b40=VisuMZ[_0x6b41e7(0x3a3)][_0x6b41e7(0x2e7)][_0x6b41e7(0x281)]['CmdIconBuy'],_0x5b2aff=_0x3b6fc4===_0x6b41e7(0x29d)?TextManager['buy']:_0x6b41e7(0x31c)[_0x6b41e7(0x564)](_0x125b40,TextManager[_0x6b41e7(0x387)]),_0x53a265=this['isBuyCommandEnabled']();if(this[_0x6b41e7(0x385)]()&&!_0x53a265)return;this[_0x6b41e7(0x51b)](_0x5b2aff,_0x6b41e7(0x387),_0x53a265);},Window_ShopCommand[_0x1087a8(0x4d2)][_0x1087a8(0x17c)]=function(){const _0x573dd4=_0x1087a8;return SceneManager[_0x573dd4(0x4a0)][_0x573dd4(0x4c4)]===Scene_Shop?SceneManager[_0x573dd4(0x4a0)][_0x573dd4(0x2f0)]>0x0:!![];},Window_ShopCommand[_0x1087a8(0x4d2)][_0x1087a8(0x21c)]=function(){const _0x1374e5=_0x1087a8,_0x52978a=this[_0x1374e5(0x510)](),_0x4e8d42=VisuMZ[_0x1374e5(0x3a3)]['Settings'][_0x1374e5(0x281)][_0x1374e5(0x361)],_0xb0759f=_0x52978a===_0x1374e5(0x29d)?TextManager[_0x1374e5(0x52a)]:_0x1374e5(0x31c)[_0x1374e5(0x564)](_0x4e8d42,TextManager[_0x1374e5(0x52a)]),_0x567c7f=this[_0x1374e5(0x362)]();if(this[_0x1374e5(0x385)]()&&!_0x567c7f)return;this[_0x1374e5(0x51b)](_0xb0759f,_0x1374e5(0x52a),_0x567c7f);},Window_ShopCommand['prototype'][_0x1087a8(0x362)]=function(){return!this['_purchaseOnly'];},Window_ShopCommand[_0x1087a8(0x4d2)][_0x1087a8(0x1ba)]=function(){const _0xcdab1=_0x1087a8,_0x269d7a=this[_0xcdab1(0x510)](),_0x45fe84=VisuMZ[_0xcdab1(0x3a3)]['Settings'][_0xcdab1(0x281)]['CmdIconCancel'],_0x5cffc8=VisuMZ[_0xcdab1(0x3a3)]['Settings'][_0xcdab1(0x281)][_0xcdab1(0x4a9)],_0x20ba7a=_0x269d7a===_0xcdab1(0x29d)?_0x5cffc8:_0xcdab1(0x31c)[_0xcdab1(0x564)](_0x45fe84,_0x5cffc8);this[_0xcdab1(0x51b)](_0x20ba7a,'cancel');},Window_ShopCommand[_0x1087a8(0x4d2)][_0x1087a8(0x54d)]=function(){const _0x36ef50=_0x1087a8;return VisuMZ[_0x36ef50(0x3a3)][_0x36ef50(0x2e7)][_0x36ef50(0x281)][_0x36ef50(0x495)];},Window_ShopCommand[_0x1087a8(0x4d2)][_0x1087a8(0x2d0)]=function(_0xe176c5){const _0x562cfb=_0x1087a8,_0x148453=this[_0x562cfb(0x15f)](_0xe176c5);if(_0x148453===_0x562cfb(0x2ef))this['drawItemStyleIconText'](_0xe176c5);else _0x148453===_0x562cfb(0x1ec)?this[_0x562cfb(0x5c8)](_0xe176c5):_0x562cfb(0x267)!=='JoduF'?Window_HorzCommand['prototype']['drawItem']['call'](this,_0xe176c5):this[_0x562cfb(0x570)](_0x201d8b[_0x562cfb(0x469)](_0x562cfb(0x437)));},Window_ShopCommand[_0x1087a8(0x4d2)][_0x1087a8(0x510)]=function(){const _0xcf0f92=_0x1087a8;return VisuMZ[_0xcf0f92(0x3a3)]['Settings'][_0xcf0f92(0x281)]['CmdStyle'];},Window_ShopCommand['prototype'][_0x1087a8(0x15f)]=function(_0x2cd29e){const _0xf299c9=_0x1087a8;if(_0x2cd29e<0x0)return _0xf299c9(0x29d);const _0x9e2f65=this['commandStyle']();if(_0x9e2f65!==_0xf299c9(0x49b))return _0xf299c9(0x47f)===_0xf299c9(0x47f)?_0x9e2f65:_0x3dabdf[_0xf299c9(0x3b6)]&&_0x46c40f[_0xf299c9(0x4d2)][_0xf299c9(0x3a8)]['call'](this);else{if(this['maxItems']()>0x0){if(_0xf299c9(0x28f)==='gGrQj'){const _0x56c8f1=this[_0xf299c9(0x1dc)](_0x2cd29e);if(_0x56c8f1[_0xf299c9(0x4b8)](/\\I\[(\d+)\]/i)){if(_0xf299c9(0x463)===_0xf299c9(0x168))return this['isUseItemsEquipsCoreUpdatedLayout']()?this[_0xf299c9(0x5b8)]():_0x3eeacb['ItemsEquipsCore']['Scene_Shop_buyWindowRect'][_0xf299c9(0x539)](this);else{const _0x9f3403=this[_0xf299c9(0x2c8)](_0x2cd29e),_0x6793c6=this[_0xf299c9(0x5d2)](_0x56c8f1)[_0xf299c9(0x16c)];return _0x6793c6<=_0x9f3403[_0xf299c9(0x16c)]?_0xf299c9(0x2ef):_0xf299c9(0x1ec);}}}else _0x51a29a=_0xf299c9(0x33c)[_0xf299c9(0x564)](_0x4fccea['id']);}}return _0xf299c9(0x29d);},Window_ShopCommand[_0x1087a8(0x4d2)][_0x1087a8(0x5ac)]=function(_0xf6319a){const _0x4759b2=_0x1087a8,_0x45319a=this['itemLineRect'](_0xf6319a),_0x2e12a3=this['commandName'](_0xf6319a),_0x3bc78a=this['textSizeEx'](_0x2e12a3)[_0x4759b2(0x16c)];this[_0x4759b2(0x4e7)](this[_0x4759b2(0x2b0)](_0xf6319a));const _0x20643c=this[_0x4759b2(0x54d)]();if(_0x20643c===_0x4759b2(0x4ec))this[_0x4759b2(0x31b)](_0x2e12a3,_0x45319a['x']+_0x45319a[_0x4759b2(0x16c)]-_0x3bc78a,_0x45319a['y'],_0x3bc78a);else{if(_0x20643c===_0x4759b2(0x331)){const _0x1b02a5=_0x45319a['x']+Math[_0x4759b2(0x53e)]((_0x45319a[_0x4759b2(0x16c)]-_0x3bc78a)/0x2);this[_0x4759b2(0x31b)](_0x2e12a3,_0x1b02a5,_0x45319a['y'],_0x3bc78a);}else this[_0x4759b2(0x31b)](_0x2e12a3,_0x45319a['x'],_0x45319a['y'],_0x3bc78a);}},Window_ShopCommand[_0x1087a8(0x4d2)][_0x1087a8(0x5c8)]=function(_0x1255c3){const _0x332c32=_0x1087a8;this[_0x332c32(0x1dc)](_0x1255c3)['match'](/\\I\[(\d+)\]/i);const _0x62b711=Number(RegExp['$1'])||0x0,_0x592cdb=this[_0x332c32(0x2c8)](_0x1255c3),_0x18e76d=_0x592cdb['x']+Math['floor']((_0x592cdb[_0x332c32(0x16c)]-ImageManager[_0x332c32(0x212)])/0x2),_0x41efc5=_0x592cdb['y']+(_0x592cdb[_0x332c32(0x5cd)]-ImageManager['iconHeight'])/0x2;this['drawIcon'](_0x62b711,_0x18e76d,_0x41efc5);},VisuMZ[_0x1087a8(0x3a3)]['Window_ShopBuy_refresh']=Window_ShopBuy[_0x1087a8(0x4d2)][_0x1087a8(0x44b)],Window_ShopBuy[_0x1087a8(0x4d2)][_0x1087a8(0x44b)]=function(){const _0x3f06fa=_0x1087a8;this[_0x3f06fa(0x3c1)](),VisuMZ[_0x3f06fa(0x3a3)][_0x3f06fa(0x58f)][_0x3f06fa(0x539)](this);},Window_ShopBuy[_0x1087a8(0x4d2)][_0x1087a8(0x3c1)]=function(){const _0x371ade=_0x1087a8;if(SceneManager[_0x371ade(0x4a0)][_0x371ade(0x4c4)]===Scene_Shop){if(_0x371ade(0x37e)===_0x371ade(0x4a2))return _0x4fa506[_0x371ade(0x3a3)]['Settings'][_0x371ade(0x595)]['MaxArmors'];else this[_0x371ade(0x4da)]=SceneManager[_0x371ade(0x4a0)]['money']();}},VisuMZ[_0x1087a8(0x3a3)]['Window_ShopBuy_price']=Window_ShopBuy[_0x1087a8(0x4d2)]['price'],Window_ShopBuy['prototype'][_0x1087a8(0x45c)]=function(_0x226224){const _0x4f4666=_0x1087a8;if(!_0x226224)return 0x0;let _0x5464b6=VisuMZ['ItemsEquipsCore'][_0x4f4666(0x533)][_0x4f4666(0x539)](this,_0x226224);return Math['max'](0x0,this[_0x4f4666(0x522)](_0x226224,_0x5464b6));},Window_ShopBuy[_0x1087a8(0x4d2)][_0x1087a8(0x522)]=function(_0x20fff6,_0x56b127){const _0x322e81=_0x1087a8,_0x30ae3d=_0x20fff6[_0x322e81(0x3c7)];if(_0x30ae3d[_0x322e81(0x4b8)](/<JS BUY PRICE>\s*([\s\S]*)\s*<\/JS BUY PRICE>/i)){const _0x20be33=String(RegExp['$1']);try{if(_0x322e81(0x3ed)===_0x322e81(0x33e)){const _0x316f9a=_0x322e81(0x1d2);if(this[_0x322e81(0x4bc)][_0x316f9a])return this[_0x322e81(0x4bc)][_0x316f9a];const _0xbfa8b=_0x201e61[_0x322e81(0x3a3)][_0x322e81(0x2e7)][_0x322e81(0x241)],_0x36322d='HitType%1'[_0x322e81(0x564)](this['_item'][_0x322e81(0x513)]);return _0xbfa8b[_0x36322d];}else eval(_0x20be33);}catch(_0x5b7bbd){if($gameTemp['isPlaytest']())console['log'](_0x5b7bbd);}}_0x56b127=VisuMZ['ItemsEquipsCore'][_0x322e81(0x2e7)]['ShopScene'][_0x322e81(0x14d)][_0x322e81(0x539)](this,_0x20fff6,_0x56b127);if(isNaN(_0x56b127))_0x56b127=0x0;return Math['floor'](_0x56b127);},Window_ShopBuy['prototype']['drawItem']=function(_0x15bc49){const _0x7c0bc7=_0x1087a8;this[_0x7c0bc7(0x14e)]();const _0x37cedb=this[_0x7c0bc7(0x2f9)](_0x15bc49),_0x20d374=this[_0x7c0bc7(0x2c8)](_0x15bc49),_0x234e8a=_0x20d374[_0x7c0bc7(0x16c)];this[_0x7c0bc7(0x4e7)](this[_0x7c0bc7(0x515)](_0x37cedb)),this[_0x7c0bc7(0x5c1)](_0x37cedb,_0x20d374['x'],_0x20d374['y'],_0x234e8a),this[_0x7c0bc7(0x205)](_0x37cedb,_0x20d374),this[_0x7c0bc7(0x4e7)](!![]);},Window_ShopBuy[_0x1087a8(0x4d2)][_0x1087a8(0x205)]=function(_0x516724,_0x1d11ab){const _0x275983=_0x1087a8,_0x3dfcdc=this[_0x275983(0x45c)](_0x516724);this[_0x275983(0x236)](_0x3dfcdc,TextManager[_0x275983(0x199)],_0x1d11ab['x'],_0x1d11ab['y'],_0x1d11ab[_0x275983(0x16c)]);},Window_ShopSell[_0x1087a8(0x4d2)]['maxCols']=function(){const _0x1da00b=_0x1087a8;return SceneManager[_0x1da00b(0x4a0)][_0x1da00b(0x45f)]()?0x1:0x2;},VisuMZ[_0x1087a8(0x3a3)]['Window_ShopSell_isEnabled']=Window_ShopSell[_0x1087a8(0x4d2)]['isEnabled'],Window_ShopSell['prototype'][_0x1087a8(0x515)]=function(_0x23ab69){const _0xe73e5d=_0x1087a8;if(!_0x23ab69)return![];const _0x4b0aef=_0x23ab69[_0xe73e5d(0x3c7)];if(_0x4b0aef[_0xe73e5d(0x4b8)](/<CANNOT SELL>/i))return![];if(_0x4b0aef[_0xe73e5d(0x4b8)](/<CAN SELL>/i))return!![];if(_0x4b0aef['match'](/<CANNOT SELL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x1837bf=JSON['parse']('['+RegExp['$1'][_0xe73e5d(0x4b8)](/\d+/g)+']');for(const _0x6e6b5d of _0x1837bf){if('FURAS'!=='RtUFy'){if(!$gameSwitches[_0xe73e5d(0x58a)](_0x6e6b5d))return![];}else{if(_0x484a68[_0xe73e5d(0x58a)](_0x2b4f65))return!![];}}}if(_0x4b0aef[_0xe73e5d(0x4b8)](/<CANNOT SELL ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0xbfa550=JSON[_0xe73e5d(0x1b3)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x48a0f7 of _0xbfa550){if(_0xe73e5d(0x55f)==='ggZPT'){if(!$gameSwitches[_0xe73e5d(0x58a)](_0x48a0f7))return![];}else return _0x5822ca[_0xe73e5d(0x3a3)][_0xe73e5d(0x2e7)][_0xe73e5d(0x241)]['Width'];}}if(_0x4b0aef[_0xe73e5d(0x4b8)](/<CANNOT SELL ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0xe73e5d(0x368)!=='oIlpJ'){const _0x1b9188=JSON[_0xe73e5d(0x1b3)]('['+RegExp['$1'][_0xe73e5d(0x4b8)](/\d+/g)+']');for(const _0x3423bd of _0x1b9188){if(_0xe73e5d(0x381)===_0xe73e5d(0x381)){if($gameSwitches['value'](_0x3423bd))return![];}else{if(this[_0xe73e5d(0x219)](_0x56cfc6))return![];if(this[_0xe73e5d(0x3ca)](_0x3bdbaf))return![];if(this[_0xe73e5d(0x38e)](_0x3745d6))return![];}}}else _0x5cf9c0[_0xe73e5d(0x3a3)][_0xe73e5d(0x599)][_0xe73e5d(0x539)](this,_0x510201);}return VisuMZ[_0xe73e5d(0x3a3)][_0xe73e5d(0x2c1)][_0xe73e5d(0x539)](this,_0x23ab69);},Window_ShopStatus['prototype'][_0x1087a8(0x5ae)]=function(){return![];},Window_ShopStatus[_0x1087a8(0x4d2)][_0x1087a8(0x593)]=function(){const _0x25b6f5=_0x1087a8;Window_StatusBase['prototype'][_0x25b6f5(0x593)]['call'](this);for(const _0x3b3524 of $gameParty[_0x25b6f5(0x247)]()){_0x25b6f5(0x307)===_0x25b6f5(0x307)?ImageManager[_0x25b6f5(0x4fa)](_0x3b3524[_0x25b6f5(0x16f)]()):_0x685402=_0x24f982(_0x2b1615['$1'])[_0x25b6f5(0x186)]()[_0x25b6f5(0x187)]();}},Window_ShopStatus[_0x1087a8(0x4d2)][_0x1087a8(0x374)]=function(){const _0x50b11e=_0x1087a8;return VisuMZ['ItemsEquipsCore'][_0x50b11e(0x2e7)][_0x50b11e(0x241)]['Translucent'];},Window_ShopStatus['prototype'][_0x1087a8(0x44b)]=function(){const _0x30c28a=_0x1087a8;this['contents'][_0x30c28a(0x5bd)](),this['contentsBack'][_0x30c28a(0x5bd)](),this['_item']&&(this[_0x30c28a(0x14e)](),this['changePaintOpacity'](!![]),this[_0x30c28a(0x5b6)](),this[_0x30c28a(0x24f)]()?this[_0x30c28a(0x18c)]():this[_0x30c28a(0x52f)](),this[_0x30c28a(0x315)]());},Window_ShopStatus['prototype'][_0x1087a8(0x438)]=function(_0x2543f2,_0x2035ae){const _0x1dd849=_0x1087a8;if(!this[_0x1dd849(0x24f)]()&&!DataManager[_0x1dd849(0x468)](this[_0x1dd849(0x2b2)]))return;const _0x240144=this[_0x1dd849(0x407)]-this[_0x1dd849(0x214)]()-_0x2543f2,_0x38549b=this[_0x1dd849(0x222)](_0x1dd849(0x4b5));this[_0x1dd849(0x1d7)](ColorManager['systemColor']()),this[_0x1dd849(0x14a)](TextManager[_0x1dd849(0x557)],_0x2543f2+this[_0x1dd849(0x214)](),_0x2035ae,_0x240144-_0x38549b),this[_0x1dd849(0x2be)](),this[_0x1dd849(0x2bf)](this['_item'],_0x2543f2,_0x2035ae,_0x240144);},Window_ShopStatus[_0x1087a8(0x4d2)][_0x1087a8(0x526)]=function(_0x4acba8,_0x42341f,_0x17f17e,_0x428007,_0x10d040){const _0x56e822=_0x1087a8;if(VisuMZ[_0x56e822(0x3a3)][_0x56e822(0x2e7)][_0x56e822(0x241)][_0x56e822(0x375)]===![])return;_0x10d040=Math[_0x56e822(0x4ce)](_0x10d040||0x1,0x1);while(_0x10d040--){_0x428007=_0x428007||this[_0x56e822(0x425)](),this['contentsBack'][_0x56e822(0x2bd)]=0xa0;const _0x113c66=ColorManager[_0x56e822(0x413)]();this['contentsBack'][_0x56e822(0x508)](_0x4acba8+0x1,_0x42341f+0x1,_0x17f17e-0x2,_0x428007-0x2,_0x113c66),this[_0x56e822(0x473)][_0x56e822(0x2bd)]=0xff;}},ColorManager[_0x1087a8(0x413)]=function(){const _0x54b8d5=_0x1087a8,_0x1fbf83=VisuMZ[_0x54b8d5(0x3a3)][_0x54b8d5(0x2e7)][_0x54b8d5(0x241)];let _0x69bdb0=_0x1fbf83['BackRectColor']!==undefined?_0x1fbf83[_0x54b8d5(0x1da)]:0x13;return ColorManager['getColor'](_0x69bdb0);},Window_ShopStatus[_0x1087a8(0x4d2)][_0x1087a8(0x18c)]=function(){const _0x1b1668=_0x1087a8;if(VisuMZ[_0x1b1668(0x3a3)]['Settings']['StatusWindow'][_0x1b1668(0x580)]){VisuMZ[_0x1b1668(0x3a3)][_0x1b1668(0x2e7)][_0x1b1668(0x241)][_0x1b1668(0x580)][_0x1b1668(0x539)](this);return;}const _0xd578d4=this[_0x1b1668(0x425)](),_0x3fb6c4=this[_0x1b1668(0x285)]()+0x8;let _0x2889af=0x0,_0x4a10df=0x0,_0x4be817=this[_0x1b1668(0x407)],_0x2c337d=this['innerHeight'],_0x213476=Math[_0x1b1668(0x53e)](_0x4be817/0x2),_0x368f70=_0x2889af+_0x4be817-_0x213476;this['drawItemName'](this['_item'],_0x2889af+this['itemPadding'](),_0x4a10df,_0x4be817-this[_0x1b1668(0x214)]()*0x2),this[_0x1b1668(0x526)](_0x2889af,_0x4a10df,_0x4be817),_0x4a10df+=_0xd578d4;if(this[_0x1b1668(0x4cb)](_0x2889af,_0x4a10df,_0x213476))_0x4a10df+=0x0;if(this['drawItemQuantity'](_0x368f70,_0x4a10df,_0x213476))_0x4a10df+=_0xd578d4;const _0x5a609f=this[_0x1b1668(0x340)](),_0x5b47a7=_0x4a10df;_0x4a10df=_0x2c337d-_0x5a609f['length']*_0x3fb6c4-0x4;let _0x1b50bf=_0x2889af,_0x14a5f9=0x0,_0x49f72a=_0x4a10df;for(const _0x3f3ef1 of _0x5a609f){if(_0x1b1668(0x4ab)!==_0x1b1668(0x34e))_0x14a5f9=Math[_0x1b1668(0x4ce)](this[_0x1b1668(0x33b)](_0x3f3ef1,_0x2889af+0x4,_0x4a10df+0x4,_0x4be817),_0x14a5f9),_0x4a10df+=_0x3fb6c4;else return _0x38ec44;}const _0x5bb377=$gameParty[_0x1b1668(0x44a)](),_0x5361b9=Math['floor']((_0x4be817-_0x14a5f9)/_0x5bb377);_0x14a5f9=_0x4be817-_0x5361b9*_0x5bb377;for(const _0x42d8e6 of $gameParty['battleMembers']()){const _0x329bf8=$gameParty[_0x1b1668(0x4b7)]()[_0x1b1668(0x197)](_0x42d8e6),_0x1075a5=_0x1b50bf+_0x14a5f9+_0x329bf8*_0x5361b9;this[_0x1b1668(0x4e7)](_0x42d8e6['canEquip'](this[_0x1b1668(0x2b2)])),this[_0x1b1668(0x5a1)](_0x42d8e6,_0x1075a5+_0x5361b9/0x2,_0x49f72a);let _0xb7ce33=_0x49f72a;for(const _0xd8fdf0 of _0x5a609f){const _0x1d7fdb=_0xb7ce33-(_0xd578d4-_0x3fb6c4)/0x2;this['drawActorParamDifference'](_0x42d8e6,_0xd8fdf0,_0x1075a5,_0x1d7fdb,_0x5361b9),_0xb7ce33+=_0x3fb6c4;}}this['drawItemDarkRect'](_0x1b50bf,_0x5b47a7,_0x14a5f9,_0x49f72a-_0x5b47a7);for(let _0x5971a6=0x0;_0x5971a6<_0x5bb377;_0x5971a6++){const _0x1a5c8e=_0x1b50bf+_0x14a5f9+_0x5971a6*_0x5361b9;this[_0x1b1668(0x526)](_0x1a5c8e,_0x5b47a7,_0x5361b9,_0x49f72a-_0x5b47a7);}for(const _0x5063a3 of _0x5a609f){this[_0x1b1668(0x526)](_0x1b50bf,_0x49f72a,_0x14a5f9,_0x3fb6c4);for(let _0xce5625=0x0;_0xce5625<_0x5bb377;_0xce5625++){const _0x389cbc=_0x1b50bf+_0x14a5f9+_0xce5625*_0x5361b9;this[_0x1b1668(0x526)](_0x389cbc,_0x49f72a,_0x5361b9,_0x3fb6c4);}_0x49f72a+=_0x3fb6c4;}},Window_ShopStatus[_0x1087a8(0x4d2)][_0x1087a8(0x4cb)]=function(_0x580860,_0x5d6977,_0x3d3140){const _0x5c9ba2=_0x1087a8;if(!this['isEquipItem']())return![];const _0x30b310=$dataSystem[_0x5c9ba2(0x3e8)][this[_0x5c9ba2(0x2b2)][_0x5c9ba2(0x499)]];return this['drawItemKeyData'](_0x30b310,_0x580860,_0x5d6977,_0x3d3140,!![]),this[_0x5c9ba2(0x526)](_0x580860,_0x5d6977,_0x3d3140),this[_0x5c9ba2(0x14e)](),!![];},Window_ShopStatus[_0x1087a8(0x4d2)][_0x1087a8(0x29b)]=function(){const _0x57274e=_0x1087a8,_0x4c1445=VisuMZ['ItemsEquipsCore'][_0x57274e(0x2e7)][_0x57274e(0x595)][_0x57274e(0x48b)];return _0x4c1445['format']($gameParty[_0x57274e(0x28a)](this[_0x57274e(0x2b2)]));},Window_ShopStatus[_0x1087a8(0x4d2)][_0x1087a8(0x340)]=function(){const _0x207103=_0x1087a8;return Imported['VisuMZ_0_CoreEngine']?VisuMZ[_0x207103(0x5af)][_0x207103(0x2e7)][_0x207103(0x332)][_0x207103(0x31a)]:[0x0,0x1,0x2,0x3,0x4,0x5,0x6,0x7];},Window_ShopStatus[_0x1087a8(0x4d2)]['smallParamFontSize']=function(){const _0x340a78=_0x1087a8;return VisuMZ[_0x340a78(0x3a3)][_0x340a78(0x2e7)][_0x340a78(0x241)]['ParamChangeFontSize'];},Window_ShopStatus[_0x1087a8(0x4d2)][_0x1087a8(0x33b)]=function(_0x4306d7,_0x3d38a7,_0x192301,_0x506e0b){const _0x439156=_0x1087a8;this[_0x439156(0x14e)](),this[_0x439156(0x4a8)][_0x439156(0x50f)]=this[_0x439156(0x218)]();let _0x574bd6=this[_0x439156(0x222)](TextManager[_0x439156(0x1a5)](_0x4306d7))+0x4+_0x3d38a7;if(Imported[_0x439156(0x3b6)])this['drawParamText'](_0x3d38a7,_0x192301,_0x506e0b,_0x4306d7,!![]),VisuMZ[_0x439156(0x5af)][_0x439156(0x2e7)][_0x439156(0x332)][_0x439156(0x527)]&&(_0x574bd6+=ImageManager[_0x439156(0x212)]+0x4);else{if('Tofyq'!==_0x439156(0x19b))this['changeTextColor'](ColorManager['systemColor']()),this[_0x439156(0x14a)](TextManager['param'](_0x4306d7),_0x3d38a7,_0x192301,_0x506e0b);else return _0x439156(0x45a);}return this[_0x439156(0x14e)](),_0x574bd6;},Window_ShopStatus[_0x1087a8(0x4d2)][_0x1087a8(0x3ea)]=function(_0x50b45f,_0x51880b,_0xa56637,_0xcd856f,_0x139b3d){const _0xfaeb8e=_0x1087a8;_0xa56637+=this[_0xfaeb8e(0x214)](),_0x139b3d-=this[_0xfaeb8e(0x214)]()*0x2;const _0x568c11=VisuMZ['ItemsEquipsCore']['Settings'][_0xfaeb8e(0x241)];this[_0xfaeb8e(0x4a8)]['fontSize']=_0x568c11[_0xfaeb8e(0x5cb)],this[_0xfaeb8e(0x4e7)](_0x50b45f[_0xfaeb8e(0x455)](this[_0xfaeb8e(0x2b2)]));if(_0x50b45f[_0xfaeb8e(0x37d)](this[_0xfaeb8e(0x2b2)])){if(_0xfaeb8e(0x253)!==_0xfaeb8e(0x1bd)){const _0x31393d=_0x568c11[_0xfaeb8e(0x40b)];this[_0xfaeb8e(0x14a)](_0x31393d,_0xa56637,_0xcd856f,_0x139b3d,_0xfaeb8e(0x331));}else this[_0xfaeb8e(0x289)](),this[_0xfaeb8e(0x598)]();}else{if(_0x50b45f[_0xfaeb8e(0x455)](this[_0xfaeb8e(0x2b2)])){const _0x538cd9=JsonEx[_0xfaeb8e(0x48e)](_0x50b45f);_0x538cd9['_tempActor']=!![];const _0x2a1d42=_0x538cd9[_0xfaeb8e(0x4b6)]()[_0xfaeb8e(0x197)](this[_0xfaeb8e(0x2b2)]['etypeId']);if(_0x2a1d42>=0x0)_0x538cd9[_0xfaeb8e(0x1e4)](_0x2a1d42,this[_0xfaeb8e(0x2b2)]);let _0x66bba7=0x0,_0x448608=0x0,_0x14ffb7=0x0;if(Imported['VisuMZ_0_CoreEngine'])'ODefr'!==_0xfaeb8e(0x4c9)?(_0x66bba7=_0x538cd9[_0xfaeb8e(0x3bc)](_0x51880b),_0x448608=_0x66bba7-_0x50b45f[_0xfaeb8e(0x3bc)](_0x51880b),this['changeTextColor'](ColorManager[_0xfaeb8e(0x49a)](_0x448608)),_0x14ffb7=(_0x448608>=0x0?'+':'')+VisuMZ['ConvertNumberToString'](_0x448608,0x0,_0x51880b)):this[_0xfaeb8e(0x31b)](_0x42c912,_0x4fbfc3['x']+_0x33b7dc[_0xfaeb8e(0x16c)]-_0x4bb439,_0x43d2f4['y'],_0x18c8f4);else{if('QeUeL'===_0xfaeb8e(0x1ab)){const _0x3006a=_0x3e609e[_0xfaeb8e(0x3c7)],_0x5f1d26=_0xc9edfc['ItemsEquipsCore']['itemEnableJS'];return _0x5f1d26[_0x133d98['id']]?_0x5f1d26[_0x51b895['id']]['call'](this,_0x4a6901):!![];}else _0x66bba7=_0x538cd9['param'](_0x51880b),_0x448608=_0x66bba7-_0x50b45f[_0xfaeb8e(0x1a5)](_0x51880b),this['changeTextColor'](ColorManager[_0xfaeb8e(0x49a)](_0x448608)),_0x14ffb7=(_0x448608>=0x0?'+':'')+_0x448608;}if(_0x14ffb7==='+0')_0x14ffb7=_0x568c11[_0xfaeb8e(0x4d1)];this['drawText'](_0x14ffb7,_0xa56637,_0xcd856f,_0x139b3d,'center');}else{const _0x738e92=_0x568c11[_0xfaeb8e(0x3dc)];this[_0xfaeb8e(0x14a)](_0x738e92,_0xa56637,_0xcd856f,_0x139b3d,_0xfaeb8e(0x331));}}this[_0xfaeb8e(0x14e)](),this[_0xfaeb8e(0x4e7)](!![]);},Window_ShopStatus[_0x1087a8(0x4d2)]['drawItemData']=function(){const _0x36357a=_0x1087a8;VisuMZ[_0x36357a(0x3a3)][_0x36357a(0x2e7)][_0x36357a(0x241)][_0x36357a(0x49e)][_0x36357a(0x539)](this);},Window_ShopStatus[_0x1087a8(0x4d2)][_0x1087a8(0x5b6)]=function(){const _0x3f742d=_0x1087a8;this[_0x3f742d(0x4bc)]={};if(!this['_item'])return;const _0x3d9a3d=this['_item']['note'];if(_0x3d9a3d['match'](/<STATUS INFO>\s*([\s\S]*)\s*<\/STATUS INFO>/i)){if(_0x3f742d(0x5c5)==='RJfTq'){const _0x11131b=String(RegExp['$1'])[_0x3f742d(0x2a0)](/[\r\n]+/);for(const _0x1614a1 of _0x11131b){if(_0x1614a1[_0x3f742d(0x4b8)](/(.*):[ ](.*)/i)){const _0x92604c=String(RegExp['$1'])[_0x3f742d(0x37a)]()[_0x3f742d(0x187)](),_0x301135=String(RegExp['$2'])[_0x3f742d(0x187)]();this[_0x3f742d(0x4bc)][_0x92604c]=_0x301135;}}}else{const _0x23cb76=this[_0x3f742d(0x498)]();this[_0x3f742d(0x2cd)]=new _0x3d8e50(_0x23cb76),this['addWindow'](this[_0x3f742d(0x2cd)]),this[_0x3f742d(0x40f)]['setStatusWindow'](this['_statusWindow']);const _0x14de61=_0x3f007e[_0x3f742d(0x3a3)]['Settings'][_0x3f742d(0x595)]['ItemMenuStatusBgType'];this[_0x3f742d(0x2cd)][_0x3f742d(0x23f)](_0x14de61||0x0);}}},Window_ShopStatus[_0x1087a8(0x4d2)][_0x1087a8(0x5c7)]=function(){const _0x1fd212=_0x1087a8;return Math['max'](0x1,$gameSystem[_0x1fd212(0x433)]()-0x4);},Window_ShopStatus[_0x1087a8(0x4d2)][_0x1087a8(0x14e)]=function(){const _0x233a16=_0x1087a8;Window_StatusBase[_0x233a16(0x4d2)][_0x233a16(0x14e)][_0x233a16(0x539)](this),this[_0x233a16(0x4a8)][_0x233a16(0x50f)]=this[_0x233a16(0x4b4)]||this['contents']['fontSize'],this[_0x233a16(0x4a8)][_0x233a16(0x3e5)]=this['_resetFontColor']||this[_0x233a16(0x4a8)][_0x233a16(0x3e5)];},Window_ShopStatus[_0x1087a8(0x4d2)]['fontSizeRatio']=function(){const _0x17648f=_0x1087a8;return this[_0x17648f(0x4a8)][_0x17648f(0x50f)]/$gameSystem[_0x17648f(0x433)]();},Window_ShopStatus[_0x1087a8(0x4d2)][_0x1087a8(0x546)]=function(_0x39ad7d,_0x44d2d9,_0x40d29a){const _0x3ed2ef=_0x1087a8,_0x1145a1=ImageManager['loadSystem'](_0x3ed2ef(0x262)),_0x1e808e=ImageManager[_0x3ed2ef(0x212)],_0x27786d=ImageManager['iconHeight'],_0xace231=_0x39ad7d%0x10*_0x1e808e,_0x3d1eb1=Math['floor'](_0x39ad7d/0x10)*_0x27786d,_0x18a0b0=Math[_0x3ed2ef(0x220)](_0x1e808e*this[_0x3ed2ef(0x316)]()),_0x164e19=Math[_0x3ed2ef(0x220)](_0x27786d*this[_0x3ed2ef(0x316)]());this['contents'][_0x3ed2ef(0x18e)](_0x1145a1,_0xace231,_0x3d1eb1,_0x1e808e,_0x27786d,_0x44d2d9,_0x40d29a,_0x18a0b0,_0x164e19);},Window_ShopStatus['prototype'][_0x1087a8(0x300)]=function(_0x43810f,_0x3c4d0c){const _0x1ef426=_0x1087a8;_0x3c4d0c['drawing']&&this['drawIcon'](_0x43810f,_0x3c4d0c['x'],_0x3c4d0c['y']+0x2);_0x3c4d0c['x']+=Math[_0x1ef426(0x220)](ImageManager[_0x1ef426(0x212)]*this[_0x1ef426(0x316)]());if(this[_0x1ef426(0x316)]()===0x1)_0x3c4d0c['x']+=0x4;},Window_ShopStatus[_0x1087a8(0x4d2)]['drawItemKeyData']=function(_0x57eec0,_0x539fa8,_0x74f42,_0x210960,_0x579de6,_0x49de11){const _0x1f47a5=_0x1087a8;_0x57eec0=_0x57eec0||'',_0x49de11=_0x49de11||_0x1f47a5(0x27b),this[_0x1f47a5(0x4b4)]=this['itemDataFontSize'](),this['_resetFontColor']=_0x579de6?ColorManager[_0x1f47a5(0x1e9)]():this['contents'][_0x1f47a5(0x3e5)],_0x539fa8+=this[_0x1f47a5(0x214)](),_0x210960-=this['itemPadding']()*0x2;const _0x5f156c=this[_0x1f47a5(0x5d2)](_0x57eec0);if(_0x49de11===_0x1f47a5(0x331)){if(_0x1f47a5(0x57e)!==_0x1f47a5(0x57e)){const _0x10b06f=_0x1f47a5(0x278);if(this[_0x1f47a5(0x4bc)][_0x10b06f])return this['_customItemInfo'][_0x10b06f];if(this[_0x1f47a5(0x2b2)][_0x1f47a5(0x37f)][_0x1f47a5(0x4ff)]<=-0x1)return _0x4dc768['ItemsEquipsCore'][_0x1f47a5(0x2e7)][_0x1f47a5(0x241)][_0x1f47a5(0x329)];else return this[_0x1f47a5(0x2b2)][_0x1f47a5(0x37f)]['elementId']===0x0?_0xe8e183[_0x1f47a5(0x3a3)][_0x1f47a5(0x2e7)][_0x1f47a5(0x241)][_0x1f47a5(0x3be)]:_0x4daf76['elements'][this[_0x1f47a5(0x2b2)][_0x1f47a5(0x37f)][_0x1f47a5(0x4ff)]];}else _0x539fa8=_0x539fa8+Math[_0x1f47a5(0x53e)]((_0x210960-_0x5f156c['width'])/0x2);}else _0x49de11==='right'&&(_0x539fa8=_0x539fa8+_0x210960-_0x5f156c[_0x1f47a5(0x16c)]);_0x74f42+=(this[_0x1f47a5(0x425)]()-_0x5f156c[_0x1f47a5(0x5cd)])/0x2,this['drawTextEx'](_0x57eec0,_0x539fa8,_0x74f42,_0x210960),this['_resetFontSize']=undefined,this[_0x1f47a5(0x3cf)]=undefined,this[_0x1f47a5(0x14e)]();},Window_ShopStatus[_0x1087a8(0x4d2)][_0x1087a8(0x5a7)]=function(_0x15f745,_0xcf057d,_0x38fc6d){const _0x176369=_0x1087a8;if(!DataManager[_0x176369(0x468)](this[_0x176369(0x2b2)]))return![];const _0x2569d5=this[_0x176369(0x272)]();this['drawItemKeyData'](_0x2569d5,_0x15f745,_0xcf057d,_0x38fc6d,!![]);const _0x414219=this[_0x176369(0x2c5)]();return this[_0x176369(0x308)](_0x414219,_0x15f745,_0xcf057d,_0x38fc6d,![],_0x176369(0x4ec)),this[_0x176369(0x526)](_0x15f745,_0xcf057d,_0x38fc6d),this[_0x176369(0x14e)](),!![];},Window_ShopStatus['prototype'][_0x1087a8(0x272)]=function(){const _0x54af02=_0x1087a8;return VisuMZ['ItemsEquipsCore'][_0x54af02(0x2e7)][_0x54af02(0x241)][_0x54af02(0x284)];},Window_ShopStatus['prototype'][_0x1087a8(0x2c5)]=function(){const _0x6c0920=_0x1087a8,_0x28d9ab=_0x6c0920(0x1cd);if(this[_0x6c0920(0x4bc)][_0x28d9ab])return this[_0x6c0920(0x4bc)][_0x28d9ab];return this[_0x6c0920(0x474)]()?VisuMZ['ItemsEquipsCore'][_0x6c0920(0x2e7)]['StatusWindow'][_0x6c0920(0x1c8)]:VisuMZ['ItemsEquipsCore'][_0x6c0920(0x2e7)]['StatusWindow'][_0x6c0920(0x3b0)];},Window_ShopStatus[_0x1087a8(0x4d2)]['canConsumeItem']=function(){const _0x5f579f=_0x1087a8;return VisuMZ[_0x5f579f(0x5af)]&&VisuMZ[_0x5f579f(0x5af)][_0x5f579f(0x2e7)][_0x5f579f(0x32f)][_0x5f579f(0x493)]&&DataManager['isKeyItem'](this['_item'])?![]:this[_0x5f579f(0x2b2)]['consumable'];},Window_ShopStatus['prototype'][_0x1087a8(0x3eb)]=function(_0x65841c,_0x2eea7b,_0x45282e){const _0x424f91=_0x1087a8;if(!this[_0x424f91(0x24f)]()&&!DataManager['isItem'](this['_item']))return![];if(DataManager['isKeyItem'](this[_0x424f91(0x2b2)])&&!$dataSystem['optKeyItemsNumber']){const _0xebd9aa=TextManager[_0x424f91(0x258)];this['drawItemKeyData'](_0xebd9aa,_0x65841c,_0x2eea7b,_0x45282e,!![],'center');}else{const _0x351cab=TextManager[_0x424f91(0x557)];this[_0x424f91(0x308)](_0x351cab,_0x65841c,_0x2eea7b,_0x45282e,!![]);const _0x4c7f47=this[_0x424f91(0x29b)]();this['drawItemKeyData'](_0x4c7f47,_0x65841c,_0x2eea7b,_0x45282e,![],_0x424f91(0x4ec));}return this[_0x424f91(0x526)](_0x65841c,_0x2eea7b,_0x45282e),this[_0x424f91(0x14e)](),!![];},Window_ShopStatus['prototype']['getItemQuantityText']=function(){const _0x3203bc=_0x1087a8,_0x30d316='QUANTITY';if(this[_0x3203bc(0x4bc)][_0x30d316])return this[_0x3203bc(0x4bc)][_0x30d316];const _0x327f42=VisuMZ[_0x3203bc(0x3a3)][_0x3203bc(0x2e7)][_0x3203bc(0x595)][_0x3203bc(0x48b)];return _0x327f42[_0x3203bc(0x564)]($gameParty[_0x3203bc(0x28a)](this[_0x3203bc(0x2b2)]));},Window_ShopStatus['prototype'][_0x1087a8(0x159)]=function(_0x6748f8,_0x582db7,_0xb9a3){const _0x4640a3=_0x1087a8,_0x2d3096=this['getItemOccasionText']();return this['drawItemKeyData'](_0x2d3096,_0x6748f8,_0x582db7,_0xb9a3,![],_0x4640a3(0x331)),this[_0x4640a3(0x526)](_0x6748f8,_0x582db7,_0xb9a3),this[_0x4640a3(0x14e)](),!![];},Window_ShopStatus[_0x1087a8(0x4d2)][_0x1087a8(0x17f)]=function(){const _0x188305=_0x1087a8,_0x5d8edd=_0x188305(0x249);if(this[_0x188305(0x4bc)][_0x5d8edd])return this[_0x188305(0x4bc)][_0x5d8edd];const _0x43d353=VisuMZ[_0x188305(0x3a3)][_0x188305(0x2e7)][_0x188305(0x241)],_0x1984b1=_0x188305(0x3ab)[_0x188305(0x564)](this[_0x188305(0x2b2)][_0x188305(0x443)]);return _0x43d353[_0x1984b1];},Window_ShopStatus[_0x1087a8(0x4d2)][_0x1087a8(0x2db)]=function(_0x2556ff,_0x471f48,_0x2b5f59){const _0x412df5=_0x1087a8,_0x4c93a6=this[_0x412df5(0x441)]();return this[_0x412df5(0x308)](_0x4c93a6,_0x2556ff,_0x471f48,_0x2b5f59,![],'center'),this[_0x412df5(0x526)](_0x2556ff,_0x471f48,_0x2b5f59),this[_0x412df5(0x14e)](),!![];},Window_ShopStatus[_0x1087a8(0x4d2)]['getItemScopeText']=function(){const _0x58c9d7=_0x1087a8,_0x92328f='SCOPE';if(this[_0x58c9d7(0x4bc)][_0x92328f])return this[_0x58c9d7(0x4bc)][_0x92328f];const _0x32ce80=VisuMZ[_0x58c9d7(0x3a3)]['Settings']['StatusWindow'];if(Imported['VisuMZ_1_BattleCore']){if(_0x58c9d7(0x5a4)===_0x58c9d7(0x203)){let _0x5e3655=0x0;const _0xd766ba=this[_0x58c9d7(0x4b6)](),_0x50976b=this[_0x58c9d7(0x5bf)]();for(let _0x25f515=0x0;_0x25f515<_0xd766ba[_0x58c9d7(0x490)];_0x25f515++){if(_0xd766ba[_0x25f515]===_0x4ee7c7){_0x5e3655=_0x25f515;if(!_0x50976b[_0x25f515])return _0x5e3655;}}return _0x5e3655;}else{const _0x3a2b37=this[_0x58c9d7(0x2b2)][_0x58c9d7(0x3c7)];if(_0x3a2b37[_0x58c9d7(0x4b8)](/<TARGET:[ ](.*)>/i)){const _0x477f65=String(RegExp['$1']);if(_0x477f65[_0x58c9d7(0x4b8)](/(\d+) RANDOM ANY/i)){if(_0x58c9d7(0x3ec)!=='AqEiM')this[_0x58c9d7(0x3bb)](_0x199ebf[_0x58c9d7(0x469)](_0x58c9d7(0x27b)));else return _0x32ce80[_0x58c9d7(0x190)][_0x58c9d7(0x564)](Number(RegExp['$1']));}else{if(_0x477f65[_0x58c9d7(0x4b8)](/(\d+) RANDOM (?:ENEMY|ENEMIES|FOE|FOES)/i)){if('EACCg'===_0x58c9d7(0x24c)){const _0xf469e2=_0xaa2630[_0x58c9d7(0x1b3)]('['+_0x14e6ce['$1']['match'](/\d+/g)+']');for(const _0x2a69fb of _0xf469e2){if(!_0x29ecf8[_0x58c9d7(0x58a)](_0x2a69fb))return!![];}return![];}else return _0x32ce80[_0x58c9d7(0x3ad)]['format'](Number(RegExp['$1']));}else{if(_0x477f65[_0x58c9d7(0x4b8)](/(\d+) RANDOM (?:ALLY|ALLIES|FRIEND|FRIENDS)/i))return _0x32ce80[_0x58c9d7(0x54f)][_0x58c9d7(0x564)](Number(RegExp['$1']));else{if(_0x477f65['match'](/ALL (?:ALLY|ALLIES|FRIEND|FRIENDS) (?:BUT|EXCEPT) (?:USER|SELF)/i))return'mgnBo'===_0x58c9d7(0x2b4)?_0x32ce80[_0x58c9d7(0x157)]:this[_0x58c9d7(0x5ca)]();}}}}}}const _0x185efc=_0x58c9d7(0x343)['format'](this[_0x58c9d7(0x2b2)]['scope']);return _0x32ce80[_0x185efc];},Window_ShopStatus[_0x1087a8(0x4d2)][_0x1087a8(0x5a8)]=function(_0x1ab1f5,_0x267fc2,_0x2c31c8){const _0x458b8c=_0x1087a8,_0x324bd9=this[_0x458b8c(0x379)]();this['drawItemKeyData'](_0x324bd9,_0x1ab1f5,_0x267fc2,_0x2c31c8,!![]);const _0x5843b5=this[_0x458b8c(0x50e)]();return this[_0x458b8c(0x308)](_0x5843b5,_0x1ab1f5,_0x267fc2,_0x2c31c8,![],_0x458b8c(0x4ec)),this['drawItemDarkRect'](_0x1ab1f5,_0x267fc2,_0x2c31c8),this[_0x458b8c(0x14e)](),!![];},Window_ShopStatus[_0x1087a8(0x4d2)][_0x1087a8(0x379)]=function(){const _0x3b38b7=_0x1087a8;return VisuMZ[_0x3b38b7(0x3a3)]['Settings']['StatusWindow']['LabelSpeed'];},Window_ShopStatus[_0x1087a8(0x4d2)][_0x1087a8(0x50e)]=function(){const _0x4b31d9=_0x1087a8,_0x3dd85b=_0x4b31d9(0x328);if(this['_customItemInfo'][_0x3dd85b])return this[_0x4b31d9(0x4bc)][_0x3dd85b];const _0x2d7d7b=this[_0x4b31d9(0x2b2)]['speed'];if(_0x2d7d7b>=0x7d0)return VisuMZ[_0x4b31d9(0x3a3)]['Settings']['StatusWindow'][_0x4b31d9(0x41f)];else{if(_0x2d7d7b>=0x3e8)return VisuMZ[_0x4b31d9(0x3a3)][_0x4b31d9(0x2e7)]['StatusWindow'][_0x4b31d9(0x189)];else{if(_0x2d7d7b>0x0)return VisuMZ['ItemsEquipsCore'][_0x4b31d9(0x2e7)]['StatusWindow'][_0x4b31d9(0x377)];else{if(_0x2d7d7b===0x0)return VisuMZ[_0x4b31d9(0x3a3)][_0x4b31d9(0x2e7)][_0x4b31d9(0x241)][_0x4b31d9(0x36c)];else{if(_0x2d7d7b>-0x3e8)return VisuMZ[_0x4b31d9(0x3a3)][_0x4b31d9(0x2e7)][_0x4b31d9(0x241)][_0x4b31d9(0x2c0)];else{if(_0x2d7d7b>-0x7d0)return VisuMZ[_0x4b31d9(0x3a3)]['Settings'][_0x4b31d9(0x241)][_0x4b31d9(0x54a)];else{if(_0x2d7d7b<=-0x7d0){if(_0x4b31d9(0x35f)!==_0x4b31d9(0x396))return VisuMZ[_0x4b31d9(0x3a3)]['Settings'][_0x4b31d9(0x241)]['SpeedNeg2000'];else this[_0x4b31d9(0x3a5)]();}else return _0x4b31d9(0x45a);}}}}}}},Window_ShopStatus['prototype']['drawItemSuccessRate']=function(_0x1df341,_0x495411,_0x42a3d0){const _0x154357=_0x1087a8,_0x447d21=this[_0x154357(0x3a7)]();this[_0x154357(0x308)](_0x447d21,_0x1df341,_0x495411,_0x42a3d0,!![]);const _0x531253=this[_0x154357(0x341)]();return this[_0x154357(0x308)](_0x531253,_0x1df341,_0x495411,_0x42a3d0,![],_0x154357(0x4ec)),this[_0x154357(0x526)](_0x1df341,_0x495411,_0x42a3d0),this[_0x154357(0x14e)](),!![];},Window_ShopStatus[_0x1087a8(0x4d2)]['getItemSuccessRateLabel']=function(){const _0x382f69=_0x1087a8;return VisuMZ['ItemsEquipsCore'][_0x382f69(0x2e7)][_0x382f69(0x241)][_0x382f69(0x1c3)];},Window_ShopStatus['prototype']['getItemSuccessRateText']=function(){const _0x44a7ca=_0x1087a8,_0x5a2dd4=_0x44a7ca(0x30d);if(this[_0x44a7ca(0x4bc)][_0x5a2dd4])return this['_customItemInfo'][_0x5a2dd4];if(Imported[_0x44a7ca(0x252)]){if(_0x44a7ca(0x4af)!==_0x44a7ca(0x177)){const _0x3d79fb=this[_0x44a7ca(0x2b2)][_0x44a7ca(0x3c7)];if(_0x3d79fb[_0x44a7ca(0x4b8)](/<ALWAYS HIT>/i))return _0x44a7ca(0x1ea)!==_0x44a7ca(0x18b)?'100%':this[_0x44a7ca(0x333)]&&this[_0x44a7ca(0x333)][_0x44a7ca(0x3a8)]();else{if(_0x3d79fb[_0x44a7ca(0x4b8)](/<ALWAYS HIT RATE: (\d+)([%％])>/i)){if(_0x44a7ca(0x217)===_0x44a7ca(0x217))return _0x44a7ca(0x2fb)['format'](Number(RegExp['$1']));else this[_0x44a7ca(0x320)]();}}}else return _0x22221c[_0x44a7ca(0x3a3)][_0x44a7ca(0x2e7)][_0x44a7ca(0x274)][_0x44a7ca(0x59d)];}return'%1%'['format'](this[_0x44a7ca(0x2b2)][_0x44a7ca(0x503)]);},Window_ShopStatus[_0x1087a8(0x4d2)][_0x1087a8(0x153)]=function(_0x196e88,_0x4779f9,_0x2d54d9){const _0x3a09fd=_0x1087a8,_0x28ff5f=this['getItemRepeatsLabel']();this[_0x3a09fd(0x308)](_0x28ff5f,_0x196e88,_0x4779f9,_0x2d54d9,!![]);const _0x177344=this[_0x3a09fd(0x1cf)]();return this['drawItemKeyData'](_0x177344,_0x196e88,_0x4779f9,_0x2d54d9,![],'right'),this[_0x3a09fd(0x526)](_0x196e88,_0x4779f9,_0x2d54d9),this[_0x3a09fd(0x14e)](),!![];},Window_ShopStatus['prototype']['getItemRepeatsLabel']=function(){const _0x3e06de=_0x1087a8;return VisuMZ[_0x3e06de(0x3a3)][_0x3e06de(0x2e7)]['StatusWindow']['LabelRepeats'];},Window_ShopStatus[_0x1087a8(0x4d2)]['getItemRepeatsText']=function(){const _0x1b5cee=_0x1087a8,_0x46c553=_0x1b5cee(0x226);if(this[_0x1b5cee(0x4bc)][_0x46c553])return this[_0x1b5cee(0x4bc)][_0x46c553];const _0x4f56cf=_0x1b5cee(0x21f);return _0x4f56cf['format'](this[_0x1b5cee(0x2b2)][_0x1b5cee(0x223)]);},Window_ShopStatus[_0x1087a8(0x4d2)][_0x1087a8(0x1a8)]=function(_0x244e78,_0x2dcd0f,_0x1031a2){const _0xb27ac3=_0x1087a8,_0x2bca25=this[_0xb27ac3(0x3d2)]();this[_0xb27ac3(0x308)](_0x2bca25,_0x244e78,_0x2dcd0f,_0x1031a2,!![]);const _0x5badb6=this[_0xb27ac3(0x1e6)]();return this[_0xb27ac3(0x308)](_0x5badb6,_0x244e78,_0x2dcd0f,_0x1031a2,![],_0xb27ac3(0x4ec)),this[_0xb27ac3(0x526)](_0x244e78,_0x2dcd0f,_0x1031a2),this[_0xb27ac3(0x14e)](),!![];},Window_ShopStatus['prototype'][_0x1087a8(0x3d2)]=function(){const _0x2b3dda=_0x1087a8;return VisuMZ[_0x2b3dda(0x3a3)]['Settings'][_0x2b3dda(0x241)]['LabelHitType'];},Window_ShopStatus['prototype']['getItemHitTypeText']=function(){const _0x1d62a6=_0x1087a8,_0xb4710e=_0x1d62a6(0x1d2);if(this[_0x1d62a6(0x4bc)][_0xb4710e])return this[_0x1d62a6(0x4bc)][_0xb4710e];const _0x10fc8f=VisuMZ[_0x1d62a6(0x3a3)][_0x1d62a6(0x2e7)]['StatusWindow'],_0x523c67=_0x1d62a6(0x287)['format'](this[_0x1d62a6(0x2b2)][_0x1d62a6(0x513)]);return _0x10fc8f[_0x523c67];},Window_ShopStatus[_0x1087a8(0x4d2)]['drawItemDamage']=function(_0x5dc40a,_0x12f2a8,_0x447aa7){const _0x14ff2c=_0x1087a8;if(this[_0x14ff2c(0x2b2)][_0x14ff2c(0x37f)]['type']<=0x0)return _0x12f2a8;if(this[_0x14ff2c(0x5d0)](_0x5dc40a,_0x12f2a8,_0x447aa7))_0x12f2a8+=this[_0x14ff2c(0x425)]();if(this['drawItemDamageAmount'](_0x5dc40a,_0x12f2a8,_0x447aa7))_0x12f2a8+=this[_0x14ff2c(0x425)]();return this[_0x14ff2c(0x14e)](),_0x12f2a8;},Window_ShopStatus[_0x1087a8(0x4d2)][_0x1087a8(0x5d0)]=function(_0x138824,_0x402156,_0x33f664){const _0x118299=_0x1087a8,_0x30d26d=this[_0x118299(0x55d)]();this[_0x118299(0x308)](_0x30d26d,_0x138824,_0x402156,_0x33f664,!![]);const _0x211063=this['getItemDamageElementText']();return this[_0x118299(0x308)](_0x211063,_0x138824,_0x402156,_0x33f664,![],_0x118299(0x4ec)),this[_0x118299(0x526)](_0x138824,_0x402156,_0x33f664),this['resetFontSettings'](),!![];},Window_ShopStatus[_0x1087a8(0x4d2)][_0x1087a8(0x55d)]=function(){const _0x20df3a=_0x1087a8;return VisuMZ[_0x20df3a(0x3a3)][_0x20df3a(0x2e7)][_0x20df3a(0x241)][_0x20df3a(0x3b5)];},Window_ShopStatus[_0x1087a8(0x4d2)][_0x1087a8(0x3d5)]=function(){const _0x22b710=_0x1087a8,_0x579bea=_0x22b710(0x278);if(this[_0x22b710(0x4bc)][_0x579bea])return this['_customItemInfo'][_0x579bea];if(this['_item']['damage']['elementId']<=-0x1)return VisuMZ[_0x22b710(0x3a3)][_0x22b710(0x2e7)][_0x22b710(0x241)][_0x22b710(0x329)];else{if(this[_0x22b710(0x2b2)]['damage'][_0x22b710(0x4ff)]===0x0){if(_0x22b710(0x290)!==_0x22b710(0x290)){const _0x4fad88=_0x22b710(0x448);if(this[_0x22b710(0x4bc)][_0x4fad88])return this[_0x22b710(0x4bc)][_0x4fad88];let _0x13bad2='';return _0x13bad2+=_0x22b710(0x23a)[_0x22b710(0x564)](this[_0x22b710(0x297)][_0x22b710(0x4e1)]),_0x13bad2;}else return VisuMZ[_0x22b710(0x3a3)]['Settings'][_0x22b710(0x241)][_0x22b710(0x3be)];}else return $dataSystem[_0x22b710(0x4a1)][this[_0x22b710(0x2b2)]['damage'][_0x22b710(0x4ff)]];}},Window_ShopStatus[_0x1087a8(0x4d2)][_0x1087a8(0x17a)]=function(_0x28f509,_0x359ae9,_0x1bb4f4){const _0x413cd3=_0x1087a8,_0x4b0df8=this[_0x413cd3(0x27a)]();this[_0x413cd3(0x308)](_0x4b0df8,_0x28f509,_0x359ae9,_0x1bb4f4,!![]),this[_0x413cd3(0x330)]();const _0x5e93ab=this[_0x413cd3(0x1af)](),_0x540732=ColorManager[_0x413cd3(0x29c)]([0x0,0x0,0x2,0x1,0x3,0x1,0x3][this[_0x413cd3(0x2b2)]['damage'][_0x413cd3(0x58b)]]);return this[_0x413cd3(0x1d7)](_0x540732),this[_0x413cd3(0x308)](_0x5e93ab,_0x28f509,_0x359ae9,_0x1bb4f4,![],_0x413cd3(0x4ec)),this[_0x413cd3(0x526)](_0x28f509,_0x359ae9,_0x1bb4f4),this[_0x413cd3(0x14e)](),!![];},Window_ShopStatus['prototype'][_0x1087a8(0x27a)]=function(){const _0x252c80=_0x1087a8;return Imported[_0x252c80(0x252)]&&DataManager['getDamageStyle'](this[_0x252c80(0x2b2)])!==_0x252c80(0x3fc)?this[_0x252c80(0x1ee)]():this['getItemDamageAmountLabelOriginal']();},Window_ShopStatus[_0x1087a8(0x4d2)][_0x1087a8(0x1b9)]=function(){const _0x54cf3a=_0x1087a8,_0x5c2820=VisuMZ[_0x54cf3a(0x3a3)][_0x54cf3a(0x2e7)]['StatusWindow'],_0x23f082=_0x54cf3a(0x166)[_0x54cf3a(0x564)](this[_0x54cf3a(0x2b2)][_0x54cf3a(0x37f)]['type']),_0x553079=[null,TextManager['hp'],TextManager['mp'],TextManager['hp'],TextManager['mp'],TextManager['hp'],TextManager['mp']][this[_0x54cf3a(0x2b2)]['damage'][_0x54cf3a(0x58b)]];return _0x5c2820[_0x23f082][_0x54cf3a(0x564)](_0x553079);},Window_ShopStatus['prototype'][_0x1087a8(0x330)]=function(){const _0x4664bc=_0x1087a8,_0x5e4a83=$gameActors['actor'](0x1);this['_tempActorA']=JsonEx[_0x4664bc(0x48e)](_0x5e4a83),this[_0x4664bc(0x2d3)]=JsonEx[_0x4664bc(0x48e)](_0x5e4a83);},Window_ShopStatus[_0x1087a8(0x4d2)][_0x1087a8(0x1af)]=function(){const _0x4b575f=_0x1087a8,_0x507605=_0x4b575f(0x439);if(this[_0x4b575f(0x4bc)][_0x507605])return this[_0x4b575f(0x4bc)][_0x507605];return Imported[_0x4b575f(0x252)]&&DataManager[_0x4b575f(0x25c)](this[_0x4b575f(0x2b2)])!==_0x4b575f(0x3fc)?this['getItemDamageAmountTextBattleCore']():this[_0x4b575f(0x592)]();},Window_ShopStatus[_0x1087a8(0x4d2)][_0x1087a8(0x592)]=function(){const _0x37a8f3=_0x1087a8;window['a']=this[_0x37a8f3(0x420)],window['b']=this['_tempActorB'],this['_tempActorA'][_0x37a8f3(0x47d)](!![]),this[_0x37a8f3(0x2d3)][_0x37a8f3(0x47d)]([0x3,0x4][_0x37a8f3(0x5a5)](this[_0x37a8f3(0x2b2)][_0x37a8f3(0x37f)]['type']));let _0x318c08=this[_0x37a8f3(0x2b2)][_0x37a8f3(0x37f)][_0x37a8f3(0x47a)];try{const _0x253775=Math[_0x37a8f3(0x4ce)](eval(_0x318c08),0x0)/window['a'][_0x37a8f3(0x59e)];this[_0x37a8f3(0x303)]();if(isNaN(_0x253775))return'?????';else{if(_0x37a8f3(0x216)!==_0x37a8f3(0x216)){const _0x45c73e=_0x518ae8[_0x37a8f3(0x349)](this['_actor'][_0x37a8f3(0x50d)]());_0x45c73e[_0x37a8f3(0x509)](this[_0x37a8f3(0x171)]['bind'](this));}else return'%1%'[_0x37a8f3(0x564)](Math['round'](_0x253775*0x64));}}catch(_0x3e1517){if($gameTemp[_0x37a8f3(0x206)]()){if(_0x37a8f3(0x3c9)===_0x37a8f3(0x376))return _0x549a4e[_0x37a8f3(0x3a3)]['Settings']['StatusWindow'][_0x37a8f3(0x377)];else console[_0x37a8f3(0x1ac)](_0x37a8f3(0x3a9)[_0x37a8f3(0x564)](this[_0x37a8f3(0x2b2)]['name'])),console[_0x37a8f3(0x1ac)](_0x3e1517);}return this[_0x37a8f3(0x303)](),_0x37a8f3(0x45a);}},Window_ShopStatus[_0x1087a8(0x4d2)][_0x1087a8(0x303)]=function(){window['a']=undefined,window['b']=undefined;},Window_ShopStatus[_0x1087a8(0x4d2)]['drawItemEffects']=function(_0x60143d,_0x21f472,_0x36d10c){const _0x962043=_0x1087a8;if(!this[_0x962043(0x577)]())return _0x21f472;if(this[_0x962043(0x54b)](_0x60143d,_0x21f472,_0x36d10c))_0x21f472+=this[_0x962043(0x425)]();if(this[_0x962043(0x17e)](_0x60143d,_0x21f472,_0x36d10c))_0x21f472+=this[_0x962043(0x425)]();if(this['drawItemEffectsTpRecovery'](_0x60143d,_0x21f472,_0x36d10c))_0x21f472+=this['lineHeight']();if(this['drawItemEffectsHpDamage'](_0x60143d,_0x21f472,_0x36d10c))_0x21f472+=this[_0x962043(0x425)]();if(this[_0x962043(0x42f)](_0x60143d,_0x21f472,_0x36d10c))_0x21f472+=this[_0x962043(0x425)]();if(this[_0x962043(0x2df)](_0x60143d,_0x21f472,_0x36d10c))_0x21f472+=this[_0x962043(0x425)]();if(this[_0x962043(0x2d1)](_0x60143d,_0x21f472,_0x36d10c))_0x21f472+=this['lineHeight']();if(this[_0x962043(0x4be)](_0x60143d,_0x21f472,_0x36d10c))_0x21f472+=this[_0x962043(0x425)]();if(this[_0x962043(0x3e7)](_0x60143d,_0x21f472,_0x36d10c))_0x21f472+=this[_0x962043(0x425)]();return this['resetFontSettings'](),_0x21f472;},Window_ShopStatus[_0x1087a8(0x4d2)]['getItemEffects']=function(){const _0x41aa97=_0x1087a8;return this[_0x41aa97(0x2b2)][_0x41aa97(0x576)];},Window_ShopStatus[_0x1087a8(0x4d2)]['makeItemData']=function(){const _0x1e0c81=_0x1087a8;let _0x19ba9c=![];this[_0x1e0c81(0x297)]={'rateHP':0x0,'flatHP':0x0,'rateMP':0x0,'flatMP':0x0,'gainTP':0x0,'selfTP':0x0,'addState':[],'removeState':[],'changeBuff':[0x0,0x0,0x0,0x0,0x0,0x0,0x0,0x0],'removeBuff':[],'removeDebuff':[],'addStateBuffChanges':![],'removeStateBuffChanges':![]};const _0x461a8c=this[_0x1e0c81(0x4aa)]();for(const _0x23dafc of _0x461a8c){switch(_0x23dafc[_0x1e0c81(0x1fa)]){case Game_Action[_0x1e0c81(0x590)]:this['_itemData'][_0x1e0c81(0x355)]+=_0x23dafc[_0x1e0c81(0x175)],this[_0x1e0c81(0x297)][_0x1e0c81(0x44f)]+=_0x23dafc[_0x1e0c81(0x30f)],_0x19ba9c=!![];break;case Game_Action[_0x1e0c81(0x213)]:this['_itemData'][_0x1e0c81(0x4e9)]+=_0x23dafc[_0x1e0c81(0x175)],this[_0x1e0c81(0x297)]['flatMP']+=_0x23dafc[_0x1e0c81(0x30f)],_0x19ba9c=!![];break;case Game_Action[_0x1e0c81(0x348)]:this['_itemData'][_0x1e0c81(0x4e1)]+=_0x23dafc[_0x1e0c81(0x175)],_0x19ba9c=!![];break;case Game_Action['EFFECT_ADD_STATE']:this['_itemData'][_0x1e0c81(0x2ab)]['push'](_0x23dafc[_0x1e0c81(0x58d)]),_0x19ba9c=!![];break;case Game_Action[_0x1e0c81(0x208)]:this[_0x1e0c81(0x297)][_0x1e0c81(0x4b1)][_0x1e0c81(0x480)](_0x23dafc['dataId']),this[_0x1e0c81(0x297)][_0x1e0c81(0x270)]=!![],_0x19ba9c=!![];break;case Game_Action[_0x1e0c81(0x538)]:this[_0x1e0c81(0x297)][_0x1e0c81(0x19f)][_0x23dafc[_0x1e0c81(0x58d)]]+=0x1,_0x19ba9c=!![];break;case Game_Action[_0x1e0c81(0x1ce)]:this[_0x1e0c81(0x297)]['changeBuff'][_0x23dafc[_0x1e0c81(0x58d)]]-=0x1,_0x19ba9c=!![];break;case Game_Action['EFFECT_REMOVE_BUFF']:this['_itemData'][_0x1e0c81(0x2b9)][_0x1e0c81(0x480)](_0x23dafc[_0x1e0c81(0x58d)]),this[_0x1e0c81(0x297)][_0x1e0c81(0x270)]=!![],_0x19ba9c=!![];break;case Game_Action[_0x1e0c81(0x2ed)]:this[_0x1e0c81(0x297)][_0x1e0c81(0x398)]['push'](_0x23dafc['dataId']),this[_0x1e0c81(0x297)][_0x1e0c81(0x270)]=!![],_0x19ba9c=!![];break;}}if(this[_0x1e0c81(0x297)][_0x1e0c81(0x2ab)][_0x1e0c81(0x490)]>0x0)this['_itemData']['addStateBuffChanges']=!![];for(let _0x43870b=0x0;_0x43870b<this[_0x1e0c81(0x297)]['changeBuff'][_0x1e0c81(0x490)];_0x43870b++){if(this[_0x1e0c81(0x297)][_0x1e0c81(0x19f)][_0x43870b]!==0x0)this[_0x1e0c81(0x297)][_0x1e0c81(0x542)]=!![];}this[_0x1e0c81(0x2b2)]['tpGain']!==0x0&&(this[_0x1e0c81(0x297)][_0x1e0c81(0x466)]=this[_0x1e0c81(0x2b2)]['tpGain'],_0x19ba9c=!![]);const _0x4a2646=[_0x1e0c81(0x280),_0x1e0c81(0x15e),'TP\x20RECOVERY',_0x1e0c81(0x383),_0x1e0c81(0x569),_0x1e0c81(0x445),_0x1e0c81(0x48c),_0x1e0c81(0x2a9),'REMOVED\x20EFFECTS'];for(const _0x5bd10b of _0x4a2646){if(this[_0x1e0c81(0x4bc)][_0x5bd10b]){if(_0x1e0c81(0x4df)==='UGrJA')_0x16c7c7[_0x1e0c81(0x3a3)][_0x1e0c81(0x4bf)][_0x1e0c81(0x539)](this,_0x2282a3),_0x41faa8[_0x1e0c81(0x3a3)][_0x1e0c81(0x40e)](_0x7e22ec);else{_0x19ba9c=!![];break;}}}return _0x19ba9c;},Window_ShopStatus[_0x1087a8(0x4d2)][_0x1087a8(0x54b)]=function(_0x5f2ef1,_0x373061,_0x4ffe6d){const _0x2fb777=_0x1087a8,_0x5ab614=_0x2fb777(0x280);if(this[_0x2fb777(0x297)][_0x2fb777(0x355)]<=0x0&&this[_0x2fb777(0x297)][_0x2fb777(0x44f)]<=0x0&&!this[_0x2fb777(0x4bc)][_0x5ab614])return![];const _0x37677c=this[_0x2fb777(0x436)]();this[_0x2fb777(0x308)](_0x37677c,_0x5f2ef1,_0x373061,_0x4ffe6d,!![]);const _0x47ac5c=this[_0x2fb777(0x23e)]();return this[_0x2fb777(0x1d7)](ColorManager['damageColor'](0x1)),this[_0x2fb777(0x308)](_0x47ac5c,_0x5f2ef1,_0x373061,_0x4ffe6d,![],_0x2fb777(0x4ec)),this[_0x2fb777(0x526)](_0x5f2ef1,_0x373061,_0x4ffe6d),this[_0x2fb777(0x14e)](),!![];},Window_ShopStatus[_0x1087a8(0x4d2)][_0x1087a8(0x436)]=function(){const _0x5923df=_0x1087a8,_0x352455=VisuMZ[_0x5923df(0x3a3)][_0x5923df(0x2e7)][_0x5923df(0x241)]['LabelRecoverHP'];return _0x352455['format'](TextManager['hp']);},Window_ShopStatus[_0x1087a8(0x4d2)]['getItemEffectsHpRecoveryText']=function(){const _0x725959=_0x1087a8,_0x37b69c=_0x725959(0x280);if(this[_0x725959(0x4bc)][_0x37b69c])return this[_0x725959(0x4bc)][_0x37b69c];let _0x5542c8='';if(this[_0x725959(0x297)]['rateHP']>0x0)_0x5542c8+=_0x725959(0x1e3)[_0x725959(0x564)](Math[_0x725959(0x53e)](this[_0x725959(0x297)][_0x725959(0x355)]*0x64));if(this[_0x725959(0x297)]['rateHP']>0x0&&this[_0x725959(0x297)][_0x725959(0x44f)]>0x0)_0x5542c8+='\x20';if(this[_0x725959(0x297)][_0x725959(0x44f)]>0x0)_0x5542c8+='+%1'[_0x725959(0x564)](this[_0x725959(0x297)][_0x725959(0x44f)]);return _0x5542c8;},Window_ShopStatus['prototype'][_0x1087a8(0x17e)]=function(_0x1a30ee,_0x269af4,_0x90d6a3){const _0x37c672=_0x1087a8,_0xc6730a=_0x37c672(0x15e);if(this[_0x37c672(0x297)]['rateMP']<=0x0&&this['_itemData'][_0x37c672(0x49d)]<=0x0&&!this['_customItemInfo'][_0xc6730a])return![];const _0x325cef=this[_0x37c672(0x39b)]();this['drawItemKeyData'](_0x325cef,_0x1a30ee,_0x269af4,_0x90d6a3,!![]);const _0x2e130b=this[_0x37c672(0x5a2)]();return this['changeTextColor'](ColorManager[_0x37c672(0x29c)](0x3)),this[_0x37c672(0x308)](_0x2e130b,_0x1a30ee,_0x269af4,_0x90d6a3,![],_0x37c672(0x4ec)),this['drawItemDarkRect'](_0x1a30ee,_0x269af4,_0x90d6a3),this[_0x37c672(0x14e)](),!![];},Window_ShopStatus[_0x1087a8(0x4d2)]['getItemEffectsMpRecoveryLabel']=function(){const _0x16ea34=_0x1087a8,_0x83033f=VisuMZ[_0x16ea34(0x3a3)]['Settings'][_0x16ea34(0x241)][_0x16ea34(0x200)];return _0x83033f[_0x16ea34(0x564)](TextManager['mp']);},Window_ShopStatus[_0x1087a8(0x4d2)][_0x1087a8(0x5a2)]=function(){const _0xbf4fab=_0x1087a8,_0x5e8372=_0xbf4fab(0x15e);if(this[_0xbf4fab(0x4bc)][_0x5e8372])return this[_0xbf4fab(0x4bc)][_0x5e8372];let _0x57aa08='';if(this[_0xbf4fab(0x297)][_0xbf4fab(0x4e9)]>0x0)_0x57aa08+='+%1%'['format'](Math[_0xbf4fab(0x53e)](this[_0xbf4fab(0x297)][_0xbf4fab(0x4e9)]*0x64));if(this[_0xbf4fab(0x297)][_0xbf4fab(0x4e9)]>0x0&&this[_0xbf4fab(0x297)][_0xbf4fab(0x49d)]>0x0)_0x57aa08+='\x20';if(this[_0xbf4fab(0x297)][_0xbf4fab(0x49d)]>0x0)_0x57aa08+=_0xbf4fab(0x23a)[_0xbf4fab(0x564)](this[_0xbf4fab(0x297)][_0xbf4fab(0x49d)]);return _0x57aa08;},Window_ShopStatus[_0x1087a8(0x4d2)][_0x1087a8(0x3d4)]=function(_0x5a404c,_0x3847f5,_0x4a651e){const _0x870e30=_0x1087a8,_0x303dcd=_0x870e30(0x448);if(this[_0x870e30(0x297)]['gainTP']<=0x0&&!this[_0x870e30(0x4bc)][_0x303dcd])return![];const _0x4c2cec=this[_0x870e30(0x583)]();this['drawItemKeyData'](_0x4c2cec,_0x5a404c,_0x3847f5,_0x4a651e,!![]);const _0x58fd46=this['getItemEffectsTpRecoveryText']();return this['changeTextColor'](ColorManager[_0x870e30(0x5b9)]()),this['drawItemKeyData'](_0x58fd46,_0x5a404c,_0x3847f5,_0x4a651e,![],_0x870e30(0x4ec)),this['drawItemDarkRect'](_0x5a404c,_0x3847f5,_0x4a651e),this[_0x870e30(0x14e)](),!![];},Window_ShopStatus[_0x1087a8(0x4d2)]['getItemEffectsTpRecoveryLabel']=function(){const _0x1c9a91=_0x1087a8,_0x5cefc6=VisuMZ[_0x1c9a91(0x3a3)]['Settings'][_0x1c9a91(0x241)][_0x1c9a91(0x304)];return _0x5cefc6['format'](TextManager['tp']);},Window_ShopStatus[_0x1087a8(0x4d2)][_0x1087a8(0x450)]=function(){const _0x5c55e1=_0x1087a8,_0x246ea4='TP\x20RECOVERY';if(this[_0x5c55e1(0x4bc)][_0x246ea4])return this[_0x5c55e1(0x4bc)][_0x246ea4];let _0x261e03='';return _0x261e03+=_0x5c55e1(0x23a)['format'](this['_itemData'][_0x5c55e1(0x4e1)]),_0x261e03;},Window_ShopStatus['prototype'][_0x1087a8(0x2d1)]=function(_0x5aba03,_0x41490a,_0x5138eb){const _0x3f37e2=_0x1087a8,_0x101cf0=_0x3f37e2(0x48c);if(this['_itemData'][_0x3f37e2(0x466)]===0x0&&!this['_customItemInfo'][_0x101cf0])return![];const _0x1dc9fe=this['getItemEffectsSelfTpGainLabel']();this[_0x3f37e2(0x308)](_0x1dc9fe,_0x5aba03,_0x41490a,_0x5138eb,!![]);const _0xc44278=this['getItemEffectsSelfTpGainText']();return this[_0x3f37e2(0x297)]['selfTP']>0x0?this['changeTextColor'](ColorManager[_0x3f37e2(0x5b9)]()):this[_0x3f37e2(0x1d7)](ColorManager['powerDownColor']()),this['drawItemKeyData'](_0xc44278,_0x5aba03,_0x41490a,_0x5138eb,![],_0x3f37e2(0x4ec)),this[_0x3f37e2(0x526)](_0x5aba03,_0x41490a,_0x5138eb),this[_0x3f37e2(0x14e)](),!![];},Window_ShopStatus[_0x1087a8(0x4d2)][_0x1087a8(0x457)]=function(){const _0xdc061c=_0x1087a8,_0x25c867=VisuMZ['ItemsEquipsCore']['Settings'][_0xdc061c(0x241)][_0xdc061c(0x519)];return _0x25c867[_0xdc061c(0x564)](TextManager['tp']);},Window_ShopStatus[_0x1087a8(0x4d2)][_0x1087a8(0x51a)]=function(){const _0x39b4e7=_0x1087a8,_0x25f6c1=_0x39b4e7(0x48c);if(this['_customItemInfo'][_0x25f6c1])return this[_0x39b4e7(0x4bc)][_0x25f6c1];let _0x31d4be='';if(this[_0x39b4e7(0x297)][_0x39b4e7(0x466)]>0x0)_0x31d4be+=_0x39b4e7(0x23a)[_0x39b4e7(0x564)](this[_0x39b4e7(0x297)]['selfTP']);else{if(_0x39b4e7(0x14f)!==_0x39b4e7(0x505))_0x31d4be+='%1'['format'](this[_0x39b4e7(0x297)][_0x39b4e7(0x466)]);else{const _0x40ae11=_0x186d9c['x']+_0x19fad3[_0x39b4e7(0x53e)]((_0x41a056[_0x39b4e7(0x16c)]-_0x124011)/0x2);this[_0x39b4e7(0x31b)](_0x5af4e1,_0x40ae11,_0x353bee['y'],_0x41c00d);}}return _0x31d4be;},Window_ShopStatus[_0x1087a8(0x4d2)][_0x1087a8(0x1a2)]=function(_0x281095,_0x18bed8,_0x1ac418){const _0x369dba=_0x1087a8,_0x36bcfe=_0x369dba(0x383);if(this[_0x369dba(0x297)]['rateHP']>=0x0&&this[_0x369dba(0x297)][_0x369dba(0x44f)]>=0x0&&!this['_customItemInfo'][_0x36bcfe])return![];const _0x420225=this[_0x369dba(0x3fb)]();this[_0x369dba(0x308)](_0x420225,_0x281095,_0x18bed8,_0x1ac418,!![]);const _0x15dad5=this[_0x369dba(0x4bd)]();return this[_0x369dba(0x1d7)](ColorManager[_0x369dba(0x29c)](0x0)),this[_0x369dba(0x308)](_0x15dad5,_0x281095,_0x18bed8,_0x1ac418,![],_0x369dba(0x4ec)),this[_0x369dba(0x526)](_0x281095,_0x18bed8,_0x1ac418),this[_0x369dba(0x14e)](),!![];},Window_ShopStatus['prototype']['getItemEffectsHpDamageLabel']=function(){const _0x127634=_0x1087a8,_0x58c1c1=VisuMZ[_0x127634(0x3a3)]['Settings'][_0x127634(0x241)][_0x127634(0x45b)];return _0x58c1c1[_0x127634(0x564)](TextManager['hp']);},Window_ShopStatus[_0x1087a8(0x4d2)]['getItemEffectsHpDamageText']=function(){const _0x466aa9=_0x1087a8,_0x520ebb=_0x466aa9(0x383);if(this['_customItemInfo'][_0x520ebb])return this[_0x466aa9(0x4bc)][_0x520ebb];let _0x1f5b12='';if(this['_itemData']['rateHP']<0x0)_0x1f5b12+='%1%'['format'](Math[_0x466aa9(0x53e)](this[_0x466aa9(0x297)][_0x466aa9(0x355)]*0x64));if(this['_itemData'][_0x466aa9(0x355)]<0x0&&this[_0x466aa9(0x297)][_0x466aa9(0x44f)]<0x0)_0x1f5b12+='\x20';if(this[_0x466aa9(0x297)][_0x466aa9(0x44f)]<0x0)_0x1f5b12+='%1'[_0x466aa9(0x564)](this[_0x466aa9(0x297)]['flatHP']);return _0x1f5b12;},Window_ShopStatus['prototype'][_0x1087a8(0x42f)]=function(_0x5628ab,_0x2e3f21,_0x116d60){const _0x5a0715=_0x1087a8,_0x400cd8=_0x5a0715(0x569);if(this['_itemData']['rateMP']>=0x0&&this[_0x5a0715(0x297)][_0x5a0715(0x49d)]>=0x0&&!this[_0x5a0715(0x4bc)][_0x400cd8])return![];const _0x111907=this[_0x5a0715(0x256)]();this['drawItemKeyData'](_0x111907,_0x5628ab,_0x2e3f21,_0x116d60,!![]);const _0x345629=this[_0x5a0715(0x451)]();return this[_0x5a0715(0x1d7)](ColorManager[_0x5a0715(0x29c)](0x2)),this[_0x5a0715(0x308)](_0x345629,_0x5628ab,_0x2e3f21,_0x116d60,![],_0x5a0715(0x4ec)),this[_0x5a0715(0x526)](_0x5628ab,_0x2e3f21,_0x116d60),this[_0x5a0715(0x14e)](),!![];},Window_ShopStatus['prototype'][_0x1087a8(0x256)]=function(){const _0x4c8d87=_0x1087a8,_0x5794a7=VisuMZ[_0x4c8d87(0x3a3)]['Settings'][_0x4c8d87(0x241)]['LabelDamageMP'];return _0x5794a7['format'](TextManager['mp']);},Window_ShopStatus['prototype'][_0x1087a8(0x451)]=function(){const _0x6f9fbf=_0x1087a8,_0x56e488=_0x6f9fbf(0x569);if(this[_0x6f9fbf(0x4bc)][_0x56e488])return this['_customItemInfo'][_0x56e488];let _0x5dc721='';if(this[_0x6f9fbf(0x297)][_0x6f9fbf(0x4e9)]<0x0)_0x5dc721+=_0x6f9fbf(0x2fb)[_0x6f9fbf(0x564)](Math[_0x6f9fbf(0x53e)](this['_itemData'][_0x6f9fbf(0x4e9)]*0x64));if(this[_0x6f9fbf(0x297)][_0x6f9fbf(0x4e9)]<0x0&&this[_0x6f9fbf(0x297)][_0x6f9fbf(0x49d)]<0x0)_0x5dc721+='\x20';if(this['_itemData'][_0x6f9fbf(0x49d)]<0x0)_0x5dc721+='%1'[_0x6f9fbf(0x564)](this[_0x6f9fbf(0x297)][_0x6f9fbf(0x49d)]);return _0x5dc721;},Window_ShopStatus[_0x1087a8(0x4d2)][_0x1087a8(0x2df)]=function(_0x290800,_0x38dfce,_0x4f6bf6){const _0x17437c=_0x1087a8,_0x452391='TP\x20DAMAGE';if(this['_itemData']['gainTP']>=0x0&&!this[_0x17437c(0x4bc)][_0x452391])return![];const _0x2da64b=this[_0x17437c(0x3ae)]();this[_0x17437c(0x308)](_0x2da64b,_0x290800,_0x38dfce,_0x4f6bf6,!![]);const _0x5348f0=this['getItemEffectsTpDamageText']();return this[_0x17437c(0x1d7)](ColorManager[_0x17437c(0x250)]()),this[_0x17437c(0x308)](_0x5348f0,_0x290800,_0x38dfce,_0x4f6bf6,![],_0x17437c(0x4ec)),this['drawItemDarkRect'](_0x290800,_0x38dfce,_0x4f6bf6),this[_0x17437c(0x14e)](),!![];},Window_ShopStatus['prototype'][_0x1087a8(0x3ae)]=function(){const _0x25bc31=_0x1087a8,_0x4ee1f6=VisuMZ['ItemsEquipsCore'][_0x25bc31(0x2e7)][_0x25bc31(0x241)][_0x25bc31(0x5d5)];return _0x4ee1f6[_0x25bc31(0x564)](TextManager['tp']);},Window_ShopStatus['prototype'][_0x1087a8(0x4cf)]=function(){const _0x231b8d=_0x1087a8,_0x2a7123=_0x231b8d(0x445);if(this[_0x231b8d(0x4bc)][_0x2a7123])return this[_0x231b8d(0x4bc)][_0x2a7123];let _0x2d7f40='';return _0x2d7f40+='%1'[_0x231b8d(0x564)](this[_0x231b8d(0x297)][_0x231b8d(0x4e1)]),_0x2d7f40;},Window_ShopStatus[_0x1087a8(0x4d2)]['drawItemEffectsAddedStatesBuffs']=function(_0x28b494,_0x417fba,_0x433217){const _0x4b5451=_0x1087a8,_0x208132=_0x4b5451(0x2a9);if(!this[_0x4b5451(0x297)]['addStateBuffChanges']&&!this[_0x4b5451(0x4bc)][_0x208132])return![];const _0x20a1f7=this[_0x4b5451(0x165)]();this[_0x4b5451(0x308)](_0x20a1f7,_0x28b494,_0x417fba,_0x433217,!![]);const _0x31b156=this[_0x4b5451(0x2f3)]();return this[_0x4b5451(0x308)](_0x31b156,_0x28b494,_0x417fba,_0x433217,![],'right'),this['drawItemDarkRect'](_0x28b494,_0x417fba,_0x433217),this[_0x4b5451(0x14e)](),!![];},Window_ShopStatus['prototype'][_0x1087a8(0x165)]=function(){const _0x368744=_0x1087a8;return VisuMZ[_0x368744(0x3a3)]['Settings'][_0x368744(0x241)][_0x368744(0x209)];},Window_ShopStatus['prototype'][_0x1087a8(0x2f3)]=function(){const _0x359d25=_0x1087a8,_0x16dba9=_0x359d25(0x2a9);if(this['_customItemInfo'][_0x16dba9])return this['_customItemInfo'][_0x16dba9];let _0x23d2f0='',_0x8a7388=0x0;const _0xdd0309=0x8;for(const _0x478490 of this[_0x359d25(0x297)][_0x359d25(0x2ab)]){if('PvQUO'!==_0x359d25(0x42d)){const _0x36fc16=$dataStates[_0x478490];if(_0x36fc16&&_0x36fc16['iconIndex']>0x0){_0x23d2f0+=_0x359d25(0x452)[_0x359d25(0x564)](_0x36fc16[_0x359d25(0x3b1)]),_0x8a7388++;if(_0x8a7388>=_0xdd0309)return _0x23d2f0;}}else return this[_0x359d25(0x282)]?this[_0x359d25(0x282)][_0x359d25(0x490)]:0x3;}for(let _0xcc8396=0x0;_0xcc8396<this['_itemData'][_0x359d25(0x19f)][_0x359d25(0x490)];_0xcc8396++){const _0xd01a83=this[_0x359d25(0x297)][_0x359d25(0x19f)][_0xcc8396],_0x1d37ed=Game_BattlerBase[_0x359d25(0x4d2)][_0x359d25(0x399)](_0xd01a83,_0xcc8396);if(_0x1d37ed>0x0){_0x23d2f0+=_0x359d25(0x452)[_0x359d25(0x564)](_0x1d37ed),_0x8a7388++;if(_0x8a7388>=_0xdd0309)return _0x23d2f0;}}return _0x23d2f0;},Window_ShopStatus['prototype'][_0x1087a8(0x3e7)]=function(_0x505f9f,_0x5eb7ec,_0x11f996){const _0x3a02e9=_0x1087a8,_0x529cd8=_0x3a02e9(0x435);if(!this[_0x3a02e9(0x297)]['removeStateBuffChanges']&&!this[_0x3a02e9(0x4bc)][_0x529cd8])return![];const _0x2fb0a5=this['getItemEffectsRemovedStatesBuffsLabel']();this[_0x3a02e9(0x308)](_0x2fb0a5,_0x505f9f,_0x5eb7ec,_0x11f996,!![]);const _0x207ab2=this[_0x3a02e9(0x4ef)]();return this[_0x3a02e9(0x308)](_0x207ab2,_0x505f9f,_0x5eb7ec,_0x11f996,![],_0x3a02e9(0x4ec)),this[_0x3a02e9(0x526)](_0x505f9f,_0x5eb7ec,_0x11f996),this['resetFontSettings'](),!![];},Window_ShopStatus[_0x1087a8(0x4d2)][_0x1087a8(0x18f)]=function(){const _0x449d9a=_0x1087a8;return VisuMZ['ItemsEquipsCore'][_0x449d9a(0x2e7)][_0x449d9a(0x241)][_0x449d9a(0x2de)];},Window_ShopStatus['prototype']['getItemEffectsRemovedStatesBuffsText']=function(){const _0x68dd4c=_0x1087a8,_0x262630=_0x68dd4c(0x435);if(this[_0x68dd4c(0x4bc)][_0x262630])return this['_customItemInfo'][_0x262630];let _0x35ed81='',_0x1a087d=0x0;const _0x32304a=VisuMZ[_0x68dd4c(0x3a3)]['Settings'][_0x68dd4c(0x241)][_0x68dd4c(0x5ba)];for(const _0x30bd39 of this[_0x68dd4c(0x297)]['removeState']){if(_0x68dd4c(0x2dd)!==_0x68dd4c(0x2dd)){const _0x3a1b4d=_0x15ff21['equipTypes']['indexOf'](_0x482abe[_0x68dd4c(0x187)]());if(_0x3a1b4d>0x0)_0x15d841[_0x68dd4c(0x4b6)][_0x68dd4c(0x480)](_0x3a1b4d);}else{const _0x232cff=$dataStates[_0x30bd39];if(_0x232cff&&_0x232cff['iconIndex']>0x0){_0x35ed81+=_0x68dd4c(0x452)['format'](_0x232cff[_0x68dd4c(0x3b1)]),_0x1a087d++;if(_0x1a087d>=_0x32304a)return _0x35ed81;}}}for(let _0x1f2c6d=0x0;_0x1f2c6d<this[_0x68dd4c(0x297)]['removeBuff'][_0x68dd4c(0x490)];_0x1f2c6d++){const _0x486255=Game_BattlerBase['prototype'][_0x68dd4c(0x399)](0x1,_0x1f2c6d);if(_0x486255>0x0){if(_0x68dd4c(0x550)!==_0x68dd4c(0x550))!this[_0x68dd4c(0x5ab)]()&&_0x57227f[_0x68dd4c(0x4d2)][_0x68dd4c(0x3e1)][_0x68dd4c(0x539)](this);else{_0x35ed81+=_0x68dd4c(0x452)[_0x68dd4c(0x564)](_0x486255),_0x1a087d++;if(_0x1a087d>=_0x32304a)return _0x35ed81;}}}for(let _0x455681=0x0;_0x455681<this['_itemData'][_0x68dd4c(0x398)]['length'];_0x455681++){const _0x5eaf0e=Game_BattlerBase[_0x68dd4c(0x4d2)][_0x68dd4c(0x399)](-0x1,_0x455681);if(_0x5eaf0e>0x0){_0x35ed81+=_0x68dd4c(0x452)[_0x68dd4c(0x564)](_0x5eaf0e),_0x1a087d++;if(_0x1a087d>=_0x32304a)return _0x35ed81;}}return _0x35ed81;},Window_ShopStatus['prototype'][_0x1087a8(0x554)]=function(_0x15a733,_0x539457,_0x2b9745){const _0x440716=_0x1087a8;if(this[_0x440716(0x2b2)]['note'][_0x440716(0x4b8)](/<CUSTOM STATUS INFO>\s*([\s\S]*)\s*<\/CUSTOM STATUS INFO>/i)){if(_0x440716(0x4f4)===_0x440716(0x4f4)){const _0x12a9e1=String(RegExp['$1'])[_0x440716(0x2a0)](/[\r\n]+/);for(const _0x6faea6 of _0x12a9e1){if('MxMFp'===_0x440716(0x3f0)){if(_0x6faea6['match'](/(.*):[ ](.*)/i)){const _0x2dc148=String(RegExp['$1'])['trim'](),_0x34a0d7=String(RegExp['$2'])[_0x440716(0x187)]();this[_0x440716(0x501)](_0x2dc148,_0x34a0d7,_0x15a733,_0x539457,_0x2b9745),_0x539457+=this[_0x440716(0x425)]();}}else _0xc9b983=_0x18b5a7[_0x440716(0x3e8)][_0x2f1703(_0x267420['$1'])]||'';}}else return this['isItem'](_0x546002)&&_0x898d6[_0x440716(0x37b)]===0x2;}return this[_0x440716(0x14e)](),_0x539457;},Window_ShopStatus[_0x1087a8(0x4d2)][_0x1087a8(0x501)]=function(_0x4e1be5,_0x2e6091,_0x5c4095,_0x181bce,_0x4ff3a0){const _0xd412a8=_0x1087a8;this[_0xd412a8(0x308)](_0x4e1be5,_0x5c4095,_0x181bce,_0x4ff3a0,!![]),this[_0xd412a8(0x308)](_0x2e6091,_0x5c4095,_0x181bce,_0x4ff3a0,![],'right'),this[_0xd412a8(0x526)](_0x5c4095,_0x181bce,_0x4ff3a0),this[_0xd412a8(0x14e)]();},Window_ShopStatus[_0x1087a8(0x4d2)][_0x1087a8(0x315)]=function(){const _0x36f1e1=_0x1087a8;if(!this['_item'])return;const _0x2f8f5e=this[_0x36f1e1(0x2b2)][_0x36f1e1(0x3c7)],_0x587e00=/<SHOP (?:PICTURE|IMAGE|PICTURE NAME|PICTURE FILENAME|IMAGE NAME|IMAGE FILENAME):[ ](.*)>/gi,_0x5aff70=_0x2f8f5e['match'](_0x587e00);if(_0x5aff70)for(const _0x5a2c47 of _0x5aff70){_0x5a2c47[_0x36f1e1(0x4b8)](_0x587e00);const _0x46b92f=String(RegExp['$1'])['trim']()||'';if(_0x46b92f==='')continue;const _0x1d50b6=ImageManager[_0x36f1e1(0x349)](_0x46b92f);_0x1d50b6[_0x36f1e1(0x509)](this[_0x36f1e1(0x2c9)][_0x36f1e1(0x5c0)](this,_0x1d50b6,this['_item']));}},Window_ShopStatus[_0x1087a8(0x4d2)]['drawCustomShopGraphicLoad']=function(_0x7451ec,_0x2f7be7){const _0x4ccad1=_0x1087a8;if(this[_0x4ccad1(0x2b2)]!==_0x2f7be7)return;if(!_0x7451ec)return;if(_0x7451ec['width']<=0x0||_0x7451ec['height']<=0x0)return;const _0x458e76=_0x2f7be7[_0x4ccad1(0x3c7)];let _0x5d93a3=_0x4ccad1(0x5c4);_0x458e76[_0x4ccad1(0x4b8)](/<SHOP (?:PICTURE|IMAGE) LAYER:[ ]FOREGROUND>/i)&&(_0x5d93a3=_0x4ccad1(0x389));const _0x4675e4=_0x5d93a3===_0x4ccad1(0x5c4)?this[_0x4ccad1(0x473)]:this['contents'];let _0x2633c6=this[_0x4ccad1(0x407)],_0x2e0d05=this[_0x4ccad1(0x35e)];if(_0x458e76[_0x4ccad1(0x4b8)](/<SHOP (?:PICTURE|IMAGE) MAX WIDTH:[ ](\d+)>/i)){if(_0x4ccad1(0x39e)===_0x4ccad1(0x39e))_0x2633c6=Number(RegExp['$1']);else{const _0x151350=new _0x5f5a56(0x0,0x0,_0x274b05[_0x4ccad1(0x16c)],_0x7b75df[_0x4ccad1(0x5cd)]);this[_0x4ccad1(0x38a)]=new _0x436280(_0x151350),this[_0x4ccad1(0x38a)][_0x4ccad1(0x321)]=0x0,this[_0x4ccad1(0x194)](this[_0x4ccad1(0x38a)]),this[_0x4ccad1(0x492)]();}}_0x458e76[_0x4ccad1(0x4b8)](/<SHOP (?:PICTURE|IMAGE) MAX HEIGHT:[ ](\d+)>/i)&&(_0x2e0d05=Number(RegExp['$1']));_0x458e76[_0x4ccad1(0x4b8)](/<SHOP (?:PICTURE|IMAGE) MAX DIMENSIONS:[ ](\d+),[ ]*(\d+)>/i)&&(_0x2633c6=Number(RegExp['$1']),_0x2e0d05=Number(RegExp['$2']));const _0x2bcc30=Math[_0x4ccad1(0x5b7)](0x1,_0x2633c6/_0x7451ec[_0x4ccad1(0x16c)],_0x2e0d05/_0x7451ec['height']);let _0x3bba87=0x0,_0x1b5505=0x0,_0x55f912=Math[_0x4ccad1(0x53e)](_0x7451ec[_0x4ccad1(0x16c)]*_0x2bcc30),_0x287c65=Math[_0x4ccad1(0x53e)](_0x7451ec[_0x4ccad1(0x5cd)]*_0x2bcc30),_0xf06305='center';_0x458e76[_0x4ccad1(0x4b8)](/<SHOP (?:PICTURE|IMAGE) (?:ALIGN|ALIGNMENT):[ ](LEFT|CENTER|RIGHT)>/i)&&(_0xf06305=String(RegExp['$1'])[_0x4ccad1(0x186)]()['trim']());if(_0xf06305===_0x4ccad1(0x27b))_0x3bba87=0x0;else{if(_0xf06305==='center')_0x3bba87=Math['round']((this[_0x4ccad1(0x407)]-_0x55f912)/0x2);else{if(_0x4ccad1(0x57b)===_0x4ccad1(0x2ee))return _0x4ca85d[_0x4ccad1(0x4bb)](_0x4ccad1(0x27b),_0x4ccad1(0x4ec));else _0x3bba87=this[_0x4ccad1(0x407)]-_0x55f912;}}let _0x2299b8='middle';if(_0x458e76['match'](/<SHOP (?:PICTURE|IMAGE) POSITION:[ ](TOP|MIDDLE|BOTTOM)>/i)){if(_0x4ccad1(0x32d)!==_0x4ccad1(0x4d0))_0x2299b8=String(RegExp['$1'])['toLowerCase']()[_0x4ccad1(0x187)]();else return this[_0x4ccad1(0x586)](_0x380a33);}if(_0x2299b8==='top')_0x1b5505=0x0;else _0x2299b8===_0x4ccad1(0x397)?_0x1b5505=Math[_0x4ccad1(0x286)]((this[_0x4ccad1(0x35e)]-_0x287c65)/0x2):_0x1b5505=this[_0x4ccad1(0x35e)]-_0x287c65;_0x458e76[_0x4ccad1(0x4b8)](/<SHOP (?:PICTURE|IMAGE) OFFSET X:[ ]([\+\-]\d+)>/i)&&(_0x3bba87+=Number(RegExp['$1']));_0x458e76[_0x4ccad1(0x4b8)](/<SHOP (?:PICTURE|IMAGE) OFFSET Y:[ ]([\+\-]\d+)>/i)&&(_0x1b5505+=Number(RegExp['$1']));_0x458e76['match'](/<SHOP (?:PICTURE|IMAGE) OFFSET:[ ]([\+\-]\d+),[ ]*([\+\-]\d+)>/i)&&(_0x3bba87+=Number(RegExp['$1']),_0x1b5505+=Number(RegExp['$2']));let _0x5f3e1d=0xff;if(_0x458e76['match'](/<SHOP (?:PICTURE|IMAGE) OPACITY:[ ](\d+)>/i))_0x5f3e1d=Number(RegExp['$1']);else _0x458e76[_0x4ccad1(0x4b8)](/<SHOP (?:PICTURE|IMAGE) OPACITY:[ ](\d+)([%％])>/i)&&(_0x5f3e1d=Math[_0x4ccad1(0x286)](Number(RegExp['$1'])*0.01*0xff)[_0x4ccad1(0x2af)](0x0,0xff));_0x4675e4[_0x4ccad1(0x2bd)]=_0x5f3e1d,_0x4675e4[_0x4ccad1(0x18e)](_0x7451ec,0x0,0x0,_0x7451ec[_0x4ccad1(0x16c)],_0x7451ec[_0x4ccad1(0x5cd)],_0x3bba87,_0x1b5505,_0x55f912,_0x287c65),_0x4675e4['paintOpacity']=0xff;};
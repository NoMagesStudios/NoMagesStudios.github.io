//=============================================================================
// VisuStella MZ - Battle System CTB - Charge Turn Battle
// VisuMZ_2_BattleSystemCTB.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_2_BattleSystemCTB = true;

var VisuMZ = VisuMZ || {};
VisuMZ.BattleSystemCTB = VisuMZ.BattleSystemCTB || {};
VisuMZ.BattleSystemCTB.version = 1.17;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 2] [Version 1.17] [BattleSystemCTB]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Battle_System_-_CTB_VisuStella_MZ
 * @base VisuMZ_0_CoreEngine
 * @base VisuMZ_1_BattleCore
 * @orderAfter VisuMZ_1_BattleCore
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * This plugin creates a Charge Turn Battle (CTB) system using RPG Maker MZ's
 * TPB as a base. CTB functions by calculating the speed of every battler and
 * balancing them relative to one another. When it's a battler's turn, the
 * battler will either choose an action to perform immediately or charge it
 * for later depending if the skill requires charging.
 * 
 * This is a battle system where agility plays an important factor in the
 * progress of battle where higher agility values give battlers more advantage
 * and additional turns over lower agility values, which give battlers less
 * advantage and less turns.
 * 
 * A turn order display will appear to compensate for the removal of gauges.
 * The turn order display will show a preview of what the turn order could
 * possibly be like. This turn order display is variable and can be changed
 * due to player and enemy influence by using different action speeds, effects
 * provided by this plugin that alter the turn order, and more!
 * 
 * *NOTE* To use this battle system, you will need the updated version of
 * VisuStella's Core Engine. Go into its Plugin Parameters and change the
 * "Battle System" plugin parameter to "ctb".
 *
 * Features include all (but not limited to) the following:
 * 
 * * Full control over the TPB integrated mechanics converted for CTB such as
 *   speed, calculations, etc.
 * * No more waiting for gauges to show up! In fact, you won't even see the
 *   TPB gauge in-game.
 * * A turn order display that previews a potential lineup for how the
 *   participating battlers in battle will play out.
 * * Notetags that give skills and items access to manipulating a battler's
 *   CTB speed.
 * * Notetags that give skills and items access to directly manipulate a target
 *   batter's position on the Turn Order display.
 * * These mechanics are separate from ATB and TPB itself, so you can still use
 *   either battle system without affecting both of them.
 * * Through the Core Engine, you can switch in and out of CTB for a different
 *   battle system.
 *
 * ============================================================================
 * Requirements
 * ============================================================================
 *
 * This plugin is made for RPG Maker MZ. This will not work in other iterations
 * of RPG Maker.
 *
 * ------ Required Plugin List ------
 *
 * * VisuMZ_0_CoreEngine
 * * VisuMZ_1_BattleCore
 *
 * This plugin requires the above listed plugins to be installed inside your
 * game's Plugin Manager list in order to work. You cannot start your game with
 * this plugin enabled without the listed plugins.
 *
 * ------ Tier 2 ------
 *
 * This plugin is a Tier 2 plugin. Place it under other plugins of lower tier
 * value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
 * that your plugins will have the best compatibility with the rest of the
 * VisuStella MZ library.
 * 
 * *NOTE* To use this battle system, you will need the updated version of
 * VisuStella's Core Engine. Go into its Plugin Parameters and change the
 * "Battle System" plugin parameter to "ctb".
 *
 * ============================================================================
 * Major Changes
 * ============================================================================
 *
 * This plugin adds some new hard-coded features to RPG Maker MZ's functions.
 * The following is a list of them.
 *
 * ---
 * 
 * Turn Order Display
 * 
 * Despite the fact that the Battle System CTB plugin uses RPG Maker MZ's TPB
 * as a base, it does not have any gauges to depict the time it takes for a
 * battler's turn to appear. Instead, a turn order display appears on the
 * screen (you pick where it can appear: top, bottom, left, or right) and shows
 * a possible preview of the battler turn order.
 * 
 * This is only a preview of what can happen because lots of different things
 * can influence the position and ordering of the turn order display, ranging
 * from skill/item speeds, notetag effects, changes in AGI, etc. What is seen
 * on the turn order display is the most likely possibility instead of the
 * exact order to occur due to the external influences.
 * 
 * ---
 * 
 * Skill & Item Speeds
 * 
 * With TPB, skills and items with negative speed values will cause the battler
 * to enter a "casting" state, meaning they have to wait extra time before the
 * action takes off. With this delayed action execution, one might assume that
 * if there is a positive speed value, the battler would require less time for
 * their next turn.
 * 
 * However, this isn't the case with RPG Maker MZ's TPB. By changing it to CTB,
 * skills and items with positive speed values will have an impact on how full
 * their CTB Speed will be in the following turn. A value of 2000 will put the
 * turn at 50% ready, 1000 will put the gauge at 25% ready, 500 will put it at
 * 12.5% ready, and so on. Notetags can also be used to influence this.
 * 
 * ---
 * 
 * JS Calculation Mechanics
 * 
 * While the calculation mechanics aren't changed from their original RPG Maker
 * MZ formulas, the functions for them have been overwritten to allow you, the
 * game developer, to alter them as you see fit.
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
 * ---
 * 
 * === General CTB-Related Notetags ===
 * 
 * These notetags are general purpose notetags that have became available
 * through this plugin.
 * 
 * ---
 * 
 * <CTB Help>
 *  description
 *  description
 * </CTB Help>
 *
 * - Used for: Skill, Item Notetags
 * - If your game happens to support the ability to change battle systems, this
 *   notetag lets you change how the skill/item's help description text will
 *   look under CTB.
 * - This is primarily used if the skill behaves differently in CTB versus any
 *   other battle system.
 * - Replace 'description' with help text that's only displayed if the game's
 *   battle system is set to CTB.
 *
 * ---
 * 
 * === CTB Turn Order Display-Related Notetags ===
 * 
 * These notetags affect the CTB Turn Order Display
 * 
 * ---
 *
 * <CTB Turn Order Icon: x>
 *
 * - Used for: Actor, Enemy Notetags
 * - Changes the slot graphic used for the battler to a specific icon.
 * - Replace 'x' with the icon index to be used.
 * 
 * ---
 *
 * <CTB Turn Order Face: filename, index>
 *
 * - Used for: Actor, Enemy Notetags
 * - Changes the slot graphic used for the enemy to a specific face.
 * - Replace 'filename' with the filename of the image.
 *   - Do not include the file extension.
 * - Replace 'index' with the index of the face. Index values start at 0.
 * - Example: <CTB Turn Order Face: Monster, 1>
 * 
 * ---
 * 
 * === CTB Speed Manipulation-Related Notetags ===
 * 
 * These notetags are used for CTB Speed manipulation purposes.
 * 
 * ---
 *
 * <CTB Set Order: x>
 *
 * - Used for: Skill, Item Notetags
 * - Sets the target's CTB Turn Order position to exactly x.
 * - Replace 'x' with a number value depicting the exact position of the turn
 *   order position. 0 is the currently active battler and cannot be used.
 *   1 is closest to taking a turn. Higher numbers are further away.
 * - This does not affect the currently active battler.
 *
 * ---
 *
 * <CTB Change Order: +x>
 * <CTB Change Order: -x>
 *
 * - Used for: Skill, Item Notetags
 * - Sets the target's CTB Turn Order position by x slots.
 * - Replace 'x' with a number value indicating the increase or decrease.
 *   Negative values decrease the turns needed to wait while positive values
 *   increase the turns needed.
 * - This does not affect the currently active battler.
 *
 * ---
 *
 * <CTB After Speed: x%>
 *
 * - Used for: Skill, Item Notetags
 * - After using the skill/item, the user's CTB Speed will be set to x%.
 * - Replace 'x' with a percentile value representing the amount you want the
 *   CTB Speed to reset to after the skill/item's usage.
 * 
 * ---
 * 
 * <CTB Charge Speed: x%>
 * <CTB Charge Speed: +x%>
 * <CTB Charge Speed: -x%>
 *
 * - Used for: Skill, Item Notetags
 * - If the target is in a charging state, change the target's speed amount to
 *   x% or by x% (if using the +/- variants).
 * - Replace 'x' with a percentile value representing the amount of the CTB
 *   Speed you wish to alter it to/by.
 * - This only affects targets who are in a charging state.
 * 
 * ---
 * 
 * <CTB Cast Speed: x%>
 * <CTB Cast Speed: +x%>
 * <CTB Cast Speed: -x%>
 *
 * - Used for: Skill, Item Notetags
 * - If the target is in a casting state, change the target's speed amount to
 *   x% or by x% (if using the +/- variants).
 * - Replace 'x' with a percentile value representing the amount of the CTB
 *   Speed you wish to alter it to/by.
 * - This only affects targets who are in a casting state.
 * 
 * ---
 * 
 * === JavaScript Notetags: CTB Speed Manipulation ===
 *
 * The following are notetags made for users with JavaScript knowledge to
 * give more control over conditional CTB Speed Manipulation.
 * 
 * ---
 * 
 * <JS CTB Order>
 *  code
 *  code
 *  order = code;
 * </JS CTB Order>
 *
 * - Used for: Skill, Item Notetags
 * - Replace 'code' with JavaScript code to determine where to set the target's
 *   order on the CTB Turn Order Display to.
 * - The 'order' variable represents the final position on the Turn Order
 *   Display to place the target.
 * - The 'position' variable represents the target's current position on the
 *   Turn Order Display.
 * - This does not affect the currently active battler.
 * 
 * ---
 * 
 * <JS CTB Charge Speed>
 *  code
 *  code
 *  rate = code;
 * </JS CTB Charge Speed>
 *
 * - Used for: Skill, Item Notetags
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   CTB Speed to if the target is in a charging state.
 * - The 'rate' variable represents rate value the CTB Speed will change to
 *   between the values of 0 and 1.
 * - The 'rate' variable will default to the target's current CTB Speed rate
 *   if the target is in a charging state.
 * 
 * ---
 * 
 * <JS CTB Cast Speed>
 *  code
 *  code
 *  rate = code;
 * </JS CTB Cast Speed>
 *
 * - Used for: Skill, Item Notetags
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   CTB Speed to if the target is in a casting state.
 * - The 'rate' variable represents rate value the CTB Speed will change to
 *   between the values of 0 and 1.
 * - The 'rate' variable will default to the target's current CTB Speed rate
 *   if the target is in a casting state.
 * 
 * ---
 * 
 * <JS CTB After Speed>
 *  code
 *  code
 *  rate = code;
 * </JS CTB After Speed>
 *
 * - Used for: Skill, Item Notetags
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   CTB Speed to after performing this skill/item action.
 * - The 'rate' variable represents rate value the CTB Speed will change to
 *   between the values of 0 and 1.
 * - The 'rate' variable will default to 0.
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
 * Actor: Change CTB Turn Order Icon
 * - Changes the icons used for the specific actor(s) on the CTB Turn Order.
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 *
 *   Icon:
 *   - Changes the graphic to this icon.
 *
 * ---
 * 
 * Actor: Change CTB Turn Order Face
 * - Changes the faces used for the specific actor(s) on the CTB Turn Order.
 * 
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 * 
 *   Face Name:
 *   - This is the filename for the target face graphic.
 * 
 *   Face Index:
 *   - This is the index for the target face graphic.
 * 
 * ---
 *
 * Actor: Clear CTB Turn Order Graphic
 * - Clears the CTB Turn Order graphics for the actor(s).
 * - The settings will revert to the Plugin Parameter settings.
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 *
 * ---
 * 
 * === Enemy Plugin Commands ===
 * 
 * ---
 *
 * Enemy: Change CTB Turn Order Icon
 * - Changes the icons used for the specific enemy(ies) on the CTB Turn Order.
 *
 *   Enemy Index(es):
 *   - Select which enemy index(es) to affect.
 *
 *   Icon:
 *   - Changes the graphic to this icon.
 *
 * ---
 *
 * Enemy: Change CTB Turn Order Face
 * - Changes the faces used for the specific enemy(ies) on the CTB Turn Order.
 *
 *   Enemy Index(es):
 *   - Select which enemy index(es) to affect.
 *
 *   Face Name:
 *   - This is the filename for the target face graphic.
 *
 *   Face Index:
 *   - This is the index for the target face graphic.
 *
 * ---
 *
 * Enemy: Clear CTB Turn Order Graphic
 * - Clears the CTB Turn Order graphics for the enemy(ies).
 * - The settings will revert to the Plugin Parameter settings.
 *
 *   Enemy Index(es):
 *   - Select which enemy index(es) to affect.
 *
 * ---
 * 
 * === System Plugin Commands ===
 * 
 * ---
 * 
 * System: CTB Turn Order Visibility
 * - Determine the visibility of the CTB Turn Order Display.
 * 
 *   Visibility:
 *   - Changes the visibility of the CTB Turn Order Display.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Mechanics Settings
 * ============================================================================
 *
 * Mechanics settings used for Battle System CTB. The majority of these are
 * JavaScript-based and will require knowledge of JavaScript to fully utilize
 * the plugin parameters.
 *
 * ---
 *
 * General
 * 
 *   Device Friendly:
 *   - Make the calculations more device friendly?
 *   - Or make it for desktop at full strength?
 * 
 *   Escape Fail Penalty:
 *   - Gauge penalty if an escape attempt fails.
 *
 * ---
 *
 * JavaScript
 * 
 *   JS: Initial Speed:
 *   - JavaScript code to determine how much speed to give each battler at the
 *     start of battle.
 * 
 *   JS: Speed:
 *   - JavaScript code to determine how much speed a battler has.
 * 
 *   JS: Base Speed:
 *   - JavaScript code to determine how much base speed a battler has.
 * 
 *   JS: Relative Speed:
 *   - JavaScript code to determine what is the relative speed of a battler.
 * 
 *   JS: Acceleration:
 *   - JavaScript code to determine how much gauges accelerate by relative to
 *     reference time.
 * 
 *   JS: Cast Time:
 *   - JavaScript code to determine how much cast time is used for skills/items
 *     with negative speed modifiers.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Order Change Effects Settings
 * ============================================================================
 * 
 * Whenever the turn order a battler is changed by a CTB Order notetag, play
 * these effects on the target battler. These effects do not play if the order
 * was changed due to speed changes and only through the specific notetags.
 *
 * ---
 *
 * Delay Turn Order > Animation
 * 
 *   Animation ID:
 *   - Play this animation when the effect activates.
 *   - Occurs when the turn order is delayed.
 * 
 *   Mirror Animation:
 *   - Mirror the effect animation?
 *   - Occurs when the turn order is delayed.
 * 
 *   Mute Animation:
 *   - Mute the effect animation?
 *   - Occurs when the turn order is delayed.
 *
 * ---
 *
 * Delay Turn Order > Popups
 * 
 *   Text:
 *   - Text displayed upon the effect activating.
 *   - Occurs when the turn order is delayed.
 * 
 *   Text Color:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Flash Color:
 *   - Adjust the popup's flash color.
 *   - Format: [red, green, blue, alpha]
 * 
 *   Flash Duration:
 *   - What is the frame duration of the flash effect?
 *
 * ---
 *
 * Rush Turn Order > Animation
 * 
 *   Animation ID:
 *   - Play this animation when the effect activates.
 *   - Occurs when the turn order is rushed.
 * 
 *   Mirror Animation:
 *   - Mirror the effect animation?
 *   - Occurs when the turn order is rushed.
 * 
 *   Mute Animation:
 *   - Mute the effect animation?
 *   - Occurs when the turn order is rushed.
 *
 * ---
 *
 * Rush Turn Order > Popups
 * 
 *   Text:
 *   - Text displayed upon the effect activating.
 *   - Occurs when the turn order is rushed.
 * 
 *   Text Color:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Flash Color:
 *   - Adjust the popup's flash color.
 *   - Format: [red, green, blue, alpha]
 * 
 *   Flash Duration:
 *   - What is the frame duration of the flash effect?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Turn Order Display Settings
 * ============================================================================
 *
 * Turn Order Display settings used for Battle System CTB. These adjust how the
 * visible turn order appears in-game.
 *
 * ---
 *
 * General
 * 
 *   Display Position:
 *   - Select where the Turn Order will appear on the screen.
 * 
 *     Offset X:
 *     - How much to offset the X coordinate by.
 *     - Negative: left. Positive: right.
 * 
 *     Offset Y:
 *     - How much to offset the Y coordinate by.
 *     - Negative: up. Positive: down.
 * 
 *   Reposition for Help?:
 *   - If the display position is at the top, reposition the display when the
 *     help window is open?
 * 
 *   Reposition Log?:
 *   - If the display position is at the top, reposition the Battle Log Window
 *     to be lower?
 * 
 *   Forward Direction:
 *   - Decide on the direction of the Turn Order.
 *   - Settings may vary depending on position.
 *   - Left to Right / Down to Up
 *   - Right to Left / Up to Down
 * 
 *   Subject Distance:
 *   - How far do you want the currently active battler to distance itself from
 *     the rest of the Turn Order?
 * 
 *   Screen Buffer:
 *   - What distance do you want the display to be away from the edge of the
 *     screen by?
 *
 * ---
 *
 * Reposition For Help
 * 
 *   Repostion X By:
 *   Repostion Y By:
 *   - Reposition the display's coordinates by this much when the Help Window
 *     is visible.
 *
 * ---
 *
 * Slots
 * 
 *   Total Horizontal:
 *   - How many slots do you want to display for top and bottom Turn Order
 *     Display positions?
 * 
 *   Total Vertical:
 *   - How many slots do you want to display for left and right Turn Order
 *     Display positions?
 * 
 *   Length:
 *   - How many pixels long should the slots be on the Turn Order display?
 * 
 *   Thin:
 *   - How many pixels thin should the slots be on the Turn Order display?
 * 
 *   Update Frames:
 *   - How many frames should it take for the slots to update their
 *     positions by?
 *
 * ---
 *
 * Slot Border
 * 
 *   Show Border?:
 *   - Show borders for the slot sprites?
 * 
 *   Border Thickness:
 *   - How many pixels thick should the colored portion of the border be?
 * 
 *   Actors
 *   Enemies
 * 
 *     Border Color:
 *     - Use #rrggbb for custom colors or regular numbers for text colors
 *       from the Window Skin.
 * 
 *     Border Skin:
 *     - Optional. Place a skin on the actor/enemy borders instead of
 *       rendering them?
 *
 * ---
 *
 * Slot Sprites
 * 
 *   Actors
 * 
 *     Sprite Type:
 *     - Select the type of sprite used for the actor graphic.
 *     - Face Graphic - Show the actor's face.
 *     - Icon - Show a specified icon.
 *     - Sideview Actor - Show the actor's sideview battler.
 * 
 *     Default Icon:
 *     - Which icon do you want to use for actors by default?
 * 
 *   Enemies
 * 
 *     Sprite Type:
 *     - Select the type of sprite used for the enemy graphic.
 *     - Face Graphic - Show a specified face graphic.
 *     - Icon - Show a specified icon.
 *     - Enemy - Show the enemy's graphic or sideview battler.
 * 
 *     Default Face Name:
 *     - Use this default face graphic if there is no specified face.
 * 
 *     Default Face Index:
 *     - Use this default face index if there is no specified index.
 * 
 *     Default Icon:
 *     - Which icon do you want to use for enemies by default?
 * 
 *     Match Hue?:
 *     - Match the hue for enemy battlers?
 *     - Does not apply if there's a sideview battler.
 *
 * ---
 *
 * Slot Letter
 * 
 *   Show Enemy Letter?:
 *   - Show the enemy's letter on the slot sprite?
 * 
 *   Font Name:
 *   - The font name used for the text of the Letter.
 *   - Leave empty to use the default game's font.
 * 
 *   Font Size:
 *   - The font size used for the text of the Letter.
 *
 * ---
 *
 * Slot Background
 * 
 *   Show Background?:
 *   - Show the background on the slot sprite?
 * 
 *   Actors
 *   Enemies
 * 
 *     Background Color 1:
 *     Background Color 2:
 *     - Use #rrggbb for custom colors or regular numbers for text colors
 *       from the Window Skin.
 * 
 *     Background Skin:
 *     - Optional. Use a skin for the actor background instead of
 *       rendering them?
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
 * 7. If this VisuStella MZ plugin is a paid product, all project team members
 * must purchase their own individual copies of the paid product if they are to
 * use it. Usage includes working on related game mechanics, managing related
 * code, and/or using related Plugin Commands and features. Redistribution of
 * the plugin and/or its code to other members of the team is NOT allowed
 * unless they own the plugin itself as that conflicts with Article 4.
 * 
 * 8. Any extensions and/or addendums made to this plugin's Terms of Use can be
 * found on VisuStella.com and must be followed.
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
 * Version 1.17: May 5, 2022
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.16: April 28, 2022
 * * Feature Update!
 * ** Added update for CTB-specific idle time to allow a more consistent turn
 *    end processing for actors and enemies with higher than normal AGI values.
 *    Update made by Olivia.
 * 
 * Version 1.15: April 21, 2022
 * * Bug Fixes!
 * ** The endless softlock has been fixed! Much thanks to AndyL for providing a
 *    project that can easily replicate it! Fix made by Yanfly.
 * * Feature Update!
 * ** Slightly more accurate turn order forecasting. However, there is only so
 *    much I can do due to JavaScript's "accuracy" with decimal values. Update
 *    made by Yanfly.
 * 
 * Version 1.14: March 31, 2022
 * * Feature Update!
 * ** Updated anti-softlock check at 180 frames (3 seconds) to automatically
 *    clear any battle states to see if they're the cause of the hangup.
 * ** Updated anti-softlock check at 300 frames (5 seconds) to automatically
 *    clear all states to see if they're the cause of the hangup.
 * ** Updated anti-softlock check at 600 frames (10 seconds) to automatically
 *    abort the battle to salvage the game from freezing.
 * 
 * Version 1.13: March 3, 2022
 * * Feature Update!
 * ** Reserved common events for non-action sequence skills now function
 *    separately from one another when used by a battler with Action Times+.
 *    Update made by Olivia.
 * 
 * Version 1.12: February 17, 2022
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.11: October 28, 2021
 * * Bug Fixes!
 * ** Turn Order display will no longer appear at differing X and Y positions
 *    when using specific battle layouts. Update made by Olivia.
 * 
 * Version 1.10: June 18, 2021
 * * Bug Fixes!
 * ** Fixed turn order icon reappearing for a dying battler. Fix made by Irina.
 * * Documentation Update!
 * ** Help file updated with new features.
 * * New Features!
 * ** New Plugin Parameters added by Arisu!
 * *** Plugin Parameters > Mechanics > General > Device Friendly
 * **** Make the calculations more device friendly? Or make it for desktop at
 *      full strength?
 * 
 * Version 1.09: June 11, 2021
 * * Bug Fixes!
 * ** Plugin Command: "Enemy: Change CTB Turn Order Face" should now properly
 *    change to the correct face index. Fix made by Arisu.
 * 
 * Version 1.08: April 23, 2021
 * * Feature Update!
 * ** When using 100% for After Speed notetag, no other battler is able to
 *    interrupt the action. Update made by Olivia.
 * 
 * Version 1.07: March 19, 2021
 * * Feature Update!
 * ** Turn Order Window calculations slightly tweaked for times when the window
 *    layer is bigger than it should be. Update made by Olivia.
 * 
 * Version 1.06: January 22, 2021
 * * Feature Update!
 * ** A different kind of end battle check is now made to determine hiding the
 *    turn order display. Update made by Olivia.
 * ** Added in a built-in anti-softlock check.
 * 
 * Version 1.05: January 1, 2021
 * * Compatibility Update
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.04: November 15, 2020
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.03: November 1, 2020
 * * Documentation Update!
 * ** Help file updated with new features.
 * * Optimization Update!
 * ** Uses less resources for turn order display.
 * * New Features!
 * ** New Plugin Command by Irina!
 * *** Actor: Change CTB Turn Order Face
 * **** Changes the faces used for the specific actor(s) on the CTB Turn Order.
 * 
 * Version 1.02: October 25, 2020
 * * Bug Fixes!
 * ** Turn Order icons no longer stay invisible after rotating out completely.
 *    Fix made by Irina.
 * * Documentation Update!
 * ** Help file updated with new features.
 * * Feature Update!
 * ** <CTB Turn Order Face: filename, index> notetag now works with actors.
 *    Update made by Irina.
 * 
 * Version 1.01: October 18, 2020
 * * Bug Fixes!
 * ** Action times + should no longer freeze the game. Fix made by Yanfly.
 * ** Actors and enemies without actions will no longer softlock the game.
 *    Fix made by Yanfly.
 * ** Auto-battle during CTB should no longer lock the game! Fix by Yanfly.
 * ** Enemies without any actions should no longer cause endless loops.
 *    Fix made by Yanfly.
 * ** SV_Actor graphics on the Turn Order display are now centered.
 *    Fix made by Yanfly.
 *
 * Version 1.00 Official Release: October 19, 2020
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command CtbTurnOrderActorIcon
 * @text Actor: Change CTB Turn Order Icon
 * @desc Changes the icons used for the specific actor(s) on the CTB Turn Order.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @arg IconIndex:num
 * @text Icon
 * @desc Changes the graphic to this icon.
 * @default 84
 *
 * @ --------------------------------------------------------------------------
 *
 * @command CtbTurnOrderActorFace
 * @text Actor: Change CTB Turn Order Face
 * @desc Changes the faces used for the specific actor(s) on the CTB Turn Order.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @arg FaceName:str
 * @text Face Name
 * @type file
 * @dir img/faces/
 * @desc This is the filename for the target face graphic.
 * @default Actor1
 *
 * @arg FaceIndex:num
 * @text Face Index
 * @type number
 * @desc This is the index for the target face graphic.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command CtbTurnOrderClearActorGraphic
 * @text Actor: Clear CTB Turn Order Graphic
 * @desc Clears the CTB Turn Order graphics for the actor(s).
 * The settings will revert to the Plugin Parameter settings.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command CtbTurnOrderEnemyIcon
 * @text Enemy: Change CTB Turn Order Icon
 * @desc Changes the icons used for the specific enemy(ies) on the CTB Turn Order.
 *
 * @arg Enemies:arraynum
 * @text Enemy Index(es)
 * @type number[]
 * @desc Select which enemy index(es) to affect.
 * @default ["1"]
 *
 * @arg IconIndex:num
 * @text Icon
 * @desc Changes the graphic to this icon.
 * @default 298
 *
 * @ --------------------------------------------------------------------------
 *
 * @command CtbTurnOrderEnemyFace
 * @text Enemy: Change CTB Turn Order Face
 * @desc Changes the faces used for the specific enemy(ies) on the CTB Turn Order.
 *
 * @arg Enemies:arraynum
 * @text Enemy Index(es)
 * @type number[]
 * @desc Select which enemy index(es) to affect.
 * @default ["1"]
 *
 * @arg FaceName:str
 * @text Face Name
 * @parent EnemySprite
 * @type file
 * @dir img/faces/
 * @desc This is the filename for the target face graphic.
 * @default Monster
 *
 * @arg FaceIndex:num
 * @text Face Index
 * @parent EnemySprite
 * @type number
 * @desc This is the index for the target face graphic.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command CtbTurnOrderClearEnemyGraphic
 * @text Enemy: Clear CTB Turn Order Graphic
 * @desc Clears the CTB Turn Order graphics for the enemy(ies).
 * The settings will revert to the Plugin Parameter settings.
 *
 * @arg Enemies:arraynum
 * @text Enemy Index(es)
 * @type number[]
 * @desc Select which enemy index(es) to affect.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemTurnOrderVisibility
 * @text System: CTB Turn Order Visibility
 * @desc Determine the visibility of the CTB Turn Order Display.
 *
 * @arg Visible:eval
 * @text Visibility
 * @type boolean
 * @on Visible
 * @off Hidden
 * @desc Changes the visibility of the CTB Turn Order Display.
 * @default true
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
 * @param BattleSystemCTB
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Mechanics:struct
 * @text Mechanics Settings
 * @type struct<Mechanics>
 * @desc Mechanics settings used for Battle System CTB.
 * @default {"General":"","EscapeFailPenalty:num":"-1.00","JavaScript":"","InitialGaugeJS:str":"Math.random() * 0.50","TpbSpeedCalcJS:func":"\"// Declare Constants\\nconst user = this;\\n\\n// Process Calculation\\nlet speed = Math.sqrt(user.agi) + 1;\\n\\n// Return Value\\nreturn speed;\"","TpbBaseSpeedCalcJS:func":"\"// Declare Constants\\nconst user = this;\\nconst baseAgility = user.paramBasePlus(6);\\n\\n// Process Calculation\\nlet speed = Math.sqrt(baseAgility) + 1;\\n\\n// Return Value\\nreturn speed;\"","BattlerRelativeSpeedJS:func":"\"// Declare Constants\\nconst user = this;\\nconst speed = user.tpbSpeed()\\nconst partyBaseSpeed = $gameParty.tpbBaseSpeed();\\n\\n// Process Calculation\\nlet relativeSpeed = speed / partyBaseSpeed;\\n\\n// Return Value\\nreturn relativeSpeed;\"","TpbAccelerationJS:func":"\"// Declare Constants\\nconst user = this;\\nconst speed = user.tpbRelativeSpeed();\\nconst referenceTime = $gameParty.tpbReferenceTime();\\n\\n// Process Calculation\\nlet acceleration = speed / referenceTime;\\n\\n// Return Value\\nreturn acceleration;\"","TpbCastTimeJS:func":"\"// Declare Constants\\nconst user = this;\\nconst actions = user._actions.filter(action => action.isValid());\\nconst items = actions.map(action => action.item());\\nconst delay = items.reduce((r, item) => r + Math.max(0, -item.speed), 0);\\n\\n// Process Calculation\\nlet time = Math.sqrt(delay) / user.tpbSpeed();\\n\\n// Return Value\\nreturn time;\""}
 *
 * @param Effect:struct
 * @text Order Change Effects
 * @type struct<Effect>
 * @desc Effects to play when the Turn Order is changed in CTB.
 * @default {"Delay":"","DelayAnimation":"","DelayAnimationID:num":"54","DelayMirror:eval":"false","DelayMute:eval":"false","DelayPopups":"","DelayPopupText:str":"DELAY","DelayTextColor:str":"25","DelayFlashColor:eval":"[255, 0, 0, 160]","DelayFlashDuration:num":"60","Rush":"","RushAnimation":"","RushAnimationID:num":"51","RushMirror:eval":"false","RushMute:eval":"false","RushPopups":"","RushPopupText:str":"RUSH","RushTextColor:str":"24","RushFlashColor:eval":"[0, 255, 0, 160]","RushFlashDuration:num":"60"}
 *
 * @param TurnOrder:struct
 * @text Turn Order Display
 * @type struct<TurnOrder>
 * @desc Turn Order Display settings used for Battle System CTB.
 * @default {"General":"","DisplayPosition:str":"top","DisplayOffsetX:num":"0","DisplayOffsetY:num":"0","RepositionTopForHelp:eval":"true","RepositionLogWindow:eval":"true","OrderDirection:eval":"true","SubjectDistance:num":"8","ScreenBuffer:num":"20","Reposition":"","RepositionTopHelpX:num":"0","RepositionTopHelpY:num":"96","Slots":"","TotalHorzSprites:num":"16","TotalVertSprites:num":"10","SpriteLength:num":"72","SpriteThin:num":"36","UpdateFrames:num":"24","Border":"","ShowMarkerBorder:eval":"true","BorderActor":"","ActorBorderColor:str":"4","ActorSystemBorder:str":"","BorderEnemy":"","EnemyBorderColor:str":"2","EnemySystemBorder:str":"","BorderThickness:num":"2","Sprite":"","ActorSprite":"","ActorBattlerType:str":"face","ActorBattlerIcon:num":"84","EnemySprite":"","EnemyBattlerType:str":"enemy","EnemyBattlerFaceName:str":"Monster","EnemyBattlerFaceIndex:num":"1","EnemyBattlerIcon:num":"298","EnemyBattlerMatchHue:eval":"true","Letter":"","EnemyBattlerDrawLetter:eval":"true","EnemyBattlerFontFace:str":"","EnemyBattlerFontSize:num":"16","Background":"","ShowMarkerBg:eval":"true","BackgroundActor":"","ActorBgColor1:str":"19","ActorBgColor2:str":"9","ActorSystemBg:str":"","BackgroundEnemy":"","EnemyBgColor1:str":"19","EnemyBgColor2:str":"18","EnemySystemBg:str":""}
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
 * Mechanics Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Mechanics:
 *
 * @param General
 *
 * @param DeviceFriendly:eval
 * @text Device Friendly
 * @parent General
 * @type boolean
 * @on Device Friendly
 * @off For Desktops
 * @desc Make the calculations more device friendly?
 * Or make it for desktop at full strength?
 * @default false
 * 
 * @param EscapeFailPenalty:num
 * @text Escape Fail Penalty
 * @parent General
 * @desc Gauge penalty if an escape attempt fails.
 * @default -1.00
 *
 * @param JavaScript
 *
 * @param InitialGaugeJS:str
 * @text JS: Initial Speed
 * @parent JavaScript
 * @desc JavaScript code to determine how much speed to give
 * each battler at the start of battle.
 * @default Math.random() * 0.5
 *
 * @param TpbSpeedCalcJS:func
 * @text JS: Speed
 * @parent JavaScript
 * @type note
 * @desc JavaScript code to determine how much speed a battler has.
 * @default "// Declare Constants\nconst user = this;\n\n// Process Calculation\nlet speed = Math.sqrt(user.agi) + 1;\n\n// Return Value\nreturn speed;"
 * 
 * @param TpbBaseSpeedCalcJS:func
 * @text JS: Base Speed
 * @parent JavaScript
 * @type note
 * @desc JavaScript code to determine how much base speed a battler has.
 * @default "// Declare Constants\nconst user = this;\nconst baseAgility = user.paramBasePlus(6);\n\n// Process Calculation\nlet speed = Math.sqrt(baseAgility) + 1;\n\n// Return Value\nreturn speed;"
 * 
 * @param BattlerRelativeSpeedJS:func
 * @text JS: Relative Speed
 * @parent JavaScript
 * @type note
 * @desc JavaScript code to determine what is the relative speed of a battler.
 * @default "// Declare Constants\nconst user = this;\nconst speed = user.tpbSpeed()\nconst partyBaseSpeed = $gameParty.tpbBaseSpeed();\n\n// Process Calculation\nlet relativeSpeed = speed / partyBaseSpeed;\n\n// Return Value\nreturn relativeSpeed;"
 * 
 * @param TpbAccelerationJS:func
 * @text JS: Acceleration
 * @parent JavaScript
 * @type note
 * @desc JavaScript code to determine how much gauges accelerate by relative to reference time.
 * @default "// Declare Constants\nconst user = this;\nconst speed = user.tpbRelativeSpeed();\nconst referenceTime = $gameParty.tpbReferenceTime();\n\n// Process Calculation\nlet acceleration = speed / referenceTime;\n\n// Return Value\nreturn acceleration;"
 * 
 * @param TpbCastTimeJS:func
 * @text JS: Cast Time
 * @parent JavaScript
 * @type note
 * @desc JavaScript code to determine how much cast time is used for skills/items with negative speed modifiers.
 * @default "// Declare Constants\nconst user = this;\nconst actions = user._actions.filter(action => action.isValid());\nconst items = actions.map(action => action.item());\nconst delay = items.reduce((r, item) => r + Math.max(0, -item.speed), 0);\n\n// Process Calculation\nlet time = Math.sqrt(delay) / user.tpbSpeed();\n\n// Return Value\nreturn time;"
 * 
 */
/* ----------------------------------------------------------------------------
 * Effect Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Effect:
 *
 * @param Delay
 * @text Delay Turn Order
 * 
 * @param DelayAnimation
 * @text Animation
 * @parent Delay
 *
 * @param DelayAnimationID:num
 * @text Animation ID
 * @parent DelayAnimation
 * @type animation
 * @desc Play this animation when the effect activates.
 * Occurs when the turn order is delayed.
 * @default 54
 *
 * @param DelayMirror:eval
 * @text Mirror Animation
 * @parent DelayAnimation
 * @type boolean
 * @on Mirror
 * @off Normal
 * @desc Mirror the effect animation?
 * Occurs when the turn order is delayed.
 * @default false
 *
 * @param DelayMute:eval
 * @text Mute Animation
 * @parent DelayAnimation
 * @type boolean
 * @on Mute
 * @off Normal
 * @desc Mute the effect animation?
 * Occurs when the turn order is delayed.
 * @default false
 *
 * @param DelayPopups
 * @text Popups
 * @parent Delay
 *
 * @param DelayPopupText:str
 * @text Text
 * @parent DelayPopups
 * @desc Text displayed upon the effect activating.
 * Occurs when the turn order is delayed.
 * @default DELAY
 *
 * @param DelayTextColor:str
 * @text Text Color
 * @parent DelayPopups
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 25
 *
 * @param DelayFlashColor:eval
 * @text Flash Color
 * @parent DelayPopups
 * @desc Adjust the popup's flash color.
 * Format: [red, green, blue, alpha]
 * @default [255, 0, 0, 160]
 * 
 * @param DelayFlashDuration:num
 * @text Flash Duration
 * @parent DelayPopups
 * @type number
 * @desc What is the frame duration of the flash effect?
 * @default 60
 *
 * @param Rush
 * @text Rush Turn Order
 * 
 * @param RushAnimation
 * @text Animation
 * @parent Rush
 *
 * @param RushAnimationID:num
 * @text Animation ID
 * @parent RushAnimation
 * @type animation
 * @desc Play this animation when the effect activates.
 * Occurs when the turn order is rushed.
 * @default 51
 *
 * @param RushMirror:eval
 * @text Mirror Animation
 * @parent RushAnimation
 * @type boolean
 * @on Mirror
 * @off Normal
 * @desc Mirror the effect animation?
 * Occurs when the turn order is rushed.
 * @default false
 *
 * @param RushMute:eval
 * @text Mute Animation
 * @parent RushAnimation
 * @type boolean
 * @on Mute
 * @off Normal
 * @desc Mute the effect animation?
 * Occurs when the turn order is rushed.
 * @default false
 *
 * @param RushPopups
 * @text Popups
 * @parent Rush
 *
 * @param RushPopupText:str
 * @text Text
 * @parent RushPopups
 * @desc Text displayed upon the effect activating.
 * Occurs when the turn order is rushed.
 * @default RUSH
 *
 * @param RushTextColor:str
 * @text Text Color
 * @parent RushPopups
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 24
 *
 * @param RushFlashColor:eval
 * @text Flash Color
 * @parent RushPopups
 * @desc Adjust the popup's flash color.
 * Format: [red, green, blue, alpha]
 * @default [0, 255, 0, 160]
 * 
 * @param RushFlashDuration:num
 * @text Flash Duration
 * @parent RushPopups
 * @type number
 * @desc What is the frame duration of the flash effect?
 * @default 60
 *
 */
/* ----------------------------------------------------------------------------
 * Turn Order Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~TurnOrder:
 *
 * @param General
 *
 * @param DisplayPosition:str
 * @text Display Position
 * @parent General
 * @type select
 * @option top
 * @option bottom
 * @option left
 * @option right
 * @desc Select where the Turn Order will appear on the screen.
 * @default top
 * 
 * @param DisplayOffsetX:num
 * @text Offset X
 * @parent DisplayPosition:str
 * @desc How much to offset the X coordinate by.
 * Negative: left. Positive: right.
 * @default 0
 * 
 * @param DisplayOffsetY:num
 * @text Offset Y
 * @parent DisplayPosition:str
 * @desc How much to offset the Y coordinate by.
 * Negative: up. Positive: down.
 * @default 0
 *
 * @param RepositionTopForHelp:eval
 * @text Reposition for Help?
 * @parent DisplayPosition:str
 * @type boolean
 * @on Reposition
 * @off Stay
 * @desc If the display position is at the top, reposition the
 * display when the help window is open?
 * @default true
 *
 * @param RepositionLogWindow:eval
 * @text Reposition Log?
 * @parent DisplayPosition:str
 * @type boolean
 * @on Reposition
 * @off Stay
 * @desc If the display position is at the top, reposition the
 * Battle Log Window to be lower?
 * @default true
 *
 * @param OrderDirection:eval
 * @text Forward Direction
 * @parent General
 * @type boolean
 * @on Left to Right / Down to Up
 * @off Right to Left / Up to Down
 * @desc Decide on the direction of the Turn Order.
 * Settings may vary depending on position.
 * @default true
 *
 * @param SubjectDistance:num
 * @text Subject Distance
 * @parent General
 * @type number
 * @desc How far do you want the currently active battler to
 * distance itself from the rest of the Turn Order?
 * @default 8
 *
 * @param ScreenBuffer:num
 * @text Screen Buffer
 * @parent General
 * @type number
 * @desc What distance do you want the display to be away
 * from the edge of the screen by?
 * @default 20
 * 
 * @param Reposition
 * @text Reposition For Help
 *
 * @param RepositionTopHelpX:num
 * @text Repostion X By
 * @parent Reposition
 * @desc Reposition the display's X coordinates by this much when
 * the Help Window is visible.
 * @default 0
 *
 * @param RepositionTopHelpY:num
 * @text Repostion Y By
 * @parent Reposition
 * @desc Reposition the display's Y coordinates by this much when
 * the Help Window is visible.
 * @default 96
 * 
 * @param Slots
 *
 * @param TotalHorzSprites:num
 * @text Total Horizontal
 * @parent Slots
 * @type number
 * @min 1
 * @desc How many slots do you want to display for top and
 * bottom Turn Order Display positions?
 * @default 16
 *
 * @param TotalVertSprites:num
 * @text Total Vertical
 * @parent Slots
 * @type number
 * @min 1
 * @desc How many slots do you want to display for left and
 * right Turn Order Display positions?
 * @default 10
 *
 * @param SpriteLength:num
 * @text Length
 * @parent Slots
 * @type number
 * @min 1
 * @desc How many pixels long should the slots be on the
 * Turn Order display?
 * @default 72
 *
 * @param SpriteThin:num
 * @text Thin
 * @parent Slots
 * @type number
 * @min 1
 * @desc How many pixels thin should the slots be on the
 * Turn Order display?
 * @default 36
 *
 * @param UpdateFrames:num
 * @text Update Frames
 * @parent Slots
 * @type number
 * @min 1
 * @desc How many frames should it take for the slots to
 * update their positions by?
 * @default 24
 *
 * @param Border
 * @text Slot Border
 *
 * @param ShowMarkerBorder:eval
 * @text Show Border?
 * @parent Border
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show borders for the slot sprites?
 * @default true
 *
 * @param BorderThickness:num
 * @text Border Thickness
 * @parent Markers
 * @type number
 * @min 1
 * @desc How many pixels thick should the colored portion of the border be?
 * @default 2
 *
 * @param BorderActor
 * @text Actors
 * @parent Border
 *
 * @param ActorBorderColor:str
 * @text Border Color
 * @parent BorderActor
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 4
 *
 * @param ActorSystemBorder:str
 * @text Border Skin
 * @parent BorderActor
 * @type file
 * @dir img/system/
 * @desc Optional. Place a skin on the actor borders instead of rendering them?
 * @default 
 *
 * @param BorderEnemy
 * @text Enemies
 * @parent Border
 *
 * @param EnemyBorderColor:str
 * @text Border Color
 * @parent BorderEnemy
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 2
 *
 * @param EnemySystemBorder:str
 * @text Border Skin
 * @parent BorderEnemy
 * @type file
 * @dir img/system/
 * @desc Optional. Place a skin on the enemy borders instead of rendering them?
 * @default 
 *
 * @param Sprite
 * @text Slot Sprites
 *
 * @param ActorSprite
 * @text Actors
 * @parent Sprite
 *
 * @param ActorBattlerType:str
 * @text Sprite Type
 * @parent ActorSprite
 * @type select
 * @option Face Graphic - Show the actor's face.
 * @value face
 * @option Icon - Show a specified icon.
 * @value icon
 * @option Sideview Actor - Show the actor's sideview battler.
 * @value svactor
 * @desc Select the type of sprite used for the actor graphic.
 * @default face
 *
 * @param ActorBattlerIcon:num
 * @text Default Icon
 * @parent ActorSprite
 * @desc Which icon do you want to use for actors by default?
 * @default 84
 *
 * @param EnemySprite
 * @text Enemies
 * @parent Sprite
 *
 * @param EnemyBattlerType:str
 * @text Sprite Type
 * @parent EnemySprite
 * @type select
 * @option Face Graphic - Show a specified face graphic.
 * @value face
 * @option Icon - Show a specified icon.
 * @value icon
 * @option Enemy - Show the enemy's graphic or sideview battler.
 * @value enemy
 * @desc Select the type of sprite used for the enemy graphic.
 * @default enemy
 *
 * @param EnemyBattlerFaceName:str
 * @text Default Face Name
 * @parent EnemySprite
 * @type file
 * @dir img/faces/
 * @desc Use this default face graphic if there is no specified face.
 * @default Monster
 *
 * @param EnemyBattlerFaceIndex:num
 * @text Default Face Index
 * @parent EnemySprite
 * @type number
 * @desc Use this default face index if there is no specified index.
 * @default 1
 *
 * @param EnemyBattlerIcon:num
 * @text Default Icon
 * @parent EnemySprite
 * @desc Which icon do you want to use for enemies by default?
 * @default 298
 *
 * @param EnemyBattlerMatchHue:eval
 * @text Match Hue?
 * @parent EnemySprite
 * @type boolean
 * @on Match
 * @off Don't Match
 * @desc Match the hue for enemy battlers?
 * Does not apply if there's a sideview battler.
 * @default true
 *
 * @param Letter
 * @text Slot Letter
 *
 * @param EnemyBattlerDrawLetter:eval
 * @text Show Enemy Letter?
 * @parent Letter
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show the enemy's letter on the slot sprite?
 * @default true
 *
 * @param EnemyBattlerFontFace:str
 * @text Font Name
 * @parent Letter
 * @desc The font name used for the text of the Letter.
 * Leave empty to use the default game's font.
 * @default 
 *
 * @param EnemyBattlerFontSize:num
 * @text Font Size
 * @parent Letter
 * @min 1
 * @desc The font size used for the text of the Letter.
 * @default 16
 *
 * @param Background
 * @text Slot Background
 *
 * @param ShowMarkerBg:eval
 * @text Show Background?
 * @parent Background
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show the background on the slot sprite?
 * @default true
 *
 * @param BackgroundActor
 * @text Actors
 * @parent Background
 *
 * @param ActorBgColor1:str
 * @text Background Color 1
 * @parent BackgroundActor
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 19
 *
 * @param ActorBgColor2:str
 * @text Background Color 2
 * @parent BackgroundActor
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 9
 *
 * @param ActorSystemBg:str
 * @text Background Skin
 * @parent BackgroundActor
 * @type file
 * @dir img/system/
 * @desc Optional. Use a skin for the actor background instead of rendering them?
 * @default 
 *
 * @param BackgroundEnemy
 * @text Enemies
 * @parent Background
 *
 * @param EnemyBgColor1:str
 * @text Background Color 1
 * @parent BackgroundEnemy
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 19
 *
 * @param EnemyBgColor2:str
 * @text Background Color 2
 * @parent BackgroundEnemy
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 18
 *
 * @param EnemySystemBg:str
 * @text Background Skin
 * @parent BackgroundEnemy
 * @type file
 * @dir img/system/
 * @desc Optional. Use a skin for the enemy background instead of rendering them?
 * @default 
 *
 */
//=============================================================================

const _0x760d64=_0x4c4e;(function(_0x31b1bc,_0x4ea4cc){const _0x500fa0=_0x4c4e,_0x1a9e38=_0x31b1bc();while(!![]){try{const _0x1b825b=-parseInt(_0x500fa0(0x29b))/0x1+parseInt(_0x500fa0(0x356))/0x2+-parseInt(_0x500fa0(0x242))/0x3*(parseInt(_0x500fa0(0x2d9))/0x4)+parseInt(_0x500fa0(0x2ad))/0x5*(-parseInt(_0x500fa0(0x20c))/0x6)+parseInt(_0x500fa0(0x38a))/0x7*(parseInt(_0x500fa0(0x322))/0x8)+-parseInt(_0x500fa0(0x2fc))/0x9*(-parseInt(_0x500fa0(0x2a7))/0xa)+-parseInt(_0x500fa0(0x217))/0xb*(-parseInt(_0x500fa0(0x259))/0xc);if(_0x1b825b===_0x4ea4cc)break;else _0x1a9e38['push'](_0x1a9e38['shift']());}catch(_0xa68e62){_0x1a9e38['push'](_0x1a9e38['shift']());}}}(_0x25a8,0x2cace));var label=_0x760d64(0x2b7),tier=tier||0x0,dependencies=['VisuMZ_0_CoreEngine','VisuMZ_1_BattleCore'],pluginData=$plugins[_0x760d64(0x359)](function(_0x3b348b){const _0x551f5d=_0x760d64;return _0x3b348b[_0x551f5d(0x27e)]&&_0x3b348b['description']['includes']('['+label+']');})[0x0];function _0x25a8(){const _0x3083b5=['svActorVertCells','reduce','ctbTicksToGoalAddedCastTime','isCtbCastingState','Svvfa','processTurnOrderChangeCTB','bind','wtmhq','updateTpb','isAttack','Delay','Actors','members','setActionState','acmjI','Enemy','aLoyx','hWUSg','Game_System_initialize','_graphicFaceName','EaJfF','SNwNC','TpbBaseSpeedCalcJS','applyTpbPenalty','isDead','blt','iconWidth','acting','_plural','BattleManager_battleSys','boxHeight','registerCommand','setHue','enemy','compareBattlerSprites','_inputting','EnemyBattlerType','_tpbState','ticksLeft','iconHeight','bitmap','isBattleSystemCTBTurnOrderVisible','rVFYR','Enemy-%1-%2','90UBPsug','process_VisuMZ_BattleSystemCTB_JS_Notetags','applyItemUserEffect','_isAlive','isCtbChargingState','TpbCastTimeJS','battler','maxBattleMembers','_homeX','_tpbTurnCount','DeviceFriendly','169202ItQrtQ','canMove','defaultPosition','_tpbCastTime','updateTpbChargeTime','IconIndex','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','checkPosition','tjDfa','updateTurn','Item-%1-%2','updateTpbChargeTimeCTB','Charge','_tpbChargeTime','ShowMarkerBorder','BattleManager_isActiveTpb','ConvertParams','changeCtbCastTime','Armor-%1-%2','isRestricted','Class-%1-%2','isPlaytest','InitialGaugeJS','_unit','%1PopupText','EscapeFailPenalty','Game_Action_applyGlobal','_ctbTurnOrderFaceIndex','_ctbAfterSpeed','appear','vFfaF','FUNC','wPXmY','version','isAlive','_index','setTurnOrderCTB','CtbTurnOrderActorFace','createAllWindows','skills','startBattle','_phase','RiOIS','30kOtAor','Fsgfk','HlFmo','faceHeight','processUpdateGraphic','update','%1Mute','RZamI','map','startAction','removeBattleStates','MZGBE','BattlerRelativeSpeedJS','Zryzh','time','trim','bitmapWidth','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Declare\x20Variables\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20arguments[0];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20arguments[1];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20keyType\x20=\x20\x27%2\x27;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20rate\x20=\x200;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20(keyType\x20===\x20\x27Charge\x27)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20rate\x20=\x20target._tpbChargeTime;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20else\x20if\x20(keyType\x20===\x20\x27Cast\x27)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20rate\x20=\x20target._tpbCastTime\x20/\x20Math.max(target.tpbRequiredCastTime(),\x201);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20originalValue\x20=\x20rate;\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Process\x20Code\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20NaN\x20Check\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20(isNaN(rate)){\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20console.log(\x27NaN\x20rate\x20created\x20by\x20%2\x27.format(\x27\x27,obj.name));\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20console.log(\x27Restoring\x20rate\x20to\x20%2\x27.format(\x27\x27,originalValue));\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20rate\x20=\x20originalValue;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Return\x20Value\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20rate;\x0a\x20\x20\x20\x20\x20\x20\x20\x20','Anti-CTB\x20Softlock\x20Count:','BattleManager_startActorInput','note','left','156uvXfRm','TotalHorzSprites','_ctbTurnOrderWindow','bitmapHeight','lSeug','ARRAYSTRUCT','_statusWindow','%1Mirror','description','XUtzC','allBattleMembers','changeSvActorGraphicBitmap','MIN_SAFE_INTEGER','updateTurnCTB','_logWindow','casting','ARRAYSTR','Game_Battler_tpbRelativeSpeed','updateGraphicHue','_isBattleOver','Settings','includes','TurnOrderCTBGraphicIconIndex','ARRAYEVAL','tpbAcceleration','tpbChargeTime','OubkJ','Ticks\x20to\x20Goal:\x20','_turnOrderContainer','Game_Battler_initTpbChargeTime','format','_graphicType','ScreenBuffer','TurnOrderCTBGraphicFaceIndex','height','%1SystemBg','initBattleSystemCTB','status','addChild','DisplayPosition','isTpbReady','TpbSpeedCalcJS','BorderThickness','Actor','ParseSkillNotetags','_ctbTurnOrderGraphicType','actor','updatePosition','OWqam','RepositionTopHelpX','isTpbCharged','loadSystem','faceWidth','createTurnOrderCTBGraphicFaceIndex','otherCtbChecksPassed','rotateCTBSprites','getStateTooltipBattler','boxWidth','battlerHue','onRestrict','_turnOrderInnerSprite','Game_Battler_tpbRequiredCastTime','kCeoK','CtbTurnOrderActorIcon','undecided','mcpNb','289542nNysUb','face','_position','_ctbTurnOrderVisible','isSceneBattle','EnemyBattlerFontSize','hasSvBattler','ActorBattlerIcon','OrderJS','CMEFD','updateVisibility','containerWindow','310wMtPwj','QSMZe','SpriteThin','visible','right','changeEnemyGraphicBitmap','90910Wgkurv','ceil','_ctbTurnOrderIconIndex','CtbTurnOrderEnemyFace','Rush','updateLetter','PCgYE','Weapon-%1-%2','createGraphicSprite','clearTpbChargeTimeCTB','BattleSystemCTB','createTurnOrderCTBGraphicFaceName','createInitialPositions','updateSelectionEffect','getColor','Actor-%1-%2','setupTextPopup','kTmPO','sFJWW','Game_Battler_applyTpbPenalty','Order','kvquQ','changeFaceGraphicBitmap','EnemyBattlerFaceIndex','updateTurnOrder','%1\x20%2\x20%3','sZkiT','eEKjP','%1BgColor1','Skill-%1-%2','updateTpbIdleTime','JQdBN','usKjn','onBattleStart','startFade','YYaqV','UpdateFrames','createKeyJS','Mechanics','item','Enemies','PgLcL','piolO','tpbBaseSpeed','68624bwmqqC','anchor','Pkdeq','onTpbCharged','initialize','_graphicIconIndex','isActing','_fadeDuration','createBorderSprite','updateTurnOrderCTB','geXpA','RwGGx','applyGlobalBattleSystemCTBEffects','faceName','mMVjU','_onRestrictBypassCtbReset','length','EVAL','TotalVertSprites','charging','opacity','changeIconGraphicBitmap','isEnemy','getBattleSystem','loadSvActor','some','exit','_letterSprite','Game_Battler_tpbSpeed','applyGlobal','BattleManager_startBattle','Game_Battler_updateTpbCastTime','updateBattleContainerOrder','eGExP','Effect','46098yOHIxe','createChildren','mZmqW','initTpbChargeTimeCTB','initMembers','ujYJU','center','width','FmKNw','setCtbCastTime','numActions','removeCurrentAction','getChildIndex','Cast','Game_Battler_onRestrict','%1SystemBorder','_letter','setText','processTurn','CtbTurnOrderEnemyIcon','attackSpeed','NSghe','#000000','push','windowRect','%1FlashDuration','createLetterSprite','clearTurnOrderCTBGraphics','padding','setCTBGraphicIconIndex','_scene','battlerName','%1TextColor','createCTBTurnOrderWindow','top','BattleManager_updateTurn','After','%1FlashColor','2108360jtzApi','checkOpacity','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','isSideView','SpriteLength','isPassCTB','repositionLogWindowCTB','applyCTBPenalty','WONAT','EnemyBattlerIcon','BattleManager_isTpb','sqwbH','OrderDirection','createBattlerSprites','agCpW','battleSys','parse','NINqM','match','subject','BSnJA','createRateJS','_backgroundSprite','getCurrentTurnOrderPositionCTB','State-%1-%2','Game_Battler_updateTpbChargeTime','bottom','fmPDn','_positionTargetX','create','_homeY','Game_Action_applyItemUserEffect','_actionState','_ogWindowLayerX','requestFauxAnimation','hide','indexOf','endAction','_autoBattle','FaceIndex','sort','ctbStopped','Parse_Notetags_CreateJS','_fadeTarget','loadFace','BattleManager_processTurn','NUM','setBlendColor','setBattleSystemCTBTurnOrderVisible','NQGGj','_graphicFaceIndex','_graphicHue','589058uEwcbd','(?:GAUGE|TIME|SPEED)','constructor','filter','LsPhK','rpwXS','ctbTicksToGoal','startActorInput','isCTB','svActorHorzCells','Pdgml','fACqR','CtbTurnOrderClearEnemyGraphic','updateTpbBattler','ParseItemNotetags','isHorz','createTurnOrderCTBGraphicType','rZbcg','_anti_CTB_SoftlockCount','TurnOrderCTBGraphicFaceName','gradientFillRect','applyBattleSystemCTBUserEffect','changeTurnOrderByCTB','fillRect','setCtbChargeTime','Scene_Battle_createAllWindows','_dupe','vwBew','svBattlerName','ctbHasInstantActionAfter','faceIndex','_subject','ldKIB','BattleManager_updateAllTpbBattlers','Game_Battler_tpbBaseSpeed','fontFace','floor','processAbort','CnNnh','name','createOrderJS','isTpb','bTfEk','currentAction','IPYJP','MAX_SAFE_INTEGER','tpbSpeed','TurnOrder','mainFontFace','TXvmi','min','SHMfx','7bcddGs','return\x200','Game_BattlerBase_hide','<JS\x20%2\x20%1\x20%3>\x5cs*([\x5cs\x5cS]*)\x5cs*<\x5c/JS\x20%2\x20%1\x20%3>','initTpbChargeTime','SubjectDistance','kuFsm','concat','tpbRelativeSpeed','ready','tBwuc','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Declare\x20Variables\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20arguments[0];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20arguments[1];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20keyType\x20=\x20\x27%2\x27;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20position\x20=\x20target.getCurrentTurnOrderPositionCTB();\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20order\x20=\x20position;\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Process\x20Code\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20NaN\x20Check\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20(isNaN(order)){\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20console.log(\x27NaN\x20rate\x20created\x20by\x20%2\x27.format(\x27\x27,obj.name));\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20console.log(\x27Restoring\x20rate\x20to\x20%2\x27.format(\x27\x27,originalValue));\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20order\x20=\x20position;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Return\x20Value\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20order;\x0a\x20\x20\x20\x20\x20\x20\x20\x20','_ogWindowLayerY','createBackgroundSprite','_isAppeared','STRUCT','Game_BattlerBase_appear','ArpGf','rotateDupeNumber','ActorBattlerType','Aborting\x20Battle.\x20Softlock\x20cannot\x20be\x20fixed.','isValid','Game_Battler_updateTpbIdleTime','_graphicEnemy','_graphicSv','loadEnemy','updateGraphic','tpbRequiredCastTime','clearStates','children','_actionBattlers','clearTpbChargeTime','Window_Help_setItem','prepare','onCtbOrderChange','max','updateTpbCastTimeCTB','rotateCTBSprite','traitObjects','containerPosition','Game_Battler_updateTpb','drawText','UofZZ','setCtbAfterSpeed','PQRcY','_tpbIdleTime','round','IdkeA','Window_StatusBase_placeGauge','_ctbTurnOrderFaceName','Game_Battler_tpbAcceleration','RegExp','_positionDuration','CTB','EnemyBattlerFaceName','updateOpacity','_graphicSprite','log','createTurnOrderCTBGraphicIconIndex','changeCtbChargeTime','addInnerChild','ShowMarkerBg','speed','call','_positionTargetY','FaceName','processTurnCTB','onDatabaseLoaded','%1BgColor2','updateTpbIdleTimeCTB','TurnOrderCTBGraphicType','toUpperCase','addLoadListener','JSON','processCtbAntiSoftlock','applyItemBattleSystemCTBUserEffect','isActiveTpb','%1AnimationID','icon','prototype','Game_Battler_clearTpbChargeTime','SHlwz','loadSvEnemy','clamp','parameters','process_VisuMZ_BattleSystemCTB_CreateRegExp','turn'];_0x25a8=function(){return _0x3083b5;};return _0x25a8();}VisuMZ[label]['Settings']=VisuMZ[label][_0x760d64(0x26d)]||{},VisuMZ[_0x760d64(0x227)]=function(_0x85d13f,_0x3de76d){const _0x15f1c6=_0x760d64;for(const _0x15dee2 in _0x3de76d){if('GYlgH'===_0x15f1c6(0x376))return this['isCtbCastingState']()?this[_0x15f1c6(0x21a)]/this[_0x15f1c6(0x1a4)]():0x0;else{if(_0x15dee2[_0x15f1c6(0x334)](/(.*):(.*)/i)){const _0x20087c=String(RegExp['$1']),_0x2a05de=String(RegExp['$2'])['toUpperCase']()['trim']();let _0x110cc6,_0x41629f,_0x30c381;switch(_0x2a05de){case _0x15f1c6(0x350):_0x110cc6=_0x3de76d[_0x15dee2]!==''?Number(_0x3de76d[_0x15dee2]):0x0;break;case'ARRAYNUM':_0x41629f=_0x3de76d[_0x15dee2]!==''?JSON[_0x15f1c6(0x332)](_0x3de76d[_0x15dee2]):[],_0x110cc6=_0x41629f[_0x15f1c6(0x24a)](_0x3b46dd=>Number(_0x3b46dd));break;case _0x15f1c6(0x2ea):_0x110cc6=_0x3de76d[_0x15dee2]!==''?eval(_0x3de76d[_0x15dee2]):null;break;case _0x15f1c6(0x270):_0x41629f=_0x3de76d[_0x15dee2]!==''?JSON[_0x15f1c6(0x332)](_0x3de76d[_0x15dee2]):[],_0x110cc6=_0x41629f[_0x15f1c6(0x24a)](_0x248855=>eval(_0x248855));break;case _0x15f1c6(0x1d2):_0x110cc6=_0x3de76d[_0x15dee2]!==''?JSON[_0x15f1c6(0x332)](_0x3de76d[_0x15dee2]):'';break;case'ARRAYJSON':_0x41629f=_0x3de76d[_0x15dee2]!==''?JSON[_0x15f1c6(0x332)](_0x3de76d[_0x15dee2]):[],_0x110cc6=_0x41629f[_0x15f1c6(0x24a)](_0x45d05e=>JSON['parse'](_0x45d05e));break;case _0x15f1c6(0x236):_0x110cc6=_0x3de76d[_0x15dee2]!==''?new Function(JSON[_0x15f1c6(0x332)](_0x3de76d[_0x15dee2])):new Function(_0x15f1c6(0x18a));break;case'ARRAYFUNC':_0x41629f=_0x3de76d[_0x15dee2]!==''?JSON['parse'](_0x3de76d[_0x15dee2]):[],_0x110cc6=_0x41629f[_0x15f1c6(0x24a)](_0x521200=>new Function(JSON[_0x15f1c6(0x332)](_0x521200)));break;case'STR':_0x110cc6=_0x3de76d[_0x15dee2]!==''?String(_0x3de76d[_0x15dee2]):'';break;case _0x15f1c6(0x269):_0x41629f=_0x3de76d[_0x15dee2]!==''?JSON[_0x15f1c6(0x332)](_0x3de76d[_0x15dee2]):[],_0x110cc6=_0x41629f[_0x15f1c6(0x24a)](_0x1a791a=>String(_0x1a791a));break;case _0x15f1c6(0x198):_0x30c381=_0x3de76d[_0x15dee2]!==''?JSON[_0x15f1c6(0x332)](_0x3de76d[_0x15dee2]):{},_0x110cc6=VisuMZ['ConvertParams']({},_0x30c381);break;case _0x15f1c6(0x25e):_0x41629f=_0x3de76d[_0x15dee2]!==''?JSON[_0x15f1c6(0x332)](_0x3de76d[_0x15dee2]):[],_0x110cc6=_0x41629f[_0x15f1c6(0x24a)](_0x315e9c=>VisuMZ['ConvertParams']({},JSON[_0x15f1c6(0x332)](_0x315e9c)));break;default:continue;}_0x85d13f[_0x20087c]=_0x110cc6;}}}return _0x85d13f;},(_0x82466b=>{const _0x2e152c=_0x760d64,_0x38c718=_0x82466b[_0x2e152c(0x37d)];for(const _0x27699c of dependencies){if('XQawT'===_0x2e152c(0x389)){const _0x2a867a=_0x3433bd(_0x321fe2['$1']);_0x2a867a<_0x5acfbb?(_0x58f2b0(_0x2e152c(0x253)['format'](_0x1e664f,_0x2a867a,_0x9097bd)),_0x5514b8[_0x2e152c(0x2f3)]()):_0x26bac5=_0x5c2d95[_0x2e152c(0x1ac)](_0x2a867a,_0xaa0952);}else{if(!Imported[_0x27699c]){if('rZbcg'===_0x2e152c(0x367)){alert(_0x2e152c(0x324)['format'](_0x38c718,_0x27699c)),SceneManager[_0x2e152c(0x2f3)]();break;}else{const _0x47106b=this[_0x2e152c(0x201)]()['note'];if(_0x47106b[_0x2e152c(0x334)](/<CTB TURN ORDER ICON:[ ](\d+)>/i))return _0x2bd9a0(_0x478356['$1']);return _0x5de82c[_0x2e152c(0x26d)][_0x2e152c(0x32b)];}}}}const _0x5a0b9d=_0x82466b[_0x2e152c(0x261)];if(_0x5a0b9d[_0x2e152c(0x334)](/\[Version[ ](.*?)\]/i)){if(_0x2e152c(0x2e4)!==_0x2e152c(0x2e4))_0xf10ad0['changeCtbChargeTime'](_0x2b33b7(_0x499a7c['$1'])*0.01);else{const _0x17ec28=Number(RegExp['$1']);_0x17ec28!==VisuMZ[label][_0x2e152c(0x238)]&&(alert(_0x2e152c(0x21d)[_0x2e152c(0x277)](_0x38c718,_0x17ec28)),SceneManager[_0x2e152c(0x2f3)]());}}if(_0x5a0b9d['match'](/\[Tier[ ](\d+)\]/i)){const _0x10e5bd=Number(RegExp['$1']);if(_0x10e5bd<tier){if('rdvPA'===_0x2e152c(0x243))return _0x1a3d24[_0x2e152c(0x2f0)]()==='CTB';else alert('%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.'['format'](_0x38c718,_0x10e5bd,tier)),SceneManager[_0x2e152c(0x2f3)]();}else tier=Math[_0x2e152c(0x1ac)](_0x10e5bd,tier);}VisuMZ[_0x2e152c(0x227)](VisuMZ[label][_0x2e152c(0x26d)],_0x82466b[_0x2e152c(0x1dd)]);})(pluginData),PluginManager[_0x760d64(0x1ff)](pluginData['name'],_0x760d64(0x298),_0x487555=>{const _0x4bbccd=_0x760d64;VisuMZ['ConvertParams'](_0x487555,_0x487555);const _0x33e475=_0x487555['Actors'],_0x52829d=_0x487555[_0x4bbccd(0x21c)];for(const _0x3ec59b of _0x33e475){const _0x533091=$gameActors[_0x4bbccd(0x287)](_0x3ec59b);if(!_0x533091)continue;_0x533091[_0x4bbccd(0x286)]='icon',_0x533091[_0x4bbccd(0x2af)]=_0x52829d;}}),PluginManager['registerCommand'](pluginData[_0x760d64(0x37d)],_0x760d64(0x23c),_0x56ff61=>{const _0x8939d8=_0x760d64;VisuMZ[_0x8939d8(0x227)](_0x56ff61,_0x56ff61);const _0x11fcc9=_0x56ff61['Actors'],_0x334f69=_0x56ff61[_0x8939d8(0x1ca)],_0x30f0bc=_0x56ff61[_0x8939d8(0x349)];for(const _0x4e181e of _0x11fcc9){const _0x3d341e=$gameActors[_0x8939d8(0x287)](_0x4e181e);if(!_0x3d341e)continue;_0x3d341e[_0x8939d8(0x286)]=_0x8939d8(0x29c),_0x3d341e[_0x8939d8(0x1ba)]=_0x334f69,_0x3d341e[_0x8939d8(0x232)]=_0x30f0bc;}}),PluginManager[_0x760d64(0x1ff)](pluginData[_0x760d64(0x37d)],'CtbTurnOrderClearActorGraphic',_0x526c21=>{const _0x5cb831=_0x760d64;VisuMZ[_0x5cb831(0x227)](_0x526c21,_0x526c21);const _0x4ca4c9=_0x526c21[_0x5cb831(0x1eb)];for(const _0x3a608c of _0x4ca4c9){const _0x3c1d26=$gameActors[_0x5cb831(0x287)](_0x3a608c);if(!_0x3c1d26)continue;_0x3c1d26[_0x5cb831(0x317)]();}}),PluginManager[_0x760d64(0x1ff)](pluginData[_0x760d64(0x37d)],_0x760d64(0x30f),_0x1e506d=>{const _0x4556ab=_0x760d64;VisuMZ['ConvertParams'](_0x1e506d,_0x1e506d);const _0x50d2c0=_0x1e506d[_0x4556ab(0x2d5)],_0x266318=_0x1e506d['IconIndex'];for(const _0x27d44b of _0x50d2c0){const _0x32b6ce=$gameTroop[_0x4556ab(0x1ec)]()[_0x27d44b];if(!_0x32b6ce)continue;_0x32b6ce['_ctbTurnOrderGraphicType']=_0x4556ab(0x1d7),_0x32b6ce['_ctbTurnOrderIconIndex']=_0x266318;}}),PluginManager[_0x760d64(0x1ff)](pluginData[_0x760d64(0x37d)],_0x760d64(0x2b0),_0x590d1d=>{const _0xe95d93=_0x760d64;VisuMZ[_0xe95d93(0x227)](_0x590d1d,_0x590d1d);const _0x2464c6=_0x590d1d['Enemies'],_0x488115=_0x590d1d['FaceName'],_0x46d0b2=_0x590d1d[_0xe95d93(0x349)];for(const _0x476723 of _0x2464c6){if(_0xe95d93(0x2e7)!==_0xe95d93(0x336)){const _0x581c8a=$gameTroop[_0xe95d93(0x1ec)]()[_0x476723];if(!_0x581c8a)continue;_0x581c8a[_0xe95d93(0x286)]=_0xe95d93(0x29c),_0x581c8a[_0xe95d93(0x1ba)]=_0x488115,_0x581c8a[_0xe95d93(0x232)]=_0x46d0b2;}else return!this[_0xe95d93(0x218)]();}}),PluginManager[_0x760d64(0x1ff)](pluginData['name'],_0x760d64(0x362),_0x215b25=>{const _0x512472=_0x760d64;VisuMZ[_0x512472(0x227)](_0x215b25,_0x215b25);const _0x3ec8af=_0x215b25[_0x512472(0x2d5)];for(const _0x295ca0 of _0x3ec8af){if(_0x512472(0x18f)!==_0x512472(0x18f)){let _0x5a444d='';if(_0x1a99c7['includes'](_0x4c4dd0))_0x5a444d=_0x512472(0x2bc)[_0x512472(0x277)](_0x37b07b['id'],_0x43637e);if(_0x2bc35f[_0x512472(0x26e)](_0x581108))_0x5a444d='Class-%1-%2'[_0x512472(0x277)](_0x4e9c3d['id'],_0x2f989d);if(_0x398192[_0x512472(0x26e)](_0x17dba5))_0x5a444d='Skill-%1-%2'[_0x512472(0x277)](_0x456c3a['id'],_0x4d0c8f);if(_0x5887fe[_0x512472(0x26e)](_0x2f0409))_0x5a444d=_0x512472(0x221)['format'](_0x361fd2['id'],_0x768090);if(_0xc6db78[_0x512472(0x26e)](_0x2e4637))_0x5a444d=_0x512472(0x2b4)[_0x512472(0x277)](_0x2188fa['id'],_0x24d4b3);if(_0x3ae24c[_0x512472(0x26e)](_0x4ad289))_0x5a444d='Armor-%1-%2'['format'](_0x48639a['id'],_0x5a451a);if(_0x55c379[_0x512472(0x26e)](_0x13b289))_0x5a444d=_0x512472(0x20b)[_0x512472(0x277)](_0x5c2ac0['id'],_0x4f11e1);if(_0x41e036['includes'](_0x2b799b))_0x5a444d=_0x512472(0x33a)[_0x512472(0x277)](_0x5bb1fb['id'],_0x164ffb);return _0x5a444d;}else{const _0x237385=$gameTroop['members']()[_0x295ca0];if(!_0x237385)continue;_0x237385[_0x512472(0x317)]();}}}),PluginManager['registerCommand'](pluginData[_0x760d64(0x37d)],'SystemTurnOrderVisibility',_0x156711=>{VisuMZ['ConvertParams'](_0x156711,_0x156711);const _0x498dcb=_0x156711['Visible'];$gameSystem['setBattleSystemCTBTurnOrderVisible'](_0x498dcb);}),VisuMZ[_0x760d64(0x2b7)]['Scene_Boot_onDatabaseLoaded']=Scene_Boot[_0x760d64(0x1d8)][_0x760d64(0x1cc)],Scene_Boot[_0x760d64(0x1d8)][_0x760d64(0x1cc)]=function(){const _0x2364bd=_0x760d64;this[_0x2364bd(0x1de)](),VisuMZ[_0x2364bd(0x2b7)]['Scene_Boot_onDatabaseLoaded']['call'](this),this['process_VisuMZ_BattleSystemCTB_JS_Notetags']();},VisuMZ[_0x760d64(0x2b7)][_0x760d64(0x1bc)]={},Scene_Boot[_0x760d64(0x1d8)][_0x760d64(0x1de)]=function(){const _0x5ba8d6=_0x760d64,_0x526b7b=VisuMZ[_0x5ba8d6(0x2b7)]['RegExp'],_0x961f93=_0x5ba8d6(0x18c),_0x4b71c1=[_0x5ba8d6(0x223),_0x5ba8d6(0x309),_0x5ba8d6(0x320)];for(const _0x3d8f9a of _0x4b71c1){const _0x27f18b=_0x961f93[_0x5ba8d6(0x277)](_0x3d8f9a[_0x5ba8d6(0x1d0)]()[_0x5ba8d6(0x251)](),'(?:CTB)',_0x5ba8d6(0x357)),_0x113277=new RegExp(_0x27f18b,'i');VisuMZ[_0x5ba8d6(0x2b7)][_0x5ba8d6(0x1bc)][_0x3d8f9a]=_0x113277;}VisuMZ[_0x5ba8d6(0x2b7)][_0x5ba8d6(0x1bc)]['OrderJS']=/<JS (?:CTB) (?:ORDER|DELAY|RUSH|SHIFT)>\s*([\s\S]*)\s*<\/JS (?:CTB) (?:ORDER|DELAY|RUSH|SHIFT)>/i;},Scene_Boot[_0x760d64(0x1d8)][_0x760d64(0x20d)]=function(){const _0x53e037=_0x760d64;if(VisuMZ['ParseAllNotetags'])return;const _0x5c6db9=$dataSkills[_0x53e037(0x190)]($dataItems);for(const _0x3f51fe of _0x5c6db9){if(!_0x3f51fe)continue;VisuMZ[_0x53e037(0x2b7)][_0x53e037(0x34c)](_0x3f51fe);}},VisuMZ[_0x760d64(0x2b7)][_0x760d64(0x285)]=VisuMZ[_0x760d64(0x285)],VisuMZ[_0x760d64(0x285)]=function(_0x221eae){const _0x5024e8=_0x760d64;VisuMZ[_0x5024e8(0x2b7)][_0x5024e8(0x285)]['call'](this,_0x221eae),VisuMZ[_0x5024e8(0x2b7)][_0x5024e8(0x34c)](_0x221eae);},VisuMZ[_0x760d64(0x2b7)][_0x760d64(0x364)]=VisuMZ[_0x760d64(0x364)],VisuMZ[_0x760d64(0x364)]=function(_0x12d32a){const _0x41c967=_0x760d64;VisuMZ[_0x41c967(0x2b7)][_0x41c967(0x364)]['call'](this,_0x12d32a),VisuMZ['BattleSystemCTB'][_0x41c967(0x34c)](_0x12d32a);},VisuMZ['BattleSystemCTB']['Parse_Notetags_CreateJS']=function(_0x2ff2f0){const _0x13f3a5=_0x760d64,_0x57c8cc=[_0x13f3a5(0x223),_0x13f3a5(0x309),_0x13f3a5(0x320)];for(const _0x23e74a of _0x57c8cc){VisuMZ[_0x13f3a5(0x2b7)][_0x13f3a5(0x337)](_0x2ff2f0,_0x23e74a);}VisuMZ[_0x13f3a5(0x2b7)][_0x13f3a5(0x37e)](_0x2ff2f0,_0x13f3a5(0x2c1));},VisuMZ['BattleSystemCTB']['JS']={},VisuMZ['BattleSystemCTB'][_0x760d64(0x337)]=function(_0x3b4b87,_0x5ad3a0){const _0x260c0a=_0x760d64,_0x5059c1=_0x3b4b87[_0x260c0a(0x257)];if(_0x5059c1['match'](VisuMZ[_0x260c0a(0x2b7)][_0x260c0a(0x1bc)][_0x5ad3a0])){const _0x2ac270=String(RegExp['$1']),_0x2543f0=_0x260c0a(0x254)[_0x260c0a(0x277)](_0x2ac270,_0x5ad3a0),_0x4783fa=VisuMZ['BattleSystemCTB']['createKeyJS'](_0x3b4b87,_0x5ad3a0);VisuMZ[_0x260c0a(0x2b7)]['JS'][_0x4783fa]=new Function(_0x2543f0);}},VisuMZ['BattleSystemCTB'][_0x760d64(0x37e)]=function(_0x42d21b,_0x5f0195){const _0x263366=_0x760d64,_0x9f54ff=_0x42d21b[_0x263366(0x257)];if(_0x9f54ff[_0x263366(0x334)](VisuMZ['BattleSystemCTB'][_0x263366(0x1bc)][_0x263366(0x2a3)])){const _0x305aa2=String(RegExp['$1']),_0x4451cd=_0x263366(0x194)['format'](_0x305aa2,_0x5f0195),_0x2cf917=VisuMZ[_0x263366(0x2b7)]['createKeyJS'](_0x42d21b,_0x5f0195);VisuMZ[_0x263366(0x2b7)]['JS'][_0x2cf917]=new Function(_0x4451cd);}},VisuMZ[_0x760d64(0x2b7)][_0x760d64(0x2d2)]=function(_0x4aba34,_0x55609f){const _0x5bbb5a=_0x760d64;let _0x464b32='';if($dataActors[_0x5bbb5a(0x26e)](_0x4aba34))_0x464b32='Actor-%1-%2'[_0x5bbb5a(0x277)](_0x4aba34['id'],_0x55609f);if($dataClasses[_0x5bbb5a(0x26e)](_0x4aba34))_0x464b32=_0x5bbb5a(0x22b)[_0x5bbb5a(0x277)](_0x4aba34['id'],_0x55609f);if($dataSkills['includes'](_0x4aba34))_0x464b32=_0x5bbb5a(0x2ca)[_0x5bbb5a(0x277)](_0x4aba34['id'],_0x55609f);if($dataItems[_0x5bbb5a(0x26e)](_0x4aba34))_0x464b32=_0x5bbb5a(0x221)['format'](_0x4aba34['id'],_0x55609f);if($dataWeapons[_0x5bbb5a(0x26e)](_0x4aba34))_0x464b32=_0x5bbb5a(0x2b4)['format'](_0x4aba34['id'],_0x55609f);if($dataArmors['includes'](_0x4aba34))_0x464b32=_0x5bbb5a(0x229)[_0x5bbb5a(0x277)](_0x4aba34['id'],_0x55609f);if($dataEnemies[_0x5bbb5a(0x26e)](_0x4aba34))_0x464b32=_0x5bbb5a(0x20b)[_0x5bbb5a(0x277)](_0x4aba34['id'],_0x55609f);if($dataStates['includes'](_0x4aba34))_0x464b32=_0x5bbb5a(0x33a)[_0x5bbb5a(0x277)](_0x4aba34['id'],_0x55609f);return _0x464b32;},ImageManager['svActorHorzCells']=ImageManager[_0x760d64(0x35f)]||0x9,ImageManager[_0x760d64(0x1e0)]=ImageManager[_0x760d64(0x1e0)]||0x6,VisuMZ[_0x760d64(0x2b7)][_0x760d64(0x1fd)]=BattleManager['battleSys'],BattleManager[_0x760d64(0x331)]=function(){const _0x4bf34e=_0x760d64;if(this[_0x4bf34e(0x35e)]())return'CTB';return VisuMZ[_0x4bf34e(0x2b7)]['BattleManager_battleSys']['call'](this);},BattleManager[_0x760d64(0x35e)]=function(){const _0x2fae84=_0x760d64;return $gameSystem[_0x2fae84(0x2f0)]()===_0x2fae84(0x1be);},VisuMZ[_0x760d64(0x2b7)][_0x760d64(0x32c)]=BattleManager[_0x760d64(0x37f)],BattleManager[_0x760d64(0x37f)]=function(){const _0x8ba103=_0x760d64;if(this['isCTB']())return!![];return VisuMZ['BattleSystemCTB'][_0x8ba103(0x32c)][_0x8ba103(0x1c8)](this);},VisuMZ[_0x760d64(0x2b7)][_0x760d64(0x226)]=BattleManager[_0x760d64(0x1d5)],BattleManager[_0x760d64(0x1d5)]=function(){const _0x4e6b0f=_0x760d64;if(this[_0x4e6b0f(0x35e)]())return![];return VisuMZ[_0x4e6b0f(0x2b7)]['BattleManager_isActiveTpb']['call'](this);},VisuMZ[_0x760d64(0x2b7)]['BattleManager_updateTurn']=BattleManager[_0x760d64(0x220)],BattleManager[_0x760d64(0x220)]=function(_0x457b1f){const _0x567098=_0x760d64;this[_0x567098(0x35e)]()?this[_0x567098(0x266)](_0x457b1f):_0x567098(0x2c7)==='sZkiT'?VisuMZ[_0x567098(0x2b7)]['BattleManager_updateTurn'][_0x567098(0x1c8)](this,_0x457b1f):(_0xd70892(_0x567098(0x21d)['format'](_0x5469e9,_0x5be41c)),_0x544d5c[_0x567098(0x2f3)]());},BattleManager[_0x760d64(0x266)]=function(_0x1c5cd4){const _0x4affb4=_0x760d64;return VisuMZ[_0x4affb4(0x2b7)][_0x4affb4(0x31f)][_0x4affb4(0x1c8)](this,_0x1c5cd4);},VisuMZ[_0x760d64(0x2b7)][_0x760d64(0x34f)]=BattleManager[_0x760d64(0x30e)],BattleManager[_0x760d64(0x30e)]=function(){const _0x50638f=_0x760d64;this[_0x50638f(0x35e)]()?this[_0x50638f(0x1cb)]():VisuMZ[_0x50638f(0x2b7)]['BattleManager_processTurn']['call'](this);},BattleManager[_0x760d64(0x1cb)]=function(){const _0x42c155=_0x760d64,_0x3a1fe2=this[_0x42c155(0x375)],_0x34c8a4=_0x3a1fe2[_0x42c155(0x381)]();_0x34c8a4?(_0x34c8a4[_0x42c155(0x1aa)](),_0x34c8a4[_0x42c155(0x19e)]()&&this[_0x42c155(0x24b)](),_0x3a1fe2[_0x42c155(0x307)]()):_0x42c155(0x380)===_0x42c155(0x380)?(_0x3a1fe2[_0x42c155(0x1b4)](0x0),this['endAction'](),this[_0x42c155(0x375)]=null):(this[_0x42c155(0x29e)]===_0x2fc8c4&&this[_0x42c155(0x27d)](),this[_0x42c155(0x29e)]=_0x4c9eb7);},BattleManager['isAnyBattlerReadyCTB']=function(){const _0x5460a7=_0x760d64;if(this['_subject'])return!![];if(this['_phase']!=='turn')return!![];if(this[_0x5460a7(0x348)])return![];const _0xb74ade=this[_0x5460a7(0x263)]()[_0x5460a7(0x359)](_0x3341d1=>_0x3341d1&&_0x3341d1['isAppeared']());return _0xb74ade[_0x5460a7(0x2f2)](_0x52b20f=>_0x52b20f[_0x5460a7(0x327)]());},Game_Battler[_0x760d64(0x1d8)][_0x760d64(0x327)]=function(){const _0x34e135=_0x760d64;if(this[_0x34e135(0x28b)]())return!![];if(this[_0x34e135(0x281)]())return!![];if(this[_0x34e135(0x2df)]())return!![];return![];},BattleManager['checkCtbAntiSoftlock']=function(){const _0x1b7a3e=_0x760d64;let _0x30d206=VisuMZ[_0x1b7a3e(0x2b7)][_0x1b7a3e(0x26d)]['Mechanics'][_0x1b7a3e(0x216)]?0x1e:0xa;if(this['isAnyBattlerReadyCTB']()&&this[_0x1b7a3e(0x28f)]()){this[_0x1b7a3e(0x368)]=this['_anti_CTB_SoftlockCount']||0x0,this[_0x1b7a3e(0x368)]++;if(this[_0x1b7a3e(0x368)]>=_0x30d206){if('xSfpT'===_0x1b7a3e(0x1b5)){if(!_0x4736b1[_0x1b7a3e(0x26d)][_0x1b7a3e(0x1c6)])return;const _0x2027cb=_0x497744[_0x1b7a3e(0x26d)],_0x508f28=this[_0x1b7a3e(0x22e)]===_0x29bd7f?_0x1b7a3e(0x284):_0x1b7a3e(0x1ef),_0x2b179b=_0x1b7a3e(0x27c)[_0x1b7a3e(0x277)](_0x508f28),_0x37a75b=new _0x40f6da();_0x37a75b['anchor']['x']=this[_0x1b7a3e(0x2da)]['x'],_0x37a75b[_0x1b7a3e(0x2da)]['y']=this[_0x1b7a3e(0x2da)]['y'];if(_0x2027cb[_0x2b179b])_0x37a75b[_0x1b7a3e(0x208)]=_0x169a61[_0x1b7a3e(0x28c)](_0x2027cb[_0x2b179b]);else{const _0x5dc2b8=this[_0x1b7a3e(0x252)](),_0x4b5e6f=this[_0x1b7a3e(0x25c)]();_0x37a75b['bitmap']=new _0x579cd0(_0x5dc2b8,_0x4b5e6f);const _0x3f298d=_0xbe202e['getColor'](_0x2027cb['%1BgColor1'['format'](_0x508f28)]),_0x52b719=_0x490821[_0x1b7a3e(0x2bb)](_0x2027cb[_0x1b7a3e(0x1cd)[_0x1b7a3e(0x277)](_0x508f28)]);_0x37a75b[_0x1b7a3e(0x208)][_0x1b7a3e(0x36a)](0x0,0x0,_0x5dc2b8,_0x4b5e6f,_0x3f298d,_0x52b719,!![]);}this[_0x1b7a3e(0x338)]=_0x37a75b,this[_0x1b7a3e(0x27f)](this[_0x1b7a3e(0x338)]),this[_0x1b7a3e(0x303)]=this[_0x1b7a3e(0x338)]['width'],this[_0x1b7a3e(0x27b)]=this['_backgroundSprite'][_0x1b7a3e(0x27b)];}else this[_0x1b7a3e(0x1d3)]();}}else this[_0x1b7a3e(0x368)]=0x0;},BattleManager[_0x760d64(0x28f)]=function(){const _0x39cb9c=_0x760d64;if(this['_subject'])return![];if(this[_0x39cb9c(0x240)]!=='turn')return![];if(this['isInputting']())return![];return!![];},BattleManager[_0x760d64(0x1d3)]=function(){const _0x338e7c=_0x760d64;$gameTemp[_0x338e7c(0x22c)]()&&this[_0x338e7c(0x368)]>=0x14&&console[_0x338e7c(0x1c2)](_0x338e7c(0x255),this[_0x338e7c(0x368)]);this[_0x338e7c(0x375)]=null,this[_0x338e7c(0x240)]=_0x338e7c(0x1df),this[_0x338e7c(0x203)]=![],this['_debutCTB']=!![];for(const _0xf8dc99 of this[_0x338e7c(0x263)]()){if(_0x338e7c(0x2bf)!==_0x338e7c(0x2bf))_0x2008a0=_0x193d82['max'](_0x25e56f,_0x286a61);else{if(!_0xf8dc99)continue;if(_0xf8dc99[_0x338e7c(0x239)]()){_0xf8dc99[_0x338e7c(0x1ed)](_0x338e7c(0x299)),_0xf8dc99[_0x338e7c(0x205)]=_0x338e7c(0x2ec);const _0x148743=_0xf8dc99[_0x338e7c(0x215)],_0x2d8390=_0xf8dc99[_0x338e7c(0x224)]||0x0;_0xf8dc99[_0x338e7c(0x2ce)](![]),_0xf8dc99[_0x338e7c(0x215)]=_0x148743,_0xf8dc99[_0x338e7c(0x224)]=Math[_0x338e7c(0x388)](_0x2d8390,0.99),_0xf8dc99[_0x338e7c(0x1e8)]();}}}this[_0x338e7c(0x368)]===0xb4&&($gameParty[_0x338e7c(0x24c)](),$gameParty['removeBattleStates'][_0x338e7c(0x1c8)]($gameTroop));if(this[_0x338e7c(0x368)]===0x12c)for(const _0xdca0f5 of this[_0x338e7c(0x263)]()){if(!_0xdca0f5)continue;if(_0xdca0f5[_0x338e7c(0x1f8)]())continue;_0xdca0f5[_0x338e7c(0x1a5)]();}this['_anti_CTB_SoftlockCount']>=0x258&&(BattleManager[_0x338e7c(0x37b)](),$gameTemp[_0x338e7c(0x22c)]()&&console[_0x338e7c(0x1c2)](_0x338e7c(0x19d)));},VisuMZ[_0x760d64(0x2b7)][_0x760d64(0x377)]=BattleManager['updateAllTpbBattlers'],BattleManager['updateAllTpbBattlers']=function(){const _0x6eab38=_0x760d64;if(this[_0x6eab38(0x35e)]())_0x6eab38(0x360)!==_0x6eab38(0x37c)?this['updateAllTpbBattlersCTB']():_0x3ec399[_0x6eab38(0x36e)](_0xf656b1(_0x2f8ec0['$1'])*0.01);else{if(_0x6eab38(0x330)===_0x6eab38(0x330))VisuMZ[_0x6eab38(0x2b7)][_0x6eab38(0x377)][_0x6eab38(0x1c8)](this);else return _0x1e21f6[_0x6eab38(0x31a)][_0x6eab38(0x25b)];}},BattleManager['updateAllTpbBattlersCTB']=function(){const _0x5756b0=_0x760d64,_0x22969f=this['allBattleMembers']();_0x22969f[_0x5756b0(0x34a)]((_0xe43cdd,_0x2d02fa)=>{const _0x3a5422=_0x5756b0;if('tufFC'!==_0x3a5422(0x387))return _0xe43cdd['ctbTicksToGoal'](0x1)-_0x2d02fa['ctbTicksToGoal'](0x1);else!this[_0x3a5422(0x218)]()&&(this[_0x3a5422(0x1b6)]+=this['tpbAcceleration']());});for(const _0x49dbdb of _0x22969f){this['updateTpbBattler'](_0x49dbdb);}},VisuMZ[_0x760d64(0x2b7)][_0x760d64(0x2f7)]=BattleManager[_0x760d64(0x23f)],BattleManager['startBattle']=function(){const _0x477ef0=_0x760d64;VisuMZ[_0x477ef0(0x2b7)][_0x477ef0(0x2f7)][_0x477ef0(0x1c8)](this),this[_0x477ef0(0x2e2)](!![]);},VisuMZ[_0x760d64(0x2b7)]['BattleManager_endAction']=BattleManager[_0x760d64(0x347)],BattleManager[_0x760d64(0x347)]=function(){const _0x5c7119=_0x760d64;this['preEndActionCTB'](),VisuMZ[_0x5c7119(0x2b7)]['BattleManager_endAction'][_0x5c7119(0x1c8)](this),this['postEndActionCTB']();},BattleManager['preEndActionCTB']=function(){const _0x412760=_0x760d64;if(!this['isCTB']())return;this[_0x412760(0x375)]&&this[_0x412760(0x375)][_0x412760(0x306)]()<=0x0&&(this['rotateCTBSprites'](),this[_0x412760(0x375)][_0x412760(0x1ed)](_0x412760(0x299)));},BattleManager['postEndActionCTB']=function(){const _0x5c4b09=_0x760d64;if(!this[_0x5c4b09(0x35e)]())return;if(this[_0x5c4b09(0x375)]&&$gameTemp['isCommonEventReserved']()){if(_0x5c4b09(0x29a)===_0x5c4b09(0x1f4))_0x446d4d['isCTB']()?this[_0x5c4b09(0x2b6)]():_0xbcf4a2[_0x5c4b09(0x2b7)][_0x5c4b09(0x1d9)][_0x5c4b09(0x1c8)](this);else{this[_0x5c4b09(0x375)][_0x5c4b09(0x205)]=_0x5c4b09(0x192),this[_0x5c4b09(0x375)][_0x5c4b09(0x342)]=_0x5c4b09(0x1fb);return;}}this[_0x5c4b09(0x2e2)](),this[_0x5c4b09(0x375)]&&this[_0x5c4b09(0x30e)]();},VisuMZ['BattleSystemCTB'][_0x760d64(0x256)]=BattleManager[_0x760d64(0x35d)],BattleManager[_0x760d64(0x35d)]=function(){const _0xa19ac1=_0x760d64;this[_0xa19ac1(0x2e2)](),VisuMZ[_0xa19ac1(0x2b7)][_0xa19ac1(0x256)][_0xa19ac1(0x1c8)](this);},BattleManager[_0x760d64(0x2e2)]=function(_0x46c43e){const _0x4683da=_0x760d64;if(!this[_0x4683da(0x35e)]())return;const _0x331326=SceneManager['_scene'][_0x4683da(0x25b)];if(!_0x331326)return;_0x331326[_0x4683da(0x2c5)](_0x46c43e);},BattleManager[_0x760d64(0x290)]=function(){const _0x15d5cc=_0x760d64;if(!this[_0x15d5cc(0x35e)]())return;const _0x223839=SceneManager[_0x15d5cc(0x31a)][_0x15d5cc(0x25b)];if(!_0x223839)return;_0x223839[_0x15d5cc(0x1ae)](this['_subject']);},BattleManager['logCtbData']=function(){const _0x3fd32f=_0x760d64,_0x33af57=this['allBattleMembers']()[_0x3fd32f(0x24a)](_0x3b0542=>String([_0x3b0542['name'](),_0x3fd32f(0x274)+_0x3b0542[_0x3fd32f(0x35c)](0x1)]));console[_0x3fd32f(0x1c2)](_0x33af57);},VisuMZ['BattleSystemCTB'][_0x760d64(0x1f2)]=Game_System['prototype'][_0x760d64(0x2dd)],Game_System[_0x760d64(0x1d8)][_0x760d64(0x2dd)]=function(){const _0x81bda=_0x760d64;VisuMZ[_0x81bda(0x2b7)][_0x81bda(0x1f2)][_0x81bda(0x1c8)](this),this[_0x81bda(0x27d)]();},Game_System[_0x760d64(0x1d8)][_0x760d64(0x27d)]=function(){const _0x435682=_0x760d64;this[_0x435682(0x29e)]=!![];},Game_System[_0x760d64(0x1d8)][_0x760d64(0x209)]=function(){const _0xc3bb7e=_0x760d64;if(this[_0xc3bb7e(0x29e)]===undefined){if('CilNp'!=='CilNp'){const _0x1cdfe6=_0x4b9a0e[_0xc3bb7e(0x26d)],_0x35b296=this[_0xc3bb7e(0x365)](),_0x48937c=_0x35b296?_0x1cdfe6[_0xc3bb7e(0x25a)]:_0x1cdfe6[_0xc3bb7e(0x2eb)];this[_0xc3bb7e(0x370)]-=0x1,this[_0xc3bb7e(0x370)]<0x0&&(this['_dupe']=_0x48937c-0x1,this['startFade'](0x0));}else this[_0xc3bb7e(0x27d)]();}return this[_0xc3bb7e(0x29e)];},Game_System[_0x760d64(0x1d8)][_0x760d64(0x352)]=function(_0x1b91af){const _0x452bc0=_0x760d64;this[_0x452bc0(0x29e)]===undefined&&this[_0x452bc0(0x27d)](),this[_0x452bc0(0x29e)]=_0x1b91af;},VisuMZ[_0x760d64(0x2b7)][_0x760d64(0x341)]=Game_Action[_0x760d64(0x1d8)]['applyItemUserEffect'],Game_Action[_0x760d64(0x1d8)][_0x760d64(0x20e)]=function(_0xb76531){const _0x5662bc=_0x760d64;VisuMZ[_0x5662bc(0x2b7)][_0x5662bc(0x341)][_0x5662bc(0x1c8)](this,_0xb76531),this[_0x5662bc(0x36b)](_0xb76531);},Game_Action[_0x760d64(0x1d8)]['applyBattleSystemCTBUserEffect']=function(_0x45960d){const _0x1a17e9=_0x760d64;if(!SceneManager['isSceneBattle']())return;if(!BattleManager['isCTB']())return;if(this[_0x1a17e9(0x2d4)]())this[_0x1a17e9(0x1d4)](_0x45960d);},Game_Action[_0x760d64(0x1d8)][_0x760d64(0x1d4)]=function(_0x3ff55f){const _0x1e5cae=_0x760d64,_0x1b4f2a=this[_0x1e5cae(0x2d4)]()[_0x1e5cae(0x257)];if(_0x3ff55f[_0x1e5cae(0x210)]()){const _0xd3c2aa=VisuMZ[_0x1e5cae(0x2b7)][_0x1e5cae(0x2d2)](this[_0x1e5cae(0x2d4)](),'Charge');if(VisuMZ['BattleSystemCTB']['JS'][_0xd3c2aa]){if('bwowW'!==_0x1e5cae(0x235)){const _0x58651f=VisuMZ[_0x1e5cae(0x2b7)]['JS'][_0xd3c2aa][_0x1e5cae(0x1c8)](this,this[_0x1e5cae(0x335)](),_0x3ff55f);_0x3ff55f['setCtbChargeTime'](_0x58651f);}else this[_0x1e5cae(0x2af)]=_0x2ed8c4;}if(_0x1b4f2a['match'](/<(?:CTB) CHARGE (?:GAUGE|TIME|SPEED):[ ](\d+)([%％])>/i)){if(_0x1e5cae(0x262)==='XUtzC')_0x3ff55f['setCtbChargeTime'](Number(RegExp['$1'])*0.01);else return _0x2ce05d['x']-_0xf16e94['x'];}_0x1b4f2a['match'](/<(?:CTB) CHARGE (?:GAUGE|TIME|SPEED):[ ]([\+\-]\d+)([%％])>/i)&&_0x3ff55f[_0x1e5cae(0x1c4)](Number(RegExp['$1'])*0.01);}else{if(_0x3ff55f[_0x1e5cae(0x1e3)]()){const _0x4097de=VisuMZ['BattleSystemCTB']['createKeyJS'](this[_0x1e5cae(0x2d4)](),_0x1e5cae(0x309));if(VisuMZ[_0x1e5cae(0x2b7)]['JS'][_0x4097de]){if('eGExP'===_0x1e5cae(0x2fa)){const _0x20c49e=VisuMZ[_0x1e5cae(0x2b7)]['JS'][_0x4097de][_0x1e5cae(0x1c8)](this,this[_0x1e5cae(0x335)](),_0x3ff55f);_0x3ff55f[_0x1e5cae(0x305)](_0x20c49e);}else this[_0x1e5cae(0x1b6)]+=this[_0x1e5cae(0x271)]();}_0x1b4f2a['match'](/<(?:CTB) CAST (?:GAUGE|TIME|SPEED):[ ](\d+)([%％])>/i)&&_0x3ff55f[_0x1e5cae(0x305)](Number(RegExp['$1'])*0.01),_0x1b4f2a['match'](/<(?:CTB) CAST (?:GAUGE|TIME|SPEED):[ ]([\+\-]\d+)([%％])>/i)&&_0x3ff55f[_0x1e5cae(0x228)](Number(RegExp['$1'])*0.01);}}const _0x26bb55=VisuMZ['BattleSystemCTB']['createKeyJS'](this[_0x1e5cae(0x2d4)](),_0x1e5cae(0x2c1));if(VisuMZ[_0x1e5cae(0x2b7)]['JS'][_0x26bb55]){const _0x5956dd=VisuMZ[_0x1e5cae(0x2b7)]['JS'][_0x26bb55][_0x1e5cae(0x1c8)](this,this[_0x1e5cae(0x335)](),_0x3ff55f);_0x3ff55f[_0x1e5cae(0x23b)](_0x5956dd);}if(_0x1b4f2a[_0x1e5cae(0x334)](/<(?:CTB) (?:SET|MAKE|EXACT) ORDER:[ ](\d+)>/i)){if(_0x1e5cae(0x244)!==_0x1e5cae(0x244)){const _0x4cf8d0=this[_0x1e5cae(0x2e0)];this[_0x1e5cae(0x2ed)]=(this[_0x1e5cae(0x2ed)]*(_0x4cf8d0-0x1)+this[_0x1e5cae(0x34d)])/_0x4cf8d0,this['_fadeDuration']--,this[_0x1e5cae(0x2e0)]<=0x0&&(this[_0x1e5cae(0x21e)](),this[_0x1e5cae(0x1bd)]=0x0,this[_0x1e5cae(0x288)](),this[_0x1e5cae(0x2ed)]=this['_fadeTarget']);}else _0x3ff55f[_0x1e5cae(0x23b)](Number(RegExp['$1']));}if(_0x1b4f2a[_0x1e5cae(0x334)](/<(?:CTB) (?:CHANGE|DELAY|RUSH|SHIFT) ORDER:[ ]([\+\-]\d+)>/i)){if(_0x1e5cae(0x241)!=='RiOIS'){const _0x3f3e00=this[_0x1e5cae(0x2de)],_0x22456b=this[_0x1e5cae(0x252)](),_0x206846=this['bitmapHeight']();this[_0x1e5cae(0x1c1)][_0x1e5cae(0x208)]=new _0x5006c1(_0x22456b,_0x206846);const _0x5a20f5=this[_0x1e5cae(0x1c1)][_0x1e5cae(0x208)],_0x10af56=_0x32e14c[_0x1e5cae(0x1fa)],_0x3539a5=_0x4c0ef0['iconHeight'],_0x2b3970=_0x1cc234['min'](_0x10af56,_0x3539a5,_0x22456b,_0x206846),_0x4abc62=_0x3f3e00%0x10*_0x10af56,_0x41c972=_0x5c32ca[_0x1e5cae(0x37a)](_0x3f3e00/0x10)*_0x3539a5,_0x169597=_0x7d4ed6[_0x1e5cae(0x37a)](_0x59e2a6['max'](_0x22456b-_0x2b3970,0x0)/0x2),_0x2aa47d=_0x1b345a[_0x1e5cae(0x37a)](_0x5e38ad[_0x1e5cae(0x1ac)](_0x206846-_0x2b3970,0x0)/0x2);_0x5a20f5[_0x1e5cae(0x1f9)](_0x9444f,_0x4abc62,_0x41c972,_0x10af56,_0x3539a5,_0x169597,_0x2aa47d,_0x2b3970,_0x2b3970);}else _0x3ff55f[_0x1e5cae(0x36c)](Number(RegExp['$1']));}},VisuMZ[_0x760d64(0x2b7)][_0x760d64(0x231)]=Game_Action[_0x760d64(0x1d8)][_0x760d64(0x2f6)],Game_Action['prototype'][_0x760d64(0x2f6)]=function(){const _0x3f44f8=_0x760d64;VisuMZ['BattleSystemCTB'][_0x3f44f8(0x231)][_0x3f44f8(0x1c8)](this),this[_0x3f44f8(0x2e5)]();},Game_Action[_0x760d64(0x1d8)]['applyGlobalBattleSystemCTBEffects']=function(){const _0x2334f7=_0x760d64;if(!this[_0x2334f7(0x2d4)]())return;if(!BattleManager[_0x2334f7(0x35e)]())return;const _0x34c07b=this[_0x2334f7(0x2d4)]()[_0x2334f7(0x257)];let _0x2cb36a=0x0;if(this['_forcing']){if('tjDfa'!==_0x2334f7(0x21f))return _0x2052ae[_0x2334f7(0x2b7)][_0x2334f7(0x378)][_0x2334f7(0x1c8)](this);else _0x2cb36a=this['subject']()[_0x2334f7(0x224)];}const _0x263011=VisuMZ[_0x2334f7(0x2b7)][_0x2334f7(0x2d2)](this[_0x2334f7(0x2d4)](),'After');VisuMZ[_0x2334f7(0x2b7)]['JS'][_0x263011]&&(_0x2cb36a+=VisuMZ['BattleSystemCTB']['JS'][_0x263011][_0x2334f7(0x1c8)](this,this[_0x2334f7(0x335)](),this[_0x2334f7(0x335)]()));let _0x4da150=this[_0x2334f7(0x2d4)]()[_0x2334f7(0x1c7)]>0x0?this[_0x2334f7(0x2d4)]()['speed']:0x0;if(this[_0x2334f7(0x1e9)]())_0x4da150+=this['subject']()[_0x2334f7(0x310)]();_0x2cb36a+=(_0x4da150/0xfa0)['clamp'](0x0,0x1);if(_0x34c07b['match'](/<(?:CTB) AFTER (?:GAUGE|TIME|SPEED):[ ](\d+)([%％])>/i)){if(_0x2334f7(0x2d6)==='cpjFC')return this[_0x2334f7(0x286)]===_0x57d132&&(this[_0x2334f7(0x286)]=this['createTurnOrderCTBGraphicType']()),this[_0x2334f7(0x286)];else _0x2cb36a+=Number(RegExp['$1'])*0.01;}const _0x31d153=this[_0x2334f7(0x335)]()[_0x2334f7(0x1af)]()[_0x2334f7(0x190)](this[_0x2334f7(0x335)]()[_0x2334f7(0x23e)]()),_0x433e8f=/<(?:CTB) AFTER (?:GAUGE|TIME|SPEED):[ ]([\+\-]\d+)([%％])>/i,_0x2aa60d=_0x31d153[_0x2334f7(0x24a)](_0xfc1eb4=>_0xfc1eb4&&_0xfc1eb4[_0x2334f7(0x257)][_0x2334f7(0x334)](_0x433e8f)?Number(RegExp['$1'])*0.01:0x0);_0x2cb36a=_0x2aa60d[_0x2334f7(0x1e1)]((_0x20f86b,_0x113f7b)=>_0x20f86b+_0x113f7b,_0x2cb36a),this[_0x2334f7(0x335)]()[_0x2334f7(0x1b4)](_0x2cb36a);},Game_BattlerBase[_0x760d64(0x1d8)]['setCtbChargeTime']=function(_0x3ae6ec){const _0x377f9d=_0x760d64;this[_0x377f9d(0x224)]=_0x3ae6ec;},Game_BattlerBase['prototype'][_0x760d64(0x1c4)]=function(_0x1178d3){const _0x90b507=_0x760d64;this[_0x90b507(0x36e)](this[_0x90b507(0x224)]+_0x1178d3);},Game_BattlerBase[_0x760d64(0x1d8)][_0x760d64(0x305)]=function(_0x718a52){const _0x3ca26e=_0x760d64,_0x3f425a=this[_0x3ca26e(0x1a4)]();this[_0x3ca26e(0x21a)]=_0x3f425a*_0x718a52;},Game_BattlerBase[_0x760d64(0x1d8)][_0x760d64(0x228)]=function(_0x47d59d){const _0x5c6b36=_0x760d64,_0xedad41=this[_0x5c6b36(0x1a4)](),_0x37c240=_0xedad41*_0x47d59d;this[_0x5c6b36(0x21a)]=this[_0x5c6b36(0x21a)]+_0x37c240;},VisuMZ[_0x760d64(0x2b7)][_0x760d64(0x199)]=Game_BattlerBase[_0x760d64(0x1d8)][_0x760d64(0x234)],Game_BattlerBase[_0x760d64(0x1d8)]['appear']=function(){const _0x3735f8=_0x760d64;VisuMZ['BattleSystemCTB'][_0x3735f8(0x199)][_0x3735f8(0x1c8)](this),BattleManager[_0x3735f8(0x2e2)]();},VisuMZ[_0x760d64(0x2b7)][_0x760d64(0x18b)]=Game_BattlerBase[_0x760d64(0x1d8)][_0x760d64(0x345)],Game_BattlerBase[_0x760d64(0x1d8)][_0x760d64(0x345)]=function(){const _0x561c19=_0x760d64;VisuMZ['BattleSystemCTB']['Game_BattlerBase_hide']['call'](this),BattleManager[_0x561c19(0x2e2)]();},Game_BattlerBase[_0x760d64(0x1d8)][_0x760d64(0x317)]=function(){const _0xa8fd0=_0x760d64;delete this[_0xa8fd0(0x286)],delete this[_0xa8fd0(0x1ba)],delete this[_0xa8fd0(0x232)],delete this['_ctbTurnOrderIconIndex'];},Game_BattlerBase[_0x760d64(0x1d8)][_0x760d64(0x1cf)]=function(){const _0x19f577=_0x760d64;return this['_ctbTurnOrderGraphicType']===undefined&&(this[_0x19f577(0x286)]=this['createTurnOrderCTBGraphicType']()),this['_ctbTurnOrderGraphicType'];},Game_BattlerBase[_0x760d64(0x1d8)][_0x760d64(0x366)]=function(){const _0xf43caa=_0x760d64;return Window_CTB_TurnOrder[_0xf43caa(0x26d)][_0xf43caa(0x204)];},Game_BattlerBase[_0x760d64(0x1d8)][_0x760d64(0x369)]=function(){const _0x183cca=_0x760d64;return this[_0x183cca(0x1ba)]===undefined&&(this['_ctbTurnOrderFaceName']=this[_0x183cca(0x2b8)]()),this['_ctbTurnOrderFaceName'];},Game_BattlerBase['prototype']['createTurnOrderCTBGraphicFaceName']=function(){const _0x1a9a8e=_0x760d64;return Window_CTB_TurnOrder[_0x1a9a8e(0x26d)][_0x1a9a8e(0x1bf)];},Game_BattlerBase[_0x760d64(0x1d8)][_0x760d64(0x27a)]=function(){const _0x472ec7=_0x760d64;return this[_0x472ec7(0x232)]===undefined&&(this['_ctbTurnOrderFaceIndex']=this[_0x472ec7(0x28e)]()),this[_0x472ec7(0x232)];},Game_BattlerBase['prototype']['createTurnOrderCTBGraphicFaceIndex']=function(){const _0x2ef6b1=_0x760d64;return Window_CTB_TurnOrder[_0x2ef6b1(0x26d)][_0x2ef6b1(0x2c4)];},Game_BattlerBase[_0x760d64(0x1d8)][_0x760d64(0x26f)]=function(){const _0x418bfe=_0x760d64;return this[_0x418bfe(0x2af)]===undefined&&('mZmyi'!=='mZmyi'?(_0x43579b[_0x418bfe(0x2b7)]['ParseItemNotetags'][_0x418bfe(0x1c8)](this,_0x15225a),_0x3144dc['BattleSystemCTB'][_0x418bfe(0x34c)](_0x4274d2)):this['_ctbTurnOrderIconIndex']=this['createTurnOrderCTBGraphicIconIndex']()),this[_0x418bfe(0x2af)];},Game_BattlerBase[_0x760d64(0x1d8)][_0x760d64(0x1c3)]=function(){const _0x1bbc12=_0x760d64;return Window_CTB_TurnOrder[_0x1bbc12(0x26d)]['EnemyBattlerIcon'];},Game_BattlerBase[_0x760d64(0x1d8)][_0x760d64(0x319)]=function(_0x16ec82){this['_ctbTurnOrderIconIndex']=_0x16ec82;},Game_BattlerBase[_0x760d64(0x1d8)]['ctbTicksToGoal']=function(_0x3ba6f8,_0x560196){const _0x2b4038=_0x760d64;if(this[_0x2b4038(0x1f8)]())return Number[_0x2b4038(0x383)];if(!this['isAppeared']())return Number['MAX_SAFE_INTEGER'];const _0x30e088=0x1;_0x3ba6f8*=_0x30e088;if(_0x3ba6f8===_0x30e088&&!_0x560196){if(this===BattleManager[_0x2b4038(0x375)]){if(_0x2b4038(0x297)!==_0x2b4038(0x297))this[_0x2b4038(0x1ad)]();else return Number['MIN_SAFE_INTEGER']/0xa;}if(this===BattleManager[_0x2b4038(0x287)]()){if(_0x2b4038(0x2d0)!==_0x2b4038(0x2d0)){if(this[_0x2b4038(0x2e8)])return;this[_0x2b4038(0x205)]=_0x2b4038(0x2ec),this['_tpbChargeTime']-=0x1,this['_tpbChargeTime']+=this[_0x2b4038(0x233)]||0x0;}else return Number[_0x2b4038(0x265)]/0xa;}if(BattleManager['_actionBattlers']&&BattleManager[_0x2b4038(0x1a7)][_0x2b4038(0x26e)](this)){if(_0x2b4038(0x35b)!=='YBwBB'){let _0x7ae674=Number[_0x2b4038(0x265)]/0x1388;return _0x7ae674+=BattleManager[_0x2b4038(0x1a7)]['indexOf'](this)*0x5,_0x7ae674;}else this[_0x2b4038(0x1a0)]=_0x7694d6['battlerName'](),_0x2e73dd=_0x3d61f5[_0x2b4038(0x1db)](this[_0x2b4038(0x1a0)]),_0x5d8b6b[_0x2b4038(0x1d1)](this['changeEnemyGraphicBitmap'][_0x2b4038(0x1e6)](this,_0x4d9dc4));}if(this[_0x2b4038(0x205)]===_0x2b4038(0x268))return(this[_0x2b4038(0x1a4)]()*_0x30e088-this[_0x2b4038(0x21a)])/this['tpbAcceleration']();}return _0x3ba6f8-=this[_0x2b4038(0x272)]()*_0x30e088,_0x3ba6f8/=this[_0x2b4038(0x271)]()*_0x30e088,_0x3ba6f8||0x0;},Game_BattlerBase['prototype'][_0x760d64(0x1e2)]=function(){const _0x5cc25e=_0x760d64;return this[_0x5cc25e(0x205)]===_0x5cc25e(0x268)?(this[_0x5cc25e(0x1a4)]()-this[_0x5cc25e(0x21a)])/this[_0x5cc25e(0x271)]():0x0;},VisuMZ['BattleSystemCTB'][_0x760d64(0x276)]=Game_Battler[_0x760d64(0x1d8)][_0x760d64(0x18d)],Game_Battler[_0x760d64(0x1d8)][_0x760d64(0x18d)]=function(_0x5122e0){const _0x91ad1b=_0x760d64;BattleManager['isCTB']()?this[_0x91ad1b(0x2ff)](_0x5122e0):'TDEso'==='WCldL'?(this[_0x91ad1b(0x368)]=this[_0x91ad1b(0x368)]||0x0,this[_0x91ad1b(0x368)]++,this[_0x91ad1b(0x368)]>=_0x32598c&&this[_0x91ad1b(0x1d3)]()):VisuMZ[_0x91ad1b(0x2b7)]['Game_Battler_initTpbChargeTime'][_0x91ad1b(0x1c8)](this,_0x5122e0);},Game_Battler[_0x760d64(0x1d8)][_0x760d64(0x2ff)]=function(_0x51d344){const _0x4f5371=_0x760d64,_0x53608e=VisuMZ[_0x4f5371(0x2b7)][_0x4f5371(0x26d)][_0x4f5371(0x2d3)];let _0x5e4c96=this[_0x4f5371(0x191)]()*eval(_0x53608e[_0x4f5371(0x22d)]);const _0x315922=this[_0x4f5371(0x1af)]()['concat'](this['skills']()),_0x436d6c=/<(?:CTB) (?:BATTLE START|START) (?:GAUGE|TIME|SPEED): ([\+\-]\d+)([%％])>/i,_0x126c8d=_0x315922['map'](_0x1f6df6=>_0x1f6df6&&_0x1f6df6[_0x4f5371(0x257)]['match'](_0x436d6c)?Number(RegExp['$1'])*0.01:0x0);_0x5e4c96=_0x126c8d[_0x4f5371(0x1e1)]((_0x4f4209,_0x4a0a39)=>_0x4f4209+_0x4a0a39,_0x5e4c96),this[_0x4f5371(0x205)]=_0x4f5371(0x2ec),this[_0x4f5371(0x224)]=(_0x51d344?0x1:_0x5e4c96)[_0x4f5371(0x1dc)](0x0,0x1),this[_0x4f5371(0x22a)]()&&(this[_0x4f5371(0x224)]=0x0);},Game_Battler['prototype']['isCtbChargingState']=function(){const _0x495fae=_0x760d64;return this['_tpbState']===_0x495fae(0x2ec);},Game_Battler[_0x760d64(0x1d8)][_0x760d64(0x1e3)]=function(){const _0x338fb5=_0x760d64;return this[_0x338fb5(0x205)]===_0x338fb5(0x268)&&this['currentAction']()&&this['currentAction']()[_0x338fb5(0x2d4)]()&&this[_0x338fb5(0x381)]()[_0x338fb5(0x2d4)]()[_0x338fb5(0x1c7)]<0x0;},Game_BattlerBase[_0x760d64(0x1d8)]['getCtbCastTimeRate']=function(){const _0x39c258=_0x760d64;return this[_0x39c258(0x1e3)]()?this[_0x39c258(0x21a)]/this[_0x39c258(0x1a4)]():0x0;},Game_Battler[_0x760d64(0x1d8)][_0x760d64(0x34b)]=function(){return!this['canMove']();},Game_Battler[_0x760d64(0x1d8)][_0x760d64(0x1b4)]=function(_0x17d0e4){this['_ctbAfterSpeed']=_0x17d0e4;},VisuMZ['BattleSystemCTB'][_0x760d64(0x19f)]=Game_Battler['prototype'][_0x760d64(0x2cb)],Game_Battler[_0x760d64(0x1d8)][_0x760d64(0x2cb)]=function(){const _0x178e34=_0x760d64;if(BattleManager[_0x178e34(0x35e)]()){if(_0x178e34(0x1da)==='kEKyt')return this['processUpdateGraphic']();else this['updateTpbIdleTimeCTB']();}else VisuMZ[_0x178e34(0x2b7)][_0x178e34(0x19f)]['call'](this);},Game_Battler[_0x760d64(0x1d8)][_0x760d64(0x1ce)]=function(){const _0x56205c=_0x760d64;!this[_0x56205c(0x218)]()&&(_0x56205c(0x1b3)===_0x56205c(0x301)?_0x52e614['changeCtbCastTime'](_0x4be859(_0x4e11fb['$1'])*0.01):this['_tpbIdleTime']+=this[_0x56205c(0x271)]());},VisuMZ[_0x760d64(0x2b7)][_0x760d64(0x30a)]=Game_Battler['prototype'][_0x760d64(0x294)],Game_Battler[_0x760d64(0x1d8)]['onRestrict']=function(){const _0x4c2401=_0x760d64;this['_onRestrictBypassCtbReset']=BattleManager['isCTB'](),VisuMZ['BattleSystemCTB'][_0x4c2401(0x30a)]['call'](this),this[_0x4c2401(0x2e8)]=undefined;},VisuMZ['BattleSystemCTB'][_0x760d64(0x1d9)]=Game_Battler[_0x760d64(0x1d8)]['clearTpbChargeTime'],Game_Battler['prototype'][_0x760d64(0x1a8)]=function(){const _0x575c30=_0x760d64;BattleManager[_0x575c30(0x35e)]()?this[_0x575c30(0x2b6)]():_0x575c30(0x1ee)===_0x575c30(0x1ee)?VisuMZ[_0x575c30(0x2b7)][_0x575c30(0x1d9)][_0x575c30(0x1c8)](this):(this[_0x575c30(0x205)]=_0x575c30(0x2ec),this[_0x575c30(0x224)]+=_0x28dc4e[_0x575c30(0x2b7)][_0x575c30(0x26d)][_0x575c30(0x2d3)][_0x575c30(0x230)]||0x0);},Game_Battler[_0x760d64(0x1d8)]['clearTpbChargeTimeCTB']=function(){const _0x2d4b47=_0x760d64;if(this['_onRestrictBypassCtbReset'])return;this[_0x2d4b47(0x205)]=_0x2d4b47(0x2ec),this[_0x2d4b47(0x224)]-=0x1,this[_0x2d4b47(0x224)]+=this['_ctbAfterSpeed']||0x0;},VisuMZ[_0x760d64(0x2b7)][_0x760d64(0x2c0)]=Game_Battler['prototype']['applyTpbPenalty'],Game_Battler[_0x760d64(0x1d8)][_0x760d64(0x1f7)]=function(){const _0x1e2e31=_0x760d64;BattleManager['isCTB']()?this[_0x1e2e31(0x329)]():_0x1e2e31(0x20a)===_0x1e2e31(0x20a)?VisuMZ[_0x1e2e31(0x2b7)]['Game_Battler_applyTpbPenalty'][_0x1e2e31(0x1c8)](this):_0x31aecc[_0x1e2e31(0x35e)]()?this[_0x1e2e31(0x1ce)]():_0x5dff0a[_0x1e2e31(0x2b7)][_0x1e2e31(0x19f)][_0x1e2e31(0x1c8)](this);},Game_Battler[_0x760d64(0x1d8)]['applyCTBPenalty']=function(){const _0x485e89=_0x760d64;this[_0x485e89(0x205)]=_0x485e89(0x2ec),this[_0x485e89(0x224)]+=VisuMZ['BattleSystemCTB'][_0x485e89(0x26d)]['Mechanics'][_0x485e89(0x230)]||0x0;},VisuMZ[_0x760d64(0x2b7)]['Game_Battler_tpbSpeed']=Game_Battler[_0x760d64(0x1d8)]['tpbSpeed'],Game_Battler[_0x760d64(0x1d8)][_0x760d64(0x384)]=function(){const _0x40ade0=_0x760d64;if(BattleManager['isCTB']()){if(_0x40ade0(0x289)==='OWqam')return VisuMZ[_0x40ade0(0x2b7)][_0x40ade0(0x26d)][_0x40ade0(0x2d3)][_0x40ade0(0x282)]['call'](this,this);else{const _0x40c4a0=this[_0x40ade0(0x287)]()[_0x40ade0(0x257)];if(_0x40c4a0[_0x40ade0(0x334)](/<CTB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i))return _0x40ade0(0x29c);else{if(_0x40c4a0[_0x40ade0(0x334)](/<CTB TURN ORDER ICON:[ ](\d+)>/i))return _0x40ade0(0x1d7);}return _0x1be970['Settings']['ActorBattlerType'];}}else return VisuMZ[_0x40ade0(0x2b7)][_0x40ade0(0x2f5)][_0x40ade0(0x1c8)](this);},VisuMZ[_0x760d64(0x2b7)][_0x760d64(0x378)]=Game_Battler[_0x760d64(0x1d8)][_0x760d64(0x2d8)],Game_Battler[_0x760d64(0x1d8)][_0x760d64(0x2d8)]=function(){const _0x358cde=_0x760d64;if(BattleManager['isCTB']())return VisuMZ[_0x358cde(0x2b7)]['Settings'][_0x358cde(0x2d3)][_0x358cde(0x1f6)]['call'](this,this);else{if(_0x358cde(0x304)===_0x358cde(0x304))return VisuMZ[_0x358cde(0x2b7)][_0x358cde(0x378)]['call'](this);else{const _0x1af706=_0x4572ed[_0x358cde(0x26d)];return this['isHorz']()?_0x1af706[_0x358cde(0x326)]:_0x1af706[_0x358cde(0x2a9)];}}},VisuMZ['BattleSystemCTB'][_0x760d64(0x26a)]=Game_Battler[_0x760d64(0x1d8)][_0x760d64(0x191)],Game_Battler['prototype'][_0x760d64(0x191)]=function(){const _0x43bacd=_0x760d64;if(BattleManager['isCTB']())return VisuMZ['BattleSystemCTB'][_0x43bacd(0x26d)][_0x43bacd(0x2d3)][_0x43bacd(0x24e)][_0x43bacd(0x1c8)](this,this);else{if(_0x43bacd(0x1f1)!==_0x43bacd(0x1f1)){const _0x135fc8=_0x16984a[_0x43bacd(0x26d)];return this[_0x43bacd(0x365)]()?_0x135fc8['SpriteThin']:_0x135fc8[_0x43bacd(0x326)];}else return VisuMZ[_0x43bacd(0x2b7)][_0x43bacd(0x26a)][_0x43bacd(0x1c8)](this);}},VisuMZ[_0x760d64(0x2b7)][_0x760d64(0x1bb)]=Game_Battler[_0x760d64(0x1d8)][_0x760d64(0x271)],Game_Battler[_0x760d64(0x1d8)][_0x760d64(0x271)]=function(){const _0x5ce687=_0x760d64;if(BattleManager[_0x5ce687(0x35e)]()){if(_0x5ce687(0x2c2)===_0x5ce687(0x2e3)){const _0x139d1d=_0x1dd269[_0x5ce687(0x22f)[_0x5ce687(0x277)](_0x47343c)],_0x5ed735={'textColor':_0x188dd4['getColor'](_0x1601ce[_0x5ce687(0x31c)['format'](_0x5e459c)]),'flashColor':_0x11b0f8[_0x5ce687(0x321)[_0x5ce687(0x277)](_0x9de259)],'flashDuration':_0x357920[_0x5ce687(0x315)[_0x5ce687(0x277)](_0x8ef4b7)]};this[_0x5ce687(0x2bd)](_0x139d1d,_0x5ed735);}else{let _0x40d19f=VisuMZ[_0x5ce687(0x2b7)][_0x5ce687(0x26d)]['Mechanics']['TpbAccelerationJS'][_0x5ce687(0x1c8)](this,this);const _0x56883a=0x0;return _0x40d19f+_0x56883a;}}else{if('SlUOk'===_0x5ce687(0x273))this['_graphicType']='face';else return VisuMZ[_0x5ce687(0x2b7)][_0x5ce687(0x1bb)][_0x5ce687(0x1c8)](this);}},VisuMZ[_0x760d64(0x2b7)]['Game_Battler_tpbRequiredCastTime']=Game_Battler[_0x760d64(0x1d8)]['tpbRequiredCastTime'],Game_Battler[_0x760d64(0x1d8)][_0x760d64(0x1a4)]=function(){const _0x30f3a5=_0x760d64;return BattleManager[_0x30f3a5(0x35e)]()?_0x30f3a5(0x382)==='IPYJP'?VisuMZ['BattleSystemCTB'][_0x30f3a5(0x26d)][_0x30f3a5(0x2d3)][_0x30f3a5(0x211)][_0x30f3a5(0x1c8)](this,this):_0x4f96c2['BattleSystemCTB'][_0x30f3a5(0x26d)][_0x30f3a5(0x2d3)][_0x30f3a5(0x24e)][_0x30f3a5(0x1c8)](this,this):VisuMZ['BattleSystemCTB'][_0x30f3a5(0x296)][_0x30f3a5(0x1c8)](this);},Game_Battler['prototype'][_0x760d64(0x339)]=function(){const _0x328fa7=_0x760d64,_0xfd461f=SceneManager[_0x328fa7(0x31a)][_0x328fa7(0x25b)];if(!_0xfd461f)return-0x1;const _0x253efb=_0xfd461f[_0x328fa7(0x275)];if(!_0x253efb)return-0x1;const _0x487bdd=_0x253efb['find'](_0x2f46ef=>_0x2f46ef[_0x328fa7(0x212)]()===this);return _0x253efb[_0x328fa7(0x346)](_0x487bdd);},Game_Battler[_0x760d64(0x1d8)][_0x760d64(0x36c)]=function(_0x36cbcc){const _0x5a602f=_0x760d64;if(!BattleManager[_0x5a602f(0x35e)]())return;if(!SceneManager[_0x5a602f(0x29f)]())return;if(this===BattleManager[_0x5a602f(0x287)]())return;if(this===BattleManager[_0x5a602f(0x375)])return;const _0x1a12f7=this[_0x5a602f(0x339)]();if(_0x1a12f7<0x0)return;this[_0x5a602f(0x23b)](_0x1a12f7+_0x36cbcc);},Game_Battler[_0x760d64(0x1d8)][_0x760d64(0x23b)]=function(_0x8a9be){const _0x348168=_0x760d64;if(!BattleManager[_0x348168(0x35e)]())return;if(!SceneManager[_0x348168(0x29f)]())return;if(this===BattleManager[_0x348168(0x287)]())return;if(this===BattleManager[_0x348168(0x375)])return;_0x8a9be=Math[_0x348168(0x1ac)](_0x8a9be,0x1),this[_0x348168(0x1e5)](_0x8a9be);},Game_Battler[_0x760d64(0x1d8)][_0x760d64(0x1e5)]=function(_0x5997cc){const _0x29d486=_0x760d64;if(!BattleManager[_0x29d486(0x35e)]())return;if(!SceneManager[_0x29d486(0x29f)]())return;if(this===BattleManager['actor']())return;if(this===BattleManager['_subject'])return;const _0x1b33d8=SceneManager[_0x29d486(0x31a)][_0x29d486(0x25b)];if(!_0x1b33d8)return;const _0x10477b=_0x1b33d8[_0x29d486(0x275)];if(!_0x10477b)return;const _0x4c3307=this['getCurrentTurnOrderPositionCTB']();_0x4c3307!==_0x5997cc&&this[_0x29d486(0x1ab)](_0x5997cc-_0x4c3307);let _0x4d8189=_0x5997cc,_0x335a78=_0x5997cc;_0x4c3307>_0x5997cc?_0x4d8189-=0x1:_0x335a78+=0x1;const _0x50e3c1=_0x10477b[_0x4d8189][_0x29d486(0x206)](!![]),_0x36491d=_0x10477b[_0x335a78][_0x29d486(0x206)](!![]),_0x46bcb2=(_0x50e3c1+_0x36491d)/0x2;let _0x100131=_0x46bcb2*this[_0x29d486(0x271)]();if(this[_0x29d486(0x205)]===_0x29d486(0x2ec)){if(_0x29d486(0x353)!==_0x29d486(0x333))this[_0x29d486(0x224)]=0x1-_0x100131;else return _0xd47cd3['Settings'][_0x29d486(0x204)];}else{if(this['_tpbState']===_0x29d486(0x268)){if('lbLgc'!==_0x29d486(0x2a8))this['_tpbCastTime']=this[_0x29d486(0x1a4)]()-_0x100131;else{if(_0x19566d[_0x29d486(0x373)](this))return;_0x1498d9[_0x29d486(0x2b7)][_0x29d486(0x1b1)][_0x29d486(0x1c8)](this);}}}BattleManager['_actionBattlers']=[],BattleManager[_0x29d486(0x2e2)]();},Game_Battler[_0x760d64(0x1d8)][_0x760d64(0x1ab)]=function(_0x1f6acd){const _0x152588=_0x760d64,_0x38a835=VisuMZ[_0x152588(0x2b7)][_0x152588(0x26d)][_0x152588(0x2fb)],_0x5523cb=_0x1f6acd>0x0?_0x152588(0x1ea):_0x152588(0x2b1);if(_0x38a835[_0x152588(0x1d6)['format'](_0x5523cb)]){if(_0x152588(0x33d)!==_0x152588(0x25d)){const _0x5946a3=_0x38a835[_0x152588(0x1d6)['format'](_0x5523cb)],_0x128d9d=_0x38a835[_0x152588(0x260)[_0x152588(0x277)](_0x5523cb)],_0x26a381=_0x38a835[_0x152588(0x248)[_0x152588(0x277)](_0x5523cb)];$gameTemp[_0x152588(0x344)]([this],_0x5946a3,_0x128d9d,_0x26a381);}else _0x554444+=0x1;}if(this[_0x152588(0x212)]()&&_0x38a835[_0x152588(0x22f)[_0x152588(0x277)](_0x5523cb)][_0x152588(0x2e9)]>0x0){if('JrSuf'!==_0x152588(0x1f0)){const _0xb3933b=_0x38a835[_0x152588(0x22f)[_0x152588(0x277)](_0x5523cb)],_0x8990a={'textColor':ColorManager[_0x152588(0x2bb)](_0x38a835[_0x152588(0x31c)[_0x152588(0x277)](_0x5523cb)]),'flashColor':_0x38a835[_0x152588(0x321)[_0x152588(0x277)](_0x5523cb)],'flashDuration':_0x38a835['%1FlashDuration'[_0x152588(0x277)](_0x5523cb)]};this[_0x152588(0x2bd)](_0xb3933b,_0x8990a);}else{const _0x56ce26=_0x12fa4f[_0x152588(0x2b7)][_0x152588(0x26d)]['Mechanics'];let _0x3f43c8=this[_0x152588(0x191)]()*_0x1a964e(_0x56ce26['InitialGaugeJS']);const _0x20e3e4=this[_0x152588(0x1af)]()[_0x152588(0x190)](this[_0x152588(0x23e)]()),_0x4fe6cd=/<(?:CTB) (?:BATTLE START|START) (?:GAUGE|TIME|SPEED): ([\+\-]\d+)([%％])>/i,_0x3e24cc=_0x20e3e4[_0x152588(0x24a)](_0x434f11=>_0x434f11&&_0x434f11['note'][_0x152588(0x334)](_0x4fe6cd)?_0x25046d(_0x95c104['$1'])*0.01:0x0);_0x3f43c8=_0x3e24cc[_0x152588(0x1e1)]((_0xb1c921,_0x5d88c6)=>_0xb1c921+_0x5d88c6,_0x3f43c8),this[_0x152588(0x205)]=_0x152588(0x2ec),this[_0x152588(0x224)]=(_0x1b3cf0?0x1:_0x3f43c8)[_0x152588(0x1dc)](0x0,0x1),this[_0x152588(0x22a)]()&&(this[_0x152588(0x224)]=0x0);}}},VisuMZ[_0x760d64(0x2b7)][_0x760d64(0x1b1)]=Game_Battler[_0x760d64(0x1d8)][_0x760d64(0x1e8)],Game_Battler[_0x760d64(0x1d8)][_0x760d64(0x1e8)]=function(){const _0x4eed9a=_0x760d64;if(BattleManager[_0x4eed9a(0x373)](this))return;VisuMZ[_0x4eed9a(0x2b7)]['Game_Battler_updateTpb'][_0x4eed9a(0x1c8)](this);},BattleManager[_0x760d64(0x373)]=function(_0x97d933){const _0x5789fb=_0x760d64;return BattleManager[_0x5789fb(0x263)]()[_0x5789fb(0x359)](_0x2f6728=>_0x2f6728!==_0x97d933)[_0x5789fb(0x2f2)](_0x54f0e8=>_0x54f0e8[_0x5789fb(0x239)]()&&_0x54f0e8[_0x5789fb(0x218)]()&&_0x54f0e8['_ctbAfterSpeed']>=0x1);},VisuMZ[_0x760d64(0x2b7)][_0x760d64(0x33b)]=Game_Battler[_0x760d64(0x1d8)]['updateTpbChargeTime'],Game_Battler[_0x760d64(0x1d8)][_0x760d64(0x21b)]=function(){const _0xb0b97a=_0x760d64;BattleManager[_0xb0b97a(0x35e)]()?this[_0xb0b97a(0x222)]():_0xb0b97a(0x237)!=='wPXmY'?(this[_0xb0b97a(0x224)]+=this[_0xb0b97a(0x271)](),this['_tpbChargeTime']>=0x1&&this['onTpbCharged']()):VisuMZ[_0xb0b97a(0x2b7)][_0xb0b97a(0x33b)][_0xb0b97a(0x1c8)](this);},Game_Battler[_0x760d64(0x1d8)]['updateTpbChargeTimeCTB']=function(){const _0x2c1c47=_0x760d64;if(this['_tpbState']==='charging'){if(_0x2c1c47(0x2cd)===_0x2c1c47(0x1e4))return _0x2ad4c8[_0x2c1c47(0x26d)][_0x2c1c47(0x1bf)];else this[_0x2c1c47(0x224)]+=this['tpbAcceleration'](),this[_0x2c1c47(0x224)]>=0x1&&(_0x2c1c47(0x19a)===_0x2c1c47(0x24f)?this['_positionTargetX']=_0x6a350c?_0x3fbbdc[_0x2c1c47(0x303)]-this[_0x2c1c47(0x33e)]-_0x5be940[_0x2c1c47(0x2a9)]:0x0:this[_0x2c1c47(0x2dc)]());}},VisuMZ[_0x760d64(0x2b7)][_0x760d64(0x2f8)]=Game_Battler[_0x760d64(0x1d8)]['updateTpbCastTime'],Game_Battler['prototype']['updateTpbCastTime']=function(){const _0x411a56=_0x760d64;BattleManager[_0x411a56(0x35e)]()?this[_0x411a56(0x1ad)]():VisuMZ[_0x411a56(0x2b7)]['Game_Battler_updateTpbCastTime'][_0x411a56(0x1c8)](this);},Game_Battler['prototype'][_0x760d64(0x1ad)]=function(){const _0x51a690=_0x760d64;this[_0x51a690(0x205)]==='casting'&&(this[_0x51a690(0x21a)]+=this[_0x51a690(0x271)](),this['_tpbCastTime']>=this['tpbRequiredCastTime']()&&(this[_0x51a690(0x205)]='ready'));},Game_Actor['prototype'][_0x760d64(0x366)]=function(){const _0x2ff4e5=_0x760d64,_0x471355=this[_0x2ff4e5(0x287)]()[_0x2ff4e5(0x257)];if(_0x471355[_0x2ff4e5(0x334)](/<CTB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i))return'face';else{if(_0x471355['match'](/<CTB TURN ORDER ICON:[ ](\d+)>/i))return _0x2ff4e5(0x1d7);}return Window_CTB_TurnOrder[_0x2ff4e5(0x26d)][_0x2ff4e5(0x19c)];},Game_Actor['prototype']['TurnOrderCTBGraphicFaceName']=function(){const _0x17987f=_0x760d64,_0x2dc0b8=this['actor']()[_0x17987f(0x257)];if(_0x2dc0b8[_0x17987f(0x334)](/<CTB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i))return String(RegExp['$1']);return this[_0x17987f(0x2e6)]();},Game_Actor[_0x760d64(0x1d8)][_0x760d64(0x27a)]=function(){const _0x3e6209=_0x760d64,_0x23a118=this['actor']()[_0x3e6209(0x257)];if(_0x23a118[_0x3e6209(0x334)](/<CTB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i)){if(_0x3e6209(0x2db)!==_0x3e6209(0x2db))_0x5a4866[_0x3e6209(0x2b7)][_0x3e6209(0x337)](_0x596c9b,_0x5997d5);else return Number(RegExp['$2']);}return this[_0x3e6209(0x374)]();},Game_Actor[_0x760d64(0x1d8)][_0x760d64(0x1c3)]=function(){const _0x351079=_0x760d64,_0x434481=this[_0x351079(0x287)]()[_0x351079(0x257)];if(_0x434481[_0x351079(0x334)](/<CTB TURN ORDER ICON:[ ](\d+)>/i))return Number(RegExp['$1']);return Window_CTB_TurnOrder[_0x351079(0x26d)][_0x351079(0x2a2)];},Game_Enemy['prototype'][_0x760d64(0x366)]=function(){const _0x422778=_0x760d64,_0x3b9b09=this[_0x422778(0x201)]()[_0x422778(0x257)];if(_0x3b9b09['match'](/<CTB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i))return _0x422778(0x29c);else{if(_0x3b9b09['match'](/<CTB TURN ORDER ICON:[ ](\d+)>/i))return _0x422778(0x1d7);}return Window_CTB_TurnOrder[_0x422778(0x26d)][_0x422778(0x204)];},Game_Enemy[_0x760d64(0x1d8)][_0x760d64(0x2b8)]=function(){const _0x24fd90=_0x760d64,_0x1da03e=this[_0x24fd90(0x201)]()[_0x24fd90(0x257)];if(_0x1da03e[_0x24fd90(0x334)](/<CTB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i))return String(RegExp['$1']);return Window_CTB_TurnOrder['Settings'][_0x24fd90(0x1bf)];},Game_Enemy[_0x760d64(0x1d8)][_0x760d64(0x28e)]=function(){const _0x31f8b5=_0x760d64,_0x88f277=this[_0x31f8b5(0x201)]()[_0x31f8b5(0x257)];if(_0x88f277[_0x31f8b5(0x334)](/<CTB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i))return Number(RegExp['$2']);return Window_CTB_TurnOrder[_0x31f8b5(0x26d)][_0x31f8b5(0x2c4)];},Game_Enemy[_0x760d64(0x1d8)][_0x760d64(0x1c3)]=function(){const _0x986edb=_0x760d64,_0x35060b=this[_0x986edb(0x201)]()[_0x986edb(0x257)];if(_0x35060b[_0x986edb(0x334)](/<CTB TURN ORDER ICON:[ ](\d+)>/i)){if('RUJNv'===_0x986edb(0x2c8))this[_0x986edb(0x2ff)](_0x472a88);else return Number(RegExp['$1']);}return Window_CTB_TurnOrder[_0x986edb(0x26d)][_0x986edb(0x32b)];},VisuMZ['BattleSystemCTB'][_0x760d64(0x36f)]=Scene_Battle['prototype'][_0x760d64(0x23d)],Scene_Battle[_0x760d64(0x1d8)]['createAllWindows']=function(){const _0x116027=_0x760d64;VisuMZ['BattleSystemCTB'][_0x116027(0x36f)][_0x116027(0x1c8)](this),this[_0x116027(0x31d)]();},Scene_Battle[_0x760d64(0x1d8)]['createCTBTurnOrderWindow']=function(){const _0x3fa982=_0x760d64;if(!BattleManager[_0x3fa982(0x35e)]())return;this[_0x3fa982(0x25b)]=new Window_CTB_TurnOrder();const _0x63fe42=this[_0x3fa982(0x308)](this['_windowLayer']);this['addChildAt'](this[_0x3fa982(0x25b)],_0x63fe42),this[_0x3fa982(0x328)](),BattleManager[_0x3fa982(0x2e2)](!![]);},Scene_Battle[_0x760d64(0x1d8)][_0x760d64(0x328)]=function(){const _0x3f28ce=_0x760d64,_0xb5bcf8=Window_CTB_TurnOrder['Settings'];if(_0xb5bcf8[_0x3f28ce(0x280)]!==_0x3f28ce(0x31e))return;if(!_0xb5bcf8['RepositionLogWindow'])return;if(!this[_0x3f28ce(0x267)])return;const _0x426190=this['_ctbTurnOrderWindow']['y']-Math[_0x3f28ce(0x1b7)]((Graphics['height']-Graphics[_0x3f28ce(0x1fe)])/0x2),_0x1c9cb9=_0x426190+this['_ctbTurnOrderWindow'][_0x3f28ce(0x27b)];this[_0x3f28ce(0x267)]['y']=_0x1c9cb9+_0xb5bcf8[_0x3f28ce(0x279)];};function _0x4c4e(_0x85c1b9,_0x1fa8e0){const _0x25a890=_0x25a8();return _0x4c4e=function(_0x4c4eed,_0x15278e){_0x4c4eed=_0x4c4eed-0x18a;let _0x49c30c=_0x25a890[_0x4c4eed];return _0x49c30c;},_0x4c4e(_0x85c1b9,_0x1fa8e0);}function Sprite_CTB_TurnOrder_Battler(){const _0x80f167=_0x760d64;this[_0x80f167(0x2dd)](...arguments);}Sprite_CTB_TurnOrder_Battler['prototype']=Object[_0x760d64(0x33f)](Sprite_Clickable[_0x760d64(0x1d8)]),Sprite_CTB_TurnOrder_Battler[_0x760d64(0x1d8)][_0x760d64(0x358)]=Sprite_CTB_TurnOrder_Battler,Sprite_CTB_TurnOrder_Battler[_0x760d64(0x1d8)][_0x760d64(0x2dd)]=function(_0x5cad44,_0x13e1f5,_0x3feb46){const _0x429a6b=_0x760d64;this[_0x429a6b(0x300)](_0x5cad44,_0x13e1f5,_0x3feb46),Sprite_Clickable['prototype']['initialize'][_0x429a6b(0x1c8)](this),this['createChildren']();},Sprite_CTB_TurnOrder_Battler[_0x760d64(0x1d8)][_0x760d64(0x300)]=function(_0x31a614,_0x539868,_0x10071b){const _0x4b5fe4=_0x760d64;this[_0x4b5fe4(0x22e)]=_0x31a614,this['_index']=_0x539868,this[_0x4b5fe4(0x370)]=_0x10071b;const _0x431a4c=Window_CTB_TurnOrder['Settings'],_0x6ef815=this[_0x4b5fe4(0x365)](),_0x550fb9=this['defaultPosition']();this[_0x4b5fe4(0x1bd)]=0x0,this['_positionTargetX']=_0x6ef815?_0x431a4c[_0x4b5fe4(0x2a9)]*_0x550fb9:0x0,this[_0x4b5fe4(0x1c9)]=_0x6ef815?0x0:_0x431a4c[_0x4b5fe4(0x2a9)]*_0x550fb9,this[_0x4b5fe4(0x2e0)]=0x0,this[_0x4b5fe4(0x34d)]=0xff,this[_0x4b5fe4(0x20f)]=!![],this['_isAppeared']=!![];},Sprite_CTB_TurnOrder_Battler['prototype'][_0x760d64(0x2fd)]=function(){const _0x2e9c31=_0x760d64;this[_0x2e9c31(0x2b9)](),this[_0x2e9c31(0x196)](),this[_0x2e9c31(0x2b5)](),this[_0x2e9c31(0x2e1)](),this[_0x2e9c31(0x316)]();},Sprite_CTB_TurnOrder_Battler[_0x760d64(0x1d8)][_0x760d64(0x2b9)]=function(){const _0x44178e=_0x760d64;this['x']=this[_0x44178e(0x33e)],this['y']=this[_0x44178e(0x1c9)];},Sprite_CTB_TurnOrder_Battler['prototype'][_0x760d64(0x365)]=function(){const _0x1c631c=_0x760d64,_0x204e05=Window_CTB_TurnOrder['Settings'],_0x19f621=[_0x1c631c(0x31e),_0x1c631c(0x33c)][_0x1c631c(0x26e)](_0x204e05['DisplayPosition']);return _0x19f621;},Sprite_CTB_TurnOrder_Battler[_0x760d64(0x1d8)][_0x760d64(0x252)]=function(){const _0x35b289=_0x760d64,_0x2bde5e=Window_CTB_TurnOrder[_0x35b289(0x26d)];return this[_0x35b289(0x365)]()?_0x2bde5e[_0x35b289(0x2a9)]:_0x2bde5e[_0x35b289(0x326)];},Sprite_CTB_TurnOrder_Battler[_0x760d64(0x1d8)][_0x760d64(0x25c)]=function(){const _0x2398e5=_0x760d64,_0x221b97=Window_CTB_TurnOrder[_0x2398e5(0x26d)];return this[_0x2398e5(0x365)]()?_0x221b97[_0x2398e5(0x326)]:_0x221b97[_0x2398e5(0x2a9)];},Sprite_CTB_TurnOrder_Battler[_0x760d64(0x1d8)]['createTestBitmap']=function(){const _0x3d60a7=_0x760d64;this[_0x3d60a7(0x208)]=new Bitmap(0x48,0x24);const _0x1e29a6=this[_0x3d60a7(0x212)]()?this[_0x3d60a7(0x212)]()[_0x3d60a7(0x37d)]():_0x3d60a7(0x2c6)[_0x3d60a7(0x277)](this[_0x3d60a7(0x22e)],this[_0x3d60a7(0x23a)],this[_0x3d60a7(0x370)]);this[_0x3d60a7(0x208)][_0x3d60a7(0x1b2)](_0x1e29a6,0x0,0x0,0x48,0x24,'center');},Sprite_CTB_TurnOrder_Battler[_0x760d64(0x1d8)][_0x760d64(0x196)]=function(){const _0x40f4af=_0x760d64;if(!Window_CTB_TurnOrder[_0x40f4af(0x26d)][_0x40f4af(0x1c6)])return;const _0x14c0c8=Window_CTB_TurnOrder[_0x40f4af(0x26d)],_0x31e769=this[_0x40f4af(0x22e)]===$gameParty?_0x40f4af(0x284):_0x40f4af(0x1ef),_0xfaf801=_0x40f4af(0x27c)[_0x40f4af(0x277)](_0x31e769),_0x525df0=new Sprite();_0x525df0['anchor']['x']=this['anchor']['x'],_0x525df0[_0x40f4af(0x2da)]['y']=this['anchor']['y'];if(_0x14c0c8[_0xfaf801])_0x525df0[_0x40f4af(0x208)]=ImageManager[_0x40f4af(0x28c)](_0x14c0c8[_0xfaf801]);else{if(_0x40f4af(0x361)!==_0x40f4af(0x32d)){const _0x166d54=this[_0x40f4af(0x252)](),_0x3361db=this[_0x40f4af(0x25c)]();_0x525df0[_0x40f4af(0x208)]=new Bitmap(_0x166d54,_0x3361db);const _0x351146=ColorManager['getColor'](_0x14c0c8[_0x40f4af(0x2c9)[_0x40f4af(0x277)](_0x31e769)]),_0x5154db=ColorManager['getColor'](_0x14c0c8['%1BgColor2'[_0x40f4af(0x277)](_0x31e769)]);_0x525df0[_0x40f4af(0x208)][_0x40f4af(0x36a)](0x0,0x0,_0x166d54,_0x3361db,_0x351146,_0x5154db,!![]);}else _0x398cdb['changeTurnOrderByCTB'](_0x2ae81a(_0x3fd34d['$1']));}this['_backgroundSprite']=_0x525df0,this['addChild'](this['_backgroundSprite']),this[_0x40f4af(0x303)]=this[_0x40f4af(0x338)][_0x40f4af(0x303)],this['height']=this[_0x40f4af(0x338)]['height'];},Sprite_CTB_TurnOrder_Battler['prototype']['createGraphicSprite']=function(){const _0x1a40f9=_0x760d64,_0xfc7f00=new Sprite();_0xfc7f00[_0x1a40f9(0x2da)]['x']=this[_0x1a40f9(0x2da)]['x'],_0xfc7f00[_0x1a40f9(0x2da)]['y']=this[_0x1a40f9(0x2da)]['y'],this[_0x1a40f9(0x1c1)]=_0xfc7f00,this[_0x1a40f9(0x27f)](this['_graphicSprite']),this[_0x1a40f9(0x246)]();},Sprite_CTB_TurnOrder_Battler[_0x760d64(0x1d8)][_0x760d64(0x2e1)]=function(){const _0xda9da=_0x760d64;if(!Window_CTB_TurnOrder[_0xda9da(0x26d)][_0xda9da(0x225)])return;const _0x4f70a1=Window_CTB_TurnOrder[_0xda9da(0x26d)],_0x499382=this['_unit']===$gameParty?_0xda9da(0x284):'Enemy',_0x5d530a=_0xda9da(0x30b)[_0xda9da(0x277)](_0x499382),_0xd62154=new Sprite();_0xd62154['anchor']['x']=this['anchor']['x'],_0xd62154['anchor']['y']=this[_0xda9da(0x2da)]['y'];if(_0x4f70a1[_0x5d530a]){if(_0xda9da(0x311)!==_0xda9da(0x311)){const _0x86e5f9=this[_0xda9da(0x1b0)]();if(this['_position']===_0x86e5f9)return;this[_0xda9da(0x29d)]=_0x86e5f9;const _0x32eaaa=_0x2cd229[_0xda9da(0x26d)],_0x4fd9ed=this[_0xda9da(0x365)](),_0x33ca30=_0x32eaaa[_0xda9da(0x32e)],_0x41f3b3=_0x32eaaa[_0xda9da(0x18e)],_0xdd8f54=_0x4faebf[_0xda9da(0x31a)]['_ctbTurnOrderWindow'];if(!_0xdd8f54)return;this['_positionDuration']=_0x32eaaa['UpdateFrames'],this[_0xda9da(0x33e)]=_0x4fd9ed?_0x32eaaa['SpriteThin']*_0x86e5f9:0x0,this[_0xda9da(0x1c9)]=_0x4fd9ed?0x0:_0x32eaaa[_0xda9da(0x2a9)]*_0x86e5f9,_0x86e5f9>0x0&&(this[_0xda9da(0x33e)]+=_0x4fd9ed?_0x41f3b3:0x0,this[_0xda9da(0x1c9)]+=_0x4fd9ed?0x0:_0x41f3b3),_0x33ca30?this[_0xda9da(0x33e)]=_0x4fd9ed?_0xdd8f54[_0xda9da(0x303)]-this['_positionTargetX']-_0x32eaaa[_0xda9da(0x2a9)]:0x0:this['_positionTargetY']=_0x4fd9ed?0x0:_0xdd8f54[_0xda9da(0x27b)]-this[_0xda9da(0x1c9)]-_0x32eaaa[_0xda9da(0x2a9)];}else _0xd62154['bitmap']=ImageManager['loadSystem'](_0x4f70a1[_0x5d530a]);}else{let _0x50f5ce=this['bitmapWidth'](),_0x503b69=this['bitmapHeight'](),_0x50d252=_0x4f70a1[_0xda9da(0x283)];_0xd62154[_0xda9da(0x208)]=new Bitmap(_0x50f5ce,_0x503b69);const _0x3bf230=_0xda9da(0x312),_0x2ca630=ColorManager[_0xda9da(0x2bb)](_0x4f70a1['%1BorderColor'[_0xda9da(0x277)](_0x499382)]);_0xd62154[_0xda9da(0x208)][_0xda9da(0x36d)](0x0,0x0,_0x50f5ce,_0x503b69,_0x3bf230),_0x50f5ce-=0x2,_0x503b69-=0x2,_0xd62154[_0xda9da(0x208)][_0xda9da(0x36d)](0x1,0x1,_0x50f5ce,_0x503b69,_0x2ca630),_0x50f5ce-=_0x50d252*0x2,_0x503b69-=_0x50d252*0x2,_0xd62154[_0xda9da(0x208)][_0xda9da(0x36d)](0x1+_0x50d252,0x1+_0x50d252,_0x50f5ce,_0x503b69,_0x3bf230),_0x50f5ce-=0x2,_0x503b69-=0x2,_0x50d252+=0x1,_0xd62154[_0xda9da(0x208)]['clearRect'](0x1+_0x50d252,0x1+_0x50d252,_0x50f5ce,_0x503b69);}this[_0xda9da(0x338)]=_0xd62154,this[_0xda9da(0x27f)](this[_0xda9da(0x338)]);},Sprite_CTB_TurnOrder_Battler[_0x760d64(0x1d8)]['createLetterSprite']=function(){const _0x45d73a=_0x760d64,_0x107199=Window_CTB_TurnOrder[_0x45d73a(0x26d)];if(!_0x107199['EnemyBattlerDrawLetter'])return;if(this['_unit']===$gameParty)return;const _0x5d05a8=this[_0x45d73a(0x252)](),_0x39a9a6=this[_0x45d73a(0x25c)](),_0x1ca468=new Sprite();_0x1ca468[_0x45d73a(0x2da)]['x']=this[_0x45d73a(0x2da)]['x'],_0x1ca468['anchor']['y']=this['anchor']['y'],_0x1ca468[_0x45d73a(0x208)]=new Bitmap(_0x5d05a8,_0x39a9a6),this['_letterSprite']=_0x1ca468,this[_0x45d73a(0x27f)](this[_0x45d73a(0x2f4)]);},Sprite_CTB_TurnOrder_Battler[_0x760d64(0x1d8)][_0x760d64(0x212)]=function(){const _0x32d3b6=_0x760d64;return this['_unit']?this[_0x32d3b6(0x22e)]['members']()[this[_0x32d3b6(0x23a)]]:null;},Sprite_CTB_TurnOrder_Battler[_0x760d64(0x1d8)][_0x760d64(0x206)]=function(_0x47fd68){const _0x4c73eb=_0x760d64,_0x448875=this['battler']();if(!_0x448875)return Number['MAX_SAFE_INTEGER'];const _0x1685ab=0x1*(this['_dupe']+0x1);return _0x448875[_0x4c73eb(0x35c)](_0x1685ab,_0x47fd68);},Sprite_CTB_TurnOrder_Battler['prototype'][_0x760d64(0x247)]=function(){const _0x23fbec=_0x760d64;Sprite_Clickable[_0x23fbec(0x1d8)]['update'][_0x23fbec(0x1c8)](this),this[_0x23fbec(0x21e)](),this[_0x23fbec(0x288)](),this[_0x23fbec(0x323)](),this[_0x23fbec(0x1c0)](),this[_0x23fbec(0x1a3)](),this[_0x23fbec(0x26b)](),this[_0x23fbec(0x2b2)](),this['updateSelectionEffect']();},Sprite_CTB_TurnOrder_Battler[_0x760d64(0x1d8)]['checkPosition']=function(){const _0x2826eb=_0x760d64,_0x195232=this['containerPosition']();if(this[_0x2826eb(0x29d)]===_0x195232)return;this[_0x2826eb(0x29d)]=_0x195232;const _0x2549eb=Window_CTB_TurnOrder['Settings'],_0x4f78b5=this[_0x2826eb(0x365)](),_0x42ea2d=_0x2549eb[_0x2826eb(0x32e)],_0x132734=_0x2549eb['SubjectDistance'],_0x2729ac=SceneManager['_scene'][_0x2826eb(0x25b)];if(!_0x2729ac)return;this[_0x2826eb(0x1bd)]=_0x2549eb[_0x2826eb(0x2d1)],this['_positionTargetX']=_0x4f78b5?_0x2549eb[_0x2826eb(0x2a9)]*_0x195232:0x0,this[_0x2826eb(0x1c9)]=_0x4f78b5?0x0:_0x2549eb[_0x2826eb(0x2a9)]*_0x195232;_0x195232>0x0&&(this['_positionTargetX']+=_0x4f78b5?_0x132734:0x0,this[_0x2826eb(0x1c9)]+=_0x4f78b5?0x0:_0x132734);if(_0x42ea2d)this[_0x2826eb(0x33e)]=_0x4f78b5?_0x2729ac['width']-this[_0x2826eb(0x33e)]-_0x2549eb[_0x2826eb(0x2a9)]:0x0;else{if('Shyst'!==_0x2826eb(0x1f5))this[_0x2826eb(0x1c9)]=_0x4f78b5?0x0:_0x2729ac[_0x2826eb(0x27b)]-this[_0x2826eb(0x1c9)]-_0x2549eb[_0x2826eb(0x2a9)];else return(this['tpbRequiredCastTime']()*_0x1b8be0-this['_tpbCastTime'])/this[_0x2826eb(0x271)]();}},Sprite_CTB_TurnOrder_Battler[_0x760d64(0x1d8)]['updatePosition']=function(){const _0x2ba154=_0x760d64;if(this['_fadeDuration']>0x0)return;if(this[_0x2ba154(0x1bd)]>0x0){const _0x329495=this[_0x2ba154(0x1bd)];this['x']=(this['x']*(_0x329495-0x1)+this['_positionTargetX'])/_0x329495,this['y']=(this['y']*(_0x329495-0x1)+this[_0x2ba154(0x1c9)])/_0x329495,this['_positionDuration']--;}if(this['_positionDuration']<=0x0&&this[_0x2ba154(0x20f)]){this['x']=this['_positionTargetX'],this['y']=this[_0x2ba154(0x1c9)];if(this[_0x2ba154(0x2ed)]<=0x0&&!this[_0x2ba154(0x26c)]){if('VEdQg'!==_0x2ba154(0x193))this[_0x2ba154(0x2cf)](0xff);else{const _0x4b144a=this[_0x2ba154(0x1a4)]();this[_0x2ba154(0x21a)]=_0x4b144a*_0x56ef07;}}}},Sprite_CTB_TurnOrder_Battler[_0x760d64(0x1d8)][_0x760d64(0x219)]=function(){const _0x544632=_0x760d64;return Window_CTB_TurnOrder[_0x544632(0x26d)][_0x544632(0x25a)]*0x14;},Sprite_CTB_TurnOrder_Battler['prototype']['containerWindow']=function(){const _0x5e6fec=_0x760d64;return SceneManager[_0x5e6fec(0x31a)]['_ctbTurnOrderWindow'];},Sprite_CTB_TurnOrder_Battler[_0x760d64(0x1d8)][_0x760d64(0x1b0)]=function(){const _0x4889db=_0x760d64;if(!this['containerWindow']())return this[_0x4889db(0x219)]();const _0x1d6703=this[_0x4889db(0x2a6)]()[_0x4889db(0x275)];return _0x1d6703[_0x4889db(0x346)](this);},Sprite_CTB_TurnOrder_Battler['prototype'][_0x760d64(0x19b)]=function(){const _0x48bf2b=_0x760d64,_0x4fdc1a=Window_CTB_TurnOrder[_0x48bf2b(0x26d)],_0xef8cf=this[_0x48bf2b(0x365)](),_0x2b47a9=_0xef8cf?_0x4fdc1a[_0x48bf2b(0x25a)]:_0x4fdc1a[_0x48bf2b(0x2eb)];this[_0x48bf2b(0x370)]-=0x1;if(this[_0x48bf2b(0x370)]<0x0){if(_0x48bf2b(0x2cc)===_0x48bf2b(0x2cc))this[_0x48bf2b(0x370)]=_0x2b47a9-0x1,this[_0x48bf2b(0x2cf)](0x0);else{const _0x152118=this[_0x48bf2b(0x1bd)];this['x']=(this['x']*(_0x152118-0x1)+this[_0x48bf2b(0x33e)])/_0x152118,this['y']=(this['y']*(_0x152118-0x1)+this[_0x48bf2b(0x1c9)])/_0x152118,this['_positionDuration']--;}}},Sprite_CTB_TurnOrder_Battler['prototype'][_0x760d64(0x2cf)]=function(_0x30a0cc){const _0x4b45ba=_0x760d64,_0xdee8cc=Window_CTB_TurnOrder[_0x4b45ba(0x26d)];this[_0x4b45ba(0x2e0)]=_0xdee8cc[_0x4b45ba(0x2d1)],this[_0x4b45ba(0x34d)]=_0x30a0cc;},Sprite_CTB_TurnOrder_Battler[_0x760d64(0x1d8)][_0x760d64(0x323)]=function(){const _0x4daaa8=_0x760d64,_0x7e48d9=this[_0x4daaa8(0x212)]();if(!_0x7e48d9)return;if(this[_0x4daaa8(0x20f)]===_0x7e48d9['isAlive']()&&this[_0x4daaa8(0x197)]===_0x7e48d9['isAppeared']())return;this[_0x4daaa8(0x20f)]=_0x7e48d9[_0x4daaa8(0x239)](),this['_isAppeared']=_0x7e48d9['isAppeared']();let _0x5e0a6a=this[_0x4daaa8(0x20f)]&&this['_isAppeared']?0xff:0x0;this['startFade'](_0x5e0a6a);},Sprite_CTB_TurnOrder_Battler[_0x760d64(0x1d8)][_0x760d64(0x1c0)]=function(){const _0x2c93f4=_0x760d64;if(this[_0x2c93f4(0x2e0)]>0x0){const _0x586c86=this['_fadeDuration'];this[_0x2c93f4(0x2ed)]=(this[_0x2c93f4(0x2ed)]*(_0x586c86-0x1)+this[_0x2c93f4(0x34d)])/_0x586c86,this[_0x2c93f4(0x2e0)]--,this[_0x2c93f4(0x2e0)]<=0x0&&(this[_0x2c93f4(0x21e)](),this[_0x2c93f4(0x1bd)]=0x0,this['updatePosition'](),this[_0x2c93f4(0x2ed)]=this[_0x2c93f4(0x34d)]);}if(this[_0x2c93f4(0x26c)])return;BattleManager['_phase']==='battleEnd'&&(this[_0x2c93f4(0x26c)]=!![],this['startFade'](0x0));},Sprite_CTB_TurnOrder_Battler[_0x760d64(0x1d8)]['updateGraphic']=function(){const _0x3b26b9=_0x760d64,_0x30ccf7=this['battler']();if(!_0x30ccf7)return;const _0x3f4e74=Window_CTB_TurnOrder[_0x3b26b9(0x26d)],_0x199379=this[_0x3b26b9(0x22e)]===$gameParty?_0x3b26b9(0x284):_0x3b26b9(0x1ef);let _0x5d0cac=_0x30ccf7[_0x3b26b9(0x1cf)]();if(_0x30ccf7['isActor']()&&_0x5d0cac===_0x3b26b9(0x201))_0x5d0cac=_0x3b26b9(0x29c);else _0x30ccf7[_0x3b26b9(0x2ef)]()&&_0x5d0cac==='svactor'&&(_0x5d0cac=_0x3b26b9(0x201));if(this['_graphicType']!==_0x5d0cac)return this[_0x3b26b9(0x246)]();switch(this[_0x3b26b9(0x278)]){case'face':if(this[_0x3b26b9(0x1f3)]!==_0x30ccf7[_0x3b26b9(0x369)]()){if(_0x3b26b9(0x1e7)!==_0x3b26b9(0x32a))return this[_0x3b26b9(0x246)]();else this[_0x3b26b9(0x370)]=_0x26ab7c-0x1,this[_0x3b26b9(0x2cf)](0x0);}if(this['_graphicFaceIndex']!==_0x30ccf7['TurnOrderCTBGraphicFaceIndex']())return this[_0x3b26b9(0x246)]();break;case _0x3b26b9(0x1d7):if(this[_0x3b26b9(0x2de)]!==_0x30ccf7[_0x3b26b9(0x26f)]()){if('YRHTJ'!=='vxLCS')return this[_0x3b26b9(0x246)]();else _0x573dc4[_0x3b26b9(0x2b7)][_0x3b26b9(0x2f8)][_0x3b26b9(0x1c8)](this);}break;case _0x3b26b9(0x201):if(_0x30ccf7[_0x3b26b9(0x2a1)]()){if('jiXaZ'==='jiXaZ'){if(this['_graphicSv']!==_0x30ccf7['svBattlerName']()){if(_0x3b26b9(0x2a4)==='CMEFD')return this[_0x3b26b9(0x246)]();else _0xbd1fc+=_0x5cb395(_0x14eca8['$1'])*0.01;}}else this['createInitialPositions'](),this[_0x3b26b9(0x196)](),this[_0x3b26b9(0x2b5)](),this[_0x3b26b9(0x2e1)](),this[_0x3b26b9(0x316)]();}else{if(this[_0x3b26b9(0x1a0)]!==_0x30ccf7['battlerName']()){if(_0x3b26b9(0x1b8)!=='IdkeA')this[_0x3b26b9(0x2aa)]=_0x5e074f['isBattleSystemCTBTurnOrderVisible']();else return this[_0x3b26b9(0x246)]();}}break;case'svactor':if(_0x30ccf7['isActor']()){if(this[_0x3b26b9(0x1a1)]!==_0x30ccf7[_0x3b26b9(0x31b)]())return this[_0x3b26b9(0x246)]();}else{if(this[_0x3b26b9(0x1a0)]!==_0x30ccf7['battlerName']())return this[_0x3b26b9(0x246)]();}break;}},Sprite_CTB_TurnOrder_Battler[_0x760d64(0x1d8)][_0x760d64(0x246)]=function(){const _0xbe9af4=_0x760d64,_0x1f0db3=this['battler']();if(!_0x1f0db3)return;this['_graphicType']=_0x1f0db3['TurnOrderCTBGraphicType']();if(_0x1f0db3['isActor']()&&this[_0xbe9af4(0x278)]==='enemy'){if(_0xbe9af4(0x35a)!==_0xbe9af4(0x35a))return _0xbe9af4(0x29c);else this[_0xbe9af4(0x278)]='face';}else _0x1f0db3['isEnemy']()&&this['_graphicType']==='svactor'&&(this[_0xbe9af4(0x278)]='enemy');let _0x5e9706;switch(this[_0xbe9af4(0x278)]){case _0xbe9af4(0x29c):this['_graphicFaceName']=_0x1f0db3[_0xbe9af4(0x369)](),this[_0xbe9af4(0x354)]=_0x1f0db3[_0xbe9af4(0x27a)](),_0x5e9706=ImageManager[_0xbe9af4(0x34e)](this['_graphicFaceName']),_0x5e9706[_0xbe9af4(0x1d1)](this[_0xbe9af4(0x2c3)][_0xbe9af4(0x1e6)](this,_0x5e9706));break;case'icon':this[_0xbe9af4(0x2de)]=_0x1f0db3[_0xbe9af4(0x1c3)](),_0x5e9706=ImageManager[_0xbe9af4(0x28c)]('IconSet'),_0x5e9706['addLoadListener'](this[_0xbe9af4(0x2ee)]['bind'](this,_0x5e9706));break;case _0xbe9af4(0x201):if(_0x1f0db3[_0xbe9af4(0x2a1)]())this[_0xbe9af4(0x1a1)]=_0x1f0db3[_0xbe9af4(0x372)](),_0x5e9706=ImageManager[_0xbe9af4(0x2f1)](this['_graphicSv']),_0x5e9706[_0xbe9af4(0x1d1)](this[_0xbe9af4(0x264)][_0xbe9af4(0x1e6)](this,_0x5e9706));else{if($gameSystem[_0xbe9af4(0x325)]())this[_0xbe9af4(0x1a0)]=_0x1f0db3[_0xbe9af4(0x31b)](),_0x5e9706=ImageManager[_0xbe9af4(0x1db)](this[_0xbe9af4(0x1a0)]),_0x5e9706['addLoadListener'](this[_0xbe9af4(0x2ac)][_0xbe9af4(0x1e6)](this,_0x5e9706));else{if('LewrP'!=='LewrP')return 0x0;else this[_0xbe9af4(0x1a0)]=_0x1f0db3[_0xbe9af4(0x31b)](),_0x5e9706=ImageManager[_0xbe9af4(0x1a2)](this[_0xbe9af4(0x1a0)]),_0x5e9706['addLoadListener'](this[_0xbe9af4(0x2ac)][_0xbe9af4(0x1e6)](this,_0x5e9706));}}break;case'svactor':this[_0xbe9af4(0x1a1)]=_0x1f0db3[_0xbe9af4(0x31b)](),_0x5e9706=ImageManager[_0xbe9af4(0x2f1)](this[_0xbe9af4(0x1a1)]),_0x5e9706[_0xbe9af4(0x1d1)](this['changeSvActorGraphicBitmap'][_0xbe9af4(0x1e6)](this,_0x5e9706));break;}},Sprite_CTB_TurnOrder_Battler[_0x760d64(0x1d8)][_0x760d64(0x2c3)]=function(_0x3f7330){const _0x84913=_0x760d64,_0x1c8c22=this[_0x84913(0x354)],_0x48b2a0=this[_0x84913(0x252)](),_0x2f9510=this['bitmapHeight'](),_0x558495=Math[_0x84913(0x1ac)](_0x48b2a0,_0x2f9510);this[_0x84913(0x1c1)][_0x84913(0x208)]=new Bitmap(_0x48b2a0,_0x2f9510);const _0x17e6c5=this[_0x84913(0x1c1)][_0x84913(0x208)],_0x2c8f4a=ImageManager[_0x84913(0x28d)],_0x583c90=ImageManager[_0x84913(0x245)],_0x270fe5=_0x558495/Math['max'](_0x2c8f4a,_0x583c90),_0x38afd2=ImageManager[_0x84913(0x28d)],_0x1cccc9=ImageManager['faceHeight'],_0x4501d1=_0x1c8c22%0x4*_0x2c8f4a+(_0x2c8f4a-_0x38afd2)/0x2,_0x3864cb=Math[_0x84913(0x37a)](_0x1c8c22/0x4)*_0x583c90+(_0x583c90-_0x1cccc9)/0x2,_0x5e6969=(_0x48b2a0-_0x2c8f4a*_0x270fe5)/0x2,_0x181e38=(_0x2f9510-_0x583c90*_0x270fe5)/0x2;_0x17e6c5[_0x84913(0x1f9)](_0x3f7330,_0x4501d1,_0x3864cb,_0x38afd2,_0x1cccc9,_0x5e6969,_0x181e38,_0x558495,_0x558495);},Sprite_CTB_TurnOrder_Battler[_0x760d64(0x1d8)]['changeIconGraphicBitmap']=function(_0x3a7857){const _0x40534b=_0x760d64,_0x118d97=this[_0x40534b(0x2de)],_0x469c8a=this[_0x40534b(0x252)](),_0xf881c5=this['bitmapHeight']();this['_graphicSprite'][_0x40534b(0x208)]=new Bitmap(_0x469c8a,_0xf881c5);const _0x21c5ca=this[_0x40534b(0x1c1)][_0x40534b(0x208)],_0x7f2895=ImageManager['iconWidth'],_0x1315a1=ImageManager[_0x40534b(0x207)],_0x4c8f87=Math[_0x40534b(0x388)](_0x7f2895,_0x1315a1,_0x469c8a,_0xf881c5),_0x1b975e=_0x118d97%0x10*_0x7f2895,_0x5e4972=Math[_0x40534b(0x37a)](_0x118d97/0x10)*_0x1315a1,_0x1e7d1a=Math['floor'](Math[_0x40534b(0x1ac)](_0x469c8a-_0x4c8f87,0x0)/0x2),_0x2f55dc=Math['floor'](Math['max'](_0xf881c5-_0x4c8f87,0x0)/0x2);_0x21c5ca[_0x40534b(0x1f9)](_0x3a7857,_0x1b975e,_0x5e4972,_0x7f2895,_0x1315a1,_0x1e7d1a,_0x2f55dc,_0x4c8f87,_0x4c8f87);},Sprite_CTB_TurnOrder_Battler[_0x760d64(0x1d8)]['changeSvActorGraphicBitmap']=function(_0x2a18d0){const _0x590d0d=_0x760d64,_0x6a0aee=this[_0x590d0d(0x252)](),_0x18b4a1=this[_0x590d0d(0x25c)](),_0x3a7859=Math['min'](_0x6a0aee,_0x18b4a1);this[_0x590d0d(0x1c1)]['bitmap']=new Bitmap(_0x6a0aee,_0x18b4a1);const _0x6f06be=this[_0x590d0d(0x1c1)][_0x590d0d(0x208)],_0x5a3cbf=this['_graphicSv'][_0x590d0d(0x334)](/\$/i),_0x5c3a44=_0x5a3cbf?0x1:ImageManager[_0x590d0d(0x35f)],_0x37d1d0=_0x5a3cbf?0x1:ImageManager[_0x590d0d(0x1e0)],_0x330164=_0x2a18d0['width']/_0x5c3a44,_0x3cb87f=_0x2a18d0[_0x590d0d(0x27b)]/_0x37d1d0,_0x1d6464=Math[_0x590d0d(0x388)](0x1,_0x3a7859/_0x330164,_0x3a7859/_0x3cb87f),_0x26cf71=_0x330164*_0x1d6464,_0x7316c1=_0x3cb87f*_0x1d6464,_0x4c8c85=Math[_0x590d0d(0x1b7)]((_0x6a0aee-_0x26cf71)/0x2),_0x5ba7b6=Math['round']((_0x18b4a1-_0x7316c1)/0x2);_0x6f06be[_0x590d0d(0x1f9)](_0x2a18d0,0x0,0x0,_0x330164,_0x3cb87f,_0x4c8c85,_0x5ba7b6,_0x26cf71,_0x7316c1);},Sprite_CTB_TurnOrder_Battler[_0x760d64(0x1d8)][_0x760d64(0x2ac)]=function(_0x2d8d0f){const _0x5a9425=_0x760d64,_0x2f2c20=Window_CTB_TurnOrder[_0x5a9425(0x26d)],_0x86b870=this[_0x5a9425(0x252)](),_0xabe3b6=this[_0x5a9425(0x25c)](),_0x537373=Math['min'](_0x86b870,_0xabe3b6);this[_0x5a9425(0x1c1)][_0x5a9425(0x208)]=new Bitmap(_0x86b870,_0xabe3b6);const _0x2b2655=this[_0x5a9425(0x1c1)][_0x5a9425(0x208)],_0x3a47ad=Math[_0x5a9425(0x388)](0x1,_0x537373/_0x2d8d0f['width'],_0x537373/_0x2d8d0f[_0x5a9425(0x27b)]),_0x4d06f2=_0x2d8d0f[_0x5a9425(0x303)]*_0x3a47ad,_0x2fe8db=_0x2d8d0f[_0x5a9425(0x27b)]*_0x3a47ad,_0x382f1c=Math[_0x5a9425(0x1b7)]((_0x86b870-_0x4d06f2)/0x2),_0x445b2f=Math[_0x5a9425(0x1b7)]((_0xabe3b6-_0x2fe8db)/0x2);_0x2b2655[_0x5a9425(0x1f9)](_0x2d8d0f,0x0,0x0,_0x2d8d0f[_0x5a9425(0x303)],_0x2d8d0f[_0x5a9425(0x27b)],_0x382f1c,_0x445b2f,_0x4d06f2,_0x2fe8db);},Sprite_CTB_TurnOrder_Battler[_0x760d64(0x1d8)][_0x760d64(0x26b)]=function(){const _0x1b3a5b=_0x760d64,_0x45524b=this[_0x1b3a5b(0x212)]();if(!_0x45524b)return;if(!_0x45524b['isEnemy']())return;if(this[_0x1b3a5b(0x355)]===_0x45524b[_0x1b3a5b(0x293)]())return;this[_0x1b3a5b(0x355)]=_0x45524b[_0x1b3a5b(0x293)]();if(_0x45524b[_0x1b3a5b(0x2a1)]())this[_0x1b3a5b(0x355)]=0x0;this[_0x1b3a5b(0x1c1)][_0x1b3a5b(0x200)](this[_0x1b3a5b(0x355)]);},Sprite_CTB_TurnOrder_Battler['prototype'][_0x760d64(0x2b2)]=function(){const _0x268143=_0x760d64;if(!this[_0x268143(0x2f4)])return;const _0x10f2a0=this[_0x268143(0x212)]();if(!_0x10f2a0)return;if(this[_0x268143(0x30c)]===_0x10f2a0[_0x268143(0x30c)]&&this['_plural']===_0x10f2a0[_0x268143(0x1fc)])return;this[_0x268143(0x30c)]=_0x10f2a0[_0x268143(0x30c)],this[_0x268143(0x1fc)]=_0x10f2a0[_0x268143(0x1fc)];const _0x3e48cf=Window_CTB_TurnOrder[_0x268143(0x26d)],_0x16aa09=this[_0x268143(0x365)](),_0x344b12=this['bitmapWidth'](),_0x242b49=this[_0x268143(0x25c)](),_0x1dda74=this['_letterSprite'][_0x268143(0x208)];_0x1dda74['clear']();if(!this[_0x268143(0x1fc)])return;_0x1dda74[_0x268143(0x379)]=_0x3e48cf['EnemyBattlerFontFace']||$gameSystem[_0x268143(0x386)](),_0x1dda74['fontSize']=_0x3e48cf[_0x268143(0x2a0)]||0x10,_0x16aa09?_0x1dda74[_0x268143(0x1b2)](this[_0x268143(0x30c)][_0x268143(0x251)](),0x0,_0x242b49/0x2,_0x344b12,_0x242b49/0x2,_0x268143(0x302)):_0x1dda74['drawText'](this[_0x268143(0x30c)][_0x268143(0x251)](),0x0,0x2,_0x344b12-0x8,_0x242b49-0x4,_0x268143(0x2ab));},Sprite_CTB_TurnOrder_Battler[_0x760d64(0x1d8)][_0x760d64(0x2ba)]=function(){const _0xcc056=_0x760d64,_0x3183c0=this[_0xcc056(0x212)]();if(!_0x3183c0)return;const _0x42e1bf=_0x3183c0[_0xcc056(0x212)]();if(!_0x42e1bf)return;const _0x6cfb96=_0x42e1bf['mainSprite']();if(!_0x6cfb96)return;this[_0xcc056(0x351)](_0x6cfb96['_blendColor']);},Sprite_CTB_TurnOrder_Battler['prototype'][_0x760d64(0x291)]=function(){const _0x325105=_0x760d64;return this[_0x325105(0x212)]();},VisuMZ[_0x760d64(0x2b7)]['Window_Help_setItem']=Window_Help[_0x760d64(0x1d8)]['setItem'],Window_Help[_0x760d64(0x1d8)]['setItem']=function(_0x307574){const _0x26ddc7=_0x760d64;BattleManager['isCTB']()&&_0x307574&&_0x307574[_0x26ddc7(0x257)]&&_0x307574[_0x26ddc7(0x257)][_0x26ddc7(0x334)](/<(?:CTB) HELP>\s*([\s\S]*)\s*<\/(?:CTB) HELP>/i)?this[_0x26ddc7(0x30d)](String(RegExp['$1'])):'Bqygt'==='Bqygt'?VisuMZ[_0x26ddc7(0x2b7)][_0x26ddc7(0x1a9)][_0x26ddc7(0x1c8)](this,_0x307574):this[_0x26ddc7(0x363)](_0x44af77);},VisuMZ['BattleSystemCTB'][_0x760d64(0x1b9)]=Window_StatusBase[_0x760d64(0x1d8)]['placeGauge'],Window_StatusBase['prototype']['placeGauge']=function(_0x263819,_0xc76fcb,_0x332ac4,_0x327a00){const _0x2ea6fa=_0x760d64;if(BattleManager[_0x2ea6fa(0x35e)]()&&_0xc76fcb===_0x2ea6fa(0x250))return;VisuMZ['BattleSystemCTB'][_0x2ea6fa(0x1b9)]['call'](this,_0x263819,_0xc76fcb,_0x332ac4,_0x327a00);};function Window_CTB_TurnOrder(){const _0x530cad=_0x760d64;this[_0x530cad(0x2dd)](...arguments);}Window_CTB_TurnOrder['prototype']=Object[_0x760d64(0x33f)](Window_Base[_0x760d64(0x1d8)]),Window_CTB_TurnOrder[_0x760d64(0x1d8)]['constructor']=Window_CTB_TurnOrder,Window_CTB_TurnOrder[_0x760d64(0x26d)]=VisuMZ[_0x760d64(0x2b7)]['Settings'][_0x760d64(0x385)],Window_CTB_TurnOrder[_0x760d64(0x1d8)]['initialize']=function(){const _0x3087bf=_0x760d64,_0x19adb6=this[_0x3087bf(0x314)]();this[_0x3087bf(0x214)]=_0x19adb6['x'],this[_0x3087bf(0x340)]=_0x19adb6['y'],Window_Base['prototype']['initialize'][_0x3087bf(0x1c8)](this,_0x19adb6),this['createBattlerSprites'](),this[_0x3087bf(0x2a5)](),this[_0x3087bf(0x2ed)]=0x0;},Window_CTB_TurnOrder[_0x760d64(0x1d8)][_0x760d64(0x314)]=function(){const _0x2cb6b7=_0x760d64,_0x4c4753=Window_CTB_TurnOrder[_0x2cb6b7(0x26d)],_0x33421c=SceneManager[_0x2cb6b7(0x31a)][_0x2cb6b7(0x25f)][_0x2cb6b7(0x27b)],_0x3b4871=SceneManager[_0x2cb6b7(0x31a)]['_helpWindow'][_0x2cb6b7(0x27b)],_0x557c09=_0x4c4753[_0x2cb6b7(0x18e)];let _0x242ef3=0x0,_0x42fb63=0x0,_0x14cc64=0x0,_0x479c6d=0x0;switch(_0x4c4753[_0x2cb6b7(0x280)]){case'top':_0x242ef3=_0x4c4753[_0x2cb6b7(0x2a9)]*_0x4c4753[_0x2cb6b7(0x25a)]+_0x557c09,_0x42fb63=_0x4c4753[_0x2cb6b7(0x326)],_0x14cc64=Math[_0x2cb6b7(0x2ae)]((Graphics[_0x2cb6b7(0x303)]-_0x242ef3)/0x2),_0x479c6d=_0x4c4753[_0x2cb6b7(0x279)];break;case'bottom':_0x242ef3=_0x4c4753['SpriteThin']*_0x4c4753[_0x2cb6b7(0x25a)]+_0x557c09,_0x42fb63=_0x4c4753['SpriteLength'],_0x14cc64=Math[_0x2cb6b7(0x2ae)]((Graphics[_0x2cb6b7(0x303)]-_0x242ef3)/0x2),_0x479c6d=Graphics[_0x2cb6b7(0x27b)]-_0x33421c-_0x42fb63-_0x4c4753['ScreenBuffer'];break;case _0x2cb6b7(0x258):_0x242ef3=_0x4c4753['SpriteLength'],_0x42fb63=_0x4c4753['SpriteThin']*_0x4c4753['TotalVertSprites']+_0x557c09,_0x14cc64=_0x4c4753[_0x2cb6b7(0x279)],_0x479c6d=Math[_0x2cb6b7(0x2ae)]((Graphics[_0x2cb6b7(0x27b)]-_0x33421c+_0x3b4871-_0x42fb63)/0x2);break;case _0x2cb6b7(0x2ab):_0x242ef3=_0x4c4753[_0x2cb6b7(0x326)],_0x42fb63=_0x4c4753[_0x2cb6b7(0x2a9)]*_0x4c4753[_0x2cb6b7(0x2eb)]+_0x557c09,_0x14cc64=Graphics['width']-_0x242ef3-_0x4c4753[_0x2cb6b7(0x279)],_0x479c6d=Math['ceil']((Graphics[_0x2cb6b7(0x27b)]-_0x33421c+_0x3b4871-_0x42fb63)/0x2);break;}return _0x14cc64+=_0x4c4753['DisplayOffsetX'],_0x479c6d+=_0x4c4753['DisplayOffsetY'],new Rectangle(_0x14cc64,_0x479c6d,_0x242ef3,_0x42fb63);},Window_CTB_TurnOrder[_0x760d64(0x1d8)]['updatePadding']=function(){const _0x1b8dd6=_0x760d64;this[_0x1b8dd6(0x318)]=0x0;},Window_CTB_TurnOrder[_0x760d64(0x1d8)]['isHorz']=function(){const _0x852a7f=_0x760d64,_0x1d089c=Window_CTB_TurnOrder['Settings'],_0x203b5f=['top',_0x852a7f(0x33c)][_0x852a7f(0x26e)](_0x1d089c[_0x852a7f(0x280)]);return _0x203b5f;},Window_CTB_TurnOrder[_0x760d64(0x1d8)][_0x760d64(0x32f)]=function(){const _0x590e70=_0x760d64,_0xe8745e=Window_CTB_TurnOrder[_0x590e70(0x26d)],_0x249172=this[_0x590e70(0x365)](),_0x515e17=_0x249172?_0xe8745e[_0x590e70(0x25a)]:_0xe8745e[_0x590e70(0x2eb)];this[_0x590e70(0x295)]=new Sprite(),this[_0x590e70(0x1c5)](this['_turnOrderInnerSprite']),this[_0x590e70(0x275)]=[];for(let _0x4dcd5d=0x0;_0x4dcd5d<$gameParty[_0x590e70(0x213)]();_0x4dcd5d++){if(_0x590e70(0x2d7)!==_0x590e70(0x2fe))for(let _0x966426=0x0;_0x966426<_0x515e17;_0x966426++){const _0x4d84b5=new Sprite_CTB_TurnOrder_Battler($gameParty,_0x4dcd5d,_0x966426);this['_turnOrderInnerSprite'][_0x590e70(0x27f)](_0x4d84b5),this[_0x590e70(0x275)][_0x590e70(0x313)](_0x4d84b5);}else return _0x4b4d82['MIN_SAFE_INTEGER']/0xa;}for(let _0x40658c=0x0;_0x40658c<0x8;_0x40658c++){for(let _0x336fe2=0x0;_0x336fe2<_0x515e17;_0x336fe2++){const _0x2e3f14=new Sprite_CTB_TurnOrder_Battler($gameTroop,_0x40658c,_0x336fe2);this[_0x590e70(0x295)][_0x590e70(0x27f)](_0x2e3f14),this[_0x590e70(0x275)][_0x590e70(0x313)](_0x2e3f14);}}},Window_CTB_TurnOrder[_0x760d64(0x1d8)][_0x760d64(0x247)]=function(){const _0x29b0bc=_0x760d64;Window_Base[_0x29b0bc(0x1d8)]['update'][_0x29b0bc(0x1c8)](this),this['updatePosition'](),this[_0x29b0bc(0x2f9)](),this['updateVisibility']();},Window_CTB_TurnOrder[_0x760d64(0x1d8)][_0x760d64(0x288)]=function(){const _0x433d70=_0x760d64,_0x500d17=Window_CTB_TurnOrder['Settings'];if(_0x500d17['DisplayPosition']!=='top')return;if(!_0x500d17['RepositionTopForHelp'])return;const _0x211e67=SceneManager[_0x433d70(0x31a)]['_helpWindow'];if(!_0x211e67)return;if(_0x211e67[_0x433d70(0x2aa)]){if(_0x433d70(0x371)!==_0x433d70(0x24d))this['x']=this[_0x433d70(0x214)]+(_0x500d17[_0x433d70(0x28a)]||0x0),this['y']=this[_0x433d70(0x340)]+(_0x500d17['RepositionTopHelpY']||0x0);else{const _0xbc8c6=this[_0x433d70(0x354)],_0x216927=this[_0x433d70(0x252)](),_0x510036=this['bitmapHeight'](),_0x3a8a4c=_0x5735d7[_0x433d70(0x1ac)](_0x216927,_0x510036);this[_0x433d70(0x1c1)][_0x433d70(0x208)]=new _0x445357(_0x216927,_0x510036);const _0x404d79=this[_0x433d70(0x1c1)][_0x433d70(0x208)],_0x4f48e0=_0x3fb82e[_0x433d70(0x28d)],_0x4f5f64=_0x34301f['faceHeight'],_0x3cf0f9=_0x3a8a4c/_0x36154f[_0x433d70(0x1ac)](_0x4f48e0,_0x4f5f64),_0x431616=_0x403c1e['faceWidth'],_0x35fd26=_0x49c9b2[_0x433d70(0x245)],_0x5c9f73=_0xbc8c6%0x4*_0x4f48e0+(_0x4f48e0-_0x431616)/0x2,_0xfd945c=_0x2b162a['floor'](_0xbc8c6/0x4)*_0x4f5f64+(_0x4f5f64-_0x35fd26)/0x2,_0x5691c9=(_0x216927-_0x4f48e0*_0x3cf0f9)/0x2,_0x4bcbf0=(_0x510036-_0x4f5f64*_0x3cf0f9)/0x2;_0x404d79[_0x433d70(0x1f9)](_0x2affe3,_0x5c9f73,_0xfd945c,_0x431616,_0x35fd26,_0x5691c9,_0x4bcbf0,_0x3a8a4c,_0x3a8a4c);}}else _0x433d70(0x249)===_0x433d70(0x249)?(this['x']=this[_0x433d70(0x214)],this['y']=this[_0x433d70(0x340)]):(_0x2804f2[_0x433d70(0x2b7)][_0x433d70(0x199)][_0x433d70(0x1c8)](this),_0x339013[_0x433d70(0x2e2)]());const _0x224697=SceneManager[_0x433d70(0x31a)]['_windowLayer'];Window_CTB_TurnOrder[_0x433d70(0x343)]===undefined&&(Window_CTB_TurnOrder[_0x433d70(0x343)]=Math[_0x433d70(0x1b7)]((Graphics[_0x433d70(0x303)]-Math['min'](Graphics[_0x433d70(0x292)],_0x224697[_0x433d70(0x303)]))/0x2),Window_CTB_TurnOrder[_0x433d70(0x195)]=Math['round']((Graphics['height']-Math[_0x433d70(0x388)](Graphics[_0x433d70(0x1fe)],_0x224697['height']))/0x2)),this['x']+=_0x224697['x']-Window_CTB_TurnOrder['_ogWindowLayerX'],this['y']+=_0x224697['y']-Window_CTB_TurnOrder[_0x433d70(0x195)];},Window_CTB_TurnOrder[_0x760d64(0x1d8)][_0x760d64(0x2f9)]=function(){const _0x111dc4=_0x760d64;if(!this[_0x111dc4(0x295)])return;const _0x2358a9=this['_turnOrderInnerSprite'][_0x111dc4(0x1a6)];if(!_0x2358a9)return;_0x2358a9[_0x111dc4(0x34a)](this[_0x111dc4(0x202)][_0x111dc4(0x1e6)](this));},Window_CTB_TurnOrder['prototype'][_0x760d64(0x202)]=function(_0x127db0,_0x40ce24){const _0x375c86=_0x760d64,_0x2a3e9b=this['isHorz'](),_0x537d89=Window_CTB_TurnOrder[_0x375c86(0x26d)]['OrderDirection'];if(_0x2a3e9b&&!_0x537d89)return _0x127db0['x']-_0x40ce24['x'];else{if(_0x2a3e9b&&_0x537d89)return _0x40ce24['x']-_0x127db0['x'];else{if(!_0x2a3e9b&&_0x537d89)return _0x127db0['y']-_0x40ce24['y'];else{if(!_0x2a3e9b&&!_0x537d89)return _0x40ce24['y']-_0x127db0['y'];}}}},Window_CTB_TurnOrder['prototype']['updateVisibility']=function(){const _0x220f93=_0x760d64;this[_0x220f93(0x2aa)]=$gameSystem[_0x220f93(0x209)]();},Window_CTB_TurnOrder[_0x760d64(0x1d8)][_0x760d64(0x2c5)]=function(_0x1571ac){const _0xe13779=_0x760d64;this[_0xe13779(0x275)]['sort']((_0x586457,_0x2c07ea)=>{const _0xeaa61e=_0xe13779;if('kTmPO'===_0xeaa61e(0x2be))return _0x586457[_0xeaa61e(0x206)]()-_0x2c07ea[_0xeaa61e(0x206)]();else this['x']=this[_0xeaa61e(0x33e)],this['y']=this['_positionTargetY'],this[_0xeaa61e(0x2ed)]<=0x0&&!this[_0xeaa61e(0x26c)]&&this[_0xeaa61e(0x2cf)](0xff);});if(!_0x1571ac)return;for(const _0x5bc396 of this[_0xe13779(0x275)]){if(_0xe13779(0x2b3)!=='PCgYE'){if(this[_0xe13779(0x2e0)]>0x0)return;if(this[_0xe13779(0x1bd)]>0x0){const _0x3ae595=this[_0xe13779(0x1bd)];this['x']=(this['x']*(_0x3ae595-0x1)+this[_0xe13779(0x33e)])/_0x3ae595,this['y']=(this['y']*(_0x3ae595-0x1)+this[_0xe13779(0x1c9)])/_0x3ae595,this[_0xe13779(0x1bd)]--;}this[_0xe13779(0x1bd)]<=0x0&&this[_0xe13779(0x20f)]&&(this['x']=this['_positionTargetX'],this['y']=this[_0xe13779(0x1c9)],this[_0xe13779(0x2ed)]<=0x0&&!this[_0xe13779(0x26c)]&&this[_0xe13779(0x2cf)](0xff));}else{if(!_0x5bc396)continue;_0x5bc396[_0xe13779(0x247)](),_0x5bc396['_positionDuration']=0x0;}}},Window_CTB_TurnOrder[_0x760d64(0x1d8)]['rotateCTBSprite']=function(_0x430120){const _0x1928cb=_0x760d64;for(const _0x437acb of this['_turnOrderContainer']){if(!_0x437acb)continue;if(_0x437acb[_0x1928cb(0x212)]()!==_0x430120)continue;_0x437acb[_0x1928cb(0x19b)]();}};
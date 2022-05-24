//=============================================================================
// VisuStella MZ - Message Core
// VisuMZ_1_MessageCore.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_1_MessageCore = true;

var VisuMZ = VisuMZ || {};
VisuMZ.MessageCore = VisuMZ.MessageCore || {};
VisuMZ.MessageCore.version = 1.23;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 1] [Version 1.23] [MessageCore]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Message_Core_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Message Core plugin extends and builds upon the message functionality of
 * RPG Maker MZ and allows you, the game dev, to customize the workflow for
 * your game's message system.
 *
 * Features include all (but not limited to) the following:
 *
 * * Control over general message settings.
 * * Auto-Color key words and/or database entries.
 * * Increases the text codes available to perform newer functions/effects.
 * * Ability for you to implement custom Text Code actions.
 * * Ability for you to implement custom Text code string replacements.
 * * Invoke a macro system to speed up the dev process.
 * * Add a Text Speed option to the Options menu.
 * * Add the ever so useful Word Wrap to your message system.
 * * Extend the choice selection process to your liking.
 * * The ability to enable/disable as well as show/hide certain choices.
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
 * Major Changes
 * ============================================================================
 *
 * This plugin adds some new hard-coded features to RPG Maker MZ's functions.
 * The following is a list of them.
 *
 * ---
 * 
 * Dim Background Extension
 * 
 * Before, when using the Dim Background as a part of a Show Text event, its
 * size is only the same as the message window's width itself. This looked
 * really ugly because it had hard edges cutting off while gradients are seen
 * elsewhere. To make it look better, we extended the dimmed background to span
 * the width of the screen instead.
 * 
 * ---
 * 
 * Extended Messages
 * 
 * If you decide to expand the size of the message window to allow for more
 * rows to be displayed, you can type in the data for them by chaining together
 * Show Message events. They will take data from each other and display them in
 * the same message window as long as there are enough rows.
 * 
 * ---
 *
 * Extended Choice Lists
 * 
 * Choice lists can be extended by just chaining one Choice List event after
 * the other in succession along the same indentation. They do not extend if
 * there is any event other than a Choice List option between them on the same
 * indentation level.
 *
 * ---
 *
 * ============================================================================
 * Available Text Codes
 * ============================================================================
 *
 * The following are text codes that you may use with this plugin. Some of
 * these are original text codes provided by RPG Maker MZ, while others are
 * new text codes added through this plugin. You may even add your own text
 * codes through the plugin parameters.
 *
 * === RPG Maker MZ Text Codes ===
 *
 * The following are text codes that come with RPG Maker MZ. These text codes
 * cannot be edited through the Plugin Parameters.
 *
 * ---
 *
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Global)
 * ------------------   -------------------------------------------------------
 * \V[x]                Replaced by the value of variable 'x'.
 * \N[x]                Replaced by the name of actor 'x'.
 * \P[x]                Replaced by the name of party member 'x'.
 * \C[x]                Draw the subsequent text with window skin color 'x'.
 * \I[x]                Draw icon 'x'.
 *
 * \PX[x]               Moves text x position to 'x'.
 * \PY[x]               Moves text y position to 'y'.
 *
 * \G                   Replaced by the currency unit.
 *
 * \{                   Increase the text font size by one step.
 * \}                   Decrease the text font size by one step.
 * \FS[x]               Changes the text font size to 'x'.
 *
 * \\                   Replaced by the backslash character.
 *
 * ---
 *
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Message Window Only)
 * ------------------   -------------------------------------------------------
 * \$                   Opens the gold window.
 * \.                   Waits a 1/4 second.
 * \|                   Waits a full second.
 * \!                   Waits for button input.
 * \>                   Display remaining text on same line all at once.
 * \<                   Cancel the effect that displays text all at once.
 * \^                   Do not wait for input after displaying text to move on.
 *
 * ---
 *
 * === Message Core Hard-Coded Text Codes ===
 *
 * The following text codes are hard-coded into VisuStella MZ Message Core's
 * code. These text codes cannot be edited through the Plugin Parameters.
 * 
 * ---
 *
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Global)
 * ------------------   -------------------------------------------------------
 * <b>                  Makes subsequent text bold.
 * </b>                 Removes bold from subsequent text.
 * <i>                  Makes subsequent text italic.
 * </i>                 Removes italic from subsequent text.
 * 
 * <left>               Makes subsequent text left-aligned.
 * </left>              Removes left-alignment for subsequent text.
 * <center>             Makes subsequent text center-aligned.
 * </center>            Removes center-alignment for subsequent text.
 * <right>              Makes subsequent text right-aligned.
 * </right>             Removes right-alignment for subsequent text.
 *
 * Note1: Use at line-start.
 *
 * <ColorLock>          Text codes can't change text color for subsequent text.
 * </ColorLock>         Removes Color Lock property.
 *
 * <WordWrap>           Enables Word Wrap for this window. *Note2*
 * </WordWrap>          Disables Word Wrap for this window. *Note2*
 * <br>                 Adds a line break. Requires Word Wrap enabled.
 * <line break>         Adds a line break. Requires Word Wrap enabled.
 *
 * Note2: Some windows cannot use Word Wrap such as the Choice Window.
 *
 * \picture<x>          Draws picture x (filename) at current text position.
 * \CenterPicture<x>    Draws picture x (filename) centered at the window.
 *
 * ---
 *
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Message Window Only)
 * ------------------   -------------------------------------------------------
 * \CommonEvent[x]      Runs common event x when text code is reached.
 * \Wait[x]             Makes the message wait x frames before continuing.
 * 
 * <Auto>               Resizes message window dimensions to fit text. *Note3*
 * <Auto Width>         Resizes message window width to fit text. *Note3*
 * <Auto Height>        Resizes message window height to fit text. *Note3*
 * 
 * <Auto Actor: x>      Resizes message window and positions it over actor x
 *                      sprite's head. *Note3*
 * <Auto Party: x>      Resizes message window and positions it over party
 *                      member x sprite's head. *Note3*
 * <Auto Player>        Map-Only. Resizes message window and positions it over
 *                      the player sprite's head. *Note3*
 * <Auto Event: x>      Map-Only. Resizes message window and positions it over
 *                      event x sprite's head. *Note3*
 * <Auto Enemy: x>      Battle-Only. Resizes message window and positions it
 *                      over enemy x sprite's head. *Note3*
 *
 * Note3: Upon using these text codes, the message window's settings will be
 * reset for the upcoming message. These effects do not work with Word Wrap.
 *
 * ---
 *
 * ----------------------------   ---------------------------------------------
 * Text Code                      Effect (Battle Only)
 * ----------------------------   ---------------------------------------------
 * <Current Battle Target>        Replaces text code with the current target of
 *                                an action in battle.
 * <Current Battle User>          Replaces text code with the currently active
 *                                user in battle.
 * <Current Battle Action>        Replaces text code with the current battle
 *                                action's name with an icon in front.
 * <Current Battle Action Name>   Replaces text code with the current battle
 *                                action's name without an icon.
 * 
 * If there is no battle, no target, no user, or no action, then the text code
 * will just be replaced with no text.
 * 
 * These text codes are NOT recommended to be used inside of Help Descriptions.
 * They are best used with "Show Text" event commands.
 *
 * ---
 *
 * -----------------------------  ---------------------------------------------
 * Text Code                      Effect (Choice Window Only)
 * -----------------------------  ---------------------------------------------
 * <Show>                         Choice is always shown.
 * <Show Switch: x>               Choice shown if switch x is ON.
 * <Show Switches: x,x,x>         Choice shown if the x switches are all ON.
 * <Show All Switches: x,x,x>     Choice shown if the x switches are all ON.
 * <Show Any Switches: x,x,x>     Choice shown if any of x switches are ON.
 *
 * <Hide>                         Choice is always hidden.
 * <Hide Switch: x>               Choice hidden if switch x is ON.
 * <Hide Switches: x,x,x>         Choice hidden if the x switches are all ON.
 * <Hide All Switches: x,x,x>     Choice hidden if the x switches are all ON.
 * <Hide Any Switches: x,x,x>     Choice hidden if any of x switches are ON.
 *
 * <Enable>                       Choice is always enabled.
 * <Enable Switch: x>             Choice enabled if switch x is ON.
 * <Enable Switches: x,x,x>       Choice enabled if the x switches are all ON.
 * <Enable All Switches: x,x,x>   Choice enabled if the x switches are all ON.
 * <Enable Any Switches: x,x,x>   Choice enabled if any of x switches are ON.
 *
 * <Disable>                      Choice is always disabled.
 * <Disable Switch: x>            Choice disabled if switch x is ON.
 * <Disable Switches: x,x,x>      Choice disabled if the x switches are all ON.
 * <Disable All Switches: x,x,x>  Choice disabled if the x switches are all ON.
 * <Disable Any Switches: x,x,x>  Choice disabled if any of x switches are ON.
 *
 * ---
 *
 * -----------------  ---------------------------------------------------------
 * Text Code          Effect (Name Window Only)
 * -----------------  ---------------------------------------------------------
 * <Left>             Positions the name box window to the left.
 * <Center>           Positions the name box window to the center.
 * <Right>            Positions the name box window to the right.
 * <Position: x>      Replace 'x' with a number from 0 to 10. This positions
 *                    the name box window on the screen relative to the
 *                    position of the value 'x' represents.
 * \NormalBG          Changes background type of window to normal type.
 * \DimBG             Changes background type of window to dim type.
 * \TransparentBG     Changes background type of window to transparent type.
 *
 * ---
 * 
 * -------------------------------   ------------------------------------------
 * Text Code                         Effect (Message Window Only)
 * -------------------------------   ------------------------------------------
 * 
 * <Position: x, y, width, height>   Forces the message window to exact listed
 *                                   coordinates and dimensions. Replace each
 *                                   of the arguments with numbers. *Note*
 * 
 * <Coordinates: x, y>               Forces the message window to the exact
 *                                   listed coordinates. Replace each of the
 *                                   arguments with numbers. *Note*
 * 
 * <Dimensions: width, height>       Forces the message window size to the
 *                                   exact listed dimensions. Replace each of
 *                                   the arguments with numbers. *Note*
 * 
 * *NOTE* These text codes do not work with Word Wrap.
 * 
 * ---
 *
 * === Message Core Customizable Text Codes ===
 *
 * The following text codes can be altered through the Message Core's various
 * Plugin Parameters to adjust replacements and actions.
 *
 * ---
 *
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Global)
 * ------------------   -------------------------------------------------------
 * \Class[x]            Draws class x's icon (if have) and name.
 * \ClassName[x]        Draws class x's name only.
 *
 * \Skill[x]            Draws skill x's icon (if have) and name.
 * \SkillName[x]        Draws skill x's name only.
 *
 * \Item[x]             Draws item x's icon (if have) and name.
 * \ItemName[x]         Draws item x's name only.
 * \ItemQuantity[x]     Inserts the number of item x's owned by the party.
 *
 * \Weapon[x]           Draws weapon x's icon (if have) and name.
 * \WeaponName[x]       Draws weapon x's name only.
 * \WeaponQuantity[x]   Inserts the number of weapon x's owned by the party.
 *
 * \Armor[x]            Draws armor x's icon (if have) and name.
 * \ArmorName[x]        Draws armor x's name only.
 * \ArmorQuantity[x]    Inserts the number of armor x's owned by the party.
 *
 * \LastGainObj         Draws the icon + name of the last party-gained object.
 * \LastGainObjName     Draws the name of the last party-gained object.
 * \LastGainObjQuantity Inserts the quantity of the last party-gained object.
 *
 * \State[x]            Draws state x's icon (if have) and name.
 * \StateName[x]        Draws state x's name only.
 *
 * \Enemy[x]            Draws enemy x's icon (if have) and name.
 * \EnemyName[x]        Draws enemy x's name only.
 *
 * \Troop[x]            Draws troop x's icon (if have) and name.
 * \TroopName[x]        Draws troop x's name only.
 *
 * \TroopMember[x]      Draws troop member x's icon (if have) and name. *Note1*
 * \TroopNameMember[x]  Draws troop member x's name only. *Note1*
 * 
 * Note1: Only works in battle.
 *
 * \NormalBG            Changes background type of window to normal type.
 * \DimBG               Changes background type of window to dim type.
 * \TransparentBG       Changes background type of window to transparent type.
 *
 * \FontChange<x>       Changes font face to x font name.
 * \ResetFont           Resets font settings.
 *
 * \ResetColor          Resets color settings.
 * \HexColor<x>         Changes text color to x hex color (ie. #123abc).
 * \OutlineColor[x]     Changes outline color to text color x.
 * \OutlineHexColor<x>  Changes outline color to x hex color (ie. #123abc).
 * \OutlineWidth[x]     Changes outline width to x thickness.
 * 
 * \WindowMoveTo<?>     Moves window to exact coordinates. *Note2*
 * \WindowMoveBy<?>     Moves window by relative values. *Note2*
 * \WindowReset         Resets window position to original position.
 *
 * Note2: Replace '?' with the following format:
 *   targetX, targetY, targetWidth, targetHeight, duration, easingType
 *   Only targetX and targetY are required arguments. These will only alter the
 *   window dimensions when the text has arrived at that point. They will not
 *   alter the window preemptively. This is not used as a window positioner.
 *   Use the <Position: x, y, width, height> text code for that.
 *
 * ---
 *
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Message Window Only)
 * ------------------   -------------------------------------------------------
 * \ActorFace[x]        Inserts actor x's face into the Message Window.
 * \PartyFace[x]        Inserts party member x's face into the Message Window.
 * \ChangeFace<x,y>     Changes message face to x filename, y index.
 * \FaceIndex[x]        Changes message face index to x.
 *
 * \TextDelay[x]        Sets delay in frames between characters to x frames.
 * 
 * ---
 * 
 * As these text codes can be added, removed, and/or altered, their functions
 * may or may not be the same depending on how you've altered them. VisuStella
 * is not responsible for any errors caused by changes made to pre-made text
 * codes nor any new text codes they did not make.
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
 * === Message Plugin Commands ===
 * 
 * ---
 *
 * Message: Properties
 *   Change the various properties of the Message Window.
 *
 *   Rows:
 *   - Change the number of Message Window rows.
 *   - Leave at 0 to keep it unchanged.
 *
 *   Width: 
 *   - Change the Message Window width in pixels.
 *   - Leave at 0 to keep it unchanged.
 *
 *   Center:
 *   - Center the window X after changing its width?
 *
 *   Word Wrap:
 *   - Enable or disable Word Wrap for the Message Window?
 *
 * ---
 * 
 * === Choice Plugin Commands ===
 * 
 * ---
 *
 * Choice: Properties
 *   Change the properties found in the Show Choices event command.
 *
 *   Line Height:
 *   - Change the line height for the show choices.
 *   - Leave at 0 to keep this unchanged.
 *
 *   Max Rows:
 *   - Maximum number of choice rows to be displayed.
 *   - Leave at 0 to keep this unchanged.
 *
 *   Max Columns:
 *   - Maximum number of choice columns to be displayed.
 *   - Leave at 0 to keep this unchanged.
 *
 *   Text Alignment:
 *   - Text alignment for Show Choice window.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Settings
 * ============================================================================
 *
 * General settings involving the message system. These settings range from
 * adjust how the Message Window looks to more intricate settings like how
 * some of the default text codes work.
 *
 * ---
 *
 * Message Window
 *
 *   Default Rows:
 *   - Default number of rows to display for the Message Window.
 *
 *   Default Width:
 *   - Default Message Window width in pixels.
 *
 *   Fast Forward Key:
 *   - This is the key used for fast forwarding messages.
 *   - WARNING: If this key is the same as the dash button, this will clear out
 *     any held down inputs upon triggering an event  to prevent players from
 *     skipping potentially useful information stored in messages. If you do
 *     not want the input to be cleared, use a different key.
 *
 *   Text Delay:
 *   - How many frames to wait between characters drawn?
 *   - Use 0 for instant.
 * 
 *   Default Outline Width:
 *   - Changes the default outline width to this many pixels thick.
 *
 * ---
 *
 * Name Box Window
 *
 *   Default Color:
 *   - Default color for the Name Box Window's text.
 *
 *   Offset X:
 *   - How much to offset the name box window X by
 *     (as long as it doesn't go offscreen).
 *
 *   Offset Y:
 *   - How much to offset the name box window Y by
 *     (as long as it doesn't go offscreen).
 *
 * ---
 *
 * Choice List Window
 *
 *   Line Height:
 *   - What is the default line height for Show Choices?
 *
 *   Max Rows:
 *   - Maximum number of rows to visibly display?
 *
 *   Max Columns:
 *   - Maximum number of columns to visibly display?
 *
 *   Text Alignment:
 *   - Default alignment for Show Choice window.
 *
 * ---
 *
 * Default Text Codes
 *
 *   Relative \PX \PY:
 *   - Make \PX[x] and \PY[x] adjust relative starting position than
 *     exact coordinates.
 *
 *   \{ Maximum:
 *   - Determine the maximum size that \{ can reach.
 *
 *   \} Minimum:
 *   - Determine the minimum size that \} can reach.
 *
 *   \{ Change \}
 *   - How much does \{ and \} change font size by?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Auto-Color Settings
 * ============================================================================
 *
 * For certain windows such as the Message Window, Help Window, and Choice
 * Window, Auto-Color is enabled to automatically highlight and color certain
 * database entries, keywords, and just about anything you, the game dev, wants
 * to be automatically colored. This is done to avoid typing out \C[6]Jack\C[0]
 * every time Jack's name is written out as it will be automatically colored in
 * those specific windows.
 *
 * The Plugin Parameters will give you full reign over which database entries
 * and keywords you want to be automatically colored as long as they follow a
 * few rules:
 * 
 * -----------------
 * Auto-Color Rules:
 * -----------------
 *
 * 1. Database names and keywords are case sensitive.
 *    This means if "Potion" is a marked keyword, typing out "potion" will not
 *    prompt the auto-color to highlight "potion". You must add the lowercase
 *    version of the word into the keyword list if you want it to count.
 *
 * 2. Database names and keywords are exact size (for Roman languages)
 *    This means if "Potion" is a marked keyword, typing out "potions" will not
 *    prompt the auto-color to highlight "potions". You must type out all of
 *    the variations of the words you want affected into the keyword list to
 *    prompt the auto-color highlight.
 * 
 *    This does not apply to Japanese, Korean, or Chinese languages.
 *
 * 3. Possessive cases and other language symbols aren't counted.
 *    Symbols such as periods, commas, quotes, parentheses, and similar symbols
 *    do no count towards Rule 2. This means if "Potion" is a marked keyword,
 *    the typing out "(Potion)" will still highlight the "Potion" part of the
 *    word according to the auto-color.
 * 
 * 4. Names with special characters like !, ?, [, ], etc. will be ignored.
 *    These cause conflicts with how auto-colors are detected.
 *
 * ---
 *
 * Database Highlighting
 *
 *   Actors:
 *   Classes:
 *   Skills:
 *   Items:
 *   Weapons:
 *   Armors:
 *   Enemies:
 *   States:
 *   - Any usage of a the selected database entry's name is auto-colored with
 *     the text code number.
 *   - Use 0 to not auto-color.
 *
 * ---
 *
 * Word Highlighting
 *
 *   \C[x]: Color
 *   - These are lists of all the words that will be automatically colored with
 *     the x text color.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Text Code Actions
 * ============================================================================
 *
 * Text codes are used for one of two things: performing actions or replacing
 * themselves with text data. This Plugin Parameter will focus on the aspect of
 * performing actions. These actions can be done through each JavaScript or by
 * a common event (if it is used in the Message Window). Adequate knowledge of
 * both is recommended before attempting to modify and/or add new Text Code
 * Actions to the Plugin Parameters.
 *
 * Each of the Text Code Actions are formatted in such a way:
 *
 * ---
 *
 * Text Code Action
 *
 *   Match:
 *   - This is what needs to be matched in order for this text code to work.
 *   - This is the primary text marker after the \ in a text code.
 *   - In \N[x], this would be the 'N'.
 *
 *   Type:
 *   - The type of parameter to obtain (none, number, or string).
 *   - This is the way the text code determines the condition type.
 *   - In \N[x], this would be the '[x]'.
 *
 *   Common Event:
 *   - Select a common event to run when this text code is used in a message.
 *
 *   JS: Action:
 *   - JavaScript code used to perform an action when this text code appears.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Text Code Replacements
 * ============================================================================
 *
 * Text codes are used for one of two things: performing actions or replacing
 * themselves with text data. This Plugin Parameter will focus on the aspect of
 * replacing the text codes with text data. Text data can be replaced with
 * an exact exchange of text or dynamically through JavaScript. Adding a new
 * Text Code Replacement is done through the Plugin Parameters.
 *
 * Each of the Text Code Replacements are formatted in such a way:
 *
 * ---
 *
 * Text Code Replacement
 *
 *   Match:
 *   - This is what needs to be matched in order for this text code to work.
 *   - This is the primary text marker after the \ in a text code.
 *   - In \N[x], this would be the 'N'.
 *
 *   Type:
 *   - The type of parameter to obtain (none, number, or string).
 *   - This is the way the text code determines the condition type.
 *   - In \N[x], this would be the '[x]'.
 *
 *   STR: Text:
 *   - The text that will appear if this match appears.
 *     If this has a value, ignore the JS: Text version.
 *
 *   JS: Text:
 *   - JavaScript code used to determine the text that will appear if this
 *     match appears.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Text Macros
 * ============================================================================
 *
 * Text macros are used in similar fashion to text codes replacements to
 * replace themselves with text data. The primary difference is that macros are
 * made in a different format with no conditional argument modifiers (ie the
 * [x] that follows a text code).
 *
 * To use a text macro, type in the matching keyword between two [brackets] and
 * it will be replaced by the string data or run the JavaScript code found in
 * the Plugin Parameter settings.
 *
 * For example, if you have the text macro "Leader", made to return the party
 * leader's name, you can type in [Leader] in the Message Window and it will be
 * replaced with the party leader's name. The output can also output text codes
 * into the resulting text.
 * 
 * This does NOT work with \MacroName as it did with Yanfly Engine Plugins.
 * Use the method stated before with the brackets to [MacroName] instead.
 *
 * Each of the Text Macros are formatted in such a way:
 *
 * ---
 *
 * Text Macro
 *
 *   Match:
 *   - This is what needs to be matched in order for this macro to work.
 *   - In [Leader], this would be the 'Leader' text.
 *
 *   STR: Text:
 *   - The replacement text that will appear from the macro.
 *   - If this has a value, ignore the JS: Text version.
 *
 *   JS: Text:
 *   - JavaScript code used to determine the text that will appear if this
 *     macro appears.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Text Speed Option Settings
 * ============================================================================
 *
 * Modern RPG's on the market have the option to adjust the message speed rate
 * for players. These Plugin Parameters allow you to add that option to the
 * Options Menu as well.
 *
 * ---
 *
 * Text Speed Option Settings
 *
 *   Add Option?:
 *   - Add the 'Text Speed' option to the Options menu?
 *
 *   Adjust Window Height:
 *   - Automatically adjust the options window height?
 *
 *   Option Name:
 *   - Command name of the option.
 *
 *   Default Value:
 *   - 1 - 10, slowest to fastest.
 *   - 11 is instant value.
 *
 *   Instant Speed:
 *   - Text to show "instant" text.
 *
 * ---
 * 
 * ============================================================================
 * Plugin Parameters: Word Wrap Settings
 * ============================================================================
 *
 * Word wrap is a property that will cause any overflowing text to wrap around
 * and move into the next line. This property can only be enabled inside text
 * that accept text codes, such as the Message Window and Help Window. However,
 * word wrap is disabled for the Choice Window due to the nature of the Choice
 * Window's base properties.
 *
 * Word wrap can be enabled or disabled in three ways. One is by using the text
 * code <WordWrap> to enable it or </WordWrap> to disable it. The second method
 * is by enabling it with the Plugin Command: 'Message: Properties'. The third
 * method is by enabling it by default with the Plugin Parameters.
 *
 * ---
 *
 * Enable Word Wrap
 *
 *   Message Window:
 *   - Automatically enable Word Wrap for this window?
 *
 *   Help Window:
 *   - Automatically enable Word Wrap for this window?
 *
 * ---
 *
 * Rules
 *
 *   Link Break -> Space:
 *   - Convert manually placed (non tagged) line breaks with spaces?
 *   - Line breaks must be inserted using the <br> text code.
 *
 *   Tight Wrap:
 *   - If a face graphic is present in a message, word wrap will be tighter.
 * 
 *   End Padding:
 *   - Add extra padding to your window to make text wrap further away from the
 *     end of the window.
 *   - This will default to 0.
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
 * Version 1.23: July 16, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameter added by Irina:
 * *** Plugin Parameters > Word Wrap Settings > End Padding
 * **** Add extra padding to your window to make text wrap further away from
 *      the end of the window. This will default to 0.
 * 
 * Version 1.22: July 2, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Text Codes added by Irina and sponsored by AndyL:
 * *** <Current Battle Target>
 * *** <Current Battle User>
 * **** Replaces the text code with the current target or current user's name
 *      in-battle. Otherwise, returns nothing.
 * **** Not recommended to be used inside of Help Descriptions. They are best
 *      used with "Show Text" event commands.
 * *** <Current Battle Action>
 * *** <Current Battle Action Name>
 * **** Replaces the text code with the current battle action's name with the
 *      icon or without it respectively. Otherwise, returns nothing.
 * **** Not recommended to be used inside of Help Descriptions. They are best
 *      used with "Show Text" event commands.
 * 
 * Version 1.21: June 4, 2021
 * * Documentation Update!
 * ** Added extra note to the new <Position: x, y, width, height> text codes
 *    that they do not work with Word Wrap.
 * * Feature Update!
 * ** Added fail safe for preventing Common Events that don't exist from being
 *    ran at all by the Message Window. Added by Arisu.
 * 
 * Version 1.20: May 28, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Added additional clarity for \WindowMoveTo<?> and \WindowMoveBy<?> and
 *    \WindowReset text codes with "Note 2".
 * *** Replace '?' with the following format: targetX, targetY, targetWidth,
 *     targetHeight, duration, easingType. Only targetX and targetY are
 *     required arguments. These will only alter the window dimensions when the
 *     text has arrived at that point. They will not alter the window
 *     preemptively. This is not used as a window positioner. Use the
 *     <Position: x, y, width, height> text code for that.
 * * New Features!
 * ** New hard-coded text codes added for Message Window Only. Added by Irina.
 * *** <Position: x, y, width, height>
 * *** <Coordinates: x, y>
 * *** <Dimensions: width, height>
 * 
 * Version 1.19: May 14, 2021
 * * Feature Updates!
 * ** <br> line breaks can now be used by Show Choices. Make sure that there is
 *    enough room to contain the text through Plugin Commands. Update by Irina.
 * 
 * Version 1.18: April 30, 2021
 * * Bug Fixes!
 * ** Moving windows with 0 duration via text code should now instantly move
 *    the windows to the desired location with no delay. Fix made by Olivia.
 * 
 * Version 1.17: April 9, 2021
 * * Feature Update!
 * ** <Auto> text codes for message windows will round up calculations for the
 *    message width to the nearest even number for better calculations.
 * 
 * Version 1.16: April 2, 2021
 * * Bug Fixes!
 * ** \CommonEvent[x] text code will no longer run upon message window size
 *    calculation. Fix made by Arisu.
 * * Documentation Update!
 * ** Added further clarification for "Text Macros" section.
 * *** This does NOT work with \MacroName as it did with Yanfly Engine Plugins.
 *     Use the method stated before with the brackets to [MacroName] instead.
 * 
 * Version 1.15: March 5, 2021
 * * Bug Fixes!
 * ** Hidden choices by switches will no longer count towards the maximum line
 *    count for Show Choice options. Fix made by Irina.
 * 
 * Version 1.14: February 12, 2021
 * * Bug Fixes!
 * ** Auto positioned messages in battle will no longer cover the battler in
 *    question. Fix made by Irina.
 * 
 * Version 1.13: February 5, 2021
 * * Bug Fixes!
 * ** Choice List Window with a dimmed background should now have a more
 *    consistent sized dim sprite. Fix made by Irina.
 * 
 * Version 1.12: January 22, 2021
 * * Feature Update!
 * ** Name Box Window Default Color is now disabled by default to 0 because
 *    users do not understand why their names are showing up yellow and did not
 *    bother reading the documentation. If users want this feature turned on,
 *    they will have to do it manually from now on. Update made by Irina.
 * 
 * Version 1.11: January 15, 2021
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.10: January 8, 2021
 * * Bug Fixes!
 * ** <Auto Actor: x> and <Auto Party: x> text codes should now work properly.
 *    Fix made by Irina.
 * * Feature Update!
 * ** Auto Color Plugin Parameters now have their default settings set to 0.
 *    This is due to an influx of "bug reports" from users who do not
 *    understand how this feature works, and the VisuStella team has decided it
 *    is better for the feature to default to an inactive state until users
 *    decide to search and utilize it themselves. Update made by Irina.
 * 
 * Version 1.09: January 1, 2021
 * * Feature Update!
 * ** Auto-color no longer applies to database names that are only numbers.
 *    Auto-color entries that are only numbers will also be ignored. This is to
 *    prevent breaking the text code parsing. Update made by Yanfly.
 * 
 * Version 1.08: November 15, 2020
 * * Documentation Update!
 * ** Some text codes left for the Name Box Window have been accidentally left
 *    out. These text codes allow for the positioning of the Name Box Window.
 *    Also, added to this section are the \NormalBG, \DimBG, and \TransparentBG
 *    text codes since people have been asking for how to change the name box
 *    window's background, but have skimmed over those text codes in different
 *    sections of the help file.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.07: November 8, 2020
 * * Bug Fixes!
 * ** When using auto size functions, the message pause symbol will no longer
 *    appear semi-transparent the whole time. Fix made by Irina.
 * 
 * Version 1.06: October 25, 2020
 * * Documentation Update!
 * ** Added a warning message to the Fast Forward Key plugin parameter:
 * *** WARNING: If this key is the same as the dash button, this will clear out
 *     any held down inputs upon triggering an event  to prevent players from
 *     skipping potentially useful information stored in messages. If you do
 *     not want the input to be cleared, use a different key.
 * ** Updated help file for new features.
 * * Feature Update!
 * ** The default Fast Forward Key setting has now been changed from "Shift" to
 *    "Page Down". Change made by Yanfly
 * * New Feature!
 * ** New Plugin Parameter added by Irina.
 * *** Plugin Parameters > General > Default Outline Width
 * **** Changes the default outline width to this many pixels thick.
 * 
 * Version 1.06: September 27, 2020
 * * Bug Fixes!
 * ** Setting an actor's autocolor will now disable it from \N[x] and \P[x]
 *    text codes. Fix made by Irina.
 * 
 * Version 1.05: September 20, 2020
 * * Bug Fixes!
 * ** Auto Position text codes not place positions properly if the screen width
 *    and height differ from the box width and box height. Fix made by Irina.
 * 
 * Version 1.04: September 13, 2020
 * * Bug Fixes!
 * ** Word wrap no longer affects specific battle messages. Fix made by Irina.
 * ** Word wrap now updates properly after using the 'Message: Properties'
 *    Plugin Command. Fix made by Arisu.
 * 
 * Version 1.03: September 6, 2020
 * * Bug Fixes!
 * ** Autoplacement of the name box window now takes its offset Y setting into
 *    account before sending it to the bottom of the message window. Fix made
 *    by Yanfly.
 * ** Added automatic feature setting to turn off word wrap when using the
 *    auto-size and auto-position text codes. This is because the auto-size and
 *    auto-position effects don't work properly with Word Wrap based on how
 *    they both clash when adjusting the window settings. Fix made by Irina.
 * ** New message pages after auto-sizing no longer put out empty messages.
 *    Fix made by Irina and Shiro.
 * * Documentation Update!
 * ** Extended the note for auto-size and auto-position text codes to include
 *    that they do not work with Word Wrap. Added by Irina.
 * 
 * Version 1.02: August 30, 2020
 * * New Features!
 * ** Added new hard-coded text codes for auto-sizing and auto-positioning:
 * *** <Auto>, <Auto Width>, <Auto Height>
 * *** <Auto Actor: x>, <Auto Party: x>, <Auto Enemy: x>
 * *** <Auto Player>, <Auto Actor: x>, <Auto Party: x>, <Auto Event: x>
 * **** New features added by Irina.
 * 
 * Version 1.01: August 23, 2020
 * * Bug Fixes!
 * ** </Wordwrap> now works.
 * ** \ActorFace[x] text code now fixed.
 * *** Users updating from version 1.00 will need to fix this problem by either
 *     removing the plugin from the Plugin Manager list and reinstalling it, or
 *     going to Plugin Parameters > Text Code Replacements > ActorFace >
 *     JS: Text > and changing "$gameActors.actor(1)" to
 *     "$gameActors.actor(actorId)"
 * ** Actors with empty names would cause auto hightlight problems. Fixed!
 * ** Auto-colors now ignore names with special characters like !, ?, [, ], and
 *    so on.
 * ** Line break spacing fixed.
 * * New Features!
 * ** Wordwrap now works with <left>, <center> and <right> alignment tags.
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
 * @command MessageWindowProperties
 * @text Message: Properties
 * @desc Change the various properties of the Message Window.
 *
 * @arg Rows:num
 * @text Rows
 * @type number
 * @min 0
 * @desc Change the number of Message Window rows.
 * Leave at 0 to keep it unchanged.
 * @default 4
 *
 * @arg Width:num
 * @text Width
 * @type number
 * @min 0
 * @desc Change the Message Window width in pixels.
 * Leave at 0 to keep it unchanged.
 * @default 816
 *
 * @arg Center:eval
 * @text Center Window X?
 * @parent Width
 * @type boolean
 * @on Center
 * @off Don't
 * @desc Center the window X after changing its width?
 * @default true
 *
 * @arg WordWrap:str
 * @text Word Wrap
 * @type select
 * @option No Change
 * @value No Change
 * @option Enable
 * @value true
 * @option Disable
 * @value false
 * @desc Enable or disable Word Wrap for the Message Window?
 * @default No Change
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ChoiceWindowProperties
 * @text Choices: Properties
 * @desc Change the properties found in the Show Choices event command.
 *
 * @arg LineHeight:num
 * @text Line Height
 * @type number
 * @min 0
 * @desc Change the line height for the show choices.
 * Leave at 0 to keep this unchanged.
 * @default 36
 *
 * @arg MaxRows:num
 * @text Max Rows
 * @type number
 * @min 0
 * @desc Maximum number of choice rows to be displayed.
 * Leave at 0 to keep this unchanged.
 * @default 8
 *
 * @arg MaxCols:num
 * @text Max Columns
 * @type number
 * @min 0
 * @desc Maximum number of choice columns to be displayed.
 * Leave at 0 to keep this unchanged.
 * @default 1
 *
 * @arg TextAlign:str
 * @text Text Alignment
 * @type select
 * @option Default
 * @value default
 * @option Left
 * @value left
 * @option Center
 * @value center
 * @option Right
 * @value right
 * @desc Text alignment for Show Choice window.
 * @default default
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
 * @param MessageCore
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param General:struct
 * @text General Settings
 * @type struct<General>
 * @desc General settings involving the message system.
 * @default {"MessageWindow":"","MessageRows:num":"4","MessageWidth:num":"816","FastForwardKey:str":"pagedown","MessageTextDelay:num":"1","StretchDimmedBg:eval":"true","DefaultOutlineWidth:num":"3","NameBoxWindow":"","NameBoxWindowDefaultColor:num":"0","NameBoxWindowOffsetX:num":"0","NameBoxWindowOffsetY:num":"0","ChoiceListWindow":"","ChoiceWindowLineHeight:num":"36","ChoiceWindowMaxRows:num":"8","ChoiceWindowMaxCols:num":"1","ChoiceWindowTextAlign:str":"default","DefaultTextCodes":"","RelativePXPY:eval":"true","FontBiggerCap:eval":"108","FontSmallerCap:eval":"12","FontChangeValue:eval":"12"}
 *
 * @param AutoColor:struct
 * @text Auto-Color Settings
 * @type struct<AutoColor>
 * @desc Automatically color certain keywords a specific way.
 * @default {"DatabaseHighlighting":"","Actors:str":"0","Classes:str":"0","Skills:str":"0","Items:str":"0","Weapons:str":"0","Armors:str":"0","Enemies:str":"0","States:str":"0","WordHighlighting":"","TextColor1:arraystr":"[]","TextColor2:arraystr":"[]","TextColor3:arraystr":"[]","TextColor4:arraystr":"[]","TextColor5:arraystr":"[]","TextColor6:arraystr":"[]","TextColor7:arraystr":"[]","TextColor8:arraystr":"[]","TextColor9:arraystr":"[]","TextColor10:arraystr":"[]","TextColor11:arraystr":"[]","TextColor12:arraystr":"[]","TextColor13:arraystr":"[]","TextColor14:arraystr":"[]","TextColor15:arraystr":"[]","TextColor16:arraystr":"[]","TextColor17:arraystr":"[]","TextColor18:arraystr":"[]","TextColor19:arraystr":"[]","TextColor20:arraystr":"[]","TextColor21:arraystr":"[]","TextColor22:arraystr":"[]","TextColor23:arraystr":"[]","TextColor24:arraystr":"[]","TextColor25:arraystr":"[]","TextColor26:arraystr":"[]","TextColor27:arraystr":"[]","TextColor28:arraystr":"[]","TextColor29:arraystr":"[]","TextColor30:arraystr":"[]","TextColor31:arraystr":"[]"}
 *
 * @param TextCodeActions:arraystruct
 * @text Text Code Actions
 * @type struct<TextCodeAction>[]
 * @desc Text codes that perform actions.
 * @default ["{\"Match:str\":\"ChangeFace\",\"Type:str\":\"\\\\<(.*?)\\\\>\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst data = this.obtainEscapeString(textState).split(',');\\\\nif (textState.drawing) {\\\\n    const filename = data[0].trim();\\\\n    const index = parseInt(data[1] || '0');\\\\n    $gameMessage.setFaceImage(filename, index);\\\\n    this.loadMessageFace();\\\\n    const rtl = $gameMessage.isRTL();\\\\n    const width = ImageManager.faceWidth;\\\\n    const height = this.innerHeight;\\\\n    const x = rtl ? this.innerWidth - width - 4 : 4;\\\\n    this.contents.clearRect(x, 0, width, height);\\\\n    this._faceBitmap.addLoadListener(this.drawMessageFace.bind(this));\\\\n}\\\"\"}","{\"Match:str\":\"FaceIndex\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst index = this.obtainEscapeParam(textState);\\\\nif (textState.drawing) {\\\\n    const filename = $gameMessage.faceName();\\\\n    $gameMessage.setFaceImage(filename, index);\\\\n    this.loadMessageFace();\\\\n    const rtl = $gameMessage.isRTL();\\\\n    const width = ImageManager.faceWidth;\\\\n    const height = this.innerHeight;\\\\n    const x = rtl ? this.innerWidth - width - 4 : 4;\\\\n    this.contents.clearRect(x, 0, width, height);\\\\n    this._faceBitmap.addLoadListener(this.drawMessageFace.bind(this));\\\\n}\\\"\"}","{\"Match:str\":\"TextDelay\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst delay = this.obtainEscapeParam(textState);\\\\nif (textState.drawing && this.constructor === Window_Message) {\\\\n    this.setTextDelay(delay);\\\\n}\\\"\"}","{\"Match:str\":\"NormalBG\",\"Type:str\":\"\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nif (textState.drawing) {\\\\n    this.setBackgroundType(0);\\\\n}\\\"\"}","{\"Match:str\":\"DimBG\",\"Type:str\":\"\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nif (textState.drawing) {\\\\n    this.setBackgroundType(1);\\\\n}\\\"\"}","{\"Match:str\":\"TransparentBG\",\"Type:str\":\"\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nif (textState.drawing) {\\\\n    this.setBackgroundType(2);\\\\n}\\\"\"}","{\"Match:str\":\"FontChange\",\"Type:str\":\"\\\\<(.*?)\\\\>\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst fontName = this.obtainEscapeString(textState);\\\\nthis.contents.fontFace = fontName;\\\"\"}","{\"Match:str\":\"ResetFont\",\"Type:str\":\"\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"this.resetFontSettings();\\\"\"}","{\"Match:str\":\"ResetColor\",\"Type:str\":\"\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"this.resetTextColor();\\\"\"}","{\"Match:str\":\"HexColor\",\"Type:str\":\"\\\\<(.*?)\\\\>\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst hexColor = this.obtainEscapeString(textState);\\\\nif (!this.isColorLocked() && textState.drawing) {\\\\n    this.changeTextColor(hexColor);\\\\n}\\\"\"}","{\"Match:str\":\"OutlineColor\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst colorIndex = this.obtainEscapeParam(textState);\\\\nif (!this.isColorLocked() && textState.drawing) {\\\\n    this.changeOutlineColor(ColorManager.textColor(colorIndex));\\\\n}\\\"\"}","{\"Match:str\":\"OutlineHexColor\",\"Type:str\":\"\\\\<(.*?)\\\\>\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst hexColor = this.obtainEscapeString(textState);\\\\nif (!this.isColorLocked() && textState.drawing) {\\\\n    this.changeOutlineColor(hexColor);\\\\n}\\\"\"}","{\"Match:str\":\"OutlineWidth\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst width = this.obtainEscapeParam(textState);\\\\nif (textState.drawing) {\\\\n    this.contents.outlineWidth = width;\\\\n}\\\"\"}","{\"Match:str\":\"WindowMoveTo\",\"Type:str\":\"\\\\<(.*?)\\\\>\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst data = this.obtainEscapeString(textState).split(',');\\\\nif (textState.drawing) {\\\\n    const x = !!data[0] ? Number(data[0].trim()) : this.x;\\\\n    const y = !!data[1] ? Number(data[1].trim()) : this.y;\\\\n    const width = !!data[2] ? Number(data[2].trim()) : this.width;\\\\n    const height = !!data[3] ? Number(data[3].trim()) : this.height;\\\\n    const duration = !!data[4] ? Number(data[4].trim()) : 20;\\\\n    const easingType = !!data[5] ? data[5].trim() : 0;\\\\n    this.moveTo(x, y, width, height, duration, easingType);\\\\n}\\\"\"}","{\"Match:str\":\"WindowMoveBy\",\"Type:str\":\"\\\\<(.*?)\\\\>\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst data = this.obtainEscapeString(textState).split(',');\\\\nif (textState.drawing) {\\\\n    const x = !!data[0] ? Number(data[0].trim()) : 0;\\\\n    const y = !!data[1] ? Number(data[1].trim()) : 0;\\\\n    const width = !!data[2] ? Number(data[2].trim()) : 0;\\\\n    const height = !!data[3] ? Number(data[3].trim()) : 0;\\\\n    const duration = !!data[4] ? Number(data[4].trim()) : 20;\\\\n    const easingType = !!data[5] ? data[5].trim() : 0;\\\\n    this.moveBy(x, y, width, height, duration, easingType);\\\\n}\\\"\"}","{\"Match:str\":\"WindowReset\",\"Type:str\":\"\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nif (textState.drawing) {\\\\n    const frames = 20;\\\\n    const easingType = 0;\\\\n    this.resetRect(frames, easingType);\\\\n}\\\"\"}"]
 *
 * @param TextCodeReplace:arraystruct
 * @text Text Code Replacements
 * @type struct<TextCodeReplace>[]
 * @desc Text codes that replace themselves with text.
 * @default ["{\"Match:str\":\"ActorFace\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const actorId = parseInt(arguments[1]);\\\\nconst actor = $gameActors.actor(actorId);\\\\nif (this.constructor === Window_Message && actor) {\\\\n    $gameMessage.setFaceImage(\\\\n        actor.faceName(),\\\\n        actor.faceIndex()\\\\n    );\\\\n}\\\\nreturn '';\\\"\"}","{\"Match:str\":\"PartyFace\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const index = parseInt(arguments[1]) - 1;\\\\nconst actor = $gameParty.members()[index];\\\\nif (this.constructor === Window_Message && actor) {\\\\n    $gameMessage.setFaceImage(\\\\n        actor.faceName(),\\\\n        actor.faceIndex()\\\\n    );\\\\n}\\\\nreturn '';\\\"\"}","{\"Match:str\":\"Class\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataClasses;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"ClassName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataClasses;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"Skill\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataSkills;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"SkillName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataSkills;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"Item\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataItems;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"ItemName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataItems;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"ItemQuantity\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataItems;\\\\nconst id = parseInt(arguments[1]);\\\\nreturn $gameParty.numItems(database[id]);\\\"\"}","{\"Match:str\":\"Weapon\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataWeapons;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"WeaponName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataWeapons;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"WeaponQuantity\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataWeapons;\\\\nconst id = parseInt(arguments[1]);\\\\nreturn $gameParty.numItems(database[id]);\\\"\"}","{\"Match:str\":\"LastGainObj\",\"Type:str\":\"\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const icon = true;\\\\nreturn this.lastGainedObjectName(icon);\\\"\"}","{\"Match:str\":\"LastGainObjName\",\"Type:str\":\"\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const icon = false;\\\\nreturn this.lastGainedObjectName(icon);\\\"\"}","{\"Match:str\":\"LastGainObjQuantity\",\"Type:str\":\"\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"return this.lastGainedObjectQuantity();\\\"\"}","{\"Match:str\":\"Armor\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataArmors;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"ArmorName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataArmors;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"ArmorQuantity\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataArmors;\\\\nconst id = parseInt(arguments[1]);\\\\nreturn $gameParty.numItems(database[id]);\\\"\"}","{\"Match:str\":\"State\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataStates;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"StateName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataStates;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"Enemy\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataEnemies;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"EnemyName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataEnemies;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"Troop\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataTroops;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"TroopName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataTroops;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"TroopMember\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"if (!$gameParty.inBattle()) return \\\\\\\"\\\\\\\";\\\\nconst index = (parseInt(arguments[1]) - 1) || 0;\\\\nconst member = $gameTroop.members()[index];\\\\nconst database = $dataEnemies;\\\\nconst id = member ? member.enemyId() : 0;\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"TroopMemberName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"if (!$gameParty.inBattle()) return \\\\\\\"\\\\\\\";\\\\nconst index = (parseInt(arguments[1]) - 1) || 0;\\\\nconst member = $gameTroop.members()[index];\\\\nconst database = $dataEnemies;\\\\nconst id = member ? member.enemyId() : 0;\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}"]
 *
 * @param TextMacros:arraystruct
 * @text Text Macros
 * @type struct<TextMacro>[]
 * @desc Macros that are used to quickly write batches of text.
 * @default ["{\"Match:str\":\"Example Macro\",\"TextStr:str\":\"This is the text that will be displayed when you type [Example Macro].\",\"TextJS:func\":\"\\\"return 'Text';\\\"\"}","{\"Match:str\":\"Leader\",\"TextStr:str\":\"\\\\P[1]\",\"TextJS:func\":\"\\\"return 'Text';\\\"\"}"]
 *
 * @param TextSpeed:struct
 * @text Text Speed Option Settings
 * @type struct<TextSpeed>
 * @desc Text Speed Options Menu settings.
 * @default {"AddOption:eval":"true","AdjustRect:eval":"true","Name:str":"Text Speed","Default:num":"10","Instant:str":"Instant"}
 *
 * @param WordWrap:struct
 * @text Word Wrap Settings
 * @type struct<WordWrap>
 * @desc Settings involving Word Wrap.
 * @default {"EnableWordWrap":"","MessageWindow:eval":"false","HelpWindow:eval":"false","Rules":"","LineBreakSpace:eval":"true","TightWrap:eval":"false","EndPadding:num":"0"}
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
 * General Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~General:
 *
 * @param MessageWindow
 * @text Message Window
 *
 * @param MessageRows:num
 * @text Default Rows
 * @parent MessageWindow
 * @type num
 * @min 1
 * @desc Default number of rows to display for the Message Window.
 * @default 4
 *
 * @param MessageWidth:num
 * @text Default Width
 * @parent MessageWindow
 * @type num
 * @min 1
 * @desc Default Message Window width in pixels.
 * @default 816
 *
 * @param FastForwardKey:str
 * @text Fast Forward Key
 * @parent MessageWindow
 * @type combo
 * @option none
 * @option tab
 * @option shift
 * @option control
 * @option pageup
 * @option pagedown
 * @desc This is the key used for fast forwarding messages.
 * @default pagedown
 *
 * @param MessageTextDelay:num
 * @text Text Delay
 * @parent MessageWindow
 * @type number
 * @min 0
 * @desc How many frames to wait between characters drawn?
 * Use 0 for instant.
 * @default 1
 *
 * @param StretchDimmedBg:eval
 * @text Stretch Dimmed BG
 * @parent MessageWindow
 * @type boolean
 * @on Stretch
 * @off Don't
 * @desc Stretch dimmed window background to fit the whole screen.
 * @default true
 *
 * @param DefaultOutlineWidth:num
 * @text Default Outline Width
 * @parent MessageWindow
 * @type number
 * @min 0
 * @desc Changes the default outline width to this many pixels thick.
 * @default 3
 *
 * @param NameBoxWindow
 * @text Name Box Window
 *
 * @param NameBoxWindowDefaultColor:num
 * @text Default Color
 * @parent NameBoxWindow
 * @min 0
 * @max 31
 * @desc Default color for the Name Box Window's text.
 * @default 0
 *
 * @param NameBoxWindowOffsetX:num
 * @text Offset X
 * @parent NameBoxWindow
 * @desc How much to offset the name box window X by (as long as it doesn't go offscreen).
 * @default 0
 *
 * @param NameBoxWindowOffsetY:num
 * @text Offset Y
 * @parent NameBoxWindow
 * @desc How much to offset the name box window Y by (as long as it doesn't go offscreen).
 * @default 0
 *
 * @param ChoiceListWindow
 * @text Choice List Window
 *
 * @param ChoiceWindowLineHeight:num
 * @text Line Height
 * @parent ChoiceListWindow
 * @type number
 * @min 1
 * @desc What is the default line height for Show Choices?
 * @default 36
 *
 * @param ChoiceWindowMaxRows:num
 * @text Max Rows
 * @parent ChoiceListWindow
 * @type number
 * @min 1
 * @desc Maximum number of rows to visibly display?
 * @default 8
 *
 * @param ChoiceWindowMaxCols:num
 * @text Max Columns
 * @parent ChoiceListWindow
 * @type number
 * @min 1
 * @desc Maximum number of columns to visibly display?
 * @default 1
 *
 * @param ChoiceWindowTextAlign:str
 * @text Text Alignment
 * @parent ChoiceListWindow
 * @type select
 * @option Default
 * @value default
 * @option Left
 * @value left
 * @option Center
 * @value center
 * @option Right
 * @value right
 * @desc Default alignment for Show Choice window.
 * @default default
 *
 * @param DefaultTextCodes
 * @text Default Text Codes
 *
 * @param RelativePXPY:eval
 * @text Relative \PX \PY
 * @parent DefaultTextCodes
 * @type boolean
 * @on Better
 * @off Normal
 * @desc Make \PX[x] and \PY[x] adjust relative starting position than exact coordinates.
 * @default true
 *
 * @param FontBiggerCap:eval
 * @text \{ Maximum
 * @parent DefaultTextCodes
 * @type number
 * @min 1
 * @desc Determine the maximum size that \{ can reach.
 * @default 108
 *
 * @param FontSmallerCap:eval
 * @text \} Minimum
 * @parent DefaultTextCodes
 * @type number
 * @min 1
 * @desc Determine the minimum size that \} can reach.
 * @default 12
 *
 * @param FontChangeValue:eval
 * @text \{ Change \}
 * @parent DefaultTextCodes
 * @type number
 * @min 1
 * @desc How much does \{ and \} change font size by?
 * @default 12
 *
 */
/* ----------------------------------------------------------------------------
 * Auto Color Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~AutoColor:
 *
 * @param DatabaseHighlighting
 * @text Database Highlighting
 *
 * @param Actors:str
 * @text Actors
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of an Actor's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param Classes:str
 * @text Classes
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of a Class's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param Skills:str
 * @text Skills
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of a Skill's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param Items:str
 * @text Items
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of an Item's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param Weapons:str
 * @text Weapons
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of a Weapon's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param Armors:str
 * @text Armors
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of an Armor's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param Enemies:str
 * @text Enemies
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of an Enemy's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param States:str
 * @text States
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of a State's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param WordHighlighting
 * @text Word Highlighting
 *
 * @param TextColor1:arraystr
 * @text \C[1]: Blue
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor2:arraystr
 * @text \C[2]: Red
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor3:arraystr
 * @text \C[3]: Green
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor4:arraystr
 * @text \C[4]: Sky Blue
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor5:arraystr
 * @text \C[5]: Purple
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor6:arraystr
 * @text \C[6]: Yellow
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor7:arraystr
 * @text \C[7]: Gray
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor8:arraystr
 * @text \C[8]: Light Gray
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor9:arraystr
 * @text \C[9]: Dark Blue
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor10:arraystr
 * @text \C[10]: Dark Red
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor11:arraystr
 * @text \C[11]: Dark Green
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor12:arraystr
 * @text \C[12]: Dark Sky Blue
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor13:arraystr
 * @text \C[13]: Dark Purple
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor14:arraystr
 * @text \C[14]: Solid Yellow
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor15:arraystr
 * @text \C[15]: Black
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor16:arraystr
 * @text \C[16]: System Blue
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor17:arraystr
 * @text \C[17]: Crisis Yellow
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor18:arraystr
 * @text \C[18]: Dead Red
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor19:arraystr
 * @text \C[19]: Outline Black
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor20:arraystr
 * @text \C[20]: HP Orange 1
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor21:arraystr
 * @text \C[21]: HP Orange 2
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor22:arraystr
 * @text \C[22]: MP Blue 1
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor23:arraystr
 * @text \C[23]: MP Blue 2
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor24:arraystr
 * @text \C[24]: Param Up Green
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor25:arraystr
 * @text \C[25]: Param Down Red
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor26:arraystr
 * @text \C[26]: System Purple
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor27:arraystr
 * @text \C[27]: System Pink
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor28:arraystr
 * @text \C[28]: TP Green 1
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor29:arraystr
 * @text \C[29]: TP Green 2
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor30:arraystr
 * @text \C[30]: EXP Purple 1
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor31:arraystr
 * @text \C[31]: EXP Purple 2
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 */
/* ----------------------------------------------------------------------------
 * Text Code Actions
 * ----------------------------------------------------------------------------
 */
/*~struct~TextCodeAction:
 *
 * @param Match:str
 * @text Match
 * @desc This is what needs to be matched in order for this text code to work.
 * @default Key
 *
 * @param Type:str
 * @text Type
 * @type select
 * @option none
 * @value 
 * @option [x] (number)
 * @value \[(\d+)\]
 * @option <x> (string)
 * @value \<(.*?)\>
 * @desc The type of parameter to obtain (none, number, or string).
 * @default 
 *
 * @param CommonEvent:num
 * @text Common Event
 * @type common_event
 * @desc Select a common event to run when this text code is used in a message.
 * @default 0
 *
 * @param ActionJS:func
 * @text JS: Action
 * @type note
 * @desc JavaScript code used to perform an action when this text code appears.
 * @default "const textState = arguments[0];"
 *
 */
/* ----------------------------------------------------------------------------
 * Text Code Replacements
 * ----------------------------------------------------------------------------
 */
/*~struct~TextCodeReplace:
 *
 * @param Match:str
 * @text Match
 * @desc This is what needs to be matched in order for this text code to work.
 * @default Key
 *
 * @param Type:str
 * @text Type
 * @type select
 * @option none
 * @value 
 * @option [x] (number)
 * @value \[(\d+)\]
 * @option <x> (string)
 * @value \<(.*?)\>
 * @desc The type of parameter to obtain (none, number, or string).
 * @default 
 *
 * @param TextStr:str
 * @text STR: Text
 * @desc The text that will appear if this match appears.
 * If this has a value, ignore the JS: Text version.
 * @default Undefined
 *
 * @param TextJS:func
 * @text JS: Text
 * @type note
 * @desc JavaScript code used to determine the text that will appear if this match appears.
 * @default "return 'Text';"
 *
 */
/* ----------------------------------------------------------------------------
 * Text Macro
 * ----------------------------------------------------------------------------
 */
/*~struct~TextMacro:
 *
 * @param Match:str
 * @text Match
 * @desc This is what needs to be matched in order for this macro to work.
 * @default Key
 *
 * @param TextStr:str
 * @text STR: Text
 * @desc The replacement text that will appear from the macro.
 * If this has a value, ignore the JS: Text version.
 * @default Undefined
 *
 * @param TextJS:func
 * @text JS: Text
 * @type note
 * @desc JavaScript code used to determine the text that will appear if this macro appears.
 * @default "return 'Text';"
 *
 */
/* ----------------------------------------------------------------------------
 * Text Speed Options Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~TextSpeed:
 *
 * @param AddOption:eval
 * @text Add Option?
 * @type boolean
 * @on Add
 * @off Don't Add
 * @desc Add the 'Text Speed' option to the Options menu?
 * @default true
 *
 * @param AdjustRect:eval
 * @text Adjust Window Height
 * @type boolean
 * @on Adjust
 * @off Don't
 * @desc Automatically adjust the options window height?
 * @default true
 *
 * @param Name:str
 * @text Option Name
 * @desc Command name of the option.
 * @default Text Speed
 *
 * @param Default:num
 * @text Default Value
 * @type number
 * @min 1
 * @max 11
 * @desc 1 - 10, slowest to fastest.
 * 11 is instant value.
 * @default 10
 *
 * @param Instant:str
 * @text Instant Speed
 * @desc Text to show "instant" text.
 * @default Instant
 *
 */
/* ----------------------------------------------------------------------------
 * Word Wrap Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~WordWrap:
 *
 * @param EnableWordWrap
 * @text Enable Word Wrap
 *
 * @param MessageWindow:eval
 * @text Message Window
 * @parent EnableWordWrap
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Automatically enable Word Wrap for this window?
 * @default false
 *
 * @param HelpWindow:eval
 * @text Help Window
 * @parent EnableWordWrap
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Automatically enable Word Wrap for this window?
 * @default false
 *
 * @param Rules
 * @text Rules
 *
 * @param LineBreakSpace:eval
 * @text Link Break -> Space
 * @parent Rules
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Convert manually placed (non tagged) line breaks with spaces?
 * @default true
 *
 * @param TightWrap:eval
 * @text Tight Wrap
 * @parent Rules
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc If a face graphic is present in a message, word wrap will be tighter.
 * @default false
 *
 * @param EndPadding:num
 * @text End Padding
 * @parent Rules
 * @type number
 * @desc Add extra padding to your window to make text wrap further away from the end of the window.
 * @default 0
 *
 */
//=============================================================================

const _0x10bd=['<RIGHT>','Window_Message_clearFlags','updateAutoPosition','fontItalic','ConvertParams','calcWindowHeight','isAutoColorAffected','MaxRows','DxfRa','rIfDw','isWordWrapEnabled','adjustShowChoiceCancel','fNiUg','ChoiceWindowProperties','UviMn','none','battleTargetName','_moveEasingType','lineHeight','isSceneBattle','ConvertTextAutoColorRegExpFriendly','YHhKK','prepareShowTextCommand','slXDQ','changePaintOpacity','makeDeepCopy','tLJQq','_MessageCoreSettings','itemPadding','nYSUj','\x1bITALIC[0]','obtainItem','split','parameters','ChoiceWindowTextAlign','1EUhgbM','_nameBoxWindow','zFhGj','Game_Party_gainItem','ceil','_forcedPosition','_wholeMoveDuration','Window_Options_isVolumeSymbol','Match','KBrKQ','getPreservedFontSettings','update','nextEventCode','\x1bBOLD[1]','NKkkl','findTargetSprite','setPositionType','startWait','start','victory','[0]','return\x20\x27','FawrT','pPkwY','messageCoreWindowX','Classes','<%1>','currentExt','isTriggered','lZdNc','processFontChangeBold','Window_NameBox_refresh','MessageCore','makeData','choice','choiceRows','activate','applyMoveEasing','CENTERPICTURE','outLineColor','textWidth','default','choiceLineHeight','setMessageWindowWidth','mainFontFace','isMessageWindowWordWrap','changeValue','AryBV','clearFlags','convertLockColorsEscapeCharacters','messageWindowRect','type','list','currencyUnit','JyPaB','isInputting','partyMemberName','setMessageWindowRows','<LINE\x20BREAK>','_positionType','dhkmS','selectDefault','ParseArmorNotetags','_moveTargetWidth','resetTextColor','Scene_Boot_onDatabaseLoaded','resetWordWrap','addMessageCoreCommands','UXMPB','followers','textSpeed','LfycZ','nMvDF','setSpeakerName','refresh','fontFace','vzihT','getChoiceListTextAlign','addMessageCoreTextSpeedCommand','LineBreakSpace','escapeStart','_index','RelativePXPY','FontBiggerCap','setWaitMode','addContinuousShowChoices','aHVTG','Window_Message_isTriggered','return\x200','otOxq','updateOverlappingY','</COLORLOCK>','applyData','processFsTextCode','canMove','setupChoices','MCqiC','InBkY','States','Game_System_initialize','\x1bI[%1]','setup','blt','updateForcedPlacement','choiceCols','Type','COLORLOCK','OrbbJ','convertBackslashCharacters','isArmor','\x1bTEXTALIGNMENT[1]','inputtingAction','DtbNc','choiceTextAlign','processControlCharacter','contents','isVolumeSymbol','CLdLA','index','trim','CreateAutoColorFor','isCommandEnabled','3428SLZHkG','_scene','getTextAlignment','FeCYh','<WORDWRAP>','numVisibleRows','convertHardcodedEscapeReplacements','AutoColorRegExp','prepareWordWrapEscapeCharacters','convertFontSettingsEscapeCharacters','Window_Base_update','calcMoveEasing','11ISzeyp','vNYGt','databaseObjectName','setChoiceListTextAlign','addContinuousShowTextCommands','ChoiceWindowLineHeight','indexOf','preConvertEscapeCharacters','status','Window_Message_processEscapeCharacter','false','addWrapBreakAfterPunctuation','setFaceImage','sort','_targets','XOTGK','MEgvf','toUpperCase','surprise','ifIeX','shift','GfpBW','ConfigManager_applyData','_wordWrap','Window_ChoiceList_updatePlacement','_lastGainedItemData','COMMONEVENT','replace','registerResetRect','TextColor%1','TextAlign','max','setHelpWindowWordWrap','STRUCT','indent','ITALIC','call','lastGainedObjectName','left','instantTextSpeed','makeCommandList','WORD_WRAP_PADDING','KCwHs','KdbBz','_action','updateRelativePosition','parseChoiceText','convertShowChoiceEscapeCodes','\x1bCOLORLOCK[0]','oJGJv','outputWidth','outputHeight','Weapons','TextMacros','_messageWindow','_target','_centerMessageWindow','registerActorNameAutoColorChanges','terminateMessage','mainFontSize','textColor','changeTextSpeed','easeIn','itemRectWithPadding','processDrawPicture','isSceneMap','addedHeight','setupEvents','updateMessageCommonEvents','</B>','follower','OlvSC','helpWordWrap','textSizeExTextAlignment','isChoiceEnabled','filter','TextCodeReplace','\x1bC[%1]%2\x1bPREVCOLOR[0]','messagePositionReset','Window_Options_statusText','Rows','TextSpeed','postFlushTextState','map\x20player','process_VisuMZ_MessageCore_AutoColor','rFAEl','textSizeExWordWrap','updatePlacement','HelpWindow','_moveTargetHeight','AddAutoColor','xoOcC','setTextAlignment','ParseWeaponNotetags','code','rYhMM','process_VisuMZ_MessageCore_TextCodes_Action','messageWordWrap','<COLORLOCK>','push','44jcJwIc','\x1bITALIC[1]','\x1bTEXTALIGNMENT[2]','makeFontSmaller','_relativePosition','_textDelay','convertVariableEscapeCharacters','ekvOJ','MessageWindowProperties','ParseStateNotetags','processTextAlignmentX','General','ParseEnemyNotetags','VsbRJ','Enemies','CmXlh','setRelativePosition','true','PpyZk','Tvwsz','emerge','Settings','isRTL','_textDelayCount','actorName','Ceoqf','processWrapBreak','BosVc','_autoPositionTarget','boxWidth','vjgHj','gainItem','map\x20party','_autoColorActorNames','commandSymbol','_moveDuration','adjustShowChoiceDefault','KFCJi','\x1bTEXTALIGNMENT[3]','maxCommands','battleUserName','NmWEm','89slXydE','isWXg','drawTextEx','members','returnPreservedFontSettings','textSizeEx','updateTransform','Window_NameBox_updatePlacement','text','_autoSizeCheck','format','HIDE','choices','kpOYa','StretchDimmedBg','7256TDsesK','Name','addedWidth','exec','updateMove','SortObjectByKeyLength','fontSize','FontChangeValue','processPreviousColor','preemptive','processAutoSize','slice','battle\x20enemy','exit','textCodeResult','processCharacter','cDlrd','Window_Message_updatePlacement','EndPadding','message','_commonEventId','windowWidth','605247yAwJtw','ParseSkillNotetags','updateEvents','battle\x20party','_textAlignment','QhZhf','YJPSp','resetPositionX','innerHeight','constructor','contentsBack','messageCoreTextSpeed','Center','isColorLocked','updateAutoSizePosition','getChoiceListMaxColumns','CreateAutoColorRegExpListEntries','zQdxT','processStoredAutoColorChanges','add','MessageTextDelay','</I>','createTextState','length','updateNameBoxMove','_autoSizeRegexp','\x1bTEXTALIGNMENT[0]','<B>','addMessageCommonEvent','drawBackCenteredPicture','processCommonEvent','HzNDo','iconIndex','postConvertEscapeCharacters','changeVolume','floor','processAutoPosition','Window_Help_refresh','right','Window_Message_newPage','outlineWidth','initTextAlignement','Window_Message_terminateMessage','round','substring','ActionJS','clamp','Window_Base_processControlCharacter','processPyTextCode','TextJS','scale','PMhgU','Default','commandName','\x1bCOLORLOCK[1]','adjustShowChoiceExtension','description','ParseItemNotetags','isChoiceVisible','Game_Map_initialize','VyWNj','getChoiceListMaxRows','BtWKB','clearActorNameAutoColor','normalColor','AddOption','processMessageCoreEscapeActions','resetFontSettings','ATYaI','isRKs','hZXDV','processFontChangeItalic','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','\x1bTEXTALIGNMENT','placeCancelButton','Window_Base_processAllText','_indent','battleActionName','Window_Base_processEscapeCharacter','Window_Base_textSizeEx','test','VisuMZ_0_CoreEngine','CommonEvent','Width','obtainGold','addCommand','map\x20event','MessageWindow','_colorLock','convertBaseEscapeCharacters','TextColor','preFlushTextState','setMessageWindowWordWrap','xbrMJ','initialize','actor','WRAPBREAK','CreateAutoColorRegExpLists','ARRAYJSON','choicePositionType','toLowerCase','MzyFM','uwuaD','easeOut','QomGd','FgtkI','JzOzi','min','parse','AutoColor','Scene_Options_maxCommands','407396NEYcyr','UMCXZ','tnWep','easeInOut','Armors','<I>','ANY','_moveTargetY','clear','isBreakShowTextCommands','_dimmerSprite','pahmU','Undefined','eEjZf','innerWidth','PICTURE','_messagePositionReset','initMessageCore','getChoiceListLineHeight','iXEUg','maxCols','getConfigValue','registerCommand','ChoiceWindowMaxCols','_list','addGeneralOptions','26517ZpsZmK','</WORDWRAP>','Game_Map_updateEvents','BYfXR','textSpeedStatusText','launchMessageCommonEvent','addExtraShowChoices','MessageWidth','HlihU','\x1bWrapBreak[0]','open','convertMessageCoreEscapeActions','boxHeight','<BR>','Dneax','mGmNS','getMessageWindowRows','convertMessageCoreEscapeReplacements','processColorLock','updateBackground','ARRAYNUM','process_VisuMZ_MessageCore_TextMacros','ENABLE','fontBold','unshift','obtainEscapeString','processAllText','_messageCommonEvents','Window_ChoiceList_windowX','NameBoxWindowOffsetY','Game_Map_setupEvents','ParseClassNotetags','stretchDimmerSprite','ypnAd','sFHHR','MessageRows','LsAKl','qwuzl','MaxCols','setTextDelay','battle\x20actor','paintOpacity','IEzlD','vvWQT','textCodeCheck','onDatabaseLoaded','maKQo','setBackground','prepareShowTextFollowups','isContinuePrepareShowTextCommands','_cancelButton','convertEscapeCharacters','SWITCHES','FontSmallerCap','_eventId','_resetRect','faceName','processAutoColorWords','AutoColorBypassList','_interpreter','value','rZwfx','updateOffsetPosition','setupNumInput','convertTextAlignmentEscapeCharacters','faceWidth','changeOutlineColor','loadPicture','prototype','_showFast','quantity','oknUH','isWeapon','remove','synchronizeNameBox','messageRows','isRunning','itemHeight','processPxTextCode','obtainEscapeParam','setColorLock','processDrawCenteredPicture','JSON','\x1bi[%1]%2','setLastGainedItemData','maxChoiceWidth','ARRAYSTR','CfFAL','drawBackPicture','1662NoibJL','10JQhBdM','processEscapeCharacter','refreshDimmerBitmap','TightWrap','WAIT','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','SWITCH','windowPadding','join','processNewLine','maxLines','409483UDNUrU','Window_Options_changeVolume','setWordWrap','PsCfq','isBusy','updateDimensions','onChoice','convertTextMacros','EDKPQ','KeAVo','_spriteset','resetRect','Game_Interpreter_setupChoices','buufA','colSpacing','flushTextState','isPressed','addLoadListener','bbFVw','center','map\x20actor','</CENTER>','map','clearCommandList','substr','messageWidth','Window_Base_initialize','changeTextColor','currentCommand','ParseAllNotetags','getLastGainedItemData','TextStr','_subject','startX','name','startY','splice','onProcessCharacter','ConfigManager_makeData','<CENTER>','newPage','processTextAlignmentChange','padding','_autoPosRegExp','onNewPageMessageCore','setChoiceListMaxRows','_textColorStack','width','NUM','includes','applyDatabaseAutoColor','Window_Base_processNewLine','makeFontBigger','Window_Options_addGeneralOptions','windowX','Window_Base_changeTextColor','drawItem','match','defeat','Actors','TextCodeActions','EVAL','levelUp','setChoiceListMaxColumns','process_VisuMZ_MessageCore_TextCodes_Replace','height','clampPlacementPosition','drawing','defaultColor','prepareAutoSizeEscapeCharacters','getMessageWindowWidth','moveTo','Window_Message_synchronizeNameBox','processCustomWait','AdjustRect','WordWrap','XSArj','bind','ZkVny','DefaultOutlineWidth','createContents','Items','MWSrh','event','Skills'];const _0x3be230=_0x2f8e;(function(_0x25d22e,_0x3ca050){const _0x24e806=_0x2f8e;while(!![]){try{const _0x4adabe=parseInt(_0x24e806(0x1b5))*-parseInt(_0x24e806(0x22d))+parseInt(_0x24e806(0x1aa))*parseInt(_0x24e806(0x150))+parseInt(_0x24e806(0x2a7))*parseInt(_0x24e806(0xa2))+-parseInt(_0x24e806(0x136))+-parseInt(_0x24e806(0x317))*-parseInt(_0x24e806(0x1a9))+parseInt(_0x24e806(0xc7))+-parseInt(_0x24e806(0xb1))*parseInt(_0x24e806(0x2b3));if(_0x4adabe===_0x3ca050)break;else _0x25d22e['push'](_0x25d22e['shift']());}catch(_0xd3c809){_0x25d22e['push'](_0x25d22e['shift']());}}}(_0x10bd,0x55ec6));var label=_0x3be230(0x24d),tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x3be230(0x2fe)](function(_0x4a9bb0){const _0x302e4f=_0x3be230;return _0x4a9bb0[_0x302e4f(0x2bb)]&&_0x4a9bb0[_0x302e4f(0xff)]['includes']('['+label+']');})[0x0];VisuMZ[label][_0x3be230(0x32c)]=VisuMZ[label][_0x3be230(0x32c)]||{},VisuMZ[_0x3be230(0x20e)]=function(_0x3db44d,_0x4d1fc4){const _0x5f0dd8=_0x3be230;for(const _0x42cd48 in _0x4d1fc4){if(_0x42cd48['match'](/(.*):(.*)/i)){if(_0x5f0dd8(0x12d)!==_0x5f0dd8(0x138)){const _0x504154=String(RegExp['$1']),_0x1b7e42=String(RegExp['$2'])[_0x5f0dd8(0x2c4)]()[_0x5f0dd8(0x2a4)]();let _0x9b9cef,_0x12653a,_0x170282;switch(_0x1b7e42){case _0x5f0dd8(0x1e5):_0x9b9cef=_0x4d1fc4[_0x42cd48]!==''?Number(_0x4d1fc4[_0x42cd48]):0x0;break;case _0x5f0dd8(0x164):_0x12653a=_0x4d1fc4[_0x42cd48]!==''?JSON[_0x5f0dd8(0x133)](_0x4d1fc4[_0x42cd48]):[],_0x9b9cef=_0x12653a[_0x5f0dd8(0x1cb)](_0x4882be=>Number(_0x4882be));break;case _0x5f0dd8(0x1f2):_0x9b9cef=_0x4d1fc4[_0x42cd48]!==''?eval(_0x4d1fc4[_0x42cd48]):null;break;case'ARRAYEVAL':_0x12653a=_0x4d1fc4[_0x42cd48]!==''?JSON[_0x5f0dd8(0x133)](_0x4d1fc4[_0x42cd48]):[],_0x9b9cef=_0x12653a[_0x5f0dd8(0x1cb)](_0x1723df=>eval(_0x1723df));break;case _0x5f0dd8(0x1a2):_0x9b9cef=_0x4d1fc4[_0x42cd48]!==''?JSON['parse'](_0x4d1fc4[_0x42cd48]):'';break;case _0x5f0dd8(0x129):_0x12653a=_0x4d1fc4[_0x42cd48]!==''?JSON[_0x5f0dd8(0x133)](_0x4d1fc4[_0x42cd48]):[],_0x9b9cef=_0x12653a[_0x5f0dd8(0x1cb)](_0x262892=>JSON[_0x5f0dd8(0x133)](_0x262892));break;case'FUNC':_0x9b9cef=_0x4d1fc4[_0x42cd48]!==''?new Function(JSON[_0x5f0dd8(0x133)](_0x4d1fc4[_0x42cd48])):new Function(_0x5f0dd8(0x285));break;case'ARRAYFUNC':_0x12653a=_0x4d1fc4[_0x42cd48]!==''?JSON[_0x5f0dd8(0x133)](_0x4d1fc4[_0x42cd48]):[],_0x9b9cef=_0x12653a[_0x5f0dd8(0x1cb)](_0x4af55c=>new Function(JSON[_0x5f0dd8(0x133)](_0x4af55c)));break;case'STR':_0x9b9cef=_0x4d1fc4[_0x42cd48]!==''?String(_0x4d1fc4[_0x42cd48]):'';break;case _0x5f0dd8(0x1a6):_0x12653a=_0x4d1fc4[_0x42cd48]!==''?JSON[_0x5f0dd8(0x133)](_0x4d1fc4[_0x42cd48]):[],_0x9b9cef=_0x12653a[_0x5f0dd8(0x1cb)](_0x14ed9b=>String(_0x14ed9b));break;case _0x5f0dd8(0x2d4):_0x170282=_0x4d1fc4[_0x42cd48]!==''?JSON['parse'](_0x4d1fc4[_0x42cd48]):{},_0x3db44d[_0x504154]={},VisuMZ[_0x5f0dd8(0x20e)](_0x3db44d[_0x504154],_0x170282);continue;case'ARRAYSTRUCT':_0x12653a=_0x4d1fc4[_0x42cd48]!==''?JSON['parse'](_0x4d1fc4[_0x42cd48]):[],_0x9b9cef=_0x12653a[_0x5f0dd8(0x1cb)](_0x1514dd=>VisuMZ['ConvertParams']({},JSON['parse'](_0x1514dd)));break;default:continue;}_0x3db44d[_0x504154]=_0x9b9cef;}else{const _0x5e9df8=_0x1eb8e0>=0x1?_0x1b689a[_0x5f0dd8(0xa5)]()[_0x233a67-0x1]:null,_0x3fdf06=_0x5e9df8?_0x5e9df8[_0x5f0dd8(0x1d7)]():'',_0xe9cfca=_0x45392f(_0x113346[_0x5f0dd8(0x24d)][_0x5f0dd8(0x32c)][_0x5f0dd8(0x134)][_0x5f0dd8(0x1f0)]);return this[_0x5f0dd8(0x210)]()&&_0xe9cfca!==0x0?'\x1bC[%1]%2\x1bPREVCOLOR[0]'[_0x5f0dd8(0xac)](_0xe9cfca,_0x3fdf06):_0x3fdf06;}}}return _0x3db44d;},(_0x2b7f90=>{const _0x59a1ee=_0x3be230,_0x2cfc2d=_0x2b7f90['name'];for(const _0x36a6c7 of dependencies){if(!Imported[_0x36a6c7]){alert(_0x59a1ee(0x1af)[_0x59a1ee(0xac)](_0x2cfc2d,_0x36a6c7)),SceneManager['exit']();break;}}const _0x4aaf18=_0x2b7f90[_0x59a1ee(0xff)];if(_0x4aaf18['match'](/\[Version[ ](.*?)\]/i)){const _0x527150=Number(RegExp['$1']);if(_0x527150!==VisuMZ[label]['version']){if('cwldP'!=='DFoeO')alert('%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.'[_0x59a1ee(0xac)](_0x2cfc2d,_0x527150)),SceneManager[_0x59a1ee(0xbe)]();else{if(this[_0x59a1ee(0x225)]===_0x46c15e)this[_0x59a1ee(0x147)]();if(this['_MessageCoreSettings'][_0x59a1ee(0x2fb)]===_0x1b9aab)this[_0x59a1ee(0x147)]();this['_MessageCoreSettings'][_0x59a1ee(0x2fb)]=_0x14f93b;}}}if(_0x4aaf18[_0x59a1ee(0x1ee)](/\[Tier[ ](\d+)\]/i)){if('NGevm'==='NGevm'){const _0x2274af=Number(RegExp['$1']);if(_0x2274af<tier){if('qLHwo'!==_0x59a1ee(0x175))alert(_0x59a1ee(0x10f)['format'](_0x2cfc2d,_0x2274af,tier)),SceneManager[_0x59a1ee(0xbe)]();else return this[_0x59a1ee(0xbb)](_0x4eb820,!![],!![]),this['processAutoPosition'](_0x59a1ee(0x178),_0x151eef(_0x325c15)||0x1),'';}else{if(_0x59a1ee(0x2c8)===_0x59a1ee(0x279)){if(this[_0x59a1ee(0x225)]===_0x4a7ba1)this[_0x59a1ee(0x147)]();if(this[_0x59a1ee(0x225)][_0x59a1ee(0x19b)]===_0xffdd4e)this[_0x59a1ee(0x147)]();this[_0x59a1ee(0x225)]['messageRows']=_0x5c93a4||0x1;}else tier=Math[_0x59a1ee(0x2d2)](_0x2274af,tier);}}else return this[_0x59a1ee(0xbb)](_0x1c2815,!![],!![]),this[_0x59a1ee(0xeb)](_0x59a1ee(0x219)),'';}VisuMZ[_0x59a1ee(0x20e)](VisuMZ[label]['Settings'],_0x2b7f90['parameters']);})(pluginData),PluginManager[_0x3be230(0x14c)](pluginData[_0x3be230(0x1d7)],_0x3be230(0x217),_0x3836c7=>{const _0x3b3a0b=_0x3be230;VisuMZ[_0x3b3a0b(0x20e)](_0x3836c7,_0x3836c7);const _0x3ef7f2=_0x3836c7['LineHeight']||$gameSystem[_0x3b3a0b(0x148)]()||0x1,_0x5d81ab=_0x3836c7[_0x3b3a0b(0x211)]||$gameSystem[_0x3b3a0b(0x104)]()||0x1,_0xee477f=_0x3836c7[_0x3b3a0b(0x176)]||$gameSystem[_0x3b3a0b(0xd6)]()||0x1,_0x13dc51=_0x3836c7[_0x3b3a0b(0x2d1)][_0x3b3a0b(0x12b)]()||_0x3b3a0b(0x256);$gameSystem['setChoiceListLineHeight'](_0x3ef7f2),$gameSystem[_0x3b3a0b(0x1e2)](_0x5d81ab),$gameSystem[_0x3b3a0b(0x1f4)](_0xee477f),$gameSystem[_0x3b3a0b(0x2b6)](_0x13dc51);}),PluginManager[_0x3be230(0x14c)](pluginData[_0x3be230(0x1d7)],_0x3be230(0x31f),_0x4cbc4e=>{const _0x20f3ad=_0x3be230;VisuMZ[_0x20f3ad(0x20e)](_0x4cbc4e,_0x4cbc4e);const _0x486780=_0x4cbc4e['Rows']||$gameSystem['getMessageWindowRows']()||0x1,_0x4adcd8=_0x4cbc4e[_0x20f3ad(0x11a)]||$gameSystem[_0x20f3ad(0x1fb)]()||0x1;$gameTemp[_0x20f3ad(0x2eb)]=_0x4cbc4e['Center']||![];const _0x5d6e09=_0x4cbc4e[_0x20f3ad(0x200)]['toLowerCase']();$gameSystem[_0x20f3ad(0x266)](_0x486780),$gameSystem[_0x20f3ad(0x258)](_0x4adcd8);[_0x20f3ad(0x328),_0x20f3ad(0x2bd)][_0x20f3ad(0x1e6)](_0x5d6e09)&&$gameSystem['setMessageWindowWordWrap'](eval(_0x5d6e09));const _0x487578=SceneManager[_0x20f3ad(0x2a8)]['_messageWindow'];_0x487578&&(_0x20f3ad(0x197)===_0x20f3ad(0xa3)?(_0x4ed4f6[_0x20f3ad(0x24d)]['Game_Map_initialize'][_0x20f3ad(0x2d7)](this),this[_0x20f3ad(0x16b)]=[]):(_0x487578[_0x20f3ad(0x26f)](),_0x487578['updateDimensions'](),_0x487578[_0x20f3ad(0x205)]()));}),VisuMZ[_0x3be230(0x24d)]['Scene_Boot_onDatabaseLoaded']=Scene_Boot[_0x3be230(0x194)][_0x3be230(0x17d)],Scene_Boot[_0x3be230(0x194)]['onDatabaseLoaded']=function(){const _0x2af784=_0x3be230;VisuMZ[_0x2af784(0x24d)][_0x2af784(0x26e)][_0x2af784(0x2d7)](this),this[_0x2af784(0x313)](),this['process_VisuMZ_MessageCore_TextCodes_Replace'](),this[_0x2af784(0x165)](),this[_0x2af784(0x307)]();},VisuMZ['MessageCore'][_0x3be230(0xb6)]=function(_0xd9e98d){const _0x10478f=_0x3be230,_0x335436=VisuMZ['MessageCore'][_0x10478f(0x32c)][_0xd9e98d];_0x335436[_0x10478f(0x2c0)]((_0x58b446,_0x4dd11c)=>{const _0x97ccd8=_0x10478f;if(!_0x58b446||!_0x4dd11c)return-0x1;return _0x4dd11c[_0x97ccd8(0x235)][_0x97ccd8(0xde)]-_0x58b446[_0x97ccd8(0x235)][_0x97ccd8(0xde)];});},Scene_Boot[_0x3be230(0x194)][_0x3be230(0x313)]=function(){const _0x14ce24=_0x3be230;VisuMZ[_0x14ce24(0x24d)][_0x14ce24(0xb6)](_0x14ce24(0x1f1));for(const _0x5d8930 of VisuMZ[_0x14ce24(0x24d)][_0x14ce24(0x32c)]['TextCodeActions']){if('lzlEj'===_0x14ce24(0x172)){_0x43795c['MessageCore']['Window_Message_terminateMessage'][_0x14ce24(0x2d7)](this),this[_0x14ce24(0x25d)]();if(this[_0x14ce24(0x146)])this[_0x14ce24(0x301)]();}else{_0x5d8930[_0x14ce24(0x235)]=_0x5d8930[_0x14ce24(0x235)]['toUpperCase'](),_0x5d8930[_0x14ce24(0x17c)]=new RegExp('\x1b'+_0x5d8930['Match'],'gi'),_0x5d8930[_0x14ce24(0xbf)]='\x1b'+_0x5d8930[_0x14ce24(0x235)];if(_0x5d8930[_0x14ce24(0x296)]==='')_0x5d8930['textCodeResult']+='[0]';}}},Scene_Boot[_0x3be230(0x194)][_0x3be230(0x1f5)]=function(){const _0x198710=_0x3be230;VisuMZ[_0x198710(0x24d)]['SortObjectByKeyLength'](_0x198710(0x2ff));for(const _0x572e53 of VisuMZ[_0x198710(0x24d)][_0x198710(0x32c)][_0x198710(0x2ff)]){if(_0x198710(0x2aa)===_0x198710(0x2aa))_0x572e53['textCodeCheck']=new RegExp('\x1b'+_0x572e53['Match']+_0x572e53[_0x198710(0x296)],'gi'),_0x572e53[_0x198710(0x1d4)]!==''&&_0x572e53['TextStr']!==_0x198710(0x142)?_0x572e53['textCodeResult']=new Function(_0x198710(0x242)+_0x572e53[_0x198710(0x1d4)][_0x198710(0x2ce)](/\\/g,'\x1b')+'\x27'):_0x572e53[_0x198710(0xbf)]=_0x572e53['TextJS'];else return _0x451a5c;}},Scene_Boot['prototype'][_0x3be230(0x165)]=function(){const _0x5606ed=_0x3be230;for(const _0x15e49a of VisuMZ[_0x5606ed(0x24d)][_0x5606ed(0x32c)][_0x5606ed(0x2e8)]){_0x15e49a['textCodeCheck']=new RegExp('\x5c['+_0x15e49a[_0x5606ed(0x235)]+'\x5c]','gi'),_0x15e49a[_0x5606ed(0x1d4)]!==''&&_0x15e49a[_0x5606ed(0x1d4)]!=='Undefined'?_0x15e49a[_0x5606ed(0xbf)]=new Function(_0x5606ed(0x242)+_0x15e49a[_0x5606ed(0x1d4)][_0x5606ed(0x2ce)](/\\/g,'\x1b')+'\x27'):'QpSge'!==_0x5606ed(0x298)?_0x15e49a[_0x5606ed(0xbf)]=_0x15e49a[_0x5606ed(0xf8)]:(_0x15a289[_0x5606ed(0x24d)][_0x5606ed(0x20b)][_0x5606ed(0x2d7)](this),this[_0x5606ed(0x106)](),this['resetWordWrap'](),this[_0x5606ed(0x1a0)](![]),this[_0x5606ed(0x30f)](_0x5606ed(0x256)),this['setTextDelay'](_0x20b801[_0x5606ed(0x24d)][_0x5606ed(0x32c)][_0x5606ed(0x322)][_0x5606ed(0xdb)]));}},Scene_Boot['prototype'][_0x3be230(0x307)]=function(){const _0x16175a=_0x3be230,_0xefcaf8=VisuMZ[_0x16175a(0x24d)][_0x16175a(0x32c)][_0x16175a(0x134)];!VisuMZ[_0x16175a(0x1d2)]&&(VisuMZ[_0x16175a(0x24d)][_0x16175a(0x30d)]($dataClasses,_0xefcaf8[_0x16175a(0x246)]),VisuMZ[_0x16175a(0x24d)][_0x16175a(0x30d)]($dataSkills,_0xefcaf8[_0x16175a(0x209)]),VisuMZ[_0x16175a(0x24d)][_0x16175a(0x30d)]($dataItems,_0xefcaf8['Items']),VisuMZ[_0x16175a(0x24d)][_0x16175a(0x30d)]($dataWeapons,_0xefcaf8[_0x16175a(0x2e7)]),VisuMZ[_0x16175a(0x24d)][_0x16175a(0x30d)]($dataArmors,_0xefcaf8[_0x16175a(0x13a)]),VisuMZ[_0x16175a(0x24d)]['AddAutoColor']($dataEnemies,_0xefcaf8['Enemies']),VisuMZ['MessageCore'][_0x16175a(0x30d)]($dataStates,_0xefcaf8['States'])),VisuMZ[_0x16175a(0x24d)]['CreateAutoColorRegExpLists']();},VisuMZ['MessageCore'][_0x3be230(0x18a)]=['V','N','P','C','I','PX','PY','G','{','}','<','>','FS','\x5c','$','.','|','!','<','>','^',_0x3be230(0xe2),_0x3be230(0x2f8),_0x3be230(0x13b),_0x3be230(0xdc),'<LEFT>','</LEFT>',_0x3be230(0x1dc),_0x3be230(0x1ca),_0x3be230(0x20a),'</RIGHT>',_0x3be230(0x315),_0x3be230(0x288),'(((',')))',_0x3be230(0x2ab),_0x3be230(0x151),_0x3be230(0x15d),_0x3be230(0x267),_0x3be230(0x145),'CENTERPICTURE','COMMONEVENT',_0x3be230(0x1ae),'SHOW',_0x3be230(0xad),_0x3be230(0x166),'DISABLE',_0x3be230(0x1b0),_0x3be230(0x184),'ALL',_0x3be230(0x13c)],VisuMZ[_0x3be230(0x24d)][_0x3be230(0x30d)]=function(_0x2b672b,_0x252a25){const _0x9eec08=_0x3be230;if(_0x252a25<=0x0)return;const _0x248e7a=_0x2b672b;for(const _0x676f5f of _0x248e7a){if(!_0x676f5f)continue;VisuMZ[_0x9eec08(0x24d)][_0x9eec08(0x2a5)](_0x676f5f,_0x252a25);}},VisuMZ[_0x3be230(0x24d)][_0x3be230(0x128)]=function(){const _0x432f77=_0x3be230;VisuMZ[_0x432f77(0x24d)]['AutoColorRegExp']=[];for(let _0x302620=0x1;_0x302620<=0x1f;_0x302620++){if('HlihU'===_0x432f77(0x158)){const _0x4ee25b=_0x432f77(0x2d0)['format'](_0x302620),_0x5d02a2=VisuMZ[_0x432f77(0x24d)][_0x432f77(0x32c)][_0x432f77(0x134)][_0x4ee25b];_0x5d02a2[_0x432f77(0x2c0)]((_0x20885e,_0x854766)=>{const _0x20a869=_0x432f77;if(!_0x20885e||!_0x854766)return-0x1;return _0x854766[_0x20a869(0xde)]-_0x20885e['length'];}),this[_0x432f77(0xd7)](_0x5d02a2,_0x302620);}else return'\x1bC[%1]%2\x1bPREVCOLOR[0]'[_0x432f77(0xac)](_0x49e23a,_0x4b7c2c);}},VisuMZ[_0x3be230(0x24d)][_0x3be230(0xd7)]=function(_0x1dc604,_0x1a1aad){const _0x3879c3=_0x3be230;for(const _0x213f9d of _0x1dc604){if(_0x213f9d[_0x3879c3(0xde)]<=0x0)continue;if(/^\d+$/[_0x3879c3(0x117)](_0x213f9d))continue;let _0xc118fa=VisuMZ[_0x3879c3(0x24d)][_0x3879c3(0x21e)](_0x213f9d);if(_0x213f9d['match'](/[\u3000-\u303F]|[\u3040-\u309F]|[\u30A0-\u30FF]|[\uFF00-\uFFEF]|[\u4E00-\u9FAF]|[\u2605-\u2606]|[\u2190-\u2195]|\u203B/g))var _0x288f29=new RegExp(_0xc118fa,'i');else var _0x288f29=new RegExp('\x5cb'+_0xc118fa+'\x5cb','g');VisuMZ[_0x3879c3(0x24d)][_0x3879c3(0x2ae)][_0x3879c3(0x316)]([_0x288f29,_0x3879c3(0x300)[_0x3879c3(0xac)](_0x1a1aad,_0x213f9d)]);}},VisuMZ[_0x3be230(0x24d)][_0x3be230(0x21e)]=function(_0x2be1cc){const _0x35b235=_0x3be230;return _0x2be1cc=_0x2be1cc['replace'](/(\W)/gi,(_0x469647,_0x296d9c)=>'\x5c%1'[_0x35b235(0xac)](_0x296d9c)),_0x2be1cc;},VisuMZ[_0x3be230(0x24d)][_0x3be230(0x16f)]=VisuMZ['ParseClassNotetags'],VisuMZ[_0x3be230(0x16f)]=function(_0x2bc4fd){const _0x5b4911=_0x3be230;VisuMZ[_0x5b4911(0x24d)][_0x5b4911(0x16f)][_0x5b4911(0x2d7)](this,_0x2bc4fd);const _0xc4b488=VisuMZ[_0x5b4911(0x24d)][_0x5b4911(0x32c)]['AutoColor'];VisuMZ[_0x5b4911(0x24d)][_0x5b4911(0x2a5)](_0x2bc4fd,_0xc4b488[_0x5b4911(0x246)]);},VisuMZ['MessageCore'][_0x3be230(0xc8)]=VisuMZ[_0x3be230(0xc8)],VisuMZ[_0x3be230(0xc8)]=function(_0xb8b46a){const _0x517141=_0x3be230;VisuMZ['MessageCore'][_0x517141(0xc8)]['call'](this,_0xb8b46a);const _0x1dc67f=VisuMZ[_0x517141(0x24d)][_0x517141(0x32c)]['AutoColor'];VisuMZ[_0x517141(0x24d)][_0x517141(0x2a5)](_0xb8b46a,_0x1dc67f[_0x517141(0x209)]);},VisuMZ[_0x3be230(0x24d)][_0x3be230(0x100)]=VisuMZ[_0x3be230(0x100)],VisuMZ['ParseItemNotetags']=function(_0x1bbdcb){const _0x59524a=_0x3be230;VisuMZ[_0x59524a(0x24d)]['ParseItemNotetags']['call'](this,_0x1bbdcb);const _0x2ee86d=VisuMZ['MessageCore'][_0x59524a(0x32c)][_0x59524a(0x134)];VisuMZ[_0x59524a(0x24d)][_0x59524a(0x2a5)](_0x1bbdcb,_0x2ee86d['Items']);},VisuMZ[_0x3be230(0x24d)][_0x3be230(0x310)]=VisuMZ[_0x3be230(0x310)],VisuMZ[_0x3be230(0x310)]=function(_0x3b6875){const _0x42f015=_0x3be230;VisuMZ['MessageCore'][_0x42f015(0x310)][_0x42f015(0x2d7)](this,_0x3b6875);const _0x22b928=VisuMZ[_0x42f015(0x24d)][_0x42f015(0x32c)]['AutoColor'];VisuMZ[_0x42f015(0x24d)][_0x42f015(0x2a5)](_0x3b6875,_0x22b928[_0x42f015(0x2e7)]);},VisuMZ[_0x3be230(0x24d)][_0x3be230(0x26b)]=VisuMZ['ParseArmorNotetags'],VisuMZ[_0x3be230(0x26b)]=function(_0x6cdc46){const _0x14ede3=_0x3be230;VisuMZ['MessageCore']['ParseArmorNotetags']['call'](this,_0x6cdc46);const _0x41160b=VisuMZ[_0x14ede3(0x24d)][_0x14ede3(0x32c)][_0x14ede3(0x134)];VisuMZ[_0x14ede3(0x24d)][_0x14ede3(0x2a5)](_0x6cdc46,_0x41160b[_0x14ede3(0x13a)]);},VisuMZ[_0x3be230(0x24d)]['ParseEnemyNotetags']=VisuMZ[_0x3be230(0x323)],VisuMZ[_0x3be230(0x323)]=function(_0x1616d8){const _0x495bb8=_0x3be230;VisuMZ['MessageCore'][_0x495bb8(0x323)][_0x495bb8(0x2d7)](this,_0x1616d8);const _0xb7b94d=VisuMZ[_0x495bb8(0x24d)][_0x495bb8(0x32c)][_0x495bb8(0x134)];VisuMZ[_0x495bb8(0x24d)]['CreateAutoColorFor'](_0x1616d8,_0xb7b94d[_0x495bb8(0x325)]);},VisuMZ[_0x3be230(0x24d)][_0x3be230(0x320)]=VisuMZ[_0x3be230(0x320)],VisuMZ['ParseStateNotetags']=function(_0x34aeb8){const _0x33177a=_0x3be230;VisuMZ['MessageCore'][_0x33177a(0x320)][_0x33177a(0x2d7)](this,_0x34aeb8);const _0x361ed4=VisuMZ[_0x33177a(0x24d)][_0x33177a(0x32c)][_0x33177a(0x134)];VisuMZ['MessageCore']['CreateAutoColorFor'](_0x34aeb8,_0x361ed4['States']);},VisuMZ[_0x3be230(0x24d)][_0x3be230(0x2a5)]=function(_0x1d2777,_0x2f8d02){const _0x25acab=_0x3be230;if(_0x2f8d02<=0x0)return;const _0x1462fb=VisuMZ[_0x25acab(0x24d)][_0x25acab(0x32c)]['AutoColor'][_0x25acab(0x121)+_0x2f8d02];let _0x379a07=_0x1d2777[_0x25acab(0x1d7)]['trim']();if(/^\d+$/[_0x25acab(0x117)](_0x379a07))return;if(VisuMZ[_0x25acab(0x24d)][_0x25acab(0x18a)][_0x25acab(0x1e6)](_0x379a07[_0x25acab(0x2c4)]()))return;_0x379a07=_0x379a07[_0x25acab(0x2ce)](/\\I\[(\d+)\]/gi,''),_0x379a07=_0x379a07[_0x25acab(0x2ce)](/\x1bI\[(\d+)\]/gi,'');if(_0x379a07[_0x25acab(0xde)]<=0x0)return;if(_0x379a07[_0x25acab(0x1ee)](/-----/i))return;_0x1462fb['push'](_0x379a07);},SceneManager[_0x3be230(0x21d)]=function(){const _0x359374=_0x3be230;return this[_0x359374(0x2a8)]&&this[_0x359374(0x2a8)][_0x359374(0xd0)]===Scene_Battle;},SceneManager[_0x3be230(0x2f4)]=function(){const _0xd45eec=_0x3be230;return this[_0xd45eec(0x2a8)]&&this[_0xd45eec(0x2a8)][_0xd45eec(0xd0)]===Scene_Map;},VisuMZ[_0x3be230(0x24d)]['TextManager_message']=TextManager[_0x3be230(0xc4)],TextManager[_0x3be230(0xc4)]=function(_0x2ff88c){const _0x3cf810=_0x3be230,_0x19bed1=[_0x3cf810(0x1f3),_0x3cf810(0x32b),_0x3cf810(0xba),_0x3cf810(0x2c5),_0x3cf810(0x240),_0x3cf810(0x1ef),_0x3cf810(0x27d),'obtainExp',_0x3cf810(0x11b),_0x3cf810(0x229)];let _0x4df74a=VisuMZ['MessageCore']['TextManager_message'][_0x3cf810(0x2d7)](this,_0x2ff88c);return _0x19bed1[_0x3cf810(0x1e6)](_0x2ff88c)&&('yzBzG'==='yzBzG'?_0x4df74a=_0x3cf810(0x151)+_0x4df74a:this['_autoPositionTarget']=_0x4f3a2f['followers']()[_0x3cf810(0x2f9)](_0x19a314-0x2)),_0x4df74a;},ConfigManager['textSpeed']=VisuMZ[_0x3be230(0x24d)][_0x3be230(0x32c)][_0x3be230(0x304)][_0x3be230(0xfb)],VisuMZ[_0x3be230(0x24d)]['ConfigManager_makeData']=ConfigManager[_0x3be230(0x24e)],ConfigManager[_0x3be230(0x24e)]=function(){const _0x51e43f=_0x3be230,_0x23d5ec=VisuMZ[_0x51e43f(0x24d)][_0x51e43f(0x1db)][_0x51e43f(0x2d7)](this);return _0x23d5ec[_0x51e43f(0x273)]=this[_0x51e43f(0x273)],_0x23d5ec;},VisuMZ['MessageCore'][_0x3be230(0x2c9)]=ConfigManager[_0x3be230(0x289)],ConfigManager[_0x3be230(0x289)]=function(_0x4f3e46){const _0x42b268=_0x3be230;VisuMZ[_0x42b268(0x24d)]['ConfigManager_applyData'][_0x42b268(0x2d7)](this,_0x4f3e46),_0x42b268(0x273)in _0x4f3e46?this[_0x42b268(0x273)]=Number(_0x4f3e46['textSpeed'])[_0x42b268(0xf5)](0x1,0xb):this['textSpeed']=VisuMZ[_0x42b268(0x24d)]['Settings'][_0x42b268(0x304)][_0x42b268(0xfb)];},TextManager[_0x3be230(0xd2)]=VisuMZ['MessageCore']['Settings'][_0x3be230(0x304)][_0x3be230(0xb2)],TextManager[_0x3be230(0x2da)]=VisuMZ['MessageCore'][_0x3be230(0x32c)][_0x3be230(0x304)]['Instant'],VisuMZ[_0x3be230(0x24d)][_0x3be230(0x290)]=Game_System[_0x3be230(0x194)][_0x3be230(0x125)],Game_System[_0x3be230(0x194)][_0x3be230(0x125)]=function(){const _0x2937d2=_0x3be230;VisuMZ[_0x2937d2(0x24d)][_0x2937d2(0x290)][_0x2937d2(0x2d7)](this),this['initMessageCore']();},Game_System[_0x3be230(0x194)][_0x3be230(0x147)]=function(){const _0x104fe0=_0x3be230,_0x592608=VisuMZ[_0x104fe0(0x24d)][_0x104fe0(0x32c)][_0x104fe0(0x322)],_0x386166=VisuMZ[_0x104fe0(0x24d)]['Settings'][_0x104fe0(0x200)];this[_0x104fe0(0x225)]={'messageRows':_0x592608[_0x104fe0(0x173)],'messageWidth':_0x592608[_0x104fe0(0x157)],'messageWordWrap':_0x386166[_0x104fe0(0x11e)],'helpWordWrap':_0x386166[_0x104fe0(0x30b)],'choiceLineHeight':_0x592608[_0x104fe0(0x2b8)],'choiceRows':_0x592608['ChoiceWindowMaxRows'],'choiceCols':_0x592608[_0x104fe0(0x14d)],'choiceTextAlign':_0x592608[_0x104fe0(0x22c)]};},Game_System[_0x3be230(0x194)]['getMessageWindowRows']=function(){const _0x52a259=_0x3be230;if(this['_MessageCoreSettings']===undefined)this['initMessageCore']();if(this[_0x52a259(0x225)][_0x52a259(0x19b)]===undefined)this[_0x52a259(0x147)]();return this['_MessageCoreSettings']['messageRows'];},Game_System[_0x3be230(0x194)][_0x3be230(0x266)]=function(_0x353c44){const _0x5f0cf1=_0x3be230;if(this[_0x5f0cf1(0x225)]===undefined)this[_0x5f0cf1(0x147)]();if(this[_0x5f0cf1(0x225)]['messageRows']===undefined)this[_0x5f0cf1(0x147)]();this[_0x5f0cf1(0x225)][_0x5f0cf1(0x19b)]=_0x353c44||0x1;},Game_System[_0x3be230(0x194)][_0x3be230(0x1fb)]=function(){const _0x1b1142=_0x3be230;if(this[_0x1b1142(0x225)]===undefined)this['initMessageCore']();if(this['_MessageCoreSettings'][_0x1b1142(0x1ce)]===undefined)this[_0x1b1142(0x147)]();return this[_0x1b1142(0x225)][_0x1b1142(0x1ce)];},Game_System[_0x3be230(0x194)][_0x3be230(0x258)]=function(_0x21b1fa){const _0x5296e1=_0x3be230;if(this[_0x5296e1(0x225)]===undefined)this[_0x5296e1(0x147)]();if(this[_0x5296e1(0x225)][_0x5296e1(0x1ce)]===undefined)this[_0x5296e1(0x147)]();_0x21b1fa=Math['ceil'](_0x21b1fa);if(_0x21b1fa%0x2!==0x0)_0x21b1fa+=0x1;this['_MessageCoreSettings'][_0x5296e1(0x1ce)]=_0x21b1fa||0x2;},Game_System[_0x3be230(0x194)]['isMessageWindowWordWrap']=function(){const _0x528e70=_0x3be230;if(this[_0x528e70(0x225)]===undefined)this['initMessageCore']();if(this[_0x528e70(0x225)][_0x528e70(0x314)]===undefined)this[_0x528e70(0x147)]();return this['_MessageCoreSettings'][_0x528e70(0x314)];},Game_System[_0x3be230(0x194)]['setMessageWindowWordWrap']=function(_0x15dbfe){const _0x587775=_0x3be230;if(this['_MessageCoreSettings']===undefined)this[_0x587775(0x147)]();if(this['_MessageCoreSettings']['messageWordWrap']===undefined)this[_0x587775(0x147)]();this['_MessageCoreSettings']['messageWordWrap']=_0x15dbfe;},Game_System['prototype']['isHelpWindowWordWrap']=function(){const _0x45d634=_0x3be230;if(this[_0x45d634(0x225)]===undefined)this[_0x45d634(0x147)]();if(this[_0x45d634(0x225)][_0x45d634(0x2fb)]===undefined)this[_0x45d634(0x147)]();return this['_MessageCoreSettings'][_0x45d634(0x2fb)];},Game_System[_0x3be230(0x194)][_0x3be230(0x2d3)]=function(_0x2090dd){const _0x206522=_0x3be230;if(this['_MessageCoreSettings']===undefined)this['initMessageCore']();if(this[_0x206522(0x225)]['helpWordWrap']===undefined)this[_0x206522(0x147)]();this[_0x206522(0x225)][_0x206522(0x2fb)]=_0x2090dd;},Game_System[_0x3be230(0x194)]['getChoiceListLineHeight']=function(){const _0x3133bc=_0x3be230;if(this[_0x3133bc(0x225)]===undefined)this[_0x3133bc(0x147)]();if(this[_0x3133bc(0x225)][_0x3133bc(0x257)]===undefined)this[_0x3133bc(0x147)]();return this[_0x3133bc(0x225)][_0x3133bc(0x257)];},Game_System['prototype']['setChoiceListLineHeight']=function(_0x4b49c7){const _0x593eb8=_0x3be230;if(this[_0x593eb8(0x225)]===undefined)this[_0x593eb8(0x147)]();if(this['_MessageCoreSettings']['choiceLineHeight']===undefined)this['initMessageCore']();this[_0x593eb8(0x225)]['choiceLineHeight']=_0x4b49c7||0x1;},Game_System[_0x3be230(0x194)][_0x3be230(0x104)]=function(){const _0x57fcbf=_0x3be230;if(this[_0x57fcbf(0x225)]===undefined)this[_0x57fcbf(0x147)]();if(this[_0x57fcbf(0x225)][_0x57fcbf(0x250)]===undefined)this['initMessageCore']();return this[_0x57fcbf(0x225)][_0x57fcbf(0x250)];},Game_System[_0x3be230(0x194)]['setChoiceListMaxRows']=function(_0x180fd6){const _0x4d96fd=_0x3be230;if(this[_0x4d96fd(0x225)]===undefined)this[_0x4d96fd(0x147)]();if(this[_0x4d96fd(0x225)][_0x4d96fd(0x250)]===undefined)this[_0x4d96fd(0x147)]();this[_0x4d96fd(0x225)][_0x4d96fd(0x250)]=_0x180fd6||0x1;},Game_System[_0x3be230(0x194)][_0x3be230(0xd6)]=function(){const _0x32cb71=_0x3be230;if(this[_0x32cb71(0x225)]===undefined)this[_0x32cb71(0x147)]();if(this[_0x32cb71(0x225)][_0x32cb71(0x295)]===undefined)this[_0x32cb71(0x147)]();return this[_0x32cb71(0x225)][_0x32cb71(0x295)];},Game_System[_0x3be230(0x194)]['setChoiceListMaxColumns']=function(_0x32b02b){const _0x380ba3=_0x3be230;if(this[_0x380ba3(0x225)]===undefined)this[_0x380ba3(0x147)]();if(this[_0x380ba3(0x225)][_0x380ba3(0x295)]===undefined)this['initMessageCore']();this[_0x380ba3(0x225)][_0x380ba3(0x295)]=_0x32b02b||0x1;},Game_System['prototype'][_0x3be230(0x27a)]=function(){const _0x4539fa=_0x3be230;if(this[_0x4539fa(0x225)]===undefined)this[_0x4539fa(0x147)]();if(this[_0x4539fa(0x225)]['choiceTextAlign']===undefined)this[_0x4539fa(0x147)]();return this[_0x4539fa(0x225)]['choiceTextAlign'];},Game_System['prototype'][_0x3be230(0x2b6)]=function(_0x4a020a){const _0x2316cc=_0x3be230;if(this[_0x2316cc(0x225)]===undefined)this[_0x2316cc(0x147)]();if(this[_0x2316cc(0x225)][_0x2316cc(0x29e)]===undefined)this[_0x2316cc(0x147)]();this['_MessageCoreSettings']['choiceTextAlign']=_0x4a020a[_0x2316cc(0x12b)]();},VisuMZ[_0x3be230(0x24d)]['Game_Party_initialize']=Game_Party[_0x3be230(0x194)][_0x3be230(0x125)],Game_Party[_0x3be230(0x194)][_0x3be230(0x125)]=function(){const _0x2e5b43=_0x3be230;VisuMZ[_0x2e5b43(0x24d)]['Game_Party_initialize'][_0x2e5b43(0x2d7)](this),this[_0x2e5b43(0x147)]();},Game_Party[_0x3be230(0x194)][_0x3be230(0x147)]=function(){const _0x4ca52e=_0x3be230;this[_0x4ca52e(0x2cc)]={'type':0x0,'id':0x0,'quantity':0x0};},Game_Party[_0x3be230(0x194)]['getLastGainedItemData']=function(){const _0x135021=_0x3be230;if(this[_0x135021(0x2cc)]===undefined)this['initMessageCore']();return this[_0x135021(0x2cc)];},Game_Party[_0x3be230(0x194)][_0x3be230(0x1a4)]=function(_0x10c09a,_0x22a3e){const _0x184d08=_0x3be230;if(this[_0x184d08(0x2cc)]===undefined)this[_0x184d08(0x147)]();if(!_0x10c09a)return;if(DataManager['isItem'](_0x10c09a))'YdVts'===_0x184d08(0x243)?(_0x3d37ce[_0x184d08(0x24d)][_0x184d08(0x2b1)][_0x184d08(0x2d7)](this),this['updateMove']()):this[_0x184d08(0x2cc)][_0x184d08(0x260)]=0x0;else{if(DataManager[_0x184d08(0x198)](_0x10c09a))this[_0x184d08(0x2cc)][_0x184d08(0x260)]=0x1;else{if(DataManager[_0x184d08(0x29a)](_0x10c09a)){if(_0x184d08(0x326)===_0x184d08(0x326))this[_0x184d08(0x2cc)]['type']=0x2;else for(const _0xcb56d3 of _0x1a2ebd['MessageCore'][_0x184d08(0x32c)][_0x184d08(0x1f1)]){if(_0xcb56d3[_0x184d08(0x235)]===_0x171b2d){if(_0xcb56d3[_0x184d08(0x296)]==='')this[_0x184d08(0x19f)](_0x188604);_0xcb56d3[_0x184d08(0xf4)][_0x184d08(0x2d7)](this,_0x1f3c57);if(this[_0x184d08(0xd0)]===_0x1b7763){const _0x37156a=_0xcb56d3[_0x184d08(0x119)]||0x0;if(_0x37156a>0x0)this[_0x184d08(0x155)](_0x37156a);}}}}}}this[_0x184d08(0x2cc)]['id']=_0x10c09a['id'],this[_0x184d08(0x2cc)][_0x184d08(0x196)]=_0x22a3e;},VisuMZ[_0x3be230(0x24d)][_0x3be230(0x230)]=Game_Party[_0x3be230(0x194)][_0x3be230(0x336)],Game_Party[_0x3be230(0x194)][_0x3be230(0x336)]=function(_0x1d9d45,_0x4b6c45,_0x178ab7){const _0x2be2bc=_0x3be230;VisuMZ[_0x2be2bc(0x24d)][_0x2be2bc(0x230)][_0x2be2bc(0x2d7)](this,_0x1d9d45,_0x4b6c45,_0x178ab7);if(_0x4b6c45>0x0){if('rYhMM'!==_0x2be2bc(0x312)){if(_0x42097e[_0x2be2bc(0x18c)](_0x48fc79))return![];}else this['setLastGainedItemData'](_0x1d9d45,_0x4b6c45);}},VisuMZ[_0x3be230(0x24d)]['Game_Map_initialize']=Game_Map[_0x3be230(0x194)][_0x3be230(0x125)],Game_Map[_0x3be230(0x194)][_0x3be230(0x125)]=function(){const _0x2a7ad4=_0x3be230;VisuMZ[_0x2a7ad4(0x24d)][_0x2a7ad4(0x102)]['call'](this),this['_messageCommonEvents']=[];},VisuMZ[_0x3be230(0x24d)][_0x3be230(0x16e)]=Game_Map[_0x3be230(0x194)]['setupEvents'],Game_Map['prototype'][_0x3be230(0x2f6)]=function(){const _0x254cb8=_0x3be230;VisuMZ[_0x254cb8(0x24d)][_0x254cb8(0x16e)]['call'](this),this['_messageCommonEvents']=[];},VisuMZ[_0x3be230(0x24d)]['Game_Map_updateEvents']=Game_Map['prototype'][_0x3be230(0xc9)],Game_Map[_0x3be230(0x194)][_0x3be230(0xc9)]=function(){const _0x4e5ef4=_0x3be230;VisuMZ[_0x4e5ef4(0x24d)][_0x4e5ef4(0x152)][_0x4e5ef4(0x2d7)](this),this[_0x4e5ef4(0x2f7)]();},Game_Map[_0x3be230(0x194)][_0x3be230(0xe3)]=function(_0x3ac675){const _0x4d2109=_0x3be230;if(!$dataCommonEvents[_0x3ac675])return;this[_0x4d2109(0x16b)]=this[_0x4d2109(0x16b)]||[];const _0x25bfbf=this[_0x4d2109(0x18b)][_0x4d2109(0x186)],_0x5d6388=new Game_MessageCommonEvent(_0x3ac675,_0x25bfbf);this[_0x4d2109(0x16b)][_0x4d2109(0x316)](_0x5d6388);},Game_Map[_0x3be230(0x194)]['updateMessageCommonEvents']=function(){const _0x2f7a00=_0x3be230;this[_0x2f7a00(0x16b)]=this['_messageCommonEvents']||[];for(const _0x231a06 of this[_0x2f7a00(0x16b)]){if(!_0x231a06[_0x2f7a00(0x18b)])this[_0x2f7a00(0x16b)]['remove'](_0x231a06);else{if(_0x2f7a00(0x15e)!==_0x2f7a00(0x15e)){this['obtainEscapeParam'](_0x464da9);if(this[_0x2f7a00(0xd4)]())return;_0x5e067b['drawing']&&(this['_textColorStack']=this['_textColorStack']||[],this['contents']['textColor']=this['_textColorStack'][_0x2f7a00(0x2c7)]()||_0x43b852[_0x2f7a00(0x107)]());}else _0x231a06[_0x2f7a00(0x238)]();}}},Game_Interpreter[_0x3be230(0x194)]['command101']=function(_0x3883ea){const _0x5f38b7=_0x3be230;if($gameMessage[_0x5f38b7(0x1b9)]())return![];return this[_0x5f38b7(0x220)](_0x3883ea),this['addContinuousShowTextCommands'](_0x3883ea),this[_0x5f38b7(0x180)](_0x3883ea),this[_0x5f38b7(0x281)](_0x5f38b7(0xc4)),!![];},Game_Interpreter['prototype']['prepareShowTextCommand']=function(_0x1fd544){const _0x5cc890=_0x3be230;$gameMessage[_0x5cc890(0x2bf)](_0x1fd544[0x0],_0x1fd544[0x1]),$gameMessage[_0x5cc890(0x17f)](_0x1fd544[0x2]),$gameMessage[_0x5cc890(0x23d)](_0x1fd544[0x3]),$gameMessage[_0x5cc890(0x276)](_0x1fd544[0x4]);},Game_Interpreter['prototype'][_0x3be230(0x2b7)]=function(_0x20991e){const _0x531c05=_0x3be230;while(this['isContinuePrepareShowTextCommands']()){this[_0x531c05(0x27e)]++;if(this[_0x531c05(0x1d1)]()['code']===0x191){if('fYCXX'!==_0x531c05(0x174))$gameMessage[_0x531c05(0xda)](this[_0x531c05(0x1d1)]()[_0x531c05(0x22b)][0x0]);else{const _0x3c60c6=_0x138240[_0x531c05(0xae)]();let _0x3a1dd2=0x0;for(const _0x4ec93e of _0x3c60c6){if(this['isChoiceVisible'](_0x4ec93e)){const _0x56baab=this[_0x531c05(0x2e1)](_0x4ec93e),_0x16f5c9=this[_0x531c05(0x2fd)](_0x4ec93e);this['addCommand'](_0x56baab,_0x531c05(0x24f),_0x16f5c9,_0x3a1dd2);}_0x3a1dd2++;}}}if(this[_0x531c05(0x13f)]())break;}},Game_Interpreter[_0x3be230(0x194)][_0x3be230(0x181)]=function(){const _0x1b9efa=_0x3be230;return this[_0x1b9efa(0x239)]()===0x65&&$gameSystem['getMessageWindowRows']()>0x4?!![]:this[_0x1b9efa(0x239)]()===0x191;},Game_Interpreter[_0x3be230(0x194)][_0x3be230(0x13f)]=function(){const _0x390e17=_0x3be230;return $gameMessage['_texts']['length']>=$gameSystem[_0x390e17(0x160)]()&&this[_0x390e17(0x239)]()!==0x191;},Game_Interpreter['prototype'][_0x3be230(0x180)]=function(_0x13f961){const _0x2e4968=_0x3be230;switch(this[_0x2e4968(0x239)]()){case 0x66:this[_0x2e4968(0x27e)]++,this['setupChoices'](this[_0x2e4968(0x1d1)]()[_0x2e4968(0x22b)]);break;case 0x67:this['_index']++,this[_0x2e4968(0x18f)](this['currentCommand']()[_0x2e4968(0x22b)]);break;case 0x68:this[_0x2e4968(0x27e)]++,this['setupItemChoice'](this[_0x2e4968(0x1d1)]()[_0x2e4968(0x22b)]);break;}},VisuMZ['MessageCore'][_0x3be230(0x1c1)]=Game_Interpreter[_0x3be230(0x194)]['setupChoices'],Game_Interpreter[_0x3be230(0x194)][_0x3be230(0x28c)]=function(_0x56f485){const _0xcba005=_0x3be230;_0x56f485=this[_0xcba005(0x282)](),VisuMZ[_0xcba005(0x24d)][_0xcba005(0x1c1)][_0xcba005(0x2d7)](this,_0x56f485);},Game_Interpreter[_0x3be230(0x194)][_0x3be230(0x282)]=function(){const _0x4c1598=_0x3be230,_0x2fd811=this[_0x4c1598(0x27e)],_0x3ca9fb=[];let _0x3cfb8f=0x0;this[_0x4c1598(0x27e)]++;while(this[_0x4c1598(0x27e)]<this['_list'][_0x4c1598(0xde)]){if(_0x4c1598(0x29d)===_0x4c1598(0x29d)){if(this['currentCommand']()[_0x4c1598(0x2d5)]===this[_0x4c1598(0x113)]){if(this[_0x4c1598(0x1d1)]()[_0x4c1598(0x311)]===0x194&&this[_0x4c1598(0x239)]()!==0x66){if('nGEhE'!=='nGEhE'){if(!_0x414502['isSceneBattle']())return'';if(_0x2b13bf[_0x4c1598(0x2ea)])return _0xc7e6c5[_0x4c1598(0x2ea)][_0x4c1598(0x1d7)]();if(_0x31147c[_0x4c1598(0x2c1)][0x0])return _0x1ca24b[_0x4c1598(0x2c1)][0x0][_0x4c1598(0x1d7)]();return'';}else break;}else{if(this[_0x4c1598(0x1d1)]()[_0x4c1598(0x311)]===0x66)this[_0x4c1598(0xfe)](_0x3cfb8f,this[_0x4c1598(0x1d1)](),_0x2fd811),this[_0x4c1598(0x27e)]-=0x2;else{if(this[_0x4c1598(0x1d1)]()['code']===0x192){if(_0x4c1598(0x32a)!==_0x4c1598(0x32a)){_0x529a65['Match']=_0x52339d['Match']['toUpperCase'](),_0x3f2d26['textCodeCheck']=new _0x34e068('\x1b'+_0xa3b73b['Match'],'gi'),_0x10543e[_0x4c1598(0xbf)]='\x1b'+_0x359184['Match'];if(_0x54b8d1['Type']==='')_0x18ac83[_0x4c1598(0xbf)]+=_0x4c1598(0x241);}else this[_0x4c1598(0x1d1)]()['parameters'][0x0]=_0x3cfb8f,_0x3cfb8f++;}}}}this[_0x4c1598(0x27e)]++;}else!_0x13fdfc['drawing']?_0x500de5[_0x4c1598(0x194)][_0x4c1598(0x1ab)][_0x4c1598(0x2d7)](this,_0x5761ae,_0x152387):_0x775da3['MessageCore'][_0x4c1598(0x2bc)]['call'](this,_0x4167f3,_0x56ebd4);}return this[_0x4c1598(0x27e)]=_0x2fd811,this[_0x4c1598(0x1d1)]()[_0x4c1598(0x22b)];},Game_Interpreter['prototype'][_0x3be230(0xfe)]=function(_0x4e2acb,_0x3aa6cf,_0x4ffb84){const _0x4544fa=_0x3be230;this[_0x4544fa(0x33b)](_0x4e2acb,_0x3aa6cf,_0x4ffb84),this['adjustShowChoiceCancel'](_0x4e2acb,_0x3aa6cf,_0x4ffb84),this[_0x4544fa(0x156)](_0x3aa6cf,_0x4ffb84);},Game_Interpreter[_0x3be230(0x194)]['adjustShowChoiceDefault']=function(_0x44e5ab,_0x4cd019,_0x111b1d){const _0x50406c=_0x3be230;if(_0x4cd019[_0x50406c(0x22b)][0x2]<0x0)return;const _0x536686=_0x4cd019[_0x50406c(0x22b)][0x2]+_0x44e5ab;this['_list'][_0x111b1d][_0x50406c(0x22b)][0x2]=_0x536686;},Game_Interpreter[_0x3be230(0x194)][_0x3be230(0x215)]=function(_0x40f78b,_0x29fa86,_0x36d20f){const _0x9c3064=_0x3be230;if(_0x29fa86[_0x9c3064(0x22b)][0x1]>=0x0){var _0x608e88=_0x29fa86['parameters'][0x1]+_0x40f78b;this[_0x9c3064(0x14e)][_0x36d20f]['parameters'][0x1]=_0x608e88;}else{if(_0x29fa86[_0x9c3064(0x22b)][0x1]===-0x2){if(_0x9c3064(0xa1)!==_0x9c3064(0x28d))this[_0x9c3064(0x14e)][_0x36d20f][_0x9c3064(0x22b)][0x1]=_0x29fa86[_0x9c3064(0x22b)][0x1];else{if(_0x5d8b90[_0x9c3064(0x18c)](_0x4b302b))return!![];}}}},Game_Interpreter[_0x3be230(0x194)][_0x3be230(0x156)]=function(_0x4a7e21,_0x1c6ec2){const _0x4e2506=_0x3be230;for(const _0x2185b9 of _0x4a7e21['parameters'][0x0]){this[_0x4e2506(0x14e)][_0x1c6ec2][_0x4e2506(0x22b)][0x0]['push'](_0x2185b9);}this[_0x4e2506(0x14e)][_0x4e2506(0x1d9)](this['_index']-0x1,0x2);};function Game_MessageCommonEvent(){const _0x4be985=_0x3be230;this[_0x4be985(0x125)](...arguments);}function _0x2f8e(_0x4036c2,_0x435e25){return _0x2f8e=function(_0x10bdf9,_0x2f8ea2){_0x10bdf9=_0x10bdf9-0xa0;let _0x1d9161=_0x10bd[_0x10bdf9];return _0x1d9161;},_0x2f8e(_0x4036c2,_0x435e25);}Game_MessageCommonEvent[_0x3be230(0x194)][_0x3be230(0x125)]=function(_0x2a402d,_0x286dca){const _0x140d11=_0x3be230;this[_0x140d11(0xc5)]=_0x2a402d,this[_0x140d11(0x186)]=_0x286dca||0x0,this[_0x140d11(0x277)]();},Game_MessageCommonEvent[_0x3be230(0x194)][_0x3be230(0x208)]=function(){const _0x563edf=_0x3be230;return $dataCommonEvents[this[_0x563edf(0xc5)]];},Game_MessageCommonEvent['prototype'][_0x3be230(0x261)]=function(){const _0x2b51d9=_0x3be230;return this[_0x2b51d9(0x208)]()[_0x2b51d9(0x261)];},Game_MessageCommonEvent[_0x3be230(0x194)][_0x3be230(0x277)]=function(){const _0x3262c7=_0x3be230;this[_0x3262c7(0x18b)]=new Game_Interpreter(),this['_interpreter'][_0x3262c7(0x292)](this[_0x3262c7(0x261)](),this['_eventId']);},Game_MessageCommonEvent[_0x3be230(0x194)][_0x3be230(0x238)]=function(){const _0x32c679=_0x3be230;if(this[_0x32c679(0x18b)]){if(_0x32c679(0x286)!=='qHbIM')this['_interpreter'][_0x32c679(0x19c)]()?this['_interpreter']['update']():this[_0x32c679(0x13e)]();else{const _0x4f1ef8=_0x2b6aa8[_0x32c679(0x133)]('['+_0x14c675['$1'][_0x32c679(0x1ee)](/\d+/g)+']');for(const _0x2e3c4b of _0x4f1ef8){if(_0x571282[_0x32c679(0x18c)](_0x2e3c4b))return![];}return!![];}}},Game_MessageCommonEvent['prototype'][_0x3be230(0x13e)]=function(){const _0x5eb917=_0x3be230;this[_0x5eb917(0x18b)]=null;},Scene_Message[_0x3be230(0x194)][_0x3be230(0x25f)]=function(){const _0x2860f4=_0x3be230,_0x17f444=Math[_0x2860f4(0x132)](Graphics[_0x2860f4(0x1e4)],$gameSystem[_0x2860f4(0x1fb)]()),_0x313c6a=$gameSystem[_0x2860f4(0x160)](),_0x37417f=this['calcWindowHeight'](_0x313c6a,![]),_0x214a56=(Graphics['boxWidth']-_0x17f444)/0x2,_0x541dc9=0x0;return new Rectangle(_0x214a56,_0x541dc9,_0x17f444,_0x37417f);},VisuMZ[_0x3be230(0x24d)][_0x3be230(0x135)]=Scene_Options[_0x3be230(0x194)][_0x3be230(0x33e)],Scene_Options['prototype'][_0x3be230(0x33e)]=function(){const _0x119b9f=_0x3be230;let _0x84ff90=VisuMZ['MessageCore']['Scene_Options_maxCommands']['call'](this);const _0x31828f=VisuMZ[_0x119b9f(0x24d)][_0x119b9f(0x32c)];if(_0x31828f['TextSpeed']['AddOption']&&_0x31828f[_0x119b9f(0x304)][_0x119b9f(0x1ff)])_0x84ff90++;return _0x84ff90;},VisuMZ[_0x3be230(0x24d)][_0x3be230(0x1cf)]=Window_Base[_0x3be230(0x194)][_0x3be230(0x125)],Window_Base[_0x3be230(0x194)][_0x3be230(0x125)]=function(_0x42e9e3){const _0x4cc190=_0x3be230;this['initMessageCore'](_0x42e9e3),VisuMZ['MessageCore'][_0x4cc190(0x1cf)][_0x4cc190(0x2d7)](this,_0x42e9e3);},Window_Base[_0x3be230(0x194)][_0x3be230(0x147)]=function(_0x4774b3){const _0x39bfb6=_0x3be230;this[_0x39bfb6(0xf0)](),this[_0x39bfb6(0x26f)](),this[_0x39bfb6(0x2cf)](_0x4774b3);},Window_Base[_0x3be230(0x194)][_0x3be230(0xf0)]=function(){this['setTextAlignment']('default');},Window_Base['prototype'][_0x3be230(0x30f)]=function(_0x19aa62){const _0x545bc2=_0x3be230;this[_0x545bc2(0xcb)]=_0x19aa62;},Window_Base[_0x3be230(0x194)][_0x3be230(0x2a9)]=function(){const _0x368c44=_0x3be230;return this[_0x368c44(0xcb)];},VisuMZ[_0x3be230(0x24d)][_0x3be230(0x116)]=Window_Base[_0x3be230(0x194)][_0x3be230(0xa7)],Window_Base[_0x3be230(0x194)][_0x3be230(0xa7)]=function(_0xd214ff){const _0x29b5cd=_0x3be230;return this[_0x29b5cd(0x26f)](),VisuMZ[_0x29b5cd(0x24d)][_0x29b5cd(0x116)]['call'](this,_0xd214ff);},VisuMZ[_0x3be230(0x24d)][_0x3be230(0x112)]=Window_Base['prototype'][_0x3be230(0x16a)],Window_Base[_0x3be230(0x194)][_0x3be230(0x16a)]=function(_0x578c3b){const _0x1d8b80=_0x3be230;VisuMZ['MessageCore'][_0x1d8b80(0x112)]['call'](this,_0x578c3b);if(_0x578c3b[_0x1d8b80(0x1f8)])this[_0x1d8b80(0x30f)](_0x1d8b80(0x256));},Window_Base[_0x3be230(0x194)][_0x3be230(0x26f)]=function(){const _0x51e7af=_0x3be230;this[_0x51e7af(0x1b7)](![]);},Window_Base[_0x3be230(0x194)]['isWordWrapEnabled']=function(){const _0x397e6e=_0x3be230;return this[_0x397e6e(0x2ca)];},Window_Base['prototype']['setWordWrap']=function(_0x22d7c7){const _0x26fa8d=_0x3be230;return this[_0x26fa8d(0x2ca)]=_0x22d7c7,'';},Window_Base[_0x3be230(0x194)][_0x3be230(0x2cf)]=function(_0x3c34b9){const _0x4e63c2=_0x3be230;this[_0x4e63c2(0x187)]=JsonEx[_0x4e63c2(0x223)](_0x3c34b9);},Window_Base['prototype'][_0x3be230(0x10a)]=function(){const _0xb54d3a=_0x3be230;this[_0xb54d3a(0x2a0)][_0xb54d3a(0x278)]=$gameSystem[_0xb54d3a(0x259)](),this[_0xb54d3a(0x2a0)]['fontSize']=$gameSystem[_0xb54d3a(0x2ee)](),this['contents'][_0xb54d3a(0x167)]=![],this[_0xb54d3a(0x2a0)][_0xb54d3a(0x20d)]=![],this[_0xb54d3a(0x26d)]();},Window_Base[_0x3be230(0x194)][_0x3be230(0x26d)]=function(){const _0x4eef6f=_0x3be230;this['changeTextColor'](ColorManager[_0x4eef6f(0x107)]()),this[_0x4eef6f(0x192)](ColorManager['outlineColor']());const _0x499573=VisuMZ[_0x4eef6f(0x24d)]['Settings'][_0x4eef6f(0x322)];_0x499573['DefaultOutlineWidth']===undefined&&(_0x499573[_0x4eef6f(0x204)]=0x3),this[_0x4eef6f(0x2a0)][_0x4eef6f(0xef)]=_0x499573[_0x4eef6f(0x204)],this['setColorLock'](![]);},Window_Base['prototype'][_0x3be230(0x1a0)]=function(_0x4d0a8){this['_colorLock']=_0x4d0a8;},Window_Base[_0x3be230(0x194)][_0x3be230(0xd4)]=function(){const _0x2c77ae=_0x3be230;return this[_0x2c77ae(0x11f)];},Window_Base[_0x3be230(0x194)][_0x3be230(0x210)]=function(){return![];},Window_Base[_0x3be230(0x194)][_0x3be230(0x237)]=function(){const _0x348371=_0x3be230,_0x57c497=['fontFace',_0x348371(0xb7),_0x348371(0x167),_0x348371(0x20d),_0x348371(0x2ef),_0x348371(0x254),_0x348371(0xef),'paintOpacity'];let _0xa34380={};for(const _0x5f4419 of _0x57c497){_0xa34380[_0x5f4419]=this['contents'][_0x5f4419];}return _0xa34380;},Window_Base[_0x3be230(0x194)][_0x3be230(0xa6)]=function(_0x50a8ed){const _0x4d3576=_0x3be230;for(const _0x7b0342 in _0x50a8ed){'fdQQG'===_0x4d3576(0x10b)?(this[_0x4d3576(0x1cc)](),this[_0x4d3576(0x2db)](),this[_0x4d3576(0x2e9)]&&(this[_0x4d3576(0x30a)](),this['placeCancelButton']()),this[_0x4d3576(0x205)](),this[_0x4d3576(0x163)](),this[_0x4d3576(0x1ac)](),_0x2293e9[_0x4d3576(0x194)][_0x4d3576(0x277)][_0x4d3576(0x2d7)](this)):this[_0x4d3576(0x2a0)][_0x7b0342]=_0x50a8ed[_0x7b0342];}},VisuMZ[_0x3be230(0x24d)]['Window_Base_update']=Window_Base['prototype'][_0x3be230(0x238)],Window_Base['prototype']['update']=function(){const _0x2e718f=_0x3be230;VisuMZ['MessageCore']['Window_Base_update'][_0x2e718f(0x2d7)](this),this[_0x2e718f(0xb5)]();},Window_Base[_0x3be230(0x194)][_0x3be230(0x28b)]=function(){return![];},Window_Base['prototype'][_0x3be230(0xb5)]=function(){const _0x941451=_0x3be230;this[_0x941451(0x33a)]>0x0&&(_0x941451(0x221)===_0x941451(0x1be)?_0x14b5c2=_0x941451(0x151)+_0x1ad4dd:(this['canMove']()&&(this['x']=this['applyMoveEasing'](this['x'],this['_moveTargetX']),this['y']=this['applyMoveEasing'](this['y'],this['_moveTargetY']),this[_0x941451(0x1e4)]=this[_0x941451(0x252)](this[_0x941451(0x1e4)],this['_moveTargetWidth']),this[_0x941451(0x1f6)]=this[_0x941451(0x252)](this['height'],this[_0x941451(0x30c)]),this[_0x941451(0x1f7)]()),this['_moveDuration']--));},Window_Base[_0x3be230(0x194)][_0x3be230(0x1f7)]=function(_0xe80b99,_0x15a7b6){const _0x2a6ad7=_0x3be230;!_0xe80b99&&(this[_0x2a6ad7(0x1e4)]=Math[_0x2a6ad7(0x132)](this[_0x2a6ad7(0x1e4)],Graphics['width']),this[_0x2a6ad7(0x1f6)]=Math['min'](this[_0x2a6ad7(0x1f6)],Graphics['height']));if(!_0x15a7b6){if(_0x2a6ad7(0x10d)!==_0x2a6ad7(0x12c)){const _0xce49c2=-(Math[_0x2a6ad7(0xea)](Graphics[_0x2a6ad7(0x1e4)]-Graphics[_0x2a6ad7(0x334)])/0x2),_0x9b8e48=_0xce49c2+Graphics[_0x2a6ad7(0x1e4)]-this[_0x2a6ad7(0x1e4)],_0x145c7f=-(Math[_0x2a6ad7(0xea)](Graphics['height']-Graphics[_0x2a6ad7(0x15c)])/0x2),_0x55ccfa=_0x145c7f+Graphics[_0x2a6ad7(0x1f6)]-this['height'];this['x']=this['x'][_0x2a6ad7(0xf5)](_0xce49c2,_0x9b8e48),this['y']=this['y'][_0x2a6ad7(0xf5)](_0x145c7f,_0x55ccfa);}else _0x17d844['match'](_0x246b93[_0x2a6ad7(0x17c)])&&(_0x465942=_0x388536[_0x2a6ad7(0x2ce)](_0x588851[_0x2a6ad7(0x17c)],_0x2d83ad[_0x2a6ad7(0xbf)]['bind'](this)));}},Window_Base[_0x3be230(0x194)]['applyMoveEasing']=function(_0x23785b,_0x4434e4){const _0x369971=_0x3be230,_0x2ddb40=this[_0x369971(0x33a)],_0x94a0e3=this[_0x369971(0x233)],_0xdfff42=this[_0x369971(0x2b2)]((_0x94a0e3-_0x2ddb40)/_0x94a0e3),_0x3a52db=this[_0x369971(0x2b2)]((_0x94a0e3-_0x2ddb40+0x1)/_0x94a0e3),_0xd7cfbe=(_0x23785b-_0x4434e4*_0xdfff42)/(0x1-_0xdfff42);return _0xd7cfbe+(_0x4434e4-_0xd7cfbe)*_0x3a52db;},Window_Base['prototype'][_0x3be230(0x2b2)]=function(_0xaed279){const _0x1b8277=_0x3be230,_0x27b6c=0x2;switch(this[_0x1b8277(0x21b)]){case 0x0:return _0xaed279;case 0x1:return this[_0x1b8277(0x2f1)](_0xaed279,_0x27b6c);case 0x2:return this[_0x1b8277(0x12e)](_0xaed279,_0x27b6c);case 0x3:return this[_0x1b8277(0x139)](_0xaed279,_0x27b6c);default:return Imported[_0x1b8277(0x118)]?VisuMZ[_0x1b8277(0x252)](_0xaed279,this[_0x1b8277(0x21b)]):_0xaed279;}},Window_Base[_0x3be230(0x194)][_0x3be230(0x1fc)]=function(_0x22ff04,_0x27bbe5,_0x4c2685,_0x13784f,_0x1cfe5a,_0x44839b){const _0x588e55=_0x3be230;this['_moveTargetX']=_0x22ff04,this[_0x588e55(0x13d)]=_0x27bbe5,this['_moveTargetWidth']=_0x4c2685||this['width'],this[_0x588e55(0x30c)]=_0x13784f||this[_0x588e55(0x1f6)],this[_0x588e55(0x33a)]=_0x1cfe5a||0x1;if(this['_moveDuration']<=0x0)this[_0x588e55(0x33a)]=0x1;this[_0x588e55(0x233)]=this[_0x588e55(0x33a)],this[_0x588e55(0x21b)]=_0x44839b||0x0;if(_0x1cfe5a<=0x0)this[_0x588e55(0xb5)]();},Window_Base[_0x3be230(0x194)]['moveBy']=function(_0x2787ff,_0x17ca16,_0x271576,_0x272ed1,_0x13c9df,_0x18e8d0){const _0xb0dbb1=_0x3be230;this['_moveTargetX']=this['x']+_0x2787ff,this['_moveTargetY']=this['y']+_0x17ca16,this[_0xb0dbb1(0x26c)]=this[_0xb0dbb1(0x1e4)]+(_0x271576||0x0),this[_0xb0dbb1(0x30c)]=this['height']+(_0x272ed1||0x0),this[_0xb0dbb1(0x33a)]=_0x13c9df||0x1;if(this[_0xb0dbb1(0x33a)]<=0x0)this['_moveDuration']=0x1;this[_0xb0dbb1(0x233)]=this[_0xb0dbb1(0x33a)],this[_0xb0dbb1(0x21b)]=_0x18e8d0||0x0;if(_0x13c9df<=0x0)this['updateMove']();},Window_Base[_0x3be230(0x194)][_0x3be230(0x1c0)]=function(_0x5d6f70,_0x36ec0e){const _0x12b72c=_0x3be230;this[_0x12b72c(0x1fc)](this[_0x12b72c(0x187)]['x'],this[_0x12b72c(0x187)]['y'],this[_0x12b72c(0x187)][_0x12b72c(0x1e4)],this[_0x12b72c(0x187)]['height'],_0x5d6f70,_0x36ec0e);},VisuMZ[_0x3be230(0x24d)][_0x3be230(0x1ec)]=Window_Base[_0x3be230(0x194)][_0x3be230(0x1d0)],Window_Base[_0x3be230(0x194)]['changeTextColor']=function(_0x4fddb2){const _0x56aef2=_0x3be230;if(this[_0x56aef2(0xd4)]())return;_0x4fddb2=_0x4fddb2[_0x56aef2(0x2ce)](/\,/g,''),this[_0x56aef2(0x1e3)]=this[_0x56aef2(0x1e3)]||[],this['_textColorStack'][_0x56aef2(0x168)](this[_0x56aef2(0x2a0)][_0x56aef2(0x2ef)]),VisuMZ[_0x56aef2(0x24d)][_0x56aef2(0x1ec)][_0x56aef2(0x2d7)](this,_0x4fddb2);},Window_Base[_0x3be230(0x194)][_0x3be230(0xb9)]=function(_0x351b69){const _0x2acaa4=_0x3be230;this[_0x2acaa4(0x19f)](_0x351b69);if(this[_0x2acaa4(0xd4)]())return;_0x351b69['drawing']&&(this[_0x2acaa4(0x1e3)]=this[_0x2acaa4(0x1e3)]||[],this[_0x2acaa4(0x2a0)][_0x2acaa4(0x2ef)]=this[_0x2acaa4(0x1e3)][_0x2acaa4(0x2c7)]()||ColorManager[_0x2acaa4(0x107)]());},Window_Base['prototype'][_0x3be230(0x183)]=function(_0x564eb5){const _0x5af6c1=_0x3be230;return _0x564eb5=this[_0x5af6c1(0x1bc)](_0x564eb5),_0x564eb5=this[_0x5af6c1(0x299)](_0x564eb5),_0x564eb5=this[_0x5af6c1(0x31d)](_0x564eb5),_0x564eb5=this['preConvertEscapeCharacters'](_0x564eb5),_0x564eb5=this[_0x5af6c1(0x2e2)](_0x564eb5),_0x564eb5=this[_0x5af6c1(0x2b0)](_0x564eb5),_0x564eb5=this['convertTextAlignmentEscapeCharacters'](_0x564eb5),_0x564eb5=this[_0x5af6c1(0x25e)](_0x564eb5),_0x564eb5=this[_0x5af6c1(0x120)](_0x564eb5),_0x564eb5=this[_0x5af6c1(0x2ad)](_0x564eb5),_0x564eb5=this[_0x5af6c1(0x15b)](_0x564eb5),_0x564eb5=this[_0x5af6c1(0x161)](_0x564eb5),_0x564eb5=this['postConvertEscapeCharacters'](_0x564eb5),_0x564eb5=this[_0x5af6c1(0x31d)](_0x564eb5),_0x564eb5=this['processAutoColorWords'](_0x564eb5),_0x564eb5=this[_0x5af6c1(0x2af)](_0x564eb5),_0x564eb5;},Window_Base['prototype'][_0x3be230(0x1bc)]=function(_0x14c740){const _0x138e7e=_0x3be230;for(const _0x1b7047 of VisuMZ[_0x138e7e(0x24d)][_0x138e7e(0x32c)][_0x138e7e(0x2e8)]){if(_0x138e7e(0x275)!==_0x138e7e(0x271))_0x14c740['match'](_0x1b7047['textCodeCheck'])&&(_0x138e7e(0xcc)!==_0x138e7e(0x269)?_0x14c740=_0x14c740['replace'](_0x1b7047[_0x138e7e(0x17c)],_0x1b7047[_0x138e7e(0xbf)][_0x138e7e(0x202)](this)):_0xaae3fd=_0x21f4c9[_0x138e7e(0x2ce)](_0x3b28aa[_0x138e7e(0x17c)],_0x1988fb[_0x138e7e(0xbf)][_0x138e7e(0x202)](this)));else{if(this['_MessageCoreSettings']===_0xbc97e6)this[_0x138e7e(0x147)]();if(this['_MessageCoreSettings'][_0x138e7e(0x2fb)]===_0x4034dd)this[_0x138e7e(0x147)]();return this[_0x138e7e(0x225)][_0x138e7e(0x2fb)];}}return _0x14c740;},Window_Base[_0x3be230(0x194)][_0x3be230(0x299)]=function(_0x4a7d47){const _0x49d15b=_0x3be230;return _0x4a7d47=_0x4a7d47[_0x49d15b(0x2ce)](/\\/g,'\x1b'),_0x4a7d47=_0x4a7d47[_0x49d15b(0x2ce)](/\x1b\x1b/g,'\x5c'),_0x4a7d47;},Window_Base[_0x3be230(0x194)][_0x3be230(0x31d)]=function(_0x41c4d9){const _0x3c8d5e=_0x3be230;for(;;){if(_0x41c4d9[_0x3c8d5e(0x1ee)](/\\V\[(\d+)\]/gi)){if(_0x3c8d5e(0x105)===_0x3c8d5e(0x105))_0x41c4d9=_0x41c4d9['replace'](/\\V\[(\d+)\]/gi,(_0x33ba7b,_0x559c71)=>this['convertBackslashCharacters'](String($gameVariables[_0x3c8d5e(0x18c)](parseInt(_0x559c71)))));else{const _0x3a6d87=_0x3c8d5e(0x1a3);_0x5eacf8=_0x3a6d87[_0x3c8d5e(0xac)](_0x145056['iconIndex'],_0x53a038[_0x3c8d5e(0x1d7)]);}}else{if(_0x41c4d9[_0x3c8d5e(0x1ee)](/\x1bV\[(\d+)\]/gi)){if('xoOcC'!==_0x3c8d5e(0x30e)){_0x49ac77=_0x431185[_0x3c8d5e(0x2ce)](_0x3378ac[_0x3c8d5e(0xe0)],''),_0x4207a4=_0x32a605['replace'](_0x226e88[_0x3c8d5e(0x1e0)],''),this['_autoSizeCheck']=!![];const _0x44a35e=this['textSizeEx'](_0x54d1bb);if(_0x5f1ef9){let _0x1bf65a=_0x44a35e[_0x3c8d5e(0x1e4)]+_0x1847c[_0x3c8d5e(0x1b1)]()*0x2+0x6;const _0x42e57c=_0x2b461a[_0x3c8d5e(0x188)]()!=='',_0x2da5ab=_0x6bb996[_0x3c8d5e(0x191)],_0x3d28dc=0x14;_0x1bf65a+=_0x42e57c?_0x2da5ab+_0x3d28dc:0x4;if(_0x1bf65a%0x2!==0x0)_0x1bf65a+=0x1;_0x1fc731[_0x3c8d5e(0x258)](_0x1bf65a);}if(_0x506f80){let _0x374abe=_0x4c6b1a[_0x3c8d5e(0x231)](_0x44a35e[_0x3c8d5e(0x1f6)]/this['lineHeight']());_0x528316[_0x3c8d5e(0x266)](_0x374abe);}this[_0x3c8d5e(0xd5)](),this['_autoSizeCheck']=![],this[_0x3c8d5e(0x146)]=!![];}else _0x41c4d9=_0x41c4d9[_0x3c8d5e(0x2ce)](/\x1bV\[(\d+)\]/gi,(_0x5586fd,_0x271fad)=>this[_0x3c8d5e(0x299)](String($gameVariables['value'](parseInt(_0x271fad)))));}else break;}}return _0x41c4d9;},Window_Base[_0x3be230(0x194)]['preConvertEscapeCharacters']=function(_0x479f03){const _0x900746=_0x3be230;return this[_0x900746(0x2ec)](),_0x479f03;},Window_Base['prototype'][_0x3be230(0xe8)]=function(_0x42164a){return _0x42164a;},Window_Base[_0x3be230(0x194)][_0x3be230(0x2e2)]=function(_0x549101){const _0xaeb1bb=_0x3be230;return _0x549101=_0x549101[_0xaeb1bb(0x2ce)](/<(?:SHOW|HIDE|DISABLE|ENABLE)>/i,''),_0x549101=_0x549101[_0xaeb1bb(0x2ce)](/<(?:SHOW|HIDE|DISABLE|ENABLE)[ ](?:SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i,''),_0x549101=_0x549101['replace'](/<(?:SHOW|HIDE|DISABLE|ENABLE)[ ](?:ALL|ANY)[ ](?:SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i,''),_0x549101;},Window_Base[_0x3be230(0x194)]['convertFontSettingsEscapeCharacters']=function(_0x52b6b6){const _0x326190=_0x3be230;return _0x52b6b6=_0x52b6b6[_0x326190(0x2ce)](/<B>/gi,_0x326190(0x23a)),_0x52b6b6=_0x52b6b6['replace'](/<\/B>/gi,'\x1bBOLD[0]'),_0x52b6b6=_0x52b6b6['replace'](/<I>/gi,_0x326190(0x318)),_0x52b6b6=_0x52b6b6['replace'](/<\/I>/gi,_0x326190(0x228)),_0x52b6b6;},Window_Base[_0x3be230(0x194)][_0x3be230(0x190)]=function(_0x391f0a){const _0x469e42=_0x3be230;return _0x391f0a=_0x391f0a[_0x469e42(0x2ce)](/<LEFT>/gi,_0x469e42(0x29b)),_0x391f0a=_0x391f0a[_0x469e42(0x2ce)](/<\/LEFT>/gi,_0x469e42(0xe1)),_0x391f0a=_0x391f0a[_0x469e42(0x2ce)](/<CENTER>/gi,'\x1bTEXTALIGNMENT[2]'),_0x391f0a=_0x391f0a[_0x469e42(0x2ce)](/<\/CENTER>/gi,'\x1bTEXTALIGNMENT[0]'),_0x391f0a=_0x391f0a[_0x469e42(0x2ce)](/<RIGHT>/gi,_0x469e42(0x33d)),_0x391f0a=_0x391f0a[_0x469e42(0x2ce)](/<\/RIGHT>/gi,'\x1bTEXTALIGNMENT[0]'),_0x391f0a;},Window_Base['prototype'][_0x3be230(0x25e)]=function(_0x37ec96){const _0x97956d=_0x3be230;return _0x37ec96=_0x37ec96[_0x97956d(0x2ce)](/<COLORLOCK>/gi,'\x1bCOLORLOCK[1]'),_0x37ec96=_0x37ec96[_0x97956d(0x2ce)](/<\/COLORLOCK>/gi,'\x1bCOLORLOCK[0]'),_0x37ec96=_0x37ec96['replace'](/\(\(\(/gi,_0x97956d(0xfd)),_0x37ec96=_0x37ec96[_0x97956d(0x2ce)](/\)\)\)/gi,_0x97956d(0x2e3)),_0x37ec96;},Window_Base[_0x3be230(0x194)]['convertBaseEscapeCharacters']=function(_0x585795){const _0x3ff7d4=_0x3be230;return _0x585795=_0x585795[_0x3ff7d4(0x2ce)](/\x1bN\[(\d+)\]/gi,(_0x47dc93,_0x1358da)=>this[_0x3ff7d4(0x32f)](parseInt(_0x1358da))),_0x585795=_0x585795[_0x3ff7d4(0x2ce)](/\x1bP\[(\d+)\]/gi,(_0x3d5fde,_0x3e7ad8)=>this[_0x3ff7d4(0x265)](parseInt(_0x3e7ad8))),_0x585795=_0x585795['replace'](/\x1bG/gi,TextManager[_0x3ff7d4(0x262)]),_0x585795;},Window_Base[_0x3be230(0x194)]['convertHardcodedEscapeReplacements']=function(_0x5cdc8d){const _0x4f0139=_0x3be230;return _0x5cdc8d=_0x5cdc8d['replace'](/\<(?:BATTLE|CURRENT BATTLE) TARGET\>/gi,this['battleTargetName']()),_0x5cdc8d=_0x5cdc8d['replace'](/\<(?:BATTLE|CURRENT BATTLE) (?:USER|SUBJECT)\>/gi,this[_0x4f0139(0xa0)]()),_0x5cdc8d=_0x5cdc8d[_0x4f0139(0x2ce)](/\<(?:BATTLE|CURRENT BATTLE) (?:ITEM|SKILL|ACTION)\>/gi,this['battleActionName'](!![])),_0x5cdc8d=_0x5cdc8d[_0x4f0139(0x2ce)](/\<(?:BATTLE|CURRENT BATTLE) (?:ITEM|SKILL|ACTION) NAME\>/gi,this[_0x4f0139(0x114)](![])),_0x5cdc8d;},Window_Base[_0x3be230(0x194)][_0x3be230(0x21a)]=function(){const _0x3d51c1=_0x3be230;if(!SceneManager[_0x3d51c1(0x21d)]())return'';if(BattleManager[_0x3d51c1(0x2ea)])return BattleManager[_0x3d51c1(0x2ea)][_0x3d51c1(0x1d7)]();if(BattleManager[_0x3d51c1(0x2c1)][0x0])return BattleManager[_0x3d51c1(0x2c1)][0x0][_0x3d51c1(0x1d7)]();return'';},Window_Base[_0x3be230(0x194)][_0x3be230(0xa0)]=function(){const _0x11bc97=_0x3be230;if(!SceneManager[_0x11bc97(0x21d)]())return'';let _0xe4be9=null;return _0xe4be9=BattleManager[_0x11bc97(0x1d5)],!_0xe4be9&&BattleManager[_0x11bc97(0x264)]()&&(_0xe4be9=BattleManager[_0x11bc97(0x126)]()),_0xe4be9?_0xe4be9[_0x11bc97(0x1d7)]():'';},Window_Base[_0x3be230(0x194)]['battleActionName']=function(_0xb5d122){const _0x1d8af8=_0x3be230;if(!SceneManager['isSceneBattle']())return'';let _0x39c320=BattleManager[_0x1d8af8(0x2df)]||null;if(!_0x39c320&&BattleManager[_0x1d8af8(0x264)]()){if('xbrMJ'===_0x1d8af8(0x124))_0x39c320=BattleManager[_0x1d8af8(0x29c)]();else return this[_0x1d8af8(0x2ca)]=_0x5b5bba,'';}if(_0x39c320){let _0x209939='';if(_0xb5d122)_0x209939+=_0x1d8af8(0x291)['format'](_0x39c320[_0x1d8af8(0xe7)]);return _0x209939+=_0x39c320[_0x1d8af8(0x1d7)],_0x209939;}return'';},Window_Base[_0x3be230(0x194)][_0x3be230(0x15b)]=function(_0x222056){const _0x6ab31a=_0x3be230;for(const _0x522638 of VisuMZ[_0x6ab31a(0x24d)]['Settings']['TextCodeActions']){_0x222056[_0x6ab31a(0x1ee)](_0x522638['textCodeCheck'])&&(_0x6ab31a(0xcd)===_0x6ab31a(0x141)?this[_0x2e7345]=_0x36a0b6(this[_0x6ab31a(0x232)][_0x55dda9]):(_0x222056=_0x222056[_0x6ab31a(0x2ce)](_0x522638[_0x6ab31a(0x17c)],_0x522638['textCodeResult']),_0x222056=this[_0x6ab31a(0x31d)](_0x222056)));}return _0x222056;},Window_Base[_0x3be230(0x194)][_0x3be230(0x161)]=function(_0x5dd3f9){const _0x43761f=_0x3be230;for(const _0x2efb69 of VisuMZ['MessageCore'][_0x43761f(0x32c)][_0x43761f(0x2ff)]){_0x5dd3f9[_0x43761f(0x1ee)](_0x2efb69['textCodeCheck'])&&(_0x5dd3f9=_0x5dd3f9[_0x43761f(0x2ce)](_0x2efb69[_0x43761f(0x17c)],_0x2efb69[_0x43761f(0xbf)][_0x43761f(0x202)](this)),_0x5dd3f9=this[_0x43761f(0x31d)](_0x5dd3f9));}return _0x5dd3f9;},Window_Base[_0x3be230(0x194)][_0x3be230(0x32f)]=function(_0x3fa983){const _0x502c65=_0x3be230,_0x459aec=_0x3fa983>=0x1?$gameActors[_0x502c65(0x126)](_0x3fa983):null,_0x3a65cb=_0x459aec?_0x459aec['name']():'',_0x3a8ecf=Number(VisuMZ[_0x502c65(0x24d)]['Settings'][_0x502c65(0x134)]['Actors']);if(this[_0x502c65(0x210)]()&&_0x3a8ecf!==0x0)return _0x502c65(0x236)!==_0x502c65(0x236)?(this[_0x502c65(0xbb)](_0x482edc,!![],!![]),this['processAutoPosition'](_0x502c65(0xbd),_0x14c840(_0x3f14be)||0x0),''):_0x502c65(0x300)[_0x502c65(0xac)](_0x3a8ecf,_0x3a65cb);else{if(_0x502c65(0x212)===_0x502c65(0x212))return _0x3a65cb;else this[_0x502c65(0x2a0)]['fontFace']=_0x45fd7b[_0x502c65(0x259)](),this[_0x502c65(0x2a0)][_0x502c65(0xb7)]=_0xb519e3[_0x502c65(0x2ee)](),this[_0x502c65(0x2a0)][_0x502c65(0x167)]=![],this['contents'][_0x502c65(0x20d)]=![],this[_0x502c65(0x26d)]();}},Window_Base[_0x3be230(0x194)][_0x3be230(0x265)]=function(_0x3715a2){const _0x89e045=_0x3be230,_0x2381e=_0x3715a2>=0x1?$gameParty[_0x89e045(0xa5)]()[_0x3715a2-0x1]:null,_0x4275e9=_0x2381e?_0x2381e['name']():'',_0x321049=Number(VisuMZ[_0x89e045(0x24d)][_0x89e045(0x32c)][_0x89e045(0x134)][_0x89e045(0x1f0)]);return this[_0x89e045(0x210)]()&&_0x321049!==0x0?_0x89e045(0x300)[_0x89e045(0xac)](_0x321049,_0x4275e9):_0x4275e9;},Window_Base[_0x3be230(0x194)][_0x3be230(0x189)]=function(_0x2faead){const _0x3dbc03=_0x3be230;if(this['isAutoColorAffected']()){if(_0x3dbc03(0x203)!=='NHSMV')_0x2faead=this[_0x3dbc03(0xd9)](_0x2faead),_0x2faead=this['processActorNameAutoColorChanges'](_0x2faead);else{const _0x1def1d=_0x6c5e3[_0x3dbc03(0x22a)](',')[_0x3dbc03(0x1cb)](_0xf1f0d5=>_0x28f2cb(_0xf1f0d5)||0x0);if(_0x1def1d[0x0]!==_0x375ab7)this[_0x3dbc03(0x232)]['x']=_0x3d0957(_0x1def1d[0x0]);if(_0x1def1d[0x1]!==_0x12d92f)this[_0x3dbc03(0x232)]['y']=_0x5b0894(_0x1def1d[0x1]);if(_0x1def1d[0x2]!==_0x17ab6c)this[_0x3dbc03(0x232)]['width']=_0x1c9d37(_0x1def1d[0x2]);if(_0x1def1d[0x3]!==_0x30956f)this[_0x3dbc03(0x232)][_0x3dbc03(0x1f6)]=_0x381192(_0x1def1d[0x3]);return'';}}return _0x2faead;},Window_Base[_0x3be230(0x194)][_0x3be230(0xd9)]=function(_0x51742b){const _0x7badfc=_0x3be230;for(autoColor of VisuMZ['MessageCore'][_0x7badfc(0x2ae)]){_0x7badfc(0x17b)!==_0x7badfc(0x17b)?this[_0x7badfc(0x31a)]():_0x51742b=_0x51742b[_0x7badfc(0x2ce)](autoColor[0x0],autoColor[0x1]);}return _0x51742b;},Window_Base[_0x3be230(0x194)][_0x3be230(0x106)]=function(){const _0x39de19=_0x3be230;this[_0x39de19(0x338)]=[];},Window_Base[_0x3be230(0x194)][_0x3be230(0x2ec)]=function(){const _0x4ca06a=_0x3be230;this[_0x4ca06a(0x106)]();const _0x247a6a=VisuMZ[_0x4ca06a(0x24d)][_0x4ca06a(0x32c)][_0x4ca06a(0x134)],_0x3fb240=_0x247a6a[_0x4ca06a(0x1f0)];if(_0x3fb240<=0x0)return;for(const _0x1ab27c of $gameActors['_data']){if(!_0x1ab27c)continue;const _0x13a83e=_0x1ab27c[_0x4ca06a(0x1d7)]();if(_0x13a83e[_0x4ca06a(0x2a4)]()['length']<=0x0)continue;if(/^\d+$/['test'](_0x13a83e))continue;if(_0x13a83e[_0x4ca06a(0x1ee)](/-----/i))continue;let _0x44d807=VisuMZ[_0x4ca06a(0x24d)][_0x4ca06a(0x21e)](_0x13a83e);const _0x1c7987=new RegExp('\x5cb'+_0x44d807+'\x5cb','g'),_0x575c4e=_0x4ca06a(0x300)[_0x4ca06a(0xac)](_0x3fb240,_0x13a83e);this['_autoColorActorNames'][_0x4ca06a(0x316)]([_0x1c7987,_0x575c4e]);}},Window_Base[_0x3be230(0x194)]['processActorNameAutoColorChanges']=function(_0x34457b){const _0x5683fc=_0x3be230;this[_0x5683fc(0x338)]===undefined&&this[_0x5683fc(0x2ec)]();for(autoColor of this[_0x5683fc(0x338)]){_0x34457b=_0x34457b[_0x5683fc(0x2ce)](autoColor[0x0],autoColor[0x1]);}return _0x34457b;},Window_Base[_0x3be230(0x194)][_0x3be230(0x2b5)]=function(_0x57f46b,_0x50bc3f,_0x355c42){const _0x19af74=_0x3be230;if(!_0x57f46b)return'';const _0x3da028=_0x57f46b[_0x50bc3f];let _0x456e3d='';if(_0x3da028&&_0x355c42&&_0x3da028[_0x19af74(0xe7)]){const _0x32c6b8=_0x19af74(0x1a3);_0x456e3d=_0x32c6b8[_0x19af74(0xac)](_0x3da028[_0x19af74(0xe7)],_0x3da028[_0x19af74(0x1d7)]);}else{if(_0x3da028)_0x456e3d=_0x3da028[_0x19af74(0x1d7)];else{if('swgKt'!==_0x19af74(0x18d))_0x456e3d='';else{const _0x2d8f61=_0x1d9664[_0x19af74(0x24d)][_0x19af74(0x32c)][_0x49c538];_0x2d8f61['sort']((_0x38654a,_0xb05c9d)=>{const _0x3f4339=_0x19af74;if(!_0x38654a||!_0xb05c9d)return-0x1;return _0xb05c9d[_0x3f4339(0x235)]['length']-_0x38654a['Match'][_0x3f4339(0xde)];});}}}return this[_0x19af74(0x210)]()&&(_0x19af74(0x274)!==_0x19af74(0x131)?_0x456e3d=this['applyDatabaseAutoColor'](_0x456e3d,_0x57f46b):_0xf67d66[_0x19af74(0xbf)]=new _0xed44c0(_0x19af74(0x242)+_0xd08f59[_0x19af74(0x1d4)][_0x19af74(0x2ce)](/\\/g,'\x1b')+'\x27')),_0x456e3d;},Window_Base[_0x3be230(0x194)][_0x3be230(0x2d8)]=function(_0x3285f1){const _0x4893f8=_0x3be230,_0x2f2d62=$gameParty['getLastGainedItemData']();if(_0x2f2d62['id']<0x0)return'';let _0x5cfa66=null;if(_0x2f2d62[_0x4893f8(0x260)]===0x0)_0x5cfa66=$dataItems[_0x2f2d62['id']];if(_0x2f2d62[_0x4893f8(0x260)]===0x1)_0x5cfa66=$dataWeapons[_0x2f2d62['id']];if(_0x2f2d62['type']===0x2)_0x5cfa66=$dataArmors[_0x2f2d62['id']];if(!_0x5cfa66)return'';return _0x3285f1?_0x4893f8(0x1a3)['format'](_0x5cfa66['iconIndex'],_0x5cfa66[_0x4893f8(0x1d7)]):_0x5cfa66[_0x4893f8(0x1d7)];},Window_Base[_0x3be230(0x194)]['lastGainedObjectQuantity']=function(){const _0x30e4c6=_0x3be230,_0x1009f4=$gameParty[_0x30e4c6(0x1d3)]();if(_0x1009f4['id']<=0x0)return'';return _0x1009f4[_0x30e4c6(0x196)];},Window_Base['prototype'][_0x3be230(0x1e7)]=function(_0x144122,_0x1cb3d8){const _0x15e305=_0x3be230,_0x586e50=VisuMZ[_0x15e305(0x24d)][_0x15e305(0x32c)]['AutoColor'];let _0x3cf744=0x0;if(_0x1cb3d8===$dataActors)_0x3cf744=_0x586e50[_0x15e305(0x1f0)];if(_0x1cb3d8===$dataClasses)_0x3cf744=_0x586e50['Classes'];if(_0x1cb3d8===$dataSkills)_0x3cf744=_0x586e50[_0x15e305(0x209)];if(_0x1cb3d8===$dataItems)_0x3cf744=_0x586e50[_0x15e305(0x206)];if(_0x1cb3d8===$dataWeapons)_0x3cf744=_0x586e50[_0x15e305(0x2e7)];if(_0x1cb3d8===$dataArmors)_0x3cf744=_0x586e50[_0x15e305(0x13a)];if(_0x1cb3d8===$dataEnemies)_0x3cf744=_0x586e50[_0x15e305(0x325)];if(_0x1cb3d8===$dataStates)_0x3cf744=_0x586e50[_0x15e305(0x28f)];return _0x3cf744>0x0&&(_0x15e305(0xe6)!==_0x15e305(0x33c)?_0x144122=_0x15e305(0x300)[_0x15e305(0xac)](_0x3cf744,_0x144122):this[_0x15e305(0xcb)]=_0x22d85a),_0x144122;},Window_Base[_0x3be230(0x194)]['prepareWordWrapEscapeCharacters']=function(_0x1eda12){const _0x1f9b68=_0x3be230;_0x1eda12=_0x1eda12['replace'](/<(?:WORDWRAP|WORD WRAP)>/gi,(_0x387494,_0x27e89c)=>this[_0x1f9b68(0x1b7)](!![])),_0x1eda12=_0x1eda12['replace'](/<(?:NOWORDWRAP|NO WORD WRAP)>/gi,(_0x1906b5,_0x2e79b5)=>this[_0x1f9b68(0x1b7)](![])),_0x1eda12=_0x1eda12[_0x1f9b68(0x2ce)](/<\/(?:WORDWRAP|WORD WRAP)>/gi,(_0x2131e8,_0x50ba34)=>this['setWordWrap'](![]));if(_0x1eda12[_0x1f9b68(0x1ee)](Window_Message[_0x1f9b68(0xe0)]))'JyPaB'!==_0x1f9b68(0x263)?(_0x29cff4(_0x1f9b68(0x10f)[_0x1f9b68(0xac)](_0x3883be,_0x49a937,_0x27ba7b)),_0x5871d2[_0x1f9b68(0xbe)]()):this[_0x1f9b68(0x1b7)](![]);else _0x1eda12['match'](Window_Message[_0x1f9b68(0x1e0)])&&(_0x1f9b68(0x308)===_0x1f9b68(0x149)?this[_0x1f9b68(0x14e)][_0x50016c][_0x1f9b68(0x22b)][0x0]['push'](_0x448378):this[_0x1f9b68(0x1b7)](![]));if(!this[_0x1f9b68(0x214)]())return _0x1eda12;if(_0x1eda12[_0x1f9b68(0xde)]<=0x0)return _0x1eda12;return VisuMZ[_0x1f9b68(0x24d)][_0x1f9b68(0x32c)][_0x1f9b68(0x200)][_0x1f9b68(0x27c)]?'MEgvf'!==_0x1f9b68(0x2c3)?(_0x5530e7['x']=this[_0x1f9b68(0x19f)](_0x4954ed),_0x71151e['MessageCore'][_0x1f9b68(0x32c)][_0x1f9b68(0x322)][_0x1f9b68(0x27f)]&&(_0x4330ad['x']+=_0x847e25[_0x1f9b68(0x1d6)])):(_0x1eda12=_0x1eda12[_0x1f9b68(0x2ce)](/[\n\r]+/g,'\x20'),_0x1eda12=_0x1eda12[_0x1f9b68(0x2ce)](/<(?:BR|LINEBREAK)>/gi,'\x20\x0a')):(_0x1eda12=_0x1eda12['replace'](/[\n\r]+/g,''),_0x1eda12=_0x1eda12[_0x1f9b68(0x2ce)](/<(?:BR|LINEBREAK)>/gi,'\x0a')),_0x1eda12=this['addWrapBreakAfterPunctuation'](_0x1eda12),_0x1eda12=_0x1eda12[_0x1f9b68(0x22a)]('\x20')[_0x1f9b68(0x1b2)](_0x1f9b68(0x159)),_0x1eda12=_0x1eda12['replace'](/<(?:BR|LINEBREAK)>/gi,'\x0a'),_0x1eda12=_0x1eda12[_0x1f9b68(0x2ce)](/<LINE\x1bWrapBreak[0]BREAK>/gi,'\x0a'),_0x1eda12;},Window_Base[_0x3be230(0x194)][_0x3be230(0x2be)]=function(_0x4cfcdb){return _0x4cfcdb;},VisuMZ['MessageCore'][_0x3be230(0x1e8)]=Window_Base[_0x3be230(0x194)][_0x3be230(0x1b3)],Window_Base[_0x3be230(0x194)]['processNewLine']=function(_0x2f6757){const _0x4c90e1=_0x3be230;VisuMZ[_0x4c90e1(0x24d)][_0x4c90e1(0x1e8)][_0x4c90e1(0x2d7)](this,_0x2f6757),this[_0x4c90e1(0x321)](_0x2f6757);},VisuMZ[_0x3be230(0x24d)][_0x3be230(0xf6)]=Window_Base[_0x3be230(0x194)][_0x3be230(0x29f)],Window_Base['prototype'][_0x3be230(0x29f)]=function(_0x59c1a4,_0x25ebd4){const _0x51e650=_0x3be230;VisuMZ[_0x51e650(0x24d)][_0x51e650(0xf6)][_0x51e650(0x2d7)](this,_0x59c1a4,_0x25ebd4),_0x25ebd4===_0x51e650(0x159)&&this[_0x51e650(0x331)](_0x59c1a4);},Window_Base[_0x3be230(0x194)][_0x3be230(0x169)]=function(_0x5667c3){const _0x4c3969=_0x3be230;var _0x614250=/^\<(.*?)\>/[_0x4c3969(0xb4)](_0x5667c3[_0x4c3969(0xaa)][_0x4c3969(0xbc)](_0x5667c3[_0x4c3969(0x2a3)]));return _0x614250?'Sdnri'!==_0x4c3969(0x1bd)?(_0x5667c3['index']+=_0x614250[0x0][_0x4c3969(0xde)],String(_0x614250[0x0][_0x4c3969(0xbc)](0x1,_0x614250[0x0]['length']-0x1))):_0xa08b38:'';},VisuMZ[_0x3be230(0x24d)][_0x3be230(0x115)]=Window_Base['prototype'][_0x3be230(0x1ab)],Window_Base[_0x3be230(0x194)][_0x3be230(0x1ab)]=function(_0x4166cb,_0x2466ad){const _0x24c259=_0x3be230;switch(_0x4166cb){case'C':if(_0x2466ad[_0x24c259(0x1f8)]){if(_0x24c259(0x24a)===_0x24c259(0x1c2))return this[_0x24c259(0xbb)](_0x3aff7c,!![],!![]),this['processAutoPosition'](_0x24c259(0x337),_0x2f042b(_0x32a02e)||0x0),'';else VisuMZ[_0x24c259(0x24d)]['Window_Base_processEscapeCharacter'][_0x24c259(0x2d7)](this,_0x4166cb,_0x2466ad);}else{if('ifIeX'!==_0x24c259(0x2c6))return _0x42baad[_0x24c259(0x2bb)]&&_0x5c4ddc[_0x24c259(0xff)][_0x24c259(0x1e6)]('['+_0x1c3f4a+']');else this[_0x24c259(0x19f)](_0x2466ad);}break;case'I':case'{':case'}':VisuMZ[_0x24c259(0x24d)]['Window_Base_processEscapeCharacter']['call'](this,_0x4166cb,_0x2466ad);break;case'FS':this[_0x24c259(0x28a)](_0x2466ad);break;case'PX':this[_0x24c259(0x19e)](_0x2466ad);break;case'PY':this['processPyTextCode'](_0x2466ad);break;case'BOLD':this['processFontChangeBold'](this[_0x24c259(0x19f)](_0x2466ad));break;case _0x24c259(0x253):this[_0x24c259(0x1a1)](_0x2466ad);break;case _0x24c259(0x297):this[_0x24c259(0x162)](_0x2466ad);break;case _0x24c259(0x2cd):this[_0x24c259(0xe5)](_0x2466ad);break;case _0x24c259(0x2d6):this['processFontChangeItalic'](this[_0x24c259(0x19f)](_0x2466ad));break;case _0x24c259(0x145):this['processDrawPicture'](_0x2466ad);break;case'PREVCOLOR':this[_0x24c259(0xb9)](_0x2466ad);break;case'TEXTALIGNMENT':this['processTextAlignmentChange'](_0x2466ad);break;case'WAIT':this[_0x24c259(0x1fe)](_0x2466ad);break;case _0x24c259(0x127):this[_0x24c259(0x331)](_0x2466ad);break;default:this[_0x24c259(0x109)](_0x4166cb,_0x2466ad);}},Window_Base[_0x3be230(0x194)]['processMessageCoreEscapeActions']=function(_0x32bf57,_0x21b582){const _0x5bebae=_0x3be230;for(const _0x2513ea of VisuMZ['MessageCore']['Settings'][_0x5bebae(0x1f1)]){if(_0x5bebae(0x1c7)===_0x5bebae(0x2c2))_0x1e789c[_0x5bebae(0xe3)](_0x4eccc6);else{if(_0x2513ea['Match']===_0x32bf57){if(_0x2513ea[_0x5bebae(0x296)]==='')this[_0x5bebae(0x19f)](_0x21b582);_0x2513ea[_0x5bebae(0xf4)]['call'](this,_0x21b582);if(this[_0x5bebae(0xd0)]===Window_Message){if('rIfDw'!==_0x5bebae(0x213)){_0x2ef301[_0x5bebae(0x20e)](_0x2edf0c,_0x2174b7);const _0x27b70c=_0x1ecf4d[_0x5bebae(0x303)]||_0x160116['getMessageWindowRows']()||0x1,_0x9033d1=_0x3d8275[_0x5bebae(0x11a)]||_0x1ddcc4['getMessageWindowWidth']()||0x1;_0xb3e3f3[_0x5bebae(0x2eb)]=_0x2f8945[_0x5bebae(0xd3)]||![];const _0x14c05a=_0x51f3ce['WordWrap'][_0x5bebae(0x12b)]();_0x2cf3f6[_0x5bebae(0x266)](_0x27b70c),_0x5b2cee[_0x5bebae(0x258)](_0x9033d1);[_0x5bebae(0x328),_0x5bebae(0x2bd)][_0x5bebae(0x1e6)](_0x14c05a)&&_0x534cb8[_0x5bebae(0x123)](_0xbf91f(_0x14c05a));const _0x306568=_0x54df26['_scene']['_messageWindow'];_0x306568&&(_0x306568[_0x5bebae(0x26f)](),_0x306568[_0x5bebae(0x1ba)](),_0x306568['createContents']());}else{const _0x1696d2=_0x2513ea[_0x5bebae(0x119)]||0x0;if(_0x1696d2>0x0)this[_0x5bebae(0x155)](_0x1696d2);}}}}}},Window_Base['prototype'][_0x3be230(0x1e9)]=function(){const _0x12777a=_0x3be230;this['contents'][_0x12777a(0xb7)]+=VisuMZ[_0x12777a(0x24d)]['Settings'][_0x12777a(0x322)]['FontChangeValue'],this[_0x12777a(0x2a0)]['fontSize']=Math[_0x12777a(0x132)](this[_0x12777a(0x2a0)][_0x12777a(0xb7)],VisuMZ['MessageCore'][_0x12777a(0x32c)]['General']['FontBiggerCap']);},Window_Base['prototype'][_0x3be230(0x31a)]=function(){const _0x1267d8=_0x3be230;this[_0x1267d8(0x2a0)][_0x1267d8(0xb7)]-=VisuMZ[_0x1267d8(0x24d)][_0x1267d8(0x32c)]['General'][_0x1267d8(0xb8)],this[_0x1267d8(0x2a0)][_0x1267d8(0xb7)]=Math[_0x1267d8(0x2d2)](this[_0x1267d8(0x2a0)][_0x1267d8(0xb7)],VisuMZ[_0x1267d8(0x24d)][_0x1267d8(0x32c)][_0x1267d8(0x322)][_0x1267d8(0x185)]);},Window_Base['prototype'][_0x3be230(0x28a)]=function(_0x5ab138){const _0x19f26a=_0x3be230,_0x43cadd=this[_0x19f26a(0x19f)](_0x5ab138);this[_0x19f26a(0x2a0)][_0x19f26a(0xb7)]=_0x43cadd[_0x19f26a(0xf5)](VisuMZ['MessageCore'][_0x19f26a(0x32c)]['General'][_0x19f26a(0x185)],VisuMZ[_0x19f26a(0x24d)][_0x19f26a(0x32c)][_0x19f26a(0x322)][_0x19f26a(0x280)]);},Window_Base[_0x3be230(0x194)]['maxFontSizeInLine']=function(_0x486214){const _0x3067be=_0x3be230;let _0x36ad63=this[_0x3067be(0x2a0)][_0x3067be(0xb7)];const _0x3ebed0=/\x1b({|}|FS)(\[(\d+)])?/gi;for(;;){if('fuYSW'!==_0x3067be(0x2de)){const _0x5e3380=_0x3ebed0[_0x3067be(0xb4)](_0x486214);if(!_0x5e3380){if(_0x3067be(0x22f)===_0x3067be(0x22f))break;else{const _0x41e9b8=_0x47ed47[_0x3067be(0x133)]('['+_0x47bf21['$1'][_0x3067be(0x1ee)](/\d+/g)+']');for(const _0x2e5691 of _0x41e9b8){if(!_0x186d49[_0x3067be(0x18c)](_0x2e5691))return!![];}return![];}}const _0x46f2ba=String(_0x5e3380[0x1])['toUpperCase']();if(_0x46f2ba==='{')this[_0x3067be(0x1e9)]();else{if(_0x46f2ba==='}'){if('umQLQ'==='umQLQ')this[_0x3067be(0x31a)]();else{var _0x190a69=/^\<(.*?)\>/[_0x3067be(0xb4)](_0x1f5b35[_0x3067be(0xaa)][_0x3067be(0xbc)](_0x12eea8[_0x3067be(0x2a3)]));return _0x190a69?(_0xd50add[_0x3067be(0x2a3)]+=_0x190a69[0x0][_0x3067be(0xde)],_0x217e37(_0x190a69[0x0][_0x3067be(0xbc)](0x1,_0x190a69[0x0][_0x3067be(0xde)]-0x1))):'';}}else{if(_0x46f2ba==='FS'){if(_0x3067be(0x2fa)!=='OlvSC')return this[_0x3067be(0x2ca)];else this[_0x3067be(0x2a0)][_0x3067be(0xb7)]=parseInt(_0x5e3380[0x3])[_0x3067be(0xf5)](VisuMZ[_0x3067be(0x24d)][_0x3067be(0x32c)]['General'][_0x3067be(0x185)],VisuMZ[_0x3067be(0x24d)][_0x3067be(0x32c)][_0x3067be(0x322)][_0x3067be(0x280)]);}}}this[_0x3067be(0x2a0)]['fontSize']>_0x36ad63&&(_0x36ad63=this['contents'][_0x3067be(0xb7)]);}else return![];}return _0x36ad63;},Window_Base[_0x3be230(0x194)][_0x3be230(0x19e)]=function(_0x294bf8){const _0xfc9b82=_0x3be230;_0x294bf8['x']=this[_0xfc9b82(0x19f)](_0x294bf8),VisuMZ[_0xfc9b82(0x24d)][_0xfc9b82(0x32c)]['General']['RelativePXPY']&&(_0x294bf8['x']+=_0x294bf8[_0xfc9b82(0x1d6)]);},Window_Base[_0x3be230(0x194)][_0x3be230(0xf7)]=function(_0x54a6bb){const _0x1f5d07=_0x3be230;_0x54a6bb['y']=this['obtainEscapeParam'](_0x54a6bb),VisuMZ[_0x1f5d07(0x24d)][_0x1f5d07(0x32c)]['General'][_0x1f5d07(0x27f)]&&(_0x54a6bb['y']+=_0x54a6bb[_0x1f5d07(0x1d8)]);},Window_Base[_0x3be230(0x194)][_0x3be230(0x24b)]=function(_0x160a52){const _0x50f775=_0x3be230;this[_0x50f775(0x2a0)]['fontBold']=!!_0x160a52;},Window_Base[_0x3be230(0x194)][_0x3be230(0x10e)]=function(_0xed0a21){this['contents']['fontItalic']=!!_0xed0a21;},Window_Base[_0x3be230(0x194)][_0x3be230(0x1de)]=function(_0x41b56f){const _0x4cc076=_0x3be230,_0xc7a306=this[_0x4cc076(0x19f)](_0x41b56f);if(!_0x41b56f[_0x4cc076(0x1f8)])return;switch(_0xc7a306){case 0x0:this['setTextAlignment'](_0x4cc076(0x256));return;case 0x1:this['setTextAlignment'](_0x4cc076(0x2d9));break;case 0x2:this[_0x4cc076(0x30f)](_0x4cc076(0x1c8));break;case 0x3:this[_0x4cc076(0x30f)]('right');break;}this[_0x4cc076(0x321)](_0x41b56f);},Window_Base[_0x3be230(0x194)][_0x3be230(0x321)]=function(_0x4d672a){const _0xde4f04=_0x3be230;if(!_0x4d672a[_0xde4f04(0x1f8)])return;if(_0x4d672a['rtl'])return;if(this['getTextAlignment']()==='default')return;let _0x5eb9b1=_0x4d672a[_0xde4f04(0xaa)][_0xde4f04(0x2b9)](_0xde4f04(0x110),_0x4d672a['index']+0x1),_0x2890a5=_0x4d672a[_0xde4f04(0xaa)][_0xde4f04(0x2b9)]('\x0a',_0x4d672a['index']+0x1);if(_0x5eb9b1<0x0)_0x5eb9b1=_0x4d672a[_0xde4f04(0xaa)][_0xde4f04(0xde)]+0x1;if(_0x2890a5>0x0)_0x5eb9b1=Math[_0xde4f04(0x132)](_0x5eb9b1,_0x2890a5);const _0x4d6ed2=_0x4d672a[_0xde4f04(0xaa)][_0xde4f04(0xf3)](_0x4d672a[_0xde4f04(0x2a3)],_0x5eb9b1),_0x49468d=this[_0xde4f04(0x2fc)](_0x4d6ed2)['width'],_0xaf9c8e=_0x4d672a[_0xde4f04(0x1e4)]||this['innerWidth']-0x8,_0x21b976=this[_0xde4f04(0xd0)]===Window_Message&&$gameMessage[_0xde4f04(0x188)]()!=='';switch(this[_0xde4f04(0x2a9)]()){case'left':_0x4d672a['x']=_0x4d672a[_0xde4f04(0x1d6)];break;case _0xde4f04(0x1c8):_0x4d672a['x']=_0x4d672a[_0xde4f04(0x1d6)],_0x4d672a['x']+=Math[_0xde4f04(0xea)]((_0xaf9c8e-_0x49468d)/0x2);if(_0x21b976){if(_0xde4f04(0x12f)==='xeHrv')return'';else _0x4d672a['x']-=_0x4d672a['startX']/0x2;}break;case _0xde4f04(0xed):_0x4d672a['x']=_0xaf9c8e-_0x49468d+_0x4d672a[_0xde4f04(0x1d6)];if(_0x21b976){if(_0xde4f04(0x143)!=='eEjZf')return _0x1d19af[this['_commonEventId']];else _0x4d672a['x']-=_0x4d672a[_0xde4f04(0x1d6)];}break;}},Window_Base['prototype'][_0x3be230(0x2fc)]=function(_0x1cb285){const _0x113846=_0x3be230;_0x1cb285=_0x1cb285['replace'](/\x1b!/g,''),_0x1cb285=_0x1cb285[_0x113846(0x2ce)](/\x1b\|/g,''),_0x1cb285=_0x1cb285['replace'](/\x1b\./g,'');const _0x5cb417=this['createTextState'](_0x1cb285,0x0,0x0,0x0),_0xd56255=this[_0x113846(0x237)]();return _0x5cb417['drawing']=![],this[_0x113846(0x16a)](_0x5cb417),this['returnPreservedFontSettings'](_0xd56255),{'width':_0x5cb417[_0x113846(0x2e5)],'height':_0x5cb417[_0x113846(0x2e6)]};},Window_Base[_0x3be230(0x2dc)]=VisuMZ[_0x3be230(0x24d)]['Settings']['WordWrap'][_0x3be230(0xc3)]||0x0,Window_Base[_0x3be230(0x194)][_0x3be230(0x331)]=function(_0x1d3ed8){const _0x52b0fc=_0x3be230,_0xdb2dc6=(_0x1d3ed8['rtl']?-0x1:0x1)*this[_0x52b0fc(0x255)]('\x20');_0x1d3ed8['x']+=_0xdb2dc6;if(this[_0x52b0fc(0x19f)](_0x1d3ed8)>0x0)_0x1d3ed8['x']+=_0xdb2dc6;if(_0x1d3ed8['rtl'])return;let _0x4f3809=_0x1d3ed8[_0x52b0fc(0xaa)][_0x52b0fc(0x2b9)]('\x1bWrapBreak[0]',_0x1d3ed8[_0x52b0fc(0x2a3)]+0x1),_0x41e557=_0x1d3ed8[_0x52b0fc(0xaa)][_0x52b0fc(0x2b9)]('\x0a',_0x1d3ed8[_0x52b0fc(0x2a3)]+0x1);if(_0x4f3809<0x0)_0x4f3809=_0x1d3ed8[_0x52b0fc(0xaa)][_0x52b0fc(0xde)]+0x1;if(_0x41e557>0x0)_0x4f3809=Math[_0x52b0fc(0x132)](_0x4f3809,_0x41e557);const _0xa4c094=_0x1d3ed8[_0x52b0fc(0xaa)][_0x52b0fc(0xf3)](_0x1d3ed8['index'],_0x4f3809),_0x302b36=this[_0x52b0fc(0x309)](_0xa4c094)['width'];let _0x41a537=_0x1d3ed8[_0x52b0fc(0x1e4)]||this[_0x52b0fc(0x144)];_0x41a537-=Window_Base[_0x52b0fc(0x2dc)];if(this['constructor']===Window_Message){const _0x92e258=$gameMessage['faceName']()===''?0x0:ImageManager[_0x52b0fc(0x191)]+0x14;_0x41a537-=_0x92e258,VisuMZ[_0x52b0fc(0x24d)]['Settings'][_0x52b0fc(0x200)][_0x52b0fc(0x1ad)]&&(_0x41a537-=_0x92e258);}let _0x4ff3c6=![];if(_0x1d3ed8['x']+_0x302b36>_0x1d3ed8['startX']+_0x41a537)_0x4ff3c6=!![];if(_0x302b36===0x0)_0x4ff3c6=!![];_0x4ff3c6&&(_0x52b0fc(0x21f)===_0x52b0fc(0x21f)?_0x1d3ed8[_0x52b0fc(0xaa)]=_0x1d3ed8[_0x52b0fc(0xaa)][_0x52b0fc(0xbc)](0x0,_0x1d3ed8[_0x52b0fc(0x2a3)])+'\x0a'+_0x1d3ed8[_0x52b0fc(0xaa)][_0x52b0fc(0x1cd)](_0x1d3ed8['index']):this[_0x52b0fc(0x125)](...arguments));},Window_Base[_0x3be230(0x194)][_0x3be230(0x309)]=function(_0x4dbc44){const _0x34af12=_0x3be230,_0x2b4a52=this[_0x34af12(0xdd)](_0x4dbc44,0x0,0x0,0x0),_0x326e98=this['getPreservedFontSettings']();return _0x2b4a52[_0x34af12(0x1f8)]=![],this[_0x34af12(0x1b7)](![]),this[_0x34af12(0x16a)](_0x2b4a52),this['setWordWrap'](!![]),this[_0x34af12(0xa6)](_0x326e98),{'width':_0x2b4a52[_0x34af12(0x2e5)],'height':_0x2b4a52[_0x34af12(0x2e6)]};},Window_Base[_0x3be230(0x194)][_0x3be230(0xe5)]=function(_0x30237){const _0x2c6e13=_0x3be230;return this[_0x2c6e13(0x19f)](_0x30237);},Window_Base[_0x3be230(0x194)][_0x3be230(0x2f3)]=function(_0xf6889c){const _0x28a386=_0x3be230,_0x5fca9f=this[_0x28a386(0x169)](_0xf6889c)[_0x28a386(0x22a)](',');if(!_0xf6889c['drawing'])return;const _0xbbc81b=_0x5fca9f[0x0]['trim'](),_0x344bdf=_0x5fca9f[0x1]||0x0,_0x48e9ce=_0x5fca9f[0x2]||0x0,_0x25eb2c=ImageManager[_0x28a386(0x193)](_0xbbc81b),_0x596ee8=this['contents'][_0x28a386(0x179)];_0x25eb2c[_0x28a386(0x1c6)](this['drawBackPicture']['bind'](this,_0x25eb2c,_0xf6889c['x'],_0xf6889c['y'],_0x344bdf,_0x48e9ce,_0x596ee8));},Window_Base[_0x3be230(0x194)][_0x3be230(0x1a8)]=function(_0x4af795,_0x28f658,_0x200a7d,_0x2ff37c,_0x3241ce,_0x1e9d3b){const _0x104de8=_0x3be230;_0x2ff37c=_0x2ff37c||_0x4af795['width'],_0x3241ce=_0x3241ce||_0x4af795[_0x104de8(0x1f6)],this[_0x104de8(0xd1)][_0x104de8(0x179)]=_0x1e9d3b,this[_0x104de8(0xd1)][_0x104de8(0x293)](_0x4af795,0x0,0x0,_0x4af795[_0x104de8(0x1e4)],_0x4af795['height'],_0x28f658,_0x200a7d,_0x2ff37c,_0x3241ce),this['contentsBack'][_0x104de8(0x179)]=0xff;},Window_Base['prototype'][_0x3be230(0x1a1)]=function(_0x546ff0){const _0x45d1c7=_0x3be230,_0x434af4=this['obtainEscapeString'](_0x546ff0)['split'](',');if(!_0x546ff0['drawing'])return;const _0x14b6d2=_0x434af4[0x0][_0x45d1c7(0x2a4)](),_0x3eccfd=ImageManager[_0x45d1c7(0x193)](_0x14b6d2),_0x4932ab=JsonEx['makeDeepCopy'](_0x546ff0),_0x5df76e=this[_0x45d1c7(0x2a0)]['paintOpacity'];_0x3eccfd['addLoadListener'](this[_0x45d1c7(0xe4)][_0x45d1c7(0x202)](this,_0x3eccfd,_0x4932ab,_0x5df76e));},Window_Base['prototype']['drawBackCenteredPicture']=function(_0x10342b,_0x4efbed,_0x29288f){const _0x18c90d=_0x3be230,_0x1286b4=_0x4efbed[_0x18c90d(0x1e4)]||this[_0x18c90d(0x144)],_0x491191=this['_index']!==undefined?this['itemHeight']():this[_0x18c90d(0xcf)],_0xe48d54=_0x1286b4/_0x10342b[_0x18c90d(0x1e4)],_0x53d019=_0x491191/_0x10342b[_0x18c90d(0x1f6)],_0x34de1b=Math[_0x18c90d(0x132)](_0xe48d54,_0x53d019,0x1),_0x3f15b2=this[_0x18c90d(0x27e)]!==undefined?(this['itemRectWithPadding'](0x0)[_0x18c90d(0x1f6)]-this[_0x18c90d(0x21c)]())/0x2:0x0,_0x585a49=_0x10342b[_0x18c90d(0x1e4)]*_0x34de1b,_0x163899=_0x10342b[_0x18c90d(0x1f6)]*_0x34de1b,_0x521456=Math[_0x18c90d(0xea)]((_0x1286b4-_0x585a49)/0x2)+_0x4efbed[_0x18c90d(0x1d6)],_0x38b050=Math['floor']((_0x491191-_0x163899)/0x2)+_0x4efbed[_0x18c90d(0x1d8)]-_0x3f15b2*0x2;this[_0x18c90d(0xd1)][_0x18c90d(0x179)]=_0x29288f,this[_0x18c90d(0xd1)][_0x18c90d(0x293)](_0x10342b,0x0,0x0,_0x10342b['width'],_0x10342b['height'],_0x521456,_0x38b050,_0x585a49,_0x163899),this[_0x18c90d(0xd1)][_0x18c90d(0x179)]=0xff;},Window_Base['prototype']['processColorLock']=function(_0x16ebab){const _0x3206cd=_0x3be230,_0x162906=this['obtainEscapeParam'](_0x16ebab);if(_0x16ebab[_0x3206cd(0x1f8)])this[_0x3206cd(0x1a0)](_0x162906>0x0);},Window_Base[_0x3be230(0x194)][_0x3be230(0x1fe)]=function(_0x5be7eb){const _0x4b2954=_0x3be230,_0x45118c=this[_0x4b2954(0x19f)](_0x5be7eb);if(this[_0x4b2954(0xd0)]===Window_Message&&_0x5be7eb[_0x4b2954(0x1f8)]){if(_0x4b2954(0x28e)!==_0x4b2954(0x28e)){const _0x2b9033=_0x1aa95b[_0x4b2954(0x133)]('['+_0x1ee5e7['$1'][_0x4b2954(0x1ee)](/\d+/g)+']');for(const _0x27510b of _0x2b9033){if(!_0x30e0bf[_0x4b2954(0x18c)](_0x27510b))return!![];}return![];}else this[_0x4b2954(0x23e)](_0x45118c);}},Window_Help['prototype'][_0x3be230(0x26f)]=function(){const _0x1c9547=_0x3be230;this[_0x1c9547(0x1b7)]($gameSystem['isHelpWindowWordWrap']());},Window_Help[_0x3be230(0x194)][_0x3be230(0x210)]=function(){return!![];},VisuMZ[_0x3be230(0x24d)][_0x3be230(0xec)]=Window_Help[_0x3be230(0x194)]['refresh'],Window_Help[_0x3be230(0x194)][_0x3be230(0x277)]=function(){const _0x14e4a2=_0x3be230;this['clearActorNameAutoColor'](),VisuMZ['MessageCore']['Window_Help_refresh'][_0x14e4a2(0x2d7)](this),this[_0x14e4a2(0x26f)]();},VisuMZ[_0x3be230(0x24d)][_0x3be230(0x1ea)]=Window_Options[_0x3be230(0x194)][_0x3be230(0x14f)],Window_Options[_0x3be230(0x194)][_0x3be230(0x14f)]=function(){const _0xa355c5=_0x3be230;VisuMZ[_0xa355c5(0x24d)]['Window_Options_addGeneralOptions'][_0xa355c5(0x2d7)](this),this[_0xa355c5(0x270)]();},Window_Options[_0x3be230(0x194)][_0x3be230(0x270)]=function(){const _0x594d67=_0x3be230;VisuMZ[_0x594d67(0x24d)]['Settings']['TextSpeed'][_0x594d67(0x108)]&&this['addMessageCoreTextSpeedCommand']();},Window_Options[_0x3be230(0x194)][_0x3be230(0x27b)]=function(){const _0x29fad3=_0x3be230,_0x3f197f=TextManager[_0x29fad3(0xd2)],_0x156315='textSpeed';this[_0x29fad3(0x11c)](_0x3f197f,_0x156315);},VisuMZ[_0x3be230(0x24d)][_0x3be230(0x302)]=Window_Options[_0x3be230(0x194)]['statusText'],Window_Options[_0x3be230(0x194)]['statusText']=function(_0x3e2c3a){const _0x1f7727=_0x3be230,_0x39c7bd=this[_0x1f7727(0x339)](_0x3e2c3a);if(_0x39c7bd===_0x1f7727(0x273))return this['textSpeedStatusText']();return VisuMZ[_0x1f7727(0x24d)]['Window_Options_statusText'][_0x1f7727(0x2d7)](this,_0x3e2c3a);},VisuMZ[_0x3be230(0x24d)][_0x3be230(0x234)]=Window_Options[_0x3be230(0x194)][_0x3be230(0x2a1)],Window_Options['prototype']['isVolumeSymbol']=function(_0xebbb){const _0x351855=_0x3be230;if(_0xebbb==='textSpeed')return!![];return VisuMZ[_0x351855(0x24d)][_0x351855(0x234)]['call'](this,_0xebbb);},Window_Options['prototype'][_0x3be230(0x154)]=function(){const _0x10475b=_0x3be230,_0x4da28c=this[_0x10475b(0x14b)](_0x10475b(0x273));if(_0x4da28c>0xa){if(_0x10475b(0x15f)!==_0x10475b(0x15f)){var _0x286146=_0x18fbc7[_0x10475b(0x22b)][0x1]+_0x311b63;this[_0x10475b(0x14e)][_0x4e4d43][_0x10475b(0x22b)][0x1]=_0x286146;}else return TextManager[_0x10475b(0x2da)];}else return _0x4da28c;},VisuMZ[_0x3be230(0x24d)][_0x3be230(0x1b6)]=Window_Options[_0x3be230(0x194)][_0x3be230(0xe9)],Window_Options[_0x3be230(0x194)]['changeVolume']=function(_0x4526c7,_0x217280,_0x3ef163){const _0x4e08e6=_0x3be230;if(_0x4526c7===_0x4e08e6(0x273))return this[_0x4e08e6(0x2f0)](_0x4526c7,_0x217280,_0x3ef163);VisuMZ[_0x4e08e6(0x24d)][_0x4e08e6(0x1b6)][_0x4e08e6(0x2d7)](this,_0x4526c7,_0x217280,_0x3ef163);},Window_Options['prototype'][_0x3be230(0x2f0)]=function(_0x37f029,_0x228de0,_0x1e25d0){const _0x392195=_0x3be230,_0x104bd3=this[_0x392195(0x14b)](_0x37f029),_0x3de6bb=0x1,_0x5da5fb=_0x104bd3+(_0x228de0?_0x3de6bb:-_0x3de6bb);if(_0x5da5fb>0xb&&_0x1e25d0){if(_0x392195(0x137)===_0x392195(0x137))this[_0x392195(0x25b)](_0x37f029,0x1);else{if(!_0x4037a9['value'](_0x5649c6))return!![];}}else{if('YtVCs'===_0x392195(0xaf)){if(_0x215a61[_0x392195(0x22b)][0x1]>=0x0){var _0x23ffa0=_0x3596c3[_0x392195(0x22b)][0x1]+_0x3d771a;this['_list'][_0x219b9f][_0x392195(0x22b)][0x1]=_0x23ffa0;}else _0x56eba8['parameters'][0x1]===-0x2&&(this['_list'][_0x2a8012]['parameters'][0x1]=_0x46553d[_0x392195(0x22b)][0x1]);}else this[_0x392195(0x25b)](_0x37f029,_0x5da5fb[_0x392195(0xf5)](0x1,0xb));}},Window_Message[_0x3be230(0x194)][_0x3be230(0x1ac)]=function(){const _0x5cc6b2=_0x3be230;Window_Base[_0x5cc6b2(0x194)]['refreshDimmerBitmap'][_0x5cc6b2(0x2d7)](this),VisuMZ[_0x5cc6b2(0x24d)]['Settings'][_0x5cc6b2(0x322)][_0x5cc6b2(0xb0)]&&this[_0x5cc6b2(0x170)]();},Window_Message[_0x3be230(0x194)][_0x3be230(0x170)]=function(){const _0x32d427=_0x3be230;this[_0x32d427(0x140)]['x']=Math[_0x32d427(0xf2)](this['width']/0x2),this[_0x32d427(0x140)]['anchor']['x']=0.5,this[_0x32d427(0x140)][_0x32d427(0xf9)]['x']=Graphics[_0x32d427(0x1e4)];},VisuMZ[_0x3be230(0x24d)][_0x3be230(0x20b)]=Window_Message[_0x3be230(0x194)]['clearFlags'],Window_Message[_0x3be230(0x194)]['clearFlags']=function(){const _0x15a341=_0x3be230;VisuMZ[_0x15a341(0x24d)][_0x15a341(0x20b)][_0x15a341(0x2d7)](this),this[_0x15a341(0x106)](),this['resetWordWrap'](),this[_0x15a341(0x1a0)](![]),this[_0x15a341(0x30f)](_0x15a341(0x256)),this[_0x15a341(0x177)](VisuMZ[_0x15a341(0x24d)][_0x15a341(0x32c)][_0x15a341(0x322)]['MessageTextDelay']);},Window_Message['prototype'][_0x3be230(0x26f)]=function(){const _0x477dcc=_0x3be230;this['setWordWrap']($gameSystem[_0x477dcc(0x25a)]());},Window_Message['prototype'][_0x3be230(0x210)]=function(){return!![];},Window_Message['prototype'][_0x3be230(0x177)]=function(_0x8c01b1){const _0x4173bb=_0x3be230,_0x59d364=0xb-ConfigManager[_0x4173bb(0x273)];_0x8c01b1=Math[_0x4173bb(0xf2)](_0x8c01b1*_0x59d364),this[_0x4173bb(0x32e)]=_0x8c01b1,this[_0x4173bb(0x31c)]=_0x8c01b1;},VisuMZ['MessageCore'][_0x3be230(0x284)]=Window_Message[_0x3be230(0x194)][_0x3be230(0x249)],Window_Message[_0x3be230(0x194)][_0x3be230(0x249)]=function(){const _0x4782ef=_0x3be230;return VisuMZ[_0x4782ef(0x24d)][_0x4782ef(0x284)][_0x4782ef(0x2d7)](this)||Input[_0x4782ef(0x1c5)](VisuMZ[_0x4782ef(0x24d)]['Settings'][_0x4782ef(0x322)]['FastForwardKey']);},VisuMZ[_0x3be230(0x24d)]['Window_Message_updatePlacement']=Window_Message[_0x3be230(0x194)][_0x3be230(0x30a)],Window_Message[_0x3be230(0x194)][_0x3be230(0x30a)]=function(){const _0x34f4f9=_0x3be230;let _0x30e233=this['y'];VisuMZ['MessageCore'][_0x34f4f9(0xc2)][_0x34f4f9(0x2d7)](this);if(this[_0x34f4f9(0x333)])this['y']=_0x30e233;this['updateForcedPlacement'](),this[_0x34f4f9(0x1f7)]();},VisuMZ[_0x3be230(0x24d)][_0x3be230(0xee)]=Window_Message[_0x3be230(0x194)][_0x3be230(0x1dd)],Window_Message['prototype'][_0x3be230(0x1dd)]=function(_0x4660a3){const _0x180328=_0x3be230;this[_0x180328(0x1e1)](_0x4660a3),VisuMZ[_0x180328(0x24d)][_0x180328(0xee)][_0x180328(0x2d7)](this,_0x4660a3),this[_0x180328(0x205)]();},Window_Message[_0x3be230(0x194)]['onNewPageMessageCore']=function(_0xeac40f){const _0x83ed02=_0x3be230;this['prepareForcedPositionEscapeCharacters'](_0xeac40f),this[_0x83ed02(0x1fa)](_0xeac40f),this['updateDimensions']();},VisuMZ[_0x3be230(0x24d)]['Window_Message_terminateMessage']=Window_Message[_0x3be230(0x194)][_0x3be230(0x2ed)],Window_Message[_0x3be230(0x194)]['terminateMessage']=function(){const _0x110647=_0x3be230;VisuMZ[_0x110647(0x24d)][_0x110647(0xf1)][_0x110647(0x2d7)](this),this[_0x110647(0x25d)]();if(this['_messagePositionReset'])this[_0x110647(0x301)]();},Window_Message[_0x3be230(0x194)]['updateDimensions']=function(){const _0x4a43d0=_0x3be230;this[_0x4a43d0(0x1e4)]=$gameSystem['getMessageWindowWidth']()+this[_0x4a43d0(0xb3)]();;this['width']=Math[_0x4a43d0(0x132)](Graphics[_0x4a43d0(0x1e4)],this[_0x4a43d0(0x1e4)]);const _0x4ac542=$gameSystem[_0x4a43d0(0x160)]();this[_0x4a43d0(0x1f6)]=SceneManager['_scene']['calcWindowHeight'](_0x4ac542,![])+this[_0x4a43d0(0x2f5)](),this[_0x4a43d0(0x1f6)]=Math[_0x4a43d0(0x132)](Graphics[_0x4a43d0(0x1f6)],this[_0x4a43d0(0x1f6)]);if($gameTemp[_0x4a43d0(0x2eb)])this[_0x4a43d0(0xce)]();},Window_Message['prototype'][_0x3be230(0xb3)]=function(){return 0x0;},Window_Message[_0x3be230(0x194)][_0x3be230(0x2f5)]=function(){return 0x0;},Window_Message['prototype'][_0x3be230(0xce)]=function(){const _0x588736=_0x3be230;this['x']=(Graphics[_0x588736(0x334)]-this[_0x588736(0x1e4)])/0x2,$gameTemp[_0x588736(0x2eb)]=undefined,this[_0x588736(0x1f7)]();},Window_Message['prototype'][_0x3be230(0xb5)]=function(){const _0x579999=_0x3be230,_0x5060bf={'x':this['x'],'y':this['y']};Window_Base[_0x579999(0x194)]['updateMove']['call'](this),this['updateNameBoxMove'](_0x5060bf);},Window_Message[_0x3be230(0x194)]['canMove']=function(){return!![];},Window_Message[_0x3be230(0x194)][_0x3be230(0xdf)]=function(_0x6df04b){const _0x5011cb=_0x3be230;if(this[_0x5011cb(0x22e)]){if(_0x5011cb(0x17a)!==_0x5011cb(0x17a))return this[_0x5011cb(0x2a8)]&&this[_0x5011cb(0x2a8)][_0x5011cb(0xd0)]===_0x37e604;else this['_nameBoxWindow']['x']+=this['x']-_0x6df04b['x'],this['_nameBoxWindow']['y']+=this['y']-_0x6df04b['y'];}},Window_Message['prototype']['resetRect']=function(_0x87894c,_0x36d166){const _0x465738=_0x3be230;this['moveTo'](this[_0x465738(0x187)]['x'],this['_positionType']*(Graphics[_0x465738(0x15c)]-this[_0x465738(0x1f6)])/0x2,this[_0x465738(0x187)][_0x465738(0x1e4)],this[_0x465738(0x187)][_0x465738(0x1f6)],_0x87894c,_0x36d166);},Window_Message[_0x3be230(0x194)]['processCommonEvent']=function(_0x41d25f){const _0x1587a2=_0x3be230,_0x2a1d16=Window_Base['prototype'][_0x1587a2(0xe5)][_0x1587a2(0x2d7)](this,_0x41d25f);_0x41d25f[_0x1587a2(0x1f8)]&&this[_0x1587a2(0x155)](_0x2a1d16);},Window_Message['prototype']['launchMessageCommonEvent']=function(_0x428cbd){if($gameParty['inBattle']()){}else $gameMap['addMessageCommonEvent'](_0x428cbd);},Window_Message[_0x3be230(0x194)]['processCharacter']=function(_0x193000){const _0x489c7b=_0x3be230;this[_0x489c7b(0x32e)]--,this['_textDelayCount']<=0x0&&(this[_0x489c7b(0x1da)](_0x193000),Window_Base[_0x489c7b(0x194)][_0x489c7b(0xc0)][_0x489c7b(0x2d7)](this,_0x193000));},Window_Message[_0x3be230(0x194)]['onProcessCharacter']=function(_0x5925a6){const _0x984402=_0x3be230;this['_textDelayCount']=this[_0x984402(0x31c)];if(this[_0x984402(0x31c)]<=0x0)this[_0x984402(0x195)]=!![];},VisuMZ['MessageCore'][_0x3be230(0x2bc)]=Window_Message['prototype'][_0x3be230(0x1ab)],Window_Message[_0x3be230(0x194)]['processEscapeCharacter']=function(_0x81ccd1,_0x31a477){const _0x2f78d2=_0x3be230;!_0x31a477[_0x2f78d2(0x1f8)]?Window_Base['prototype'][_0x2f78d2(0x1ab)][_0x2f78d2(0x2d7)](this,_0x81ccd1,_0x31a477):VisuMZ[_0x2f78d2(0x24d)]['Window_Message_processEscapeCharacter'][_0x2f78d2(0x2d7)](this,_0x81ccd1,_0x31a477);},Window_Message[_0x3be230(0x194)]['prepareForcedPositionEscapeCharacters']=function(_0x688ca7){const _0x7e6194=_0x3be230;let _0x5ef3ca=_0x688ca7[_0x7e6194(0xaa)];this['_forcedPosition']={};if(this[_0x7e6194(0x214)]())return _0x5ef3ca;_0x5ef3ca=_0x5ef3ca['replace'](/<POSITION:[ ]*(.*)>/gi,(_0x467f70,_0x27c994)=>{const _0xe21500=_0x7e6194;if('pPkwY'===_0xe21500(0x244)){const _0x4ac7cb=_0x27c994[_0xe21500(0x22a)](',')['map'](_0x5a710a=>Number(_0x5a710a)||0x0);if(_0x4ac7cb[0x0]!==undefined)this['_forcedPosition']['x']=Number(_0x4ac7cb[0x0]);if(_0x4ac7cb[0x1]!==undefined)this[_0xe21500(0x232)]['y']=Number(_0x4ac7cb[0x1]);if(_0x4ac7cb[0x2]!==undefined)this[_0xe21500(0x232)]['width']=Number(_0x4ac7cb[0x2]);if(_0x4ac7cb[0x3]!==undefined)this[_0xe21500(0x232)][_0xe21500(0x1f6)]=Number(_0x4ac7cb[0x3]);return'';}else _0x54d841[_0xe21500(0x194)][_0xe21500(0x26d)][_0xe21500(0x2d7)](this),this[_0xe21500(0x1d0)](this[_0xe21500(0x1f9)]());}),_0x5ef3ca=_0x5ef3ca[_0x7e6194(0x2ce)](/<COORDINATES:[ ]*(.*)>/gi,(_0x3623d3,_0x1cd603)=>{const _0x360ba3=_0x7e6194,_0x301206=_0x1cd603[_0x360ba3(0x22a)](',')['map'](_0x4a6693=>Number(_0x4a6693)||0x0);if(_0x301206[0x0]!==undefined)this['_forcedPosition']['x']=Number(_0x301206[0x0]);if(_0x301206[0x1]!==undefined)this[_0x360ba3(0x232)]['y']=Number(_0x301206[0x1]);return'';}),_0x5ef3ca=_0x5ef3ca[_0x7e6194(0x2ce)](/<DIMENSIONS:[ ]*(.*)>/gi,(_0x1afd43,_0x190e1b)=>{const _0x3e1c3d=_0x7e6194;if(_0x3e1c3d(0x332)==='KOeDc')this[_0x3e1c3d(0x25b)](_0x4c8897,_0x5d699f[_0x3e1c3d(0xf5)](0x1,0xb));else{const _0x305a2e=_0x190e1b[_0x3e1c3d(0x22a)](',')[_0x3e1c3d(0x1cb)](_0x1ac139=>Number(_0x1ac139)||0x0);if(_0x305a2e[0x0]!==undefined)this['_forcedPosition'][_0x3e1c3d(0x1e4)]=Number(_0x305a2e[0x2]);if(_0x305a2e[0x1]!==undefined)this[_0x3e1c3d(0x232)]['height']=Number(_0x305a2e[0x3]);return'';}}),_0x688ca7[_0x7e6194(0xaa)]=_0x5ef3ca;},Window_Message[_0x3be230(0x194)][_0x3be230(0x294)]=function(){const _0x5841c8=_0x3be230;this[_0x5841c8(0x232)]=this[_0x5841c8(0x232)]||{};const _0x5e53bb=['x','y',_0x5841c8(0x1e4),_0x5841c8(0x1f6)];for(const _0x3f5882 of _0x5e53bb){this['_forcedPosition'][_0x3f5882]!==undefined&&(this[_0x3f5882]=Number(this[_0x5841c8(0x232)][_0x3f5882]));}},Window_Message[_0x3be230(0x194)][_0x3be230(0x1fa)]=function(_0x54efff){const _0x12a5f8=_0x3be230;let _0x5dc548=_0x54efff[_0x12a5f8(0xaa)];_0x5dc548=_0x5dc548[_0x12a5f8(0x2ce)](/<(?:AUTO|AUTOSIZE|AUTO SIZE)>/gi,()=>{const _0x41d68a=_0x12a5f8;return this[_0x41d68a(0xbb)](_0x5dc548,!![],!![]),this['processAutoPosition'](_0x41d68a(0x219)),'';}),_0x5dc548=_0x5dc548[_0x12a5f8(0x2ce)](/<(?:AUTOWIDTH|AUTO WIDTH)>/gi,()=>{const _0x325888=_0x12a5f8;return this[_0x325888(0xbb)](_0x5dc548,!![],![]),this[_0x325888(0xeb)](_0x325888(0x219)),'';}),_0x5dc548=_0x5dc548['replace'](/<(?:AUTOHEIGHT|AUTO HEIGHT)>/gi,()=>{const _0x3878ff=_0x12a5f8;return this[_0x3878ff(0xbb)](_0x5dc548,![],!![]),this['processAutoPosition'](_0x3878ff(0x219)),'';});if(SceneManager[_0x12a5f8(0x21d)]()){if(_0x12a5f8(0x201)===_0x12a5f8(0x23b))return _0x3bc630;else _0x5dc548=_0x5dc548[_0x12a5f8(0x2ce)](/<(?:AUTOACTOR|AUTO ACTOR):[ ](.*?)>/gi,(_0x2dd7fb,_0x454dac)=>{const _0x1d972f=_0x12a5f8;return this[_0x1d972f(0xbb)](_0x5dc548,!![],!![]),this['processAutoPosition']('battle\x20actor',Number(_0x454dac)||0x1),'';}),_0x5dc548=_0x5dc548[_0x12a5f8(0x2ce)](/<(?:AUTOPARTY|AUTO PARTY):[ ](.*?)>/gi,(_0x4a0bb9,_0x48a112)=>{const _0x2acaa5=_0x12a5f8;return this[_0x2acaa5(0xbb)](_0x5dc548,!![],!![]),this[_0x2acaa5(0xeb)](_0x2acaa5(0xca),Number(_0x48a112)||0x0),'';}),_0x5dc548=_0x5dc548['replace'](/<(?:AUTOENEMY|AUTO ENEMY):[ ](.*?)>/gi,(_0x5ae7d4,_0xec05fe)=>{const _0x50c024=_0x12a5f8;if(_0x50c024(0x218)==='pBnRa'){!_0x1b9431&&(this['width']=_0xae81e0['min'](this[_0x50c024(0x1e4)],_0xae9463[_0x50c024(0x1e4)]),this['height']=_0x92a624['min'](this[_0x50c024(0x1f6)],_0x235dd8[_0x50c024(0x1f6)]));if(!_0x595821){const _0x19c31e=-(_0x1257d6[_0x50c024(0xea)](_0x2cd608[_0x50c024(0x1e4)]-_0x29a07a['boxWidth'])/0x2),_0x4e8c4c=_0x19c31e+_0x2a35bd[_0x50c024(0x1e4)]-this[_0x50c024(0x1e4)],_0x33719c=-(_0xd8ca87[_0x50c024(0xea)](_0x7133d7[_0x50c024(0x1f6)]-_0x471e92[_0x50c024(0x15c)])/0x2),_0x49f3f0=_0x33719c+_0x5f8b68[_0x50c024(0x1f6)]-this['height'];this['x']=this['x'][_0x50c024(0xf5)](_0x19c31e,_0x4e8c4c),this['y']=this['y'][_0x50c024(0xf5)](_0x33719c,_0x49f3f0);}}else return this[_0x50c024(0xbb)](_0x5dc548,!![],!![]),this['processAutoPosition'](_0x50c024(0xbd),Number(_0xec05fe)||0x0),'';});}else{if(SceneManager[_0x12a5f8(0x2f4)]()){if(_0x12a5f8(0x2b4)===_0x12a5f8(0x2b4))_0x5dc548=_0x5dc548[_0x12a5f8(0x2ce)](/<(?:AUTOPLAYER|AUTO PLAYER)>/gi,(_0x7334d8,_0x361f25)=>{const _0x2c9cbf=_0x12a5f8;return this[_0x2c9cbf(0xbb)](_0x5dc548,!![],!![]),this['processAutoPosition'](_0x2c9cbf(0x306),0x0),'';}),_0x5dc548=_0x5dc548[_0x12a5f8(0x2ce)](/<(?:AUTOACTOR|AUTO ACTOR):[ ](.*?)>/gi,(_0x3503cf,_0x38c1c7)=>{const _0x5f09d5=_0x12a5f8;return this[_0x5f09d5(0xbb)](_0x5dc548,!![],!![]),this['processAutoPosition']('map\x20actor',Number(_0x38c1c7)||0x1),'';}),_0x5dc548=_0x5dc548['replace'](/<(?:AUTOPARTY|AUTO PARTY):[ ](.*?)>/gi,(_0x5c3acc,_0x13e38c)=>{const _0x2875ca=_0x12a5f8;return _0x2875ca(0x103)==='VyWNj'?(this[_0x2875ca(0xbb)](_0x5dc548,!![],!![]),this[_0x2875ca(0xeb)]('map\x20party',Number(_0x13e38c)||0x0),''):_0x12473c[_0x2875ca(0xd6)]();}),_0x5dc548=_0x5dc548[_0x12a5f8(0x2ce)](/<(?:AUTOEVENT|AUTO EVENT):[ ](.*?)>/gi,(_0x177a8a,_0x380d53)=>{const _0x4c5c4e=_0x12a5f8;return _0x4c5c4e(0x330)!=='Ceoqf'?this['_scene']&&this[_0x4c5c4e(0x2a8)][_0x4c5c4e(0xd0)]===_0x263e62:(this[_0x4c5c4e(0xbb)](_0x5dc548,!![],!![]),this[_0x4c5c4e(0xeb)](_0x4c5c4e(0x11d),Number(_0x380d53)||0x0),'');});else{this[_0x12a5f8(0x16b)]=this[_0x12a5f8(0x16b)]||[];for(const _0x35f0be of this['_messageCommonEvents']){!_0x35f0be['_interpreter']?this[_0x12a5f8(0x16b)][_0x12a5f8(0x199)](_0x35f0be):_0x35f0be[_0x12a5f8(0x238)]();}}}}_0x54efff[_0x12a5f8(0xaa)]=_0x5dc548;},Window_Message[_0x3be230(0xe0)]=/<(?:AUTO|AUTOSIZE|AUTO SIZE|AUTOWIDTH|AUTO WIDTH|AUTOHEIGHT|AUTO HEIGHT|AUTOPLAYER|AUTO PLAYER)>/gi,Window_Message[_0x3be230(0x1e0)]=/<(?:AUTOPARTY|AUTO PARTY|AUTOPLAYER|AUTO PLAYER|AUTOEVENT|AUTO EVENT|AUTOENEMY|AUTO ENEMY|AUTOACTOR|AUTO ACTOR):[ ](.*?)>/gi,Window_Message[_0x3be230(0x194)][_0x3be230(0xbb)]=function(_0x573df2,_0x32c084,_0x43dcf3){const _0x474f41=_0x3be230;_0x573df2=_0x573df2['replace'](Window_Message[_0x474f41(0xe0)],''),_0x573df2=_0x573df2[_0x474f41(0x2ce)](Window_Message[_0x474f41(0x1e0)],''),this[_0x474f41(0xab)]=!![];const _0xe78578=this['textSizeEx'](_0x573df2);if(_0x32c084){let _0x13d28c=_0xe78578['width']+$gameSystem[_0x474f41(0x1b1)]()*0x2+0x6;const _0x1bc6f2=$gameMessage[_0x474f41(0x188)]()!=='',_0x2ea9e6=ImageManager['faceWidth'],_0x13c034=0x14;_0x13d28c+=_0x1bc6f2?_0x2ea9e6+_0x13c034:0x4;if(_0x13d28c%0x2!==0x0)_0x13d28c+=0x1;$gameSystem[_0x474f41(0x258)](_0x13d28c);}if(_0x43dcf3){let _0x1cb369=Math[_0x474f41(0x231)](_0xe78578[_0x474f41(0x1f6)]/this[_0x474f41(0x21c)]());$gameSystem['setMessageWindowRows'](_0x1cb369);}this[_0x474f41(0xd5)](),this['_autoSizeCheck']=![],this[_0x474f41(0x146)]=!![];},Window_Message[_0x3be230(0x194)]['updateAutoSizePosition']=function(){const _0x1a9ddf=_0x3be230;this['updateDimensions'](),this['updatePlacement'](),this[_0x1a9ddf(0xce)](),this[_0x1a9ddf(0xa8)](),this[_0x1a9ddf(0x2a0)]['clear'](),this[_0x1a9ddf(0x205)]();},Window_Message[_0x3be230(0x194)][_0x3be230(0xeb)]=function(_0x353f1d,_0x286e6a){const _0x1420a3=_0x3be230;switch(_0x353f1d[_0x1420a3(0x12b)]()['trim']()){case _0x1420a3(0x178):this['_autoPositionTarget']=$gameActors[_0x1420a3(0x126)](_0x286e6a);break;case'battle\x20party':this['_autoPositionTarget']=$gameParty[_0x1420a3(0xa5)]()[_0x286e6a-0x1];break;case _0x1420a3(0xbd):this[_0x1420a3(0x333)]=$gameTroop[_0x1420a3(0xa5)]()[_0x286e6a-0x1];break;case _0x1420a3(0x306):this['_autoPositionTarget']=$gamePlayer;break;case _0x1420a3(0x1c9):const _0x48aa3d=$gameActors[_0x1420a3(0x126)](_0x286e6a)[_0x1420a3(0x2a3)]();_0x48aa3d===0x0?this[_0x1420a3(0x333)]=$gamePlayer:_0x1420a3(0x2a2)!==_0x1420a3(0x329)?this['_autoPositionTarget']=$gamePlayer[_0x1420a3(0x272)]()[_0x1420a3(0x2f9)](_0x48aa3d-0x1):_0x52400b[_0x1420a3(0xbf)]=_0x5572e2[_0x1420a3(0xf8)];break;case _0x1420a3(0x337):_0x286e6a===0x1?this[_0x1420a3(0x333)]=$gamePlayer:_0x1420a3(0x283)!==_0x1420a3(0x224)?this[_0x1420a3(0x333)]=$gamePlayer[_0x1420a3(0x272)]()['follower'](_0x286e6a-0x2):(_0x21a85e['MessageCore'][_0x1420a3(0x230)][_0x1420a3(0x2d7)](this,_0xd8d01f,_0x32c5ef,_0x5d4246),_0x7fb207>0x0&&this[_0x1420a3(0x1a4)](_0x7bef2d,_0x5d9bf2));break;case'map\x20event':this[_0x1420a3(0x333)]=$gameMap[_0x1420a3(0x208)](_0x286e6a);break;}this['_autoPositionTarget']&&('HAcPR'!==_0x1420a3(0xd8)?this['updateAutoPosition']():this[_0x1420a3(0x1fc)](this[_0x1420a3(0x187)]['x'],this[_0x1420a3(0x268)]*(_0x51d01d['boxHeight']-this[_0x1420a3(0x1f6)])/0x2,this[_0x1420a3(0x187)]['width'],this[_0x1420a3(0x187)][_0x1420a3(0x1f6)],_0x50c99c,_0x3467cb));},VisuMZ['MessageCore'][_0x3be230(0x1fd)]=Window_Message[_0x3be230(0x194)][_0x3be230(0x19a)],Window_Message[_0x3be230(0x194)][_0x3be230(0x19a)]=function(){const _0x530cea=_0x3be230;this[_0x530cea(0x20c)](),VisuMZ['MessageCore']['Window_Message_synchronizeNameBox'][_0x530cea(0x2d7)](this);},Window_Message[_0x3be230(0x194)]['updateAutoPosition']=function(){const _0x47eac8=_0x3be230;if(!this[_0x47eac8(0x333)])return;const _0x2a9626=SceneManager[_0x47eac8(0x2a8)];if(!_0x2a9626)return;if(!_0x2a9626[_0x47eac8(0x1bf)])return;const _0x469cfa=_0x2a9626[_0x47eac8(0x1bf)][_0x47eac8(0x23c)](this[_0x47eac8(0x333)]);if(!_0x469cfa)return;let _0x2cbdb1=_0x469cfa['x'];_0x2cbdb1-=this[_0x47eac8(0x1e4)]/0x2,_0x2cbdb1-=(Graphics[_0x47eac8(0x1e4)]-Graphics[_0x47eac8(0x334)])/0x2;let _0x2c24bb=_0x469cfa['y'];_0x2c24bb-=this[_0x47eac8(0x1f6)],_0x2c24bb-=(Graphics[_0x47eac8(0x1f6)]-Graphics[_0x47eac8(0x15c)])/0x2,_0x2c24bb-=_0x469cfa[_0x47eac8(0x1f6)]+0x8,this['x']=Math['round'](_0x2cbdb1),this['y']=Math[_0x47eac8(0xf2)](_0x2c24bb),this['clampPlacementPosition'](!![],![]),this['_nameBoxWindow'][_0x47eac8(0x30a)]();},Window_Message['prototype'][_0x3be230(0x301)]=function(){const _0x6c82d4=_0x3be230;this['_messagePositionReset']=![],this[_0x6c82d4(0x333)]=undefined,$gameSystem['initMessageCore'](),this[_0x6c82d4(0xd5)](),this['openness']=0x0;},Window_Message[_0x3be230(0x194)][_0x3be230(0x2ba)]=function(_0x3cce5d){const _0x528dfb=_0x3be230;return Window_Base[_0x528dfb(0x194)][_0x528dfb(0x2ba)][_0x528dfb(0x2d7)](this,_0x3cce5d);},Window_Message[_0x3be230(0x194)][_0x3be230(0xe8)]=function(_0xfc8690){const _0x4c1073=_0x3be230;return Window_Base[_0x4c1073(0x194)][_0x4c1073(0xe8)][_0x4c1073(0x2d7)](this,_0xfc8690);},Window_Message[_0x3be230(0x194)][_0x3be230(0x1c4)]=function(_0x4ee6f5){const _0x2a0f7b=_0x3be230;this[_0x2a0f7b(0x122)](_0x4ee6f5),Window_Base['prototype'][_0x2a0f7b(0x1c4)][_0x2a0f7b(0x2d7)](this,_0x4ee6f5),this[_0x2a0f7b(0x305)](_0x4ee6f5);},Window_Message[_0x3be230(0x194)]['preFlushTextState']=function(_0x306a47){},Window_Message[_0x3be230(0x194)][_0x3be230(0x305)]=function(_0x2e5778){},Window_NameBox[_0x3be230(0x194)][_0x3be230(0x210)]=function(){return![];},Window_NameBox['prototype'][_0x3be230(0x26d)]=function(){const _0x286593=_0x3be230;Window_Base[_0x286593(0x194)][_0x286593(0x26d)]['call'](this),this[_0x286593(0x1d0)](this['defaultColor']());},Window_NameBox[_0x3be230(0x194)][_0x3be230(0x1f9)]=function(){const _0x3733c3=_0x3be230,_0x244aaf=VisuMZ[_0x3733c3(0x24d)]['Settings']['General']['NameBoxWindowDefaultColor'];return ColorManager[_0x3733c3(0x2ef)](_0x244aaf);},VisuMZ['MessageCore'][_0x3be230(0xa9)]=Window_NameBox[_0x3be230(0x194)]['updatePlacement'],Window_NameBox[_0x3be230(0x194)]['updatePlacement']=function(){const _0x24d488=_0x3be230;VisuMZ[_0x24d488(0x24d)][_0x24d488(0xa9)][_0x24d488(0x2d7)](this),this['updateRelativePosition'](),this['updateOffsetPosition'](),this[_0x24d488(0x1f7)](),this[_0x24d488(0x287)]();},Window_NameBox[_0x3be230(0x194)][_0x3be230(0x2ba)]=function(_0x3df9c8){const _0x20cfa1=_0x3be230;return _0x3df9c8=_0x3df9c8[_0x20cfa1(0x2ce)](/<LEFT>/gi,this[_0x20cfa1(0x327)]['bind'](this,0x0)),_0x3df9c8=_0x3df9c8[_0x20cfa1(0x2ce)](/<CENTER>/gi,this[_0x20cfa1(0x327)][_0x20cfa1(0x202)](this,0x5)),_0x3df9c8=_0x3df9c8[_0x20cfa1(0x2ce)](/<RIGHT>/gi,this[_0x20cfa1(0x327)][_0x20cfa1(0x202)](this,0xa)),_0x3df9c8=_0x3df9c8[_0x20cfa1(0x2ce)](/<POSITION:[ ](\d+)>/gi,(_0x14ddda,_0x18cda3)=>this['setRelativePosition'](parseInt(_0x18cda3))),_0x3df9c8=_0x3df9c8[_0x20cfa1(0x2ce)](/<\/LEFT>/gi,''),_0x3df9c8=_0x3df9c8[_0x20cfa1(0x2ce)](/<\/CENTER>/gi,''),_0x3df9c8=_0x3df9c8[_0x20cfa1(0x2ce)](/<\/RIGHT>/gi,''),Window_Base[_0x20cfa1(0x194)]['preConvertEscapeCharacters']['call'](this,_0x3df9c8);},Window_NameBox[_0x3be230(0x194)]['setRelativePosition']=function(_0x2b3923){const _0xbb0b4e=_0x3be230;return this[_0xbb0b4e(0x31b)]=_0x2b3923,'';},Window_NameBox[_0x3be230(0x194)][_0x3be230(0x2e0)]=function(){const _0x498e92=_0x3be230;if($gameMessage[_0x498e92(0x32d)]())return;this[_0x498e92(0x31b)]=this[_0x498e92(0x31b)]||0x0;const _0xbe9896=this['_messageWindow'],_0x536ce3=Math[_0x498e92(0xea)](_0xbe9896[_0x498e92(0x1e4)]*this[_0x498e92(0x31b)]/0xa);this['x']=_0xbe9896['x']+_0x536ce3-Math[_0x498e92(0xea)](this['width']/0x2),this['x']=this['x'][_0x498e92(0xf5)](_0xbe9896['x'],_0xbe9896['x']+_0xbe9896['width']-this['width']);},Window_NameBox[_0x3be230(0x194)][_0x3be230(0x18e)]=function(){const _0x18a324=_0x3be230;if($gameMessage['isRTL']())return;this[_0x18a324(0x31b)]=this[_0x18a324(0x31b)]||0x0;const _0x6da949=VisuMZ[_0x18a324(0x24d)][_0x18a324(0x32c)][_0x18a324(0x322)]['NameBoxWindowOffsetX'],_0x5b4430=VisuMZ['MessageCore']['Settings']['General']['NameBoxWindowOffsetY'],_0x4d7e4b=(0x5-this['_relativePosition'])/0x5;this['x']+=Math[_0x18a324(0xea)](_0x6da949*_0x4d7e4b),this['y']+=_0x5b4430;},Window_NameBox['prototype'][_0x3be230(0x287)]=function(){const _0x24447b=_0x3be230,_0x216b4e=this[_0x24447b(0x2e9)],_0x2a210b=_0x216b4e['y'],_0x547222=VisuMZ[_0x24447b(0x24d)][_0x24447b(0x32c)]['General'][_0x24447b(0x16d)];_0x2a210b>this['y']&&_0x2a210b<this['y']+this['height']-_0x547222&&(this['y']=_0x216b4e['y']+_0x216b4e[_0x24447b(0x1f6)]);},VisuMZ[_0x3be230(0x24d)][_0x3be230(0x24c)]=Window_NameBox[_0x3be230(0x194)][_0x3be230(0x277)],Window_NameBox[_0x3be230(0x194)][_0x3be230(0x277)]=function(){const _0x3d29e3=_0x3be230;this[_0x3d29e3(0x31b)]=0x0,VisuMZ[_0x3d29e3(0x24d)][_0x3d29e3(0x24c)][_0x3d29e3(0x2d7)](this);},Window_ChoiceList[_0x3be230(0x194)][_0x3be230(0x214)]=function(){return![];},Window_ChoiceList[_0x3be230(0x194)]['isAutoColorAffected']=function(){return!![];},Window_ChoiceList['prototype'][_0x3be230(0x19d)]=function(){const _0x4d860e=_0x3be230;return $gameSystem[_0x4d860e(0x148)]()+0x8;},Window_ChoiceList[_0x3be230(0x194)][_0x3be230(0x14a)]=function(){const _0xa5d376=_0x3be230;return $gameSystem[_0xa5d376(0xd6)]();},Window_ChoiceList['prototype'][_0x3be230(0x23f)]=function(){const _0x2ba281=_0x3be230;this['refresh'](),this[_0x2ba281(0x26a)](),this[_0x2ba281(0x15a)](),this[_0x2ba281(0x251)]();},Window_ChoiceList['prototype']['refresh']=function(){const _0x5b14c4=_0x3be230;this[_0x5b14c4(0x1cc)](),this[_0x5b14c4(0x2db)](),this['_messageWindow']&&(_0x5b14c4(0x1b8)===_0x5b14c4(0x2e4)?this[_0x5b14c4(0x1b7)](![]):(this['updatePlacement'](),this[_0x5b14c4(0x111)]())),this['createContents'](),this[_0x5b14c4(0x163)](),this[_0x5b14c4(0x1ac)](),Window_Selectable[_0x5b14c4(0x194)][_0x5b14c4(0x277)][_0x5b14c4(0x2d7)](this);},Window_ChoiceList['prototype'][_0x3be230(0x2db)]=function(){const _0x25954e=_0x3be230,_0x5badfb=$gameMessage[_0x25954e(0xae)]();let _0x2f3e00=0x0;for(const _0x185c13 of _0x5badfb){if(this[_0x25954e(0x101)](_0x185c13)){if('KCwHs'===_0x25954e(0x2dd)){const _0x38beb7=this[_0x25954e(0x2e1)](_0x185c13),_0x447295=this[_0x25954e(0x2fd)](_0x185c13);this[_0x25954e(0x11c)](_0x38beb7,_0x25954e(0x24f),_0x447295,_0x2f3e00);}else _0x1b95db['x']=this['width']+_0x181467;}_0x2f3e00++;}},Window_ChoiceList[_0x3be230(0x194)]['isChoiceVisible']=function(_0x460590){const _0x3452c2=_0x3be230;if(_0x460590[_0x3452c2(0x1ee)](/<HIDE>/i))return![];if(_0x460590[_0x3452c2(0x1ee)](/<SHOW>/i))return!![];if(_0x460590['match'](/<SHOW[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x28a050=JSON['parse']('['+RegExp['$1'][_0x3452c2(0x1ee)](/\d+/g)+']');for(const _0xbffb73 of _0x28a050){if(!$gameSwitches[_0x3452c2(0x18c)](_0xbffb73))return![];}return!![];}if(_0x460590[_0x3452c2(0x1ee)](/<SHOW ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x51370a=JSON[_0x3452c2(0x133)]('['+RegExp['$1'][_0x3452c2(0x1ee)](/\d+/g)+']');for(const _0x2af4f1 of _0x51370a){if(!$gameSwitches['value'](_0x2af4f1))return![];}return!![];}if(_0x460590[_0x3452c2(0x1ee)](/<SHOW ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x5ee57b=JSON['parse']('['+RegExp['$1'][_0x3452c2(0x1ee)](/\d+/g)+']');for(const _0x3899f2 of _0x5ee57b){if(_0x3452c2(0x207)==='OBnZM'){const _0x2cf6b0=this[_0x3452c2(0x19f)](_0x33c3ff);this['constructor']===_0x5bf245&&_0x222a5f[_0x3452c2(0x1f8)]&&this['startWait'](_0x2cf6b0);}else{if($gameSwitches[_0x3452c2(0x18c)](_0x3899f2))return!![];}}return![];}if(_0x460590[_0x3452c2(0x1ee)](/<HIDE[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if('lqnjr'===_0x3452c2(0x171)){if(this['_MessageCoreSettings']===_0x28ef01)this[_0x3452c2(0x147)]();if(this[_0x3452c2(0x225)][_0x3452c2(0x29e)]===_0x5ab81f)this[_0x3452c2(0x147)]();return this[_0x3452c2(0x225)][_0x3452c2(0x29e)];}else{const _0x10d1e5=JSON[_0x3452c2(0x133)]('['+RegExp['$1'][_0x3452c2(0x1ee)](/\d+/g)+']');for(const _0x70ea3f of _0x10d1e5){if(_0x3452c2(0xfa)===_0x3452c2(0xfa)){if(!$gameSwitches['value'](_0x70ea3f))return!![];}else _0x5ad81a[_0x3452c2(0x24d)][_0x3452c2(0x16e)]['call'](this),this[_0x3452c2(0x16b)]=[];}return![];}}if(_0x460590['match'](/<HIDE ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0xc55112=JSON[_0x3452c2(0x133)]('['+RegExp['$1'][_0x3452c2(0x1ee)](/\d+/g)+']');for(const _0x779941 of _0xc55112){if(!$gameSwitches[_0x3452c2(0x18c)](_0x779941))return!![];}return![];}if(_0x460590[_0x3452c2(0x1ee)](/<HIDE ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x3452c2(0x10c)===_0x3452c2(0x10c)){const _0x45e7c4=JSON['parse']('['+RegExp['$1'][_0x3452c2(0x1ee)](/\d+/g)+']');for(const _0x3a6e79 of _0x45e7c4){if(_0x3452c2(0x31e)===_0x3452c2(0x31e)){if($gameSwitches[_0x3452c2(0x18c)](_0x3a6e79))return![];}else return _0x343f21[_0x3452c2(0x2da)];}return!![];}else _0x2f8dea[_0x3452c2(0x24d)][_0x3452c2(0x32c)][_0x3452c2(0x304)][_0x3452c2(0x108)]&&this[_0x3452c2(0x27b)]();}return!![];},Window_ChoiceList[_0x3be230(0x194)][_0x3be230(0x2e1)]=function(_0x6a4f2e){const _0x181d40=_0x3be230;let _0x5435cc=_0x6a4f2e;return _0x5435cc=_0x5435cc[_0x181d40(0x2ce)](/<(?:BR|LINEBREAK)>/gi,'\x0a'),_0x5435cc=_0x5435cc[_0x181d40(0x2ce)](/<LINE\x1bWrapBreak[0]BREAK>/gi,'\x0a'),_0x5435cc;},Window_ChoiceList[_0x3be230(0x194)][_0x3be230(0x2fd)]=function(_0xe22978){const _0x16e651=_0x3be230;if(_0xe22978[_0x16e651(0x1ee)](/<DISABLE>/i))return![];if(_0xe22978['match'](/<ENABLE>/i))return!![];if(_0xe22978['match'](/<ENABLE[ ](?:SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x519ce8=JSON[_0x16e651(0x133)]('['+RegExp['$1'][_0x16e651(0x1ee)](/\d+/g)+']');for(const _0x151916 of _0x519ce8){if(!$gameSwitches['value'](_0x151916))return![];}return!![];}if(_0xe22978[_0x16e651(0x1ee)](/<ENABLE ALL[ ](?:SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x34d7a3=JSON[_0x16e651(0x133)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x4433f5 of _0x34d7a3){if(!$gameSwitches[_0x16e651(0x18c)](_0x4433f5))return![];}return!![];}if(_0xe22978[_0x16e651(0x1ee)](/<ENABLE ANY[ ](?:SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if('AryBV'===_0x16e651(0x25c)){const _0x3fd45a=JSON['parse']('['+RegExp['$1'][_0x16e651(0x1ee)](/\d+/g)+']');for(const _0x43ef1a of _0x3fd45a){if($gameSwitches[_0x16e651(0x18c)](_0x43ef1a))return!![];}return![];}else{if(!_0x4d85fa||!_0x2884dd)return-0x1;return _0x1698e1['length']-_0x50b7ef[_0x16e651(0xde)];}}if(_0xe22978[_0x16e651(0x1ee)](/<DISABLE[ ](?:SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x5edb2c=JSON[_0x16e651(0x133)]('['+RegExp['$1'][_0x16e651(0x1ee)](/\d+/g)+']');for(const _0x10ff98 of _0x5edb2c){if(_0x16e651(0x1a7)===_0x16e651(0x324)){if(this[_0x16e651(0x225)]===_0x34b716)this[_0x16e651(0x147)]();if(this[_0x16e651(0x225)][_0x16e651(0x250)]===_0x25b59f)this[_0x16e651(0x147)]();return this[_0x16e651(0x225)][_0x16e651(0x250)];}else{if(!$gameSwitches[_0x16e651(0x18c)](_0x10ff98))return!![];}}return![];}if(_0xe22978[_0x16e651(0x1ee)](/<DISABLE ALL[ ](?:SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x1d6066=JSON['parse']('['+RegExp['$1'][_0x16e651(0x1ee)](/\d+/g)+']');for(const _0x1b1cfb of _0x1d6066){if(!$gameSwitches[_0x16e651(0x18c)](_0x1b1cfb))return!![];}return![];}if(_0xe22978['match'](/<DISABLE ANY[ ](?:SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x16e651(0x130)===_0x16e651(0x130)){const _0xff1e88=JSON[_0x16e651(0x133)]('['+RegExp['$1'][_0x16e651(0x1ee)](/\d+/g)+']');for(const _0x276d64 of _0xff1e88){if(_0x16e651(0x216)===_0x16e651(0x216)){if($gameSwitches[_0x16e651(0x18c)](_0x276d64))return![];}else this[_0x16e651(0x18b)]&&(this[_0x16e651(0x18b)][_0x16e651(0x19c)]()?this['_interpreter'][_0x16e651(0x238)]():this[_0x16e651(0x13e)]());}return!![];}else{const _0x277bdb=_0x20c26f[_0x16e651(0x133)]('['+_0x363c8a['$1']['match'](/\d+/g)+']');for(const _0x3f5e6d of _0x277bdb){if(!_0x4a5b22[_0x16e651(0x18c)](_0x3f5e6d))return![];}return!![];}}return!![];},VisuMZ[_0x3be230(0x24d)]['Window_ChoiceList_updatePlacement']=Window_ChoiceList[_0x3be230(0x194)][_0x3be230(0x30a)],Window_ChoiceList[_0x3be230(0x194)][_0x3be230(0x30a)]=function(){const _0x50a8a4=_0x3be230;VisuMZ[_0x50a8a4(0x24d)][_0x50a8a4(0x2cb)][_0x50a8a4(0x2d7)](this),this[_0x50a8a4(0x1f7)]();},Window_ChoiceList[_0x3be230(0x194)][_0x3be230(0x111)]=function(){const _0x27e690=_0x3be230;if(!this['_cancelButton'])return;const _0xc9d39e=0x8,_0x45b660=this[_0x27e690(0x182)],_0x5d7cbd=this['x']+this[_0x27e690(0x1e4)],_0x3959b2=Math[_0x27e690(0xea)]((Graphics[_0x27e690(0x1e4)]-Graphics['boxWidth'])/0x2);_0x5d7cbd>=Graphics[_0x27e690(0x334)]+_0x3959b2-_0x45b660[_0x27e690(0x1e4)]+_0xc9d39e?_0x45b660['x']=-_0x45b660[_0x27e690(0x1e4)]-_0xc9d39e:_0x27e690(0xc1)!=='yGnDZ'?_0x45b660['x']=this[_0x27e690(0x1e4)]+_0xc9d39e:this[_0x27e690(0x2cc)][_0x27e690(0x260)]=0x1,_0x45b660['y']=this[_0x27e690(0x1f6)]/0x2-_0x45b660['height']/0x2;},VisuMZ[_0x3be230(0x24d)][_0x3be230(0x16c)]=Window_ChoiceList[_0x3be230(0x194)][_0x3be230(0x1eb)],Window_ChoiceList[_0x3be230(0x194)][_0x3be230(0x1eb)]=function(){const _0x9613ab=_0x3be230;if(this[_0x9613ab(0x2e9)])return this['messageCoreWindowX']();else{if('PVTaq'==='CGDoD'){this[_0x9613ab(0x1e4)]=_0x90ca6d[_0x9613ab(0x1fb)]()+this[_0x9613ab(0xb3)]();;this['width']=_0x2a2f76['min'](_0x1ce8e4[_0x9613ab(0x1e4)],this[_0x9613ab(0x1e4)]);const _0x272b73=_0x1ddfc1[_0x9613ab(0x160)]();this[_0x9613ab(0x1f6)]=_0x4f2a45['_scene'][_0x9613ab(0x20f)](_0x272b73,![])+this[_0x9613ab(0x2f5)](),this[_0x9613ab(0x1f6)]=_0x21d812[_0x9613ab(0x132)](_0x343bb6[_0x9613ab(0x1f6)],this[_0x9613ab(0x1f6)]);if(_0x13a40e['_centerMessageWindow'])this[_0x9613ab(0xce)]();}else return VisuMZ[_0x9613ab(0x24d)][_0x9613ab(0x16c)][_0x9613ab(0x2d7)](this);}},Window_ChoiceList[_0x3be230(0x194)][_0x3be230(0x245)]=function(){const _0x9d9e87=_0x3be230,_0x4f522f=$gameMessage[_0x9d9e87(0x12a)]();if(_0x4f522f===0x1)return(Graphics[_0x9d9e87(0x334)]-this[_0x9d9e87(0xc6)]())/0x2;else return _0x4f522f===0x2?this[_0x9d9e87(0x2e9)]['x']+this[_0x9d9e87(0x2e9)][_0x9d9e87(0x1e4)]-this[_0x9d9e87(0xc6)]():this[_0x9d9e87(0x2e9)]['x'];},Window_ChoiceList[_0x3be230(0x194)]['windowWidth']=function(){const _0x13fbde=_0x3be230,_0x5a863b=(this[_0x13fbde(0x1a5)]()+this[_0x13fbde(0x1c3)]())*this[_0x13fbde(0x14a)]()+this[_0x13fbde(0x1df)]*0x2;return Math['min'](_0x5a863b,Graphics[_0x13fbde(0x1e4)]);},Window_ChoiceList['prototype'][_0x3be230(0x2ac)]=function(){const _0x4a839e=_0x3be230,_0x47599f=$gameMessage[_0x4a839e(0xae)]()[_0x4a839e(0x2fe)](_0x54d19b=>this[_0x4a839e(0x101)](_0x54d19b)),_0x1676e9=Math[_0x4a839e(0x231)](_0x47599f['length']/this[_0x4a839e(0x14a)]());return Math[_0x4a839e(0x2d2)](0x1,Math[_0x4a839e(0x132)](_0x1676e9,this[_0x4a839e(0x1b4)]()));},Window_ChoiceList[_0x3be230(0x194)]['maxLines']=function(){const _0x75f212=_0x3be230,_0x221592=this[_0x75f212(0x2e9)],_0x504c18=_0x221592?_0x221592['y']:0x0,_0x12b895=_0x221592?_0x221592[_0x75f212(0x1f6)]:0x0,_0xb0b771=Graphics[_0x75f212(0x15c)]/0x2;return _0x504c18<_0xb0b771&&_0x504c18+_0x12b895>_0xb0b771?_0x75f212(0x227)==='TrUNP'?(_0x38f9f6=_0x1a7cde[_0x75f212(0x2ce)](/<LEFT>/gi,_0x75f212(0x29b)),_0x5bcbfe=_0x485093['replace'](/<\/LEFT>/gi,_0x75f212(0xe1)),_0x1b2a63=_0x4515f2[_0x75f212(0x2ce)](/<CENTER>/gi,_0x75f212(0x319)),_0x199b70=_0xf3af22[_0x75f212(0x2ce)](/<\/CENTER>/gi,_0x75f212(0xe1)),_0x24f46c=_0x1bde0b[_0x75f212(0x2ce)](/<RIGHT>/gi,_0x75f212(0x33d)),_0x407466=_0x23496b[_0x75f212(0x2ce)](/<\/RIGHT>/gi,_0x75f212(0xe1)),_0x179b7f):0x4:$gameSystem[_0x75f212(0x104)]();},Window_ChoiceList[_0x3be230(0x194)][_0x3be230(0x1a5)]=function(){const _0x18b496=_0x3be230;let _0x53c9ea=0x60;for(const _0x5f0738 of this[_0x18b496(0x14e)]){if(_0x18b496(0x17e)===_0x18b496(0x335))return _0x245215['prototype'][_0x18b496(0xe8)][_0x18b496(0x2d7)](this,_0x10c51e);else{const _0x3c6780=_0x5f0738[_0x18b496(0x1d7)],_0x506932=this['textSizeEx'](_0x3c6780)[_0x18b496(0x1e4)],_0x506ae6=Math[_0x18b496(0x231)](_0x506932)+this[_0x18b496(0x226)]()*0x2;_0x53c9ea<_0x506ae6&&(_0x18b496(0x153)===_0x18b496(0x153)?_0x53c9ea=_0x506ae6:(_0x2a1eb7['y']=this['obtainEscapeParam'](_0x2b17de),_0x344cd9['MessageCore'][_0x18b496(0x32c)][_0x18b496(0x322)][_0x18b496(0x27f)]&&(_0x1a17a4['y']+=_0x20135b[_0x18b496(0x1d8)])));}}return _0x53c9ea;},Window_ChoiceList[_0x3be230(0x194)][_0x3be230(0x1ed)]=function(_0x4386ba){const _0x108fe4=_0x3be230,_0x13a424=this[_0x108fe4(0x2f2)](_0x4386ba),_0xd3fec1=$gameSystem['getChoiceListTextAlign']()!==_0x108fe4(0x256)?_0x108fe4(0x247)[_0x108fe4(0xac)]($gameSystem[_0x108fe4(0x27a)]()):'',_0x44882b=_0xd3fec1+this[_0x108fe4(0xfc)](_0x4386ba);this[_0x108fe4(0x222)](this[_0x108fe4(0x2a6)](_0x4386ba));const _0x5d4ff6=this[_0x108fe4(0xa7)](_0x44882b)['height'],_0x1778d2=Math[_0x108fe4(0x2d2)](_0x13a424['y'],_0x13a424['y']+Math['round']((_0x13a424[_0x108fe4(0x1f6)]-_0x5d4ff6)/0x2));this[_0x108fe4(0xa4)](_0x44882b,_0x13a424['x'],_0x1778d2,_0x13a424[_0x108fe4(0x1e4)]);},Window_ChoiceList[_0x3be230(0x194)]['callOkHandler']=function(){const _0x666e1f=_0x3be230;$gameMessage[_0x666e1f(0x1bb)](this[_0x666e1f(0x248)]()),this[_0x666e1f(0x2e9)][_0x666e1f(0x2ed)](),this['close']();};
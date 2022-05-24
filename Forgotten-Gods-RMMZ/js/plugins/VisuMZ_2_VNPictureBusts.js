//=============================================================================
// VisuStella MZ - Visual Novel Picture Busts
// VisuMZ_2_VNPictureBusts.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_2_VNPictureBusts = true;

var VisuMZ = VisuMZ || {};
VisuMZ.VNPictureBusts = VisuMZ.VNPictureBusts || {};
VisuMZ.VNPictureBusts.version = 1.00;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 2] [Version 1.00] [VNPictureBusts]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Main_Page
 * @base VisuMZ_0_CoreEngine
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * This plugin enables the game engine to use Pictures (normally available
 * event commands like "Show Picture" and "Move Picture") as Picture Busts,
 * similar to those seen in Visual Novels. These Picture Busts are given a
 * plethora of Plugin Commands to utilize and control them in ways to help
 * create narratives amongst characters akin to Visual Novels. The Plugin
 * Commands will also help streamline and remove the more tedious aspects of
 * trying to recreate a similar bust system with vanilla RPG Maker MZ.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Streamlined Plugin Commands to allow for commonly seen Picture Bust usage
 *   commonly found in Visual Novel genre-type games.
 * * Quickly Enter/Exit busts with Plugin Commands with a structure based
 *   around simplified screen positioning rather than exact coordinates.
 * * Change Picture Bust graphics without needing to fiddle with any other
 *   property for quicker switching between expressions or poses.
 * * Mirror, unmirror, or simply flip one direction to another for Picture
 *   Busts with ease without altering any other property.
 * * Fade in, fade out, or fade to exact opacity amounts without needing to
 *   alter any other property.
 * * Play Battle Animations on Picture Busts. Normally, Battle Animations would
 *   appear behind pictures, but this plugin creates specially effects to allow
 *   for them to play on top of the Picture Busts themselves.
 * * Move Picture Busts around relatively or to exact coordinates or using the
 *   plugin's predetermined positions in a streamlined fashion.
 * * Scale Picture Busts to enlarge them or shrink them while keeping other
 *   properties intact and untouched.
 * * Alter tones/tints for the Picture Busts in order to portray an active,
 *   passive, or normal effect.
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
 * ============================================================================
 * Quick Understanding on How Busts Work
 * ============================================================================
 * 
 * These are some tidbits on how Picture Busts work.
 *
 * ---
 * 
 * Busts Face Left
 * 
 * This plugin is made under the assumption that the Picture Busts are normally
 * facing left in their raw form. This is to match RPG Maker MZ's "Pictures" of
 * actors and to allow for more user familiarity with how Busts work.
 * 
 * Naturally, you can reverse everything as long as you adjust the settings
 * properly in this plugin's Plugin Parameters.
 * 
 * ---
 *
 * Busts are Pictures
 * 
 * "Busts" in this plugin are mechanically Pictures in RPG Maker MZ. The
 * properties that Pictures and Busts share are one and the same. This means
 * that you can control Pictures with this plugin's Bust-centric commands and
 * you can control Busts with "Move Picture", "Rotate Picture", "Tint Picture",
 * and "Erase Picture" event commands.
 * 
 * Naturally, this also means that any Picture of Bust that hasn't been made
 * available through the "Show Picture" event command or "BASIC: Enter Bust(s)"
 * Plugin Command won't be able to use either event commands or Plugin Commands
 * related to the Picture/Bust manipulation.
 *
 * ---
 *
 * Picture ID's Matter for Busts
 * 
 * Picture ID's matter when selecting them for Busts. Picture ID's with a lower
 * number will appear further in the "back" behind other Pictures/Busts while
 * Picture ID's with a higher number will appear more on "top".
 * 
 * It makes no difference if the object was formed as a Picture or as a Bust
 * first. The layer system is still intact.
 *
 * ---
 *
 * Specialized Bust Origin/Anchor
 * 
 * Pictures have two Origin/Anchor modes: "Upper Left" or "Center". The Origin
 * refers to the point in which the picture marks and aligns itself with based
 * on the coordinates it's given.
 * 
 * If you are using "Upper Left", then the Picture's X and Y will indicate that
 * the Picture's Upper Left corner of the image will be at X and Y. If you are
 * using "Center", then that means the Picture's X and Y will indicate that
 * the Picture's Center point of the image will be at X and Y.
 * 
 * Busts have a unique Origin/Anchor that can be setup in the Plugin Parameters
 * and it normally defaults to "Center Bottom", aka Anchor X value of 0.5 and
 * Anchor Y value of 1.0. The "Bust" Anchor works best with Busts because it
 * allows for the natural manipulation of busts relative to the bottom of the
 * screen position.
 * 
 * As mentioned before, this can be modified in the Plugin Parameters. We don't
 * recommend changing it unless you know what you're doing.
 *
 * ---
 * 
 * Predetermined Positioning
 * 
 * Messing with exact coordinates is messy and extremely inefficient when
 * working with them for a long enough time. This plugin offers a Predetermined
 * Position coordinate system, to which, the rest of the plugin will refer to
 * as "Positions" for short.
 * 
 * There are 11 Positions available through this plugin, one for each number
 * between 0 and 10. These Positions start on the left side of the screen and
 * go towards the right, with a 200 pixel buffer from the edges. They are also
 * aligned at the bottom of the screen.
 * 
 * In other words, something like this:
 * 
 * +--------+--------------------------------------------------------+--------+
 * |        |                                                        |        |
 * |        |                        Screen                          |        |
 * |<------>|                                                        |<------>|
 * |        |                                                        |        |
 * |  200   |                                                        |  200   |
 * | Pixel  |                                                        | Pixel  |
 * | Buffer |                                                        | Buffer |
 * |        |                                                        |        |
 * |<------>|                                                        |<------>|
 * |        |                                                        |        |
 * |  200   |                                                        |  200   |
 * | Pixel  |                                                        | Pixel  |
 * | Buffer |                                                        | Buffer |
 * |        |                      Positions                         |        |
 * |<------>|                                                        |<------>|
 * |        0    1    2    3     4     5     6     7     8     9    10        |
 * |        |                                                        |        |
 * +--------+--------------------------------------------------------+--------+
 * 
 * These Positions can be changed in the Plugin Parameters if you understand
 * JavaScript code. If you do not, we do NOT recommend tinkering with it.
 * 
 * This means if the Position 0 is used, the Picture Bust will appear centered
 * at the bottom of the far left side of the screen with a 200 distance buffer.
 * If the Position 5 is used, the Picture Bust will appear at the center bottom
 * of the screen. If the Position 8 is used, the Picture Bust will appear about
 * 3/4ths the way across the screen from the left.
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
 * === Basic-Bust Plugin Commands ===
 * 
 * ---
 *
 * BASIC: Enter Bust
 * - Generic entrance for ONE picture bust.
 * - Walks in from a little behind and fades in.
 *
 *   Picture ID:
 *   - What is the Picture ID to associate with this bust?
 *   - You may use JavaScript code.
 *
 *     Picture File:
 *     - What picture file do you wish to use?
 *
 *     Origin:
 *     - What kind of origin setting do you wish to use for this bust?
 *     - Upper Left
 *     - Center
 *     - Bust
 *
 *   Screen Position:
 *   - Insert a screen position value from 0 to 10.
 *   - Coordinates are determined by Plugin Parameters.
 *   - Refer to "Quick Understanding on How Busts Work" to understand how
 *     "Predetermined Positioning" positioning works by default.
 *
 *     Start Offset X:
 *     - What starting position to enter the bust from?
 *     - Negative: behind; Positive: front.
 *     - You may use JavaScript.
 *
 *     Start Offset Y:
 *     - What starting position to enter the bust from?
 *     - Negative: up; Positive: down.
 *     - You may use JavaScript.
 *
 *     Entrance Easing:
 *     - Select which easing type you wish to apply.
 *
 *   Horizontal Mirror:
 *   - Apply horizontal mirroring for this bust?
 *     - None
 *     - Mirror
 *     - Auto
 *     - Auto-Reverse
 *
 *   Duration:
 *   - Duration in frames for the bust entrance.
 *
 * ---
 *
 * BASIC: Exit Bust(s)
 * - Generic exit for picture bust(s).
 * - Walks back and fades out.
 *
 *   Picture ID(s):
 *   - What Picture ID(s) to associate with this command?
 *   - You may use JavaScript code.
 *
 *     End Offset X:
 *     - What end position to exit the bust to?
 *     - Negative: behind; Positive: front.
 *     - You may use JavaScript.
 *
 *     End Offset Y:
 *     - What end position to exit the bust to?
 *     - Negative: up; Positive: down.
 *     - You may use JavaScript.
 *
 *     Exit Easing:
 *     - Select which easing type you wish to apply.
 *
 *     Flip Direction:
 *     - Flip direction when exiting?
 *
 *   Duration:
 *   - Duration in frames for the bust exit.
 *
 *   Auto-Erase?:
 *   - Automatically erase the bust(s) after fading out completely?
 *
 * ---
 *
 * BASIC: Graphic Change
 * - Changes ONE bust's graphic without changing any of its other properties.
 * - Useful for quickly changing facial expressions or poses.
 *
 *   Picture ID:
 *   - What is the Picture ID to associate with this bust?
 *   - You may use JavaScript code.
 *
 *   Picture File:
 *   - What picture file do you wish to use?
 *
 * ---
 *
 * BASIC: Mirror Bust(s)
 * - Change the facing direction the bust(s).
 * - This alters the horizontal scaling of the bust(s).
 *
 *   Picture ID(s):
 *   - What Picture ID(s) to associate with this command?
 *   - You may use JavaScript code.
 *
 *   Horizontal Mirror:
 *   - How do you wish to affect the mirroring for the bust(s)?
 *     - None
 *     - Mirror
 *     - Auto
 *     - Auto-Reverse
 *     - Toggle
 *
 * ---
 *
 * BASIC: Origin Change Bust(s)
 * - Change the origin/anchor for bust(s).
 *
 *   Picture ID(s):
 *   - What Picture ID(s) to associate with this command?
 *   - You may use JavaScript code.
 *
 *     Origin:
 *     - Pick what kind of origin setting to use for this bust?
 *     - "Bust" value is based on Plugin Parameters.
 *       - Upper Left
 *       - Center
 *       - Bust
 *
 *   Duration:
 *   - Duration in frames for the origin change.
 *
 * ---
 *
 * BASIC: Play Animation on Bust(s)
 * - Plays a specific battle animation on bust(s).
 *
 *   Picture ID(s):
 *   - What Picture ID(s) to associate with this command?
 *   - You may use JavaScript code.
 *
 *     Battle Animation ID:
 *     - Select which battle animation to play on bust.
 *
 *       Mirror Animation?:
 *       - Mirror the animation effect?
 *
 *   Wait For Animation?:
 *   - Wait until the animation is finished before continuing?
 *
 * ---
 * 
 * === Fade-Bust Plugin Commands ===
 * 
 * ---
 *
 * FADE: Fade In Bust(s)
 * - Brings selected picture bust(s) opacity levels to 255.
 *
 *   Picture ID(s):
 *   - What Picture ID(s) to associate with this command?
 *   - You may use JavaScript code.
 *
 *   Duration:
 *   - Duration in frames for the bust fade in.
 *
 * ---
 *
 * FADE: Fade Out Bust(s)
 * - Brings selected picture bust(s) opacity levels to 0.
 *
 *   Picture ID(s):
 *   - What Picture ID(s) to associate with this command?
 *   - You may use JavaScript code.
 *
 *   Duration:
 *   - Duration in frames for the bust fade out.
 *
 *     Auto-Erase?:
 *     - Automatically erase the bust(s) after fading out completely?
 *
 * ---
 *
 * FADE: Opacity By X, Bust(s)
 * - Adjusts selected picture bust(s) opacity levels relatively.
 *
 *   Picture ID(s):
 *   - What Picture ID(s) to associate with this command?
 *   - You may use JavaScript code.
 *
 *   Adjust Opacity:
 *   - Adjust opacity value of pictures by this amount.
 *   - Negative: Lower, Positive: Higher.
 *   - You may use JavaScript.
 *
 *   Duration:
 *   - Duration in frames for the bust fading.
 *
 * ---
 *
 * FADE: Opacity To X, Bust(s)
 * - Brings selected picture bust(s) opacity levels to a custom value.
 *
 *   Picture ID(s):
 *   - What Picture ID(s) to associate with this command?
 *   - You may use JavaScript code.
 *
 *   Target Opacity:
 *   - What opacity value do you wish to adjust the bust to?
 *   - Use a value between 0 and 255.
 *
 *   Duration:
 *   - Duration in frames for the bust fading.
 *
 * ---
 * 
 * === Movement-Bust Plugin Commands ===
 * 
 * ---
 *
 * MOVE: Move Bust(s) By Coordinates
 * - Move bust(s) relative to current coordinates(s).
 *
 *   Picture ID(s):
 *   - What Picture ID(s) to associate with this command?
 *   - You may use JavaScript code.
 *
 *     Move By X:
 *     - Negative: left; Positive: right; "Unchanged" for none.
 *     - You may use JavaScript.
 *
 *     Move By Y:
 *     - Negative: up; Positive: down; "Unchanged" for none.
 *     - You may use JavaScript.
 *
 *     Move Easing:
 *     - Select which easing type you wish to apply.
 *
 *   Flip Direction:
 *   - Flip direction when moving?
 *
 *   Duration:
 *   - Duration in frames for the bust movement.
 *
 * ---
 *
 * MOVE: Move Bust(s) By Position
 * - Move bust(s) relative to current position(s).
 *
 *   Picture ID(s):
 *   - What Picture ID(s) to associate with this command?
 *   - You may use JavaScript code.
 *
 *     Move By Position:
 *     - Negative: left; Positive: right; "Unchanged" for none.
 *     - You may use JavaScript.
 *     - Results between 0 and 10.
 *
 *     Move Easing:
 *     - Select which easing type you wish to apply.
 *
 *   Flip Direction:
 *   - Flip direction when moving?
 *
 *   Duration:
 *   - Duration in frames for the bust movement.
 *
 * ---
 *
 * MOVE: Move Bust(s) to Coordinates
 * - Move bust(s) to exact coordinates(s).
 *
 *   Picture ID(s):
 *   - What Picture ID(s) to associate with this command?
 *   - You may use JavaScript code.
 *
 *     Target X:
 *     - Target X coordinate.
 *     - "Unchanged" for no changes.
 *     - You may use JavaScript.
 *
 *     Target Y:
 *     - Target Y coordinate.
 *     - "Unchanged" for no changes.
 *     - You may use JavaScript.
 *
 *     Move Easing:
 *     - Select which easing type you wish to apply.
 *
 *   Flip Direction:
 *   - Flip direction when moving?
 *
 *   Duration:
 *   - Duration in frames for the bust movement.
 *
 * ---
 *
 * MOVE: Move Bust(s) to Position
 * - Move bust(s) to the predetermined position.
 *
 *   Picture ID(s):
 *   - What Picture ID(s) to associate with this command?
 *   - You may use JavaScript code.
 *
 *     Target Position:
 *     - Target predetermined position from 0 to 10.
 *     - You may use JavaScript.
 *
 *     Move Easing:
 *     - Select which easing type you wish to apply.
 *
 *   Flip Direction:
 *   - Flip direction when moving?
 *
 *   Duration:
 *   - Duration in frames for the bust movement.
 *
 * ---
 *
 * MOVE: Reset Bust(s) to Position
 * - Reset bust(s) to the current position(s).
 *
 *   Picture ID(s):
 *   - What Picture ID(s) to associate with this command?
 *   - You may use JavaScript code.
 *
 *     Move Easing:
 *     - Select which easing type you wish to apply.
 *
 *   Flip Direction:
 *   - Flip direction when moving?
 *
 *   Duration:
 *   - Duration in frames for the bust movement.
 *
 * ---
 * 
 * === Scaling-Bust Plugin Commands ===
 * 
 * ---
 *
 * SCALE: Scale Bust(s) By
 * - Scale bust(s) by specific amounts.
 * - Value scale: 100 = 100% = 1.0
 *
 *   Picture ID(s):
 *   - What Picture ID(s) to associate with this command?
 *   - You may use JavaScript code.
 *
 *     Scale X By:
 *     - Alter (additively) the X scaling value by this.
 *     - You may use JavaScript.
 *
 *     Scale Y By:
 *     - Alter (additively) the Y scaling value by this.
 *     - You may use JavaScript.
 *
 *   Duration:
 *   - Duration in frames for the bust scaling.
 *
 * ---
 *
 * SCALE: Scale Bust(s) To
 * - Scale bust(s) to specific values.
 * - Value scale: 100 = 100% = 1.0
 *
 *   Picture ID(s):
 *   - What Picture ID(s) to associate with this command?
 *   - You may use JavaScript code.
 *
 *     Scale X By:
 *     - Set X scaling value to this.
 *     - You may use JavaScript.
 *     - "Unchanged" for no changes.
 *
 *     Scale Y By:
 *     - Set Y scaling value to this.
 *     - You may use JavaScript.
 *     - "Unchanged" for no changes.
 *
 *   Duration:
 *   - Duration in frames for the bust scaling.
 *
 * ---
 *
 * SCALE: Scale Reset Bust(s)
 * - Resets the scale for bust(s) to the default settings in the
 *   Plugin Parameters.
 *
 *   Picture ID(s):
 *   - What Picture ID(s) to associate with this command?
 *   - You may use JavaScript code.
 *
 *   Duration:
 *   - Duration in frames for the bust scaling.
 *
 * ---
 * 
 * === Tone/Tint-Bust Plugin Commands ===
 * 
 * ---
 *
 * TONE: Bright Bust(s)
 * - Brighten bust(s) to use the Tone settings found in the Plugin Parameters.
 *
 *   Picture ID(s):
 *   - What Picture ID(s) to associate with this command?
 *   - You may use JavaScript code.
 *
 *   Duration:
 *   - Duration in frames for the tone change.
 *
 * ---
 *
 * TONE: Dim Bust(s)
 * - Dims bust(s) to use the Tone settings found in the Plugin Parameters.
 *
 *   Picture ID(s):
 *   - What Picture ID(s) to associate with this command?
 *   - You may use JavaScript code.
 *
 *   Duration:
 *   - Duration in frames for the tone change.
 *
 * ---
 *
 * TONE: Normal Bust(s)
 * - Normalize bust(s) to no tone at all.
 *
 *   Picture ID(s):
 *   - What Picture ID(s) to associate with this command?
 *   - You may use JavaScript code.
 *
 *   Duration:
 *   - Duration in frames for the tone change.
 *
 * ---
 *
 * TONE: Preset Tone for Bust(s)
 * - Use RPG Maker MZ's present tones/tints for bust(s).
 *
 *   Picture ID(s):
 *   - What Picture ID(s) to associate with this command?
 *   - You may use JavaScript code.
 *
 *     Preset Name:
 *     - What tone preset do you wish to apply?
 *       - Normal
 *       - Dark
 *       - Sepia
 *       - Sunset
 *       - Night
 *
 *   Duration:
 *   - Duration in frames for the tone change.
 *
 * ---
 *
 * TONE: Target Tone for Bust(s)
 * - Use a custom target tone for the bust(s).
 *
 *   Picture ID(s):
 *   - What Picture ID(s) to associate with this command?
 *   - You may use JavaScript code.
 *
 *     Custom Tone:
 *     - What tone do you want for the bust(s)?
 *     - Format: [Red, Green, Blue, Gray]
 *
 *   Duration:
 *   - Duration in frames for the tone change.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Settings
 * ============================================================================
 *
 * These are the general settings that govern the default values pertaining to
 * the Picture Busts used by this Plugin.
 *
 * ---
 *
 * Anchor Settings
 * 
 *   Anchor X:
 *   - Determines the anchor/origin X setting for Picture Busts.
 *   - 0.0 is left, 0.5 is center, 1.0 is right.
 * 
 *   Anchor Y:
 *   - Determines the anchor/origin Y setting for Picture Busts.
 *   - 0.0 is left, 0.5 is center, 1.0 is right.
 *
 * ---
 *
 * Scale Settings
 * 
 *   Scale X:
 *   - Scale X adjustment settings for Picture Busts.
 *   - Value scale: 100 = 100% = 1.0
 * 
 *   Scale Y:
 *   - Scale Y adjustment settings for Picture Busts.
 *   - Value scale: 100 = 100% = 1.0
 * 
 *   Mirror Horizontally:
 *   - Which positions will be mirrored horizontally?
 *   - You want your Busts facing the center of the screen.
 *   - This treats Busts as if they
 *
 * ---
 *
 * Screen Positioning
 * 
 *   JS: Position X:
 *   - Code to determine used to calculate the X coordinate for each
 *     screen position.
 *   - Refer to "Quick Understanding on How Busts Work" to understand how
 *     "Predetermined Positioning" positioning works by default.
 * 
 *   JS: Position Y:
 *   - Code to determine used to calculate the Y coordinate for each
 *     screen position.
 *   - Refer to "Quick Understanding on How Busts Work" to understand how
 *     "Predetermined Positioning" positioning works by default.
 *
 * ---
 *
 * Tone
 * 
 *   Bright Tone:
 *   - What tone do you want for brightness?
 *   - Format: [Red, Green, Blue, Gray]
 * 
 *   Dim Tone:
 *   - What tone do you want for dimming?
 *   - Format: [Red, Green, Blue, Gray]
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
 * * Irina
 * * Arisu
 * * Olivia
 * * Yanfly
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 *
 * Version 1.00 Official Release Date: December 6, 2021
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Basic
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Category_Basic
 * @text Category - Basic
 * @desc These are basic Picture Bust Plugin Commands.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Basic_EnterBust
 * @text BASIC: Enter Bust
 * @desc Generic entrance for ONE picture bust.
 * Walks in from a little behind and fades in.
 * 
 * @arg PictureID:eval
 * @text Picture ID
 * @desc What is the Picture ID to associate with this bust?
 * You may use JavaScript code.
 * @default 1
 * 
 * @arg PictureName:str
 * @text Picture File
 * @parent PictureID:eval
 * @type file
 * @dir img/pictures/
 * @desc What picture file do you wish to use?
 * @default 
 * 
 * @arg Origin:str
 * @text Origin
 * @parent PictureID:eval
 * @type select
 * @option Upper Left
 * @option Center
 * @option Bust
 * @desc What kind of origin setting do you wish to use for this bust?
 * @default Bust
 * 
 * @arg Position:num
 * @text Screen Position
 * @type number
 * @max 10
 * @desc Insert a screen position value from 0 to 10.
 * Coordinates are determined by Plugin Parameters.
 * @default 0
 * 
 * @arg StartOffsetX:eval
 * @text Start Offset X
 * @parent Position:num
 * @desc What starting position to enter the bust from?
 * Negative: behind; Positive: front. You may use JavaScript.
 * @default -200
 * 
 * @arg StartOffsetY:eval
 * @text Start Offset Y
 * @parent Position:num
 * @desc What starting position to enter the bust from?
 * Negative: up; Positive: down. You may use JavaScript.
 * @default +0
 *
 * @arg EasingType:str
 * @text Entrance Easing
 * @parent Position:num
 * @type combo
 * @option Linear
 * @option InSine
 * @option OutSine
 * @option InOutSine
 * @option InQuad
 * @option OutQuad
 * @option InOutQuad
 * @option InCubic
 * @option OutCubic
 * @option InOutCubic
 * @option InQuart
 * @option OutQuart
 * @option InOutQuart
 * @option InQuint
 * @option OutQuint
 * @option InOutQuint
 * @option InExpo
 * @option OutExpo
 * @option InOutExpo
 * @option InCirc
 * @option OutCirc
 * @option InOutCirc
 * @option InBack
 * @option OutBack
 * @option InOutBack
 * @option InElastic
 * @option OutElastic
 * @option InOutElastic
 * @option InBounce
 * @option OutBounce
 * @option InOutBounce
 * @desc Select which easing type you wish to apply.
 * @default OutSine
 *
 * @arg HorzMirror:str
 * @text Horizontal Mirror
 * @type select
 * @option None
 * @option Mirror
 * @option Auto
 * @option Auto-Reverse
 * @desc Apply horizontal mirroring for this bust?
 * @default Auto
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames for the bust entrance.
 * @default 20
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Basic_ExitBusts
 * @text BASIC: Exit Bust(s)
 * @desc Generic exit for picture bust(s).
 * Walks back and fades out.
 * 
 * @arg PictureID:arrayeval
 * @text Picture ID(s)
 * @type string[]
 * @desc What Picture ID(s) to associate with this command?
 * You may use JavaScript code.
 * @default ["1"]
 * 
 * @arg EndOffsetX:eval
 * @text End Offset X
 * @parent PictureID:arrayeval
 * @desc What end position to exit the bust to?
 * Negative: behind; Positive: front. You may use JavaScript.
 * @default -200
 * 
 * @arg EndOffsetY:eval
 * @text End Offset Y
 * @parent PictureID:arrayeval
 * @desc What end position to exit the bust to?
 * Negative: up; Positive: down. You may use JavaScript.
 * @default +0
 *
 * @arg EasingType:str
 * @text Exit Easing
 * @parent PictureID:arrayeval
 * @type combo
 * @option Linear
 * @option InSine
 * @option OutSine
 * @option InOutSine
 * @option InQuad
 * @option OutQuad
 * @option InOutQuad
 * @option InCubic
 * @option OutCubic
 * @option InOutCubic
 * @option InQuart
 * @option OutQuart
 * @option InOutQuart
 * @option InQuint
 * @option OutQuint
 * @option InOutQuint
 * @option InExpo
 * @option OutExpo
 * @option InOutExpo
 * @option InCirc
 * @option OutCirc
 * @option InOutCirc
 * @option InBack
 * @option OutBack
 * @option InOutBack
 * @option InElastic
 * @option OutElastic
 * @option InOutElastic
 * @option InBounce
 * @option OutBounce
 * @option InOutBounce
 * @desc Select which easing type you wish to apply.
 * @default InSine
 *
 * @arg FlipDirection:str
 * @text Flip Direction
 * @parent PictureID:arrayeval
 * @type select
 * @option None
 * @option Flip
 * @desc Flip direction when exiting?
 * @default None
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames for the bust exit.
 * @default 20
 *
 * @arg AutoErase:eval
 * @text Auto-Erase?
 * @parent Duration:eval
 * @type boolean
 * @on Auto-Erase
 * @off Don't Erase
 * @desc Automatically erase the bust(s) after fading out completely?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Basic_GraphicChange
 * @text BASIC: Graphic Change
 * @desc Changes ONE bust's graphic without changing any of its other
 * properties. Useful for quickly changing facial expressions.
 * 
 * @arg PictureID:eval
 * @text Picture ID
 * @desc What is the Picture ID to associate with this bust?
 * You may use JavaScript code.
 * @default 1
 * 
 * @arg PictureName:str
 * @text Picture File
 * @type file
 * @dir img/pictures/
 * @desc What picture file do you wish to use?
 * @default 
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Basic_MirrorBust
 * @text BASIC: Mirror Bust(s)
 * @desc Change the facing direction the bust(s).
 * This alters the horizontal scaling of the bust(s).
 * 
 * @arg PictureID:arrayeval
 * @text Picture ID(s)
 * @type string[]
 * @desc What Picture ID(s) to associate with this command?
 * You may use JavaScript code.
 * @default ["1"]
 *
 * @arg HorzMirror:str
 * @text Horizontal Mirror
 * @type select
 * @option None
 * @option Mirror
 * @option Auto
 * @option Auto-Reverse
 * @option Toggle
 * @desc How do you wish to affect the mirroring for the bust(s)?
 * @default Toggle
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Basic_OriginChange
 * @text BASIC: Origin Change Bust(s)
 * @desc Change the origin/anchor for bust(s).
 * 
 * @arg PictureID:arrayeval
 * @text Picture ID(s)
 * @type string[]
 * @desc What Picture ID(s) to associate with this command?
 * You may use JavaScript code.
 * @default ["1"]
 * 
 * @arg Origin:str
 * @text Origin
 * @parent PictureID:eval
 * @type select
 * @option Upper Left
 * @option Center
 * @option Bust
 * @desc Pick what kind of origin setting to use for this bust?
 * "Bust" value is based on Plugin Parameters.
 * @default Bust
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames for the origin change.
 * @default 20
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Basic_PlayAniBust
 * @text BASIC: Play Animation on Bust(s)
 * @desc Plays a specific battle animation on bust(s).
 * 
 * @arg PictureID:arrayeval
 * @text Picture ID(s)
 * @type string[]
 * @desc What Picture ID(s) to associate with this command?
 * You may use JavaScript code.
 * @default ["1"]
 * 
 * @arg AnimationID:num
 * @text Battle Animation ID
 * @parent PictureID:arrayeval
 * @type animation
 * @desc Select which battle animation to play on bust.
 * @default 1
 *
 * @arg Mirror:eval
 * @text Mirror Animation?
 * @parent AnimationID:num
 * @type boolean
 * @on Mirror
 * @off Normal
 * @desc Mirror the animation effect?
 * @default false
 *
 * @arg WaitForAnimation:eval
 * @text Wait For Animation?
 * @type boolean
 * @on Wait
 * @off Don't Wait
 * @desc Wait until the animation is finished before continuing?
 * @default false
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Fade
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Category_Fade
 * @text Category - Fade
 * @desc These are fading related Picture Plugin Commands.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Fade_FadeIn
 * @text FADE: Fade In Bust(s)
 * @desc Brings selected picture bust(s) opacity levels to 255.
 * 
 * @arg PictureID:arrayeval
 * @text Picture ID(s)
 * @type string[]
 * @desc What Picture ID(s) to associate with this command?
 * You may use JavaScript code.
 * @default ["1"]
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames for the bust fade in.
 * @default 20
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Fade_FadeOut
 * @text FADE: Fade Out Bust(s)
 * @desc Brings selected picture bust(s) opacity levels to 0.
 * 
 * @arg PictureID:arrayeval
 * @text Picture ID(s)
 * @type string[]
 * @desc What Picture ID(s) to associate with this command?
 * You may use JavaScript code.
 * @default ["1"]
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames for the bust fade out.
 * @default 20
 *
 * @arg AutoErase:eval
 * @text Auto-Erase?
 * @parent Duration:eval
 * @type boolean
 * @on Auto-Erase
 * @off Don't Erase
 * @desc Automatically erase the bust(s) after fading out completely?
 * @default false
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Fade_OpacityBy
 * @text FADE: Opacity By X, Bust(s)
 * @desc Adjusts selected picture bust(s) opacity levels relatively.
 * 
 * @arg PictureID:arrayeval
 * @text Picture ID(s)
 * @type string[]
 * @desc What Picture ID(s) to associate with this command?
 * You may use JavaScript code.
 * @default ["1"]
 * 
 * @arg AdjustOpacity:eval
 * @text Adjust Opacity
 * @desc Adjust opacity value of pictures by this amount.
 * Negative: Lower, Positive: Higher. You may use JavaScript.
 * @default +50
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames for the bust fading.
 * @default 20
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Fade_OpacityTo
 * @text FADE: Opacity To X, Bust(s)
 * @desc Brings selected picture bust(s) opacity levels to a custom value.
 * 
 * @arg PictureID:arrayeval
 * @text Picture ID(s)
 * @type string[]
 * @desc What Picture ID(s) to associate with this command?
 * You may use JavaScript code.
 * @default ["1"]
 * 
 * @arg TargetOpacity:num
 * @text Target Opacity
 * @desc What opacity value do you wish to adjust the bust to?
 * Use a value between 0 and 255.
 * @type number
 * @min 0
 * @max 255
 * @default 128
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames for the bust fading.
 * @default 20
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Move
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Category_Move
 * @text Category - Movement
 * @desc These are movement-related Picture Bust Plugin Commands.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Move_MoveByCoordinates
 * @text MOVE: Move Bust(s) By Coordinates
 * @desc Move bust(s) relative to current coordinates(s).
 * 
 * @arg PictureID:arrayeval
 * @text Picture ID(s)
 * @type string[]
 * @desc What Picture ID(s) to associate with this command?
 * You may use JavaScript code.
 * @default ["1"]
 * 
 * @arg MoveX:str
 * @text Move By X
 * @parent PictureID:arrayeval
 * @desc Negative: left; Positive: right; "Unchanged" for none.
 * You may use JavaScript.
 * @default +100
 * 
 * @arg MoveY:str
 * @text Move By Y
 * @parent PictureID:arrayeval
 * @desc Negative: up; Positive: down; "Unchanged" for none.
 * You may use JavaScript.
 * @default Unchanged
 *
 * @arg EasingType:str
 * @text Move Easing
 * @parent PictureID:arrayeval
 * @type combo
 * @option Linear
 * @option InSine
 * @option OutSine
 * @option InOutSine
 * @option InQuad
 * @option OutQuad
 * @option InOutQuad
 * @option InCubic
 * @option OutCubic
 * @option InOutCubic
 * @option InQuart
 * @option OutQuart
 * @option InOutQuart
 * @option InQuint
 * @option OutQuint
 * @option InOutQuint
 * @option InExpo
 * @option OutExpo
 * @option InOutExpo
 * @option InCirc
 * @option OutCirc
 * @option InOutCirc
 * @option InBack
 * @option OutBack
 * @option InOutBack
 * @option InElastic
 * @option OutElastic
 * @option InOutElastic
 * @option InBounce
 * @option OutBounce
 * @option InOutBounce
 * @desc Select which easing type you wish to apply.
 * @default InOutSine
 *
 * @arg FlipDirection:str
 * @text Flip Direction
 * @parent PictureID:arrayeval
 * @type select
 * @option None
 * @option Flip
 * @desc Flip direction when moving?
 * @default None
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames for the bust movement.
 * @default 20
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Move_MoveByPosition
 * @text MOVE: Move Bust(s) By Position
 * @desc Move bust(s) relative to current position(s).
 * 
 * @arg PictureID:arrayeval
 * @text Picture ID(s)
 * @type string[]
 * @desc What Picture ID(s) to associate with this command?
 * You may use JavaScript code.
 * @default ["1"]
 * 
 * @arg MovePosition:eval
 * @text Move By Position
 * @parent PictureID:arrayeval
 * @desc Negative: left; Positive: right; "Unchanged" for none.
 * You may use JavaScript. Results between 0 and 10.
 * @default +1
 *
 * @arg EasingType:str
 * @text Move Easing
 * @parent PictureID:arrayeval
 * @type combo
 * @option Linear
 * @option InSine
 * @option OutSine
 * @option InOutSine
 * @option InQuad
 * @option OutQuad
 * @option InOutQuad
 * @option InCubic
 * @option OutCubic
 * @option InOutCubic
 * @option InQuart
 * @option OutQuart
 * @option InOutQuart
 * @option InQuint
 * @option OutQuint
 * @option InOutQuint
 * @option InExpo
 * @option OutExpo
 * @option InOutExpo
 * @option InCirc
 * @option OutCirc
 * @option InOutCirc
 * @option InBack
 * @option OutBack
 * @option InOutBack
 * @option InElastic
 * @option OutElastic
 * @option InOutElastic
 * @option InBounce
 * @option OutBounce
 * @option InOutBounce
 * @desc Select which easing type you wish to apply.
 * @default InOutSine
 *
 * @arg FlipDirection:str
 * @text Flip Direction
 * @parent PictureID:arrayeval
 * @type select
 * @option None
 * @option Flip
 * @desc Flip direction when moving?
 * @default None
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames for the bust movement.
 * @default 20
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Move_MoveToCoordinates
 * @text MOVE: Move Bust(s) to Coordinates
 * @desc Move bust(s) to exact coordinates(s).
 * 
 * @arg PictureID:arrayeval
 * @text Picture ID(s)
 * @type string[]
 * @desc What Picture ID(s) to associate with this command?
 * You may use JavaScript code.
 * @default ["1"]
 * 
 * @arg TargetX:str
 * @text Target X
 * @parent PictureID:arrayeval
 * @desc Target X coordinate. "Unchanged" for no changes.
 * You may use JavaScript.
 * @default Graphics.width / 2
 * 
 * @arg TargetY:str
 * @text Target Y
 * @parent PictureID:arrayeval
 * @desc Target Y coordinate. "Unchanged" for no changes.
 * You may use JavaScript.
 * @default Unchanged
 *
 * @arg EasingType:str
 * @text Move Easing
 * @parent PictureID:arrayeval
 * @type combo
 * @option Linear
 * @option InSine
 * @option OutSine
 * @option InOutSine
 * @option InQuad
 * @option OutQuad
 * @option InOutQuad
 * @option InCubic
 * @option OutCubic
 * @option InOutCubic
 * @option InQuart
 * @option OutQuart
 * @option InOutQuart
 * @option InQuint
 * @option OutQuint
 * @option InOutQuint
 * @option InExpo
 * @option OutExpo
 * @option InOutExpo
 * @option InCirc
 * @option OutCirc
 * @option InOutCirc
 * @option InBack
 * @option OutBack
 * @option InOutBack
 * @option InElastic
 * @option OutElastic
 * @option InOutElastic
 * @option InBounce
 * @option OutBounce
 * @option InOutBounce
 * @desc Select which easing type you wish to apply.
 * @default InOutSine
 *
 * @arg FlipDirection:str
 * @text Flip Direction
 * @parent PictureID:arrayeval
 * @type select
 * @option None
 * @option Flip
 * @desc Flip direction when moving?
 * @default None
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames for the bust movement.
 * @default 20
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Move_MoveToPosition
 * @text MOVE: Move Bust(s) to Position
 * @desc Move bust(s) to the predetermined position.
 * 
 * @arg PictureID:arrayeval
 * @text Picture ID(s)
 * @type string[]
 * @desc What Picture ID(s) to associate with this command?
 * You may use JavaScript code.
 * @default ["1"]
 * 
 * @arg TargetPosition:eval
 * @text Target Position
 * @parent PictureID:arrayeval
 * @desc Target predetermined position from 0 to 10.
 * You may use JavaScript.
 * @default 5
 *
 * @arg EasingType:str
 * @text Move Easing
 * @parent PictureID:arrayeval
 * @type combo
 * @option Linear
 * @option InSine
 * @option OutSine
 * @option InOutSine
 * @option InQuad
 * @option OutQuad
 * @option InOutQuad
 * @option InCubic
 * @option OutCubic
 * @option InOutCubic
 * @option InQuart
 * @option OutQuart
 * @option InOutQuart
 * @option InQuint
 * @option OutQuint
 * @option InOutQuint
 * @option InExpo
 * @option OutExpo
 * @option InOutExpo
 * @option InCirc
 * @option OutCirc
 * @option InOutCirc
 * @option InBack
 * @option OutBack
 * @option InOutBack
 * @option InElastic
 * @option OutElastic
 * @option InOutElastic
 * @option InBounce
 * @option OutBounce
 * @option InOutBounce
 * @desc Select which easing type you wish to apply.
 * @default InOutSine
 *
 * @arg FlipDirection:str
 * @text Flip Direction
 * @parent PictureID:arrayeval
 * @type select
 * @option None
 * @option Flip
 * @desc Flip direction when moving?
 * @default None
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames for the bust movement.
 * @default 20
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Move_ResetToPosition
 * @text MOVE: Reset Bust(s) to Position
 * @desc Reset bust(s) to the current position(s).
 * 
 * @arg PictureID:arrayeval
 * @text Picture ID(s)
 * @type string[]
 * @desc What Picture ID(s) to associate with this command?
 * You may use JavaScript code.
 * @default ["1"]
 *
 * @arg EasingType:str
 * @text Move Easing
 * @parent PictureID:arrayeval
 * @type combo
 * @option Linear
 * @option InSine
 * @option OutSine
 * @option InOutSine
 * @option InQuad
 * @option OutQuad
 * @option InOutQuad
 * @option InCubic
 * @option OutCubic
 * @option InOutCubic
 * @option InQuart
 * @option OutQuart
 * @option InOutQuart
 * @option InQuint
 * @option OutQuint
 * @option InOutQuint
 * @option InExpo
 * @option OutExpo
 * @option InOutExpo
 * @option InCirc
 * @option OutCirc
 * @option InOutCirc
 * @option InBack
 * @option OutBack
 * @option InOutBack
 * @option InElastic
 * @option OutElastic
 * @option InOutElastic
 * @option InBounce
 * @option OutBounce
 * @option InOutBounce
 * @desc Select which easing type you wish to apply.
 * @default InOutSine
 *
 * @arg FlipDirection:str
 * @text Flip Direction
 * @parent PictureID:arrayeval
 * @type select
 * @option None
 * @option Flip
 * @desc Flip direction when moving?
 * @default None
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames for the bust movement.
 * @default 20
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Scale
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Category_Scale
 * @text Category - Scaling
 * @desc These are scaling-related Picture Bust Plugin Commands.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Scale_ScaleBy
 * @text SCALE: Scale Bust(s) By
 * @desc Scale bust(s) by specific amounts.
 * Value scale: 100 = 100% = 1.0
 * 
 * @arg PictureID:arrayeval
 * @text Picture ID(s)
 * @type string[]
 * @desc What Picture ID(s) to associate with this command?
 * You may use JavaScript code.
 * @default ["1"]
 * 
 * @arg ScaleX:eval
 * @text Scale X By
 * @parent PictureID:arrayeval
 * @desc Alter (additively) the X scaling value by this.
 * You may use JavaScript.
 * @default +20
 * 
 * @arg ScaleY:eval
 * @text Scale Y By
 * @parent PictureID:arrayeval
 * @desc Alter (additively) the Y scaling value by this.
 * You may use JavaScript.
 * @default +20
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames for the bust scaling.
 * @default 20
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Scale_ScaleTo
 * @text SCALE: Scale Bust(s) To
 * @desc Scale bust(s) to specific values.
 * Value scale: 100 = 100% = 1.0
 * 
 * @arg PictureID:arrayeval
 * @text Picture ID(s)
 * @type string[]
 * @desc What Picture ID(s) to associate with this command?
 * You may use JavaScript code.
 * @default ["1"]
 * 
 * @arg TargetScaleX:str
 * @text Target Scale X
 * @parent PictureID:arrayeval
 * @desc Set X scaling value to this.
 * You may use JavaScript. "Unchanged" for no changes.
 * @default 100
 * 
 * @arg TargetScaleY:str
 * @text Target Scale Y
 * @parent PictureID:arrayeval
 * @desc Set Y scaling value to this.
 * You may use JavaScript. "Unchanged" for no changes.
 * @default 100
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames for the bust scaling.
 * @default 20
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Scale_ScaleReset
 * @text SCALE: Scale Reset Bust(s)
 * @desc Resets the scale for bust(s) to the default
 * settings in the Plugin Parameters.
 * 
 * @arg PictureID:arrayeval
 * @text Picture ID(s)
 * @type string[]
 * @desc What Picture ID(s) to associate with this command?
 * You may use JavaScript code.
 * @default ["1"]
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames for the bust scaling.
 * @default 20
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Tone
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Category_Tone
 * @text Category - Tone
 * @desc These are tone-related Picture Bust Plugin Commands.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Tone_BrightBust
 * @text TONE: Bright Bust(s)
 * @desc Brighten bust(s) to use the Tone settings
 * found in the Plugin Parameters.
 * 
 * @arg PictureID:arrayeval
 * @text Picture ID(s)
 * @type string[]
 * @desc What Picture ID(s) to associate with this command?
 * You may use JavaScript code.
 * @default ["1"]
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames for the tone change.
 * @default 20
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Tone_DimBust
 * @text TONE: Dim Bust(s)
 * @desc Dims bust(s) to use the Tone settings
 * found in the Plugin Parameters.
 * 
 * @arg PictureID:arrayeval
 * @text Picture ID(s)
 * @type string[]
 * @desc What Picture ID(s) to associate with this command?
 * You may use JavaScript code.
 * @default ["1"]
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames for the tone change.
 * @default 20
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Tone_NormalBust
 * @text TONE: Normal Bust(s)
 * @desc Normalize bust(s) to no tone at all.
 * 
 * @arg PictureID:arrayeval
 * @text Picture ID(s)
 * @type string[]
 * @desc What Picture ID(s) to associate with this command?
 * You may use JavaScript code.
 * @default ["1"]
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames for the tone change.
 * @default 20
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Tone_PresetBust
 * @text TONE: Preset Tone for Bust(s)
 * @desc Use RPG Maker MZ's present tones/tints for bust(s).
 * 
 * @arg PictureID:arrayeval
 * @text Picture ID(s)
 * @type string[]
 * @desc What Picture ID(s) to associate with this command?
 * You may use JavaScript code.
 * @default ["1"]
 * 
 * @arg Preset:str
 * @text Preset Name
 * @parent PictureID:arrayeval
 * @type select
 * @option Normal
 * @option Dark
 * @option Sepia
 * @option Sunset
 * @option Night
 * @desc What tone preset do you wish to apply?
 * @default Sepia
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames for the tone change.
 * @default 20
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Tone_CustomToneBust
 * @text TONE: Target Tone for Bust(s)
 * @desc Use a custom target tone for the bust(s).
 * 
 * @arg PictureID:arrayeval
 * @text Picture ID(s)
 * @type string[]
 * @desc What Picture ID(s) to associate with this command?
 * You may use JavaScript code.
 * @default ["1"]
 *
 * @arg customTone:eval
 * @text Custom Tone
 * @parent PictureID:arrayeval
 * @desc What tone do you want for the bust(s)?
 * Format: [Red, Green, Blue, Gray]
 * @default [0, 0, 0, 0]
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames for the tone change.
 * @default 20
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_End
 * @text -
 * @desc -
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
 * @param VNPictureBusts
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 * 
 * @param Anchor
 * @text Anchor Settings
 *
 * @param AnchorX:num
 * @text Anchor X
 * @parent Anchor
 * @desc Determines the anchor/origin X setting for Picture Busts.
 * 0.0 is left, 0.5 is center, 1.0 is right.
 * @default 0.5
 *
 * @param AnchorY:num
 * @text Anchor Y
 * @parent Anchor
 * @desc Determines the anchor/origin Y setting for Picture Busts.
 * 0.0 is left, 0.5 is center, 1.0 is right.
 * @default 1.0
 * 
 * @param Scale
 * @text Scale Settings
 *
 * @param ScaleX:num
 * @text Scale X
 * @parent Scale
 * @desc Scale X adjustment settings for Picture Busts.
 * Value scale: 100 = 100% = 1.0
 * @default 100
 *
 * @param ScaleY:num
 * @text Scale Y
 * @parent Scale
 * @desc Scale Y adjustment settings for Picture Busts.
 * Value scale: 100 = 100% = 1.0
 * @default 100
 *
 * @param InvertedScale:arraynum
 * @text Mirror Horizontally
 * @parent Scale
 * @type number[]
 * @max 10
 * @desc Which positions will be mirrored horizontally?
 * You want your Busts facing the center of the screen.
 * @default ["0","1","2","3","4"]
 * 
 * @param Screen
 * @text Screen Positioning
 *
 * @param ScreenX:func
 * @text JS: Position X
 * @parent Screen
 * @type note
 * @desc Code to determine used to calculate the X coordinate
 * for each screen position.
 * @default "// Declare Arguments\nconst position = arguments[0].clamp(0, 10);\n\n// Declare Variables\nconst bufferX = 200;\nconst width = Graphics.width - (bufferX * 2);\n\n// Calculate X Position\nx = Math.round(position * width / 10) + bufferX;\nx = x.clamp(bufferX, Graphics.width - bufferX);\n\n// Return X Value\nreturn x;"
 *
 * @param ScreenY:func
 * @text JS: Position Y
 * @parent Screen
 * @type note
 * @desc Code to determine used to calculate the Y coordinate
 * for each screen position.
 * @default "// Declare Arguments\nconst position = arguments[0].clamp(0, 10);\n\n// Declare Variables\nconst stagger = 0;\nconst difference = 5 - Math.abs(5 - position);\nlet y = Graphics.height;\n\n// Calculate Y Position\ny = Graphics.height + Math.round(difference * stagger);\n\n// Return Y Value\nreturn y;"
 * 
 * @param Tone
 * @text Tone Presets
 *
 * @param brightTone:eval
 * @text Bright Tone
 * @parent Tone
 * @desc What tone do you want for brightness?
 * Format: [Red, Green, Blue, Gray]
 * @default [34, 34, 34, 0]
 *
 * @param dimTone:eval
 * @text Dim Tone
 * @parent Tone
 * @desc What tone do you want for dimming?
 * Format: [Red, Green, Blue, Gray]
 * @default [-34, -34, 0, 34]
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
//=============================================================================

const _0x44c48d=_0x1cb1;function _0x1cb1(_0x17e318,_0xa8e9c6){const _0x486698=_0x4866();return _0x1cb1=function(_0x1cb183,_0x4a80eb){_0x1cb183=_0x1cb183-0x167;let _0x1430ae=_0x486698[_0x1cb183];return _0x1430ae;},_0x1cb1(_0x17e318,_0xa8e9c6);}(function(_0x2a8ecb,_0x300a77){const _0x4d2fc8=_0x1cb1,_0x15229f=_0x2a8ecb();while(!![]){try{const _0x536765=parseInt(_0x4d2fc8(0x168))/0x1+parseInt(_0x4d2fc8(0x1bc))/0x2+-parseInt(_0x4d2fc8(0x1b2))/0x3*(-parseInt(_0x4d2fc8(0x1b0))/0x4)+-parseInt(_0x4d2fc8(0x1fb))/0x5*(parseInt(_0x4d2fc8(0x25f))/0x6)+parseInt(_0x4d2fc8(0x19a))/0x7*(parseInt(_0x4d2fc8(0x188))/0x8)+parseInt(_0x4d2fc8(0x1cc))/0x9*(parseInt(_0x4d2fc8(0x1f5))/0xa)+-parseInt(_0x4d2fc8(0x1d6))/0xb*(parseInt(_0x4d2fc8(0x244))/0xc);if(_0x536765===_0x300a77)break;else _0x15229f['push'](_0x15229f['shift']());}catch(_0x2b4b0d){_0x15229f['push'](_0x15229f['shift']());}}}(_0x4866,0x62c54));function _0x4866(){const _0x2b1b9a=['requestPictureAnimation','Basic_EnterBust','Fade_FadeIn','_spriteset','customTone','clone','aoDOo','crMVN','VisuMZ_1_BattleCore\x20needs\x20to\x20be\x20updated\x20to\x20use\x0aBASIC:\x20Play\x20Animation\x20on\x20Bust(s)\x20plugin\x20command.','push','110hnyzwE','clamp','Preset','UVZjh','Linear','Tone_BrightBust','5xMZAOb','Move_MoveByPosition','wcHFO','HorzMirrorCheck','endAnimation','Basic_ExitBusts','tRZFY','remove','FlipDirection','updateMove','caKlL','prototype','targets','includes','version','_targetScaleX','STR','Game_Picture_initialize','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','Tone_DimBust','max','ARRAYSTR','_pictureEffectsContainer','round','BattleCoreVersionCheck','createPictures','Basic_PlayAniBust','VisuMZ_1_BattleCore','Basic_OriginChange','filter','AnimationID','vnPostChangeGraphic','Scale_ScaleBy','setEasingType','_pictureId','removePictureAnimation','updateWaitMode','Basic_MirrorBust','_opacity','JSON','updateAnimations','Fade_FadeOut','processPictureAnimationRequests','jjGHB','MEOat','yGeIu','YCtuc','call','WaitForAnimation','erasePicture','startAnimation','vKiqZ','EVYIr','ARRAYFUNC','_scaleY','addChild','_duration','_scene','ScaleX','ConvertParams','ARRAYJSON','MoveX','destroy','setup','AnchorX','Game_Temp_initialize','findPictureTargetSprite','ScaleY','loXrh','YSSFB','parameters','_targetX','targetObjects','22365372oFouqR','animationBaseDelay','CENTER','createPictureEffectsContainer','initialize','NONE','PGjRY','Mirror','PictureName','TargetScaleY','picture','AnchorY','TargetScaleX','abs','XFGUb','TOGGLE','initVnPictureBusts','_wholeDuration','bind','fzwaQ','ScreenY','BeNTj','gDzGp','name','_waitMode','BUST','addLoadListener','2462946XjNCig','vnPictureBustPosition','Tone_NormalBust','setWaitMode','find','fQFJi','NZMsz','status','mirror','UPPER\x20LEFT','Move_MoveByCoordinates','InvertedScale','byINV','trim','height','StartOffsetX','EEmGV','771898OHDQDK','dimTone','showPicture','XpBYc','AUTO-REVERSE','RjyoE','Ofaff','DARK','_targetOpacity','vnAutoErasePicture','Game_Picture_updateMove','setVnBustAnchor','children','width','Move_ResetToPosition','FLIP','HorzMirror','Position','vnChangeGraphic','sOQXr','tuiUS','parse','Fade_OpacityTo','getLastPluginCommandInterpreter','_vnPictureBustPosition','AutoErase','mACqk','_vnPictureBustCoordinates','ESdck','retrievePictureAnimation','brightTone','TargetY','1584Akfbvc','MoveY','animationId','TargetX','_targetAnchor','ARRAYSTRUCT','format','_animationSprites','tint','eatmK','EVAL','isPictureAnimationPlaying','Game_Interpreter_updateWaitMode','length','JfDYJ','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','ARRAYEVAL','StartOffsetY','11291rGLDXu','SEPIA','meuZW','shrBz','updatePictureAnimations','pxAoq','ScreenX','sdXjK','toUpperCase','setTargetAnchor','createPictureAnimationSprite','Settings','makePictureTargetSprites','description','CwIEW','Tone_CustomToneBust','movePicture','kDbJP','ZfAAo','rgHeM','Spriteset_Base_createPictures','_pictureAnimationQueue','1035364PoCAHx','Spriteset_Base_removeAllAnimations','6RAvava','isMVAnimation','log','Duration','MOIiJ','_scaleX','mnOhN','ZLvcG','FrOKj','map','899602aMAHts','Fade_OpacityBy','isPlaytest','VNPictureBusts','removeAllAnimations','AUTO','isPlaying','EndOffsetY','enDvr','return\x200','_targetScaleY','setVnBustPosition','match','Scale_ScaleTo','isAnimationForEach','pictureAnimation','507339KPWBBN','wVPHX','MdAzf','SUNSET','vnSetDuration','AdjustOpacity','EasingType','animationNextDelay','RXWKs','ARRAYNUM','11OgRBpM','exit','getVnBustPosition','UNCHANGED','Scale_ScaleReset','ZedHn','_anchor','Move_MoveToCoordinates','bFelp','PictureID','registerCommand','removeAllPictureAnimations','jrZXY','setFrame','BattleCore','animationShouldMirror','DCeBw','Spriteset_Base_updateAnimations','removeChild','_targetY','pDZNC'];_0x4866=function(){return _0x2b1b9a;};return _0x4866();}var label=_0x44c48d(0x1bf),tier=tier||0x0,dependencies=['VisuMZ_0_CoreEngine'],pluginData=$plugins[_0x44c48d(0x218)](function(_0x5c9dd4){const _0x17c74d=_0x44c48d;return _0x5c9dd4[_0x17c74d(0x266)]&&_0x5c9dd4[_0x17c74d(0x1a7)][_0x17c74d(0x208)]('['+label+']');})[0x0];VisuMZ[label][_0x44c48d(0x1a5)]=VisuMZ[label][_0x44c48d(0x1a5)]||{},VisuMZ[_0x44c48d(0x236)]=function(_0x2b8c09,_0x50d115){const _0x3ba09d=_0x44c48d;for(const _0x316bd9 in _0x50d115){if(_0x3ba09d(0x16d)===_0x3ba09d(0x16d)){if(_0x316bd9['match'](/(.*):(.*)/i)){if(_0x3ba09d(0x25a)!=='gDzGp')_0x21016d[_0x3ba09d(0x1bf)][_0x3ba09d(0x23c)][_0x3ba09d(0x22a)](this),this['_pictureAnimationQueue']=[];else{const _0x16a4e3=String(RegExp['$1']),_0x2bedd4=String(RegExp['$2'])[_0x3ba09d(0x1a2)]()[_0x3ba09d(0x26c)]();let _0x2f5125,_0x32acb,_0xf0f0a7;switch(_0x2bedd4){case'NUM':_0x2f5125=_0x50d115[_0x316bd9]!==''?Number(_0x50d115[_0x316bd9]):0x0;break;case _0x3ba09d(0x1d5):_0x32acb=_0x50d115[_0x316bd9]!==''?JSON['parse'](_0x50d115[_0x316bd9]):[],_0x2f5125=_0x32acb[_0x3ba09d(0x1bb)](_0x30ffcb=>Number(_0x30ffcb));break;case _0x3ba09d(0x192):_0x2f5125=_0x50d115[_0x316bd9]!==''?eval(_0x50d115[_0x316bd9]):null;break;case _0x3ba09d(0x198):_0x32acb=_0x50d115[_0x316bd9]!==''?JSON[_0x3ba09d(0x17d)](_0x50d115[_0x316bd9]):[],_0x2f5125=_0x32acb['map'](_0x543644=>eval(_0x543644));break;case _0x3ba09d(0x222):_0x2f5125=_0x50d115[_0x316bd9]!==''?JSON[_0x3ba09d(0x17d)](_0x50d115[_0x316bd9]):'';break;case _0x3ba09d(0x237):_0x32acb=_0x50d115[_0x316bd9]!==''?JSON['parse'](_0x50d115[_0x316bd9]):[],_0x2f5125=_0x32acb['map'](_0x2d7b4c=>JSON[_0x3ba09d(0x17d)](_0x2d7b4c));break;case'FUNC':_0x2f5125=_0x50d115[_0x316bd9]!==''?new Function(JSON[_0x3ba09d(0x17d)](_0x50d115[_0x316bd9])):new Function(_0x3ba09d(0x1c5));break;case _0x3ba09d(0x230):_0x32acb=_0x50d115[_0x316bd9]!==''?JSON[_0x3ba09d(0x17d)](_0x50d115[_0x316bd9]):[],_0x2f5125=_0x32acb['map'](_0x2e5f0d=>new Function(JSON[_0x3ba09d(0x17d)](_0x2e5f0d)));break;case _0x3ba09d(0x20b):_0x2f5125=_0x50d115[_0x316bd9]!==''?String(_0x50d115[_0x316bd9]):'';break;case _0x3ba09d(0x210):_0x32acb=_0x50d115[_0x316bd9]!==''?JSON[_0x3ba09d(0x17d)](_0x50d115[_0x316bd9]):[],_0x2f5125=_0x32acb[_0x3ba09d(0x1bb)](_0x338ec7=>String(_0x338ec7));break;case'STRUCT':_0xf0f0a7=_0x50d115[_0x316bd9]!==''?JSON[_0x3ba09d(0x17d)](_0x50d115[_0x316bd9]):{},_0x2f5125=VisuMZ[_0x3ba09d(0x236)]({},_0xf0f0a7);break;case _0x3ba09d(0x18d):_0x32acb=_0x50d115[_0x316bd9]!==''?JSON[_0x3ba09d(0x17d)](_0x50d115[_0x316bd9]):[],_0x2f5125=_0x32acb[_0x3ba09d(0x1bb)](_0x2f24d3=>VisuMZ[_0x3ba09d(0x236)]({},JSON['parse'](_0x2f24d3)));break;default:continue;}_0x2b8c09[_0x16a4e3]=_0x2f5125;}}}else _0x1b77ea['_scaleX']*=-0x1,_0xf670ea['_targetScaleX']*=-0x1;}return _0x2b8c09;},(_0x2e8874=>{const _0x10b571=_0x44c48d,_0x508971=_0x2e8874[_0x10b571(0x25b)];for(const _0x3c617c of dependencies){if(_0x10b571(0x22e)===_0x10b571(0x22e)){if(!Imported[_0x3c617c]){if('ZLvcG'!==_0x10b571(0x1b9)){const _0x4ea4fd=_0x5ae81a[_0x10b571(0x1bf)][_0x10b571(0x1a5)];return!_0x4ea4fd[_0x10b571(0x26a)][_0x10b571(0x208)](_0x1eca28);}else{alert(_0x10b571(0x20d)[_0x10b571(0x18e)](_0x508971,_0x3c617c)),SceneManager[_0x10b571(0x1d7)]();break;}}}else{let _0x39c43f=_0x5da518['VNPictureBusts'][_0x10b571(0x1fe)](_0x3fcfb5,_0x43b7b4);_0x949252[_0x10b571(0x1b7)]=_0x1021cf[_0x10b571(0x251)](_0x1f1737[_0x10b571(0x1b7)])*(_0x39c43f?-0x1:0x1);}}const _0x369971=_0x2e8874[_0x10b571(0x1a7)];if(_0x369971['match'](/\[Version[ ](.*?)\]/i)){const _0x4f2ece=Number(RegExp['$1']);_0x4f2ece!==VisuMZ[label][_0x10b571(0x209)]&&(alert(_0x10b571(0x197)[_0x10b571(0x18e)](_0x508971,_0x4f2ece)),SceneManager[_0x10b571(0x1d7)]());}if(_0x369971[_0x10b571(0x1c8)](/\[Tier[ ](\d+)\]/i)){const _0x1ae868=Number(RegExp['$1']);if(_0x1ae868<tier)alert('%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.'[_0x10b571(0x18e)](_0x508971,_0x1ae868,tier)),SceneManager[_0x10b571(0x1d7)]();else{if(_0x10b571(0x167)!==_0x10b571(0x1a1))tier=Math[_0x10b571(0x20f)](_0x1ae868,tier);else{const _0x153bc7={},_0x5a6769=_0x5629a4['VNPictureBusts'][_0x10b571(0x1a5)];for(let _0xfcf89a=0x0;_0xfcf89a<=0xa;_0xfcf89a++){const _0x4e1977=_0x5a6769['ScreenX'](_0xfcf89a),_0x48225c=_0x5a6769['ScreenY'](_0xfcf89a);_0x153bc7[_0xfcf89a]={'x':_0x4e1977,'y':_0x48225c};}this[_0x10b571(0x183)]=_0x153bc7;}}}VisuMZ[_0x10b571(0x236)](VisuMZ[label]['Settings'],_0x2e8874[_0x10b571(0x241)]);})(pluginData),VisuMZ[_0x44c48d(0x1bf)]['HorzMirrorCheck']=function(_0x3473f3,_0x13b566){const _0xfbc5e3=_0x44c48d;_0x3473f3=_0x3473f3[_0xfbc5e3(0x1a2)]()[_0xfbc5e3(0x26c)]();if(_0x3473f3===_0xfbc5e3(0x249)){if(_0xfbc5e3(0x228)==='BmIbl')_0x4b5ed8[_0xfbc5e3(0x1bf)][_0xfbc5e3(0x1e7)]['call'](this),this[_0xfbc5e3(0x19e)]();else return![];}else{if(_0x3473f3==='MIRROR')return!![];else{if(_0x3473f3===_0xfbc5e3(0x1c1)){if('TFSkA'==='JcBDA')_0x34b3b8['startAnimation']&&_0x46b9a5['startAnimation']();else{const _0x3f2ee5=VisuMZ[_0xfbc5e3(0x1bf)][_0xfbc5e3(0x1a5)];return _0x3f2ee5[_0xfbc5e3(0x26a)]['includes'](_0x13b566);}}else{if(_0x3473f3===_0xfbc5e3(0x16c)){if(_0xfbc5e3(0x1c4)!==_0xfbc5e3(0x1c4))this[_0xfbc5e3(0x180)]=-0x1;else{const _0xde214e=VisuMZ[_0xfbc5e3(0x1bf)][_0xfbc5e3(0x1a5)];return!_0xde214e[_0xfbc5e3(0x26a)][_0xfbc5e3(0x208)](_0x13b566);}}}}}return![];},PluginManager['registerCommand'](pluginData[_0x44c48d(0x25b)],_0x44c48d(0x1ec),_0x5e814b=>{const _0x553733=_0x44c48d;VisuMZ[_0x553733(0x236)](_0x5e814b,_0x5e814b);const _0xc9a25a=VisuMZ[_0x553733(0x1bf)][_0x553733(0x1a5)],_0x40fcaa=(_0x5e814b[_0x553733(0x1df)]||0x1)['clamp'](0x1,0x64),_0x53aa13=_0x5e814b[_0x553733(0x24c)];if(_0x53aa13['trim']()['length']<=0x0)return;const _0x320c05=_0x5e814b['Origin'][_0x553733(0x1a2)]()['trim'](),_0x2124eb=_0x5e814b[_0x553733(0x179)][_0x553733(0x1f6)](0x0,0xa),_0x228a7b=ImageManager[_0x553733(0x260)](_0x2124eb),_0x3095fb=VisuMZ['VNPictureBusts'][_0x553733(0x1fe)](_0x5e814b[_0x553733(0x178)],_0x2124eb),_0x58eb24=_0x5e814b[_0x553733(0x26e)]*(_0x3095fb?0x1:-0x1),_0x365f78=_0x5e814b[_0x553733(0x199)];let _0x7c5e17=_0xc9a25a[_0x553733(0x235)]*(_0x3095fb?-0x1:0x1),_0x4fa287=_0xc9a25a['ScaleX'],_0x42252d=0x0;const _0x13867d=0x0;$gameScreen[_0x553733(0x16a)](_0x40fcaa,_0x53aa13,_0x320c05===_0x553733(0x268)?0x0:0x1,_0x228a7b['x']+_0x58eb24,_0x228a7b['y']+_0x365f78,_0x7c5e17,_0x4fa287,_0x42252d,_0x13867d),_0x42252d=0xff,$gameScreen['movePicture'](_0x40fcaa,_0x320c05===_0x553733(0x268)?0x0:0x1,_0x228a7b['x'],_0x228a7b['y'],_0x7c5e17,_0x4fa287,_0x42252d,_0x13867d,_0x5e814b[_0x553733(0x1b5)],0x0);const _0xd0a9d8=$gameScreen['picture'](_0x40fcaa);if(_0xd0a9d8){_0xd0a9d8[_0x553733(0x21c)](_0x5e814b['EasingType']),_0xd0a9d8['setVnBustPosition'](_0x2124eb);if(_0x320c05===_0x553733(0x25d))_0xd0a9d8[_0x553733(0x173)](!![],!![]);}}),PluginManager[_0x44c48d(0x1e0)](pluginData[_0x44c48d(0x25b)],_0x44c48d(0x200),_0x2d03ac=>{const _0x5078a1=_0x44c48d;VisuMZ[_0x5078a1(0x236)](_0x2d03ac,_0x2d03ac);const _0x46c1c8=VisuMZ['VNPictureBusts'][_0x5078a1(0x1a5)],_0x9c13cb=_0x2d03ac[_0x5078a1(0x1df)],_0x484e2f=_0x2d03ac[_0x5078a1(0x203)][_0x5078a1(0x1a2)]()[_0x5078a1(0x26c)]()==='FLIP';for(let _0x47bad6 of _0x9c13cb){_0x47bad6=(_0x47bad6||0x1)[_0x5078a1(0x1f6)](0x1,0x64);const _0x432492=$gameScreen[_0x5078a1(0x24e)](_0x47bad6);if(!_0x432492)continue;const _0x5cdacc=_0x432492['_anchor'],_0xc649fa=_0x432492['_targetAnchor'],_0x1205c8=_0x432492[_0x5078a1(0x1b7)]<0x0,_0x1dd850=_0x2d03ac['EndOffsetX']*(_0x1205c8?0x1:-0x1),_0x196649=_0x2d03ac[_0x5078a1(0x1c3)];$gameScreen[_0x5078a1(0x1aa)](_0x47bad6,_0x432492['_origin'],_0x432492['_x']+_0x1dd850,_0x432492['_y']+_0x196649,_0x432492[_0x5078a1(0x1b7)],_0x432492[_0x5078a1(0x231)],0x0,0x0,_0x2d03ac[_0x5078a1(0x1b5)],0x0),_0x432492['setAnchor'](_0x5cdacc),_0x432492[_0x5078a1(0x1a3)](_0xc649fa),_0x432492[_0x5078a1(0x21c)](_0x2d03ac[_0x5078a1(0x1d2)]),_0x432492[_0x5078a1(0x1c7)](-0x1);_0x484e2f&&(_0x432492[_0x5078a1(0x1b7)]*=-0x1,_0x432492[_0x5078a1(0x20a)]*=-0x1);if(_0x2d03ac[_0x5078a1(0x181)])$gameScreen[_0x5078a1(0x171)](_0x47bad6,0x32);}}),PluginManager[_0x44c48d(0x1e0)](pluginData[_0x44c48d(0x25b)],'Basic_GraphicChange',_0x2ab495=>{const _0x3af9e5=_0x44c48d;VisuMZ[_0x3af9e5(0x236)](_0x2ab495,_0x2ab495);const _0x27d036=_0x2ab495['PictureID'],_0x35fea3=_0x2ab495[_0x3af9e5(0x24c)];if(_0x35fea3['trim']()['length']<=0x0)return;const _0x2c9d3b=$gameScreen['picture'](_0x27d036);if(!_0x2c9d3b)return;_0x2c9d3b[_0x3af9e5(0x17a)](_0x35fea3);}),PluginManager[_0x44c48d(0x1e0)](pluginData['name'],_0x44c48d(0x220),_0x2a32c0=>{const _0x1b501d=_0x44c48d;VisuMZ[_0x1b501d(0x236)](_0x2a32c0,_0x2a32c0);const _0x5c54ec=_0x2a32c0[_0x1b501d(0x1df)],_0x4cdba9=_0x2a32c0[_0x1b501d(0x178)]['toUpperCase']()[_0x1b501d(0x26c)]();for(let _0x3bcc52 of _0x5c54ec){if(_0x1b501d(0x19f)!==_0x1b501d(0x1ea)){_0x3bcc52=(_0x3bcc52||0x1)[_0x1b501d(0x1f6)](0x1,0x64);const _0x10c3e9=$gameScreen[_0x1b501d(0x24e)](_0x3bcc52);if(!_0x10c3e9)continue;const _0x2252b8=_0x10c3e9['getVnBustPosition']();if(_0x4cdba9===_0x1b501d(0x253))_0x1b501d(0x191)!==_0x1b501d(0x191)?_0x207331['endAnimation']&&_0x2a811c[_0x1b501d(0x1ff)]():_0x10c3e9[_0x1b501d(0x1b7)]*=-0x1;else{let _0x18acce=VisuMZ['VNPictureBusts'][_0x1b501d(0x1fe)](_0x4cdba9,_0x2252b8);_0x10c3e9['_scaleX']=Math[_0x1b501d(0x251)](_0x10c3e9['_scaleX'])*(_0x18acce?-0x1:0x1);}_0x10c3e9[_0x1b501d(0x20a)]=_0x10c3e9[_0x1b501d(0x1b7)];}else return _0x584ce9[_0x1b501d(0x266)]&&_0x2a0361[_0x1b501d(0x1a7)]['includes']('['+_0x52c626+']');}}),PluginManager[_0x44c48d(0x1e0)](pluginData[_0x44c48d(0x25b)],_0x44c48d(0x217),_0x5eb37f=>{const _0x4d0e24=_0x44c48d;VisuMZ[_0x4d0e24(0x236)](_0x5eb37f,_0x5eb37f);const _0x54723f=_0x5eb37f[_0x4d0e24(0x1df)],_0x285e28=_0x5eb37f['Origin'][_0x4d0e24(0x1a2)]()[_0x4d0e24(0x26c)](),_0x5d39e9=VisuMZ[_0x4d0e24(0x1bf)][_0x4d0e24(0x1a5)],_0x11485d={'x':_0x5d39e9[_0x4d0e24(0x23b)],'y':_0x5d39e9['AnchorY']};for(let _0x3a63ca of _0x54723f){_0x3a63ca=(_0x3a63ca||0x1)[_0x4d0e24(0x1f6)](0x1,0x64);const _0x31510f=$gameScreen['picture'](_0x3a63ca);if(!_0x31510f)continue;let _0x244071={'x':0x0,'y':0x0};if(_0x285e28===_0x4d0e24(0x268))_0x4d0e24(0x1db)!==_0x4d0e24(0x1ba)?_0x244071={'x':0x0,'y':0x0}:(_0x5174ac[_0x4d0e24(0x1b7)]*=-0x1,_0x547167[_0x4d0e24(0x20a)]*=-0x1);else{if(_0x285e28===_0x4d0e24(0x246))_0x244071={'x':0.5,'y':0.5};else{if(_0x285e28===_0x4d0e24(0x25d))_0x244071=_0x11485d;else continue;}}_0x31510f['setTargetAnchor'](_0x244071),_0x31510f[_0x4d0e24(0x21c)](_0x4d0e24(0x1f9)),_0x31510f['vnSetDuration'](_0x5eb37f[_0x4d0e24(0x1b5)]);}}),PluginManager[_0x44c48d(0x1e0)](pluginData[_0x44c48d(0x25b)],_0x44c48d(0x215),_0x325ab3=>{const _0x2f694d=_0x44c48d;if(Imported[_0x2f694d(0x216)]&&VisuMZ[_0x2f694d(0x1e4)][_0x2f694d(0x209)]<1.47){if(!VisuMZ[_0x2f694d(0x1bf)][_0x2f694d(0x213)]){VisuMZ['VNPictureBusts'][_0x2f694d(0x213)]=!![];const _0x20bebc=_0x2f694d(0x1f3);alert(_0x20bebc);}return;}VisuMZ[_0x2f694d(0x236)](_0x325ab3,_0x325ab3);const _0x1ff9ca=_0x325ab3[_0x2f694d(0x1df)],_0x49941f=_0x325ab3[_0x2f694d(0x219)];if(!$dataAnimations[_0x49941f])return;const _0x4c077d=_0x325ab3[_0x2f694d(0x24b)];$gameTemp[_0x2f694d(0x1eb)](_0x1ff9ca[_0x2f694d(0x1f0)](),_0x49941f,_0x4c077d);const _0x5095a1=$gameTemp[_0x2f694d(0x17f)]();_0x5095a1&&_0x325ab3[_0x2f694d(0x22b)]&&('zQQaS'!==_0x2f694d(0x26b)?(SceneManager[_0x2f694d(0x234)][_0x2f694d(0x1ee)]['updatePictureAnimations'](),_0x5095a1[_0x2f694d(0x262)](_0x2f694d(0x1cb))):this['erasePicture'](_0x3d0bd7));}),PluginManager[_0x44c48d(0x1e0)](pluginData['name'],_0x44c48d(0x1ed),_0x9c9d76=>{const _0x1d7464=_0x44c48d;VisuMZ[_0x1d7464(0x236)](_0x9c9d76,_0x9c9d76);const _0x260c58=_0x9c9d76[_0x1d7464(0x1df)];for(let _0x1a5f5b of _0x260c58){_0x1a5f5b=(_0x1a5f5b||0x1)[_0x1d7464(0x1f6)](0x1,0x64);const _0x2d2e04=$gameScreen[_0x1d7464(0x24e)](_0x1a5f5b);if(!_0x2d2e04)continue;_0x2d2e04[_0x1d7464(0x1d0)](_0x9c9d76[_0x1d7464(0x1b5)]),_0x2d2e04['_targetOpacity']=0xff,_0x2d2e04['setEasingType'](_0x1d7464(0x1f9));}}),PluginManager[_0x44c48d(0x1e0)](pluginData[_0x44c48d(0x25b)],_0x44c48d(0x224),_0x3bd67c=>{const _0x44bb11=_0x44c48d;VisuMZ[_0x44bb11(0x236)](_0x3bd67c,_0x3bd67c);const _0x5cfe79=_0x3bd67c[_0x44bb11(0x1df)];for(let _0x164f8b of _0x5cfe79){_0x164f8b=(_0x164f8b||0x1)[_0x44bb11(0x1f6)](0x1,0x64);const _0x4bd9bd=$gameScreen[_0x44bb11(0x24e)](_0x164f8b);if(!_0x4bd9bd)continue;_0x4bd9bd[_0x44bb11(0x1d0)](_0x3bd67c[_0x44bb11(0x1b5)]),_0x4bd9bd[_0x44bb11(0x170)]=0x0,_0x4bd9bd[_0x44bb11(0x21c)](_0x44bb11(0x1f9));if(_0x3bd67c['AutoErase'])$gameScreen[_0x44bb11(0x171)](_0x164f8b,0x32);}}),PluginManager[_0x44c48d(0x1e0)](pluginData[_0x44c48d(0x25b)],_0x44c48d(0x1bd),_0x510842=>{const _0x4acc13=_0x44c48d;VisuMZ['ConvertParams'](_0x510842,_0x510842);const _0xe4714a=_0x510842[_0x4acc13(0x1df)],_0x4b2c05=Number(_0x510842[_0x4acc13(0x1d1)])||0x0;for(let _0x69c9b2 of _0xe4714a){_0x69c9b2=(_0x69c9b2||0x1)[_0x4acc13(0x1f6)](0x1,0x64);const _0x568ae5=$gameScreen[_0x4acc13(0x24e)](_0x69c9b2);if(!_0x568ae5)continue;_0x568ae5[_0x4acc13(0x1d0)](_0x510842[_0x4acc13(0x1b5)]);const _0x329669=Math[_0x4acc13(0x212)](_0x568ae5['_targetOpacity']+_0x4b2c05);_0x568ae5[_0x4acc13(0x170)]=_0x329669[_0x4acc13(0x1f6)](0x0,0xff),_0x568ae5[_0x4acc13(0x21c)](_0x4acc13(0x1f9));}}),PluginManager[_0x44c48d(0x1e0)](pluginData[_0x44c48d(0x25b)],_0x44c48d(0x17e),_0x1bacaf=>{const _0x566641=_0x44c48d;VisuMZ[_0x566641(0x236)](_0x1bacaf,_0x1bacaf);const _0x52a41c=_0x1bacaf[_0x566641(0x1df)],_0x4511dd=_0x1bacaf['TargetOpacity'][_0x566641(0x1f6)](0x0,0xff);for(let _0x45d3a6 of _0x52a41c){_0x45d3a6=(_0x45d3a6||0x1)['clamp'](0x1,0x64);const _0x686dae=$gameScreen[_0x566641(0x24e)](_0x45d3a6);if(!_0x686dae)continue;_0x686dae[_0x566641(0x1d0)](_0x1bacaf[_0x566641(0x1b5)]),_0x686dae[_0x566641(0x170)]=_0x4511dd,_0x686dae[_0x566641(0x21c)](_0x566641(0x1f9));}}),PluginManager[_0x44c48d(0x1e0)](pluginData['name'],_0x44c48d(0x269),_0x1198fd=>{const _0x2a9e02=_0x44c48d;VisuMZ[_0x2a9e02(0x236)](_0x1198fd,_0x1198fd);const _0x3f86fe=_0x1198fd[_0x2a9e02(0x1df)],_0x47caa6=_0x1198fd[_0x2a9e02(0x203)]['toUpperCase']()['trim']()===_0x2a9e02(0x177);for(let _0x5cbdab of _0x3f86fe){if(_0x2a9e02(0x252)==='ltUdB')_0x3c0566['_scaleX']*=-0x1,_0x193a66[_0x2a9e02(0x20a)]*=-0x1;else{_0x5cbdab=(_0x5cbdab||0x1)['clamp'](0x1,0x64);const _0x10855b=$gameScreen[_0x2a9e02(0x24e)](_0x5cbdab);if(!_0x10855b)continue;if(_0x1198fd[_0x2a9e02(0x238)][_0x2a9e02(0x1a2)]()[_0x2a9e02(0x26c)]()!=='UNCHANGED'){if(_0x2a9e02(0x1fd)!==_0x2a9e02(0x1fd))return!![];else try{const _0x557131=eval(_0x1198fd[_0x2a9e02(0x238)]);if(_0x10855b[_0x2a9e02(0x233)]>0x0){if(_0x2a9e02(0x226)!=='jjGHB'){_0x27236d[_0x2a9e02(0x1bf)][_0x2a9e02(0x213)]=!![];const _0x14b700=_0x2a9e02(0x1f3);_0x2e07d4(_0x14b700);}else _0x10855b[_0x2a9e02(0x242)]+=_0x557131;}else _0x10855b['_targetX']=_0x10855b['_x']+_0x557131;}catch(_0x22cc9){if(_0x2a9e02(0x264)!==_0x2a9e02(0x264))_0x9f4289['_scene'][_0x2a9e02(0x1ee)][_0x2a9e02(0x19e)](),_0x7c5462[_0x2a9e02(0x262)](_0x2a9e02(0x1cb));else{if($gameTemp[_0x2a9e02(0x1be)]())console[_0x2a9e02(0x1b4)](_0x22cc9);}}}if(_0x1198fd[_0x2a9e02(0x189)][_0x2a9e02(0x1a2)]()[_0x2a9e02(0x26c)]()!=='UNCHANGED')try{const _0x199d8f=eval(_0x1198fd[_0x2a9e02(0x189)]);_0x10855b[_0x2a9e02(0x233)]>0x0?_0x2a9e02(0x1f8)===_0x2a9e02(0x17b)?(_0x5e5400['_targetScaleX']=_0xd8f311[_0x2a9e02(0x1b7)]+_0x4c30a4,_0x4d79e9[_0x2a9e02(0x1c6)]=_0x2465c8[_0x2a9e02(0x231)]+_0xd6d0e6):_0x10855b[_0x2a9e02(0x1e9)]+=_0x199d8f:_0x10855b[_0x2a9e02(0x1e9)]=_0x10855b['_y']+_0x199d8f;}catch(_0x1e6047){if('jqrKO'===_0x2a9e02(0x1ce)){if(_0x44bca5[_0x2a9e02(0x1be)]())_0x1f01b1[_0x2a9e02(0x1b4)](_0x596b51);}else{if($gameTemp[_0x2a9e02(0x1be)]())console[_0x2a9e02(0x1b4)](_0x1e6047);}}_0x10855b[_0x2a9e02(0x1d0)](_0x1198fd['Duration']),_0x10855b['setEasingType'](_0x1198fd[_0x2a9e02(0x1d2)]);if(_0x47caa6){if('JuesS'!==_0x2a9e02(0x196))_0x10855b[_0x2a9e02(0x1b7)]*=-0x1,_0x10855b[_0x2a9e02(0x20a)]*=-0x1;else{if(!_0x3b856f[_0x2a9e02(0x1bf)][_0x2a9e02(0x213)]){_0x57a5e2[_0x2a9e02(0x1bf)][_0x2a9e02(0x213)]=!![];const _0x2e4070=_0x2a9e02(0x1f3);_0x361d4b(_0x2e4070);}return;}}}}}),PluginManager['registerCommand'](pluginData[_0x44c48d(0x25b)],_0x44c48d(0x1fc),_0x1a6232=>{const _0x24a078=_0x44c48d;VisuMZ[_0x24a078(0x236)](_0x1a6232,_0x1a6232);const _0x5ab790=_0x1a6232[_0x24a078(0x1df)],_0x2fcc0b=_0x1a6232[_0x24a078(0x203)][_0x24a078(0x1a2)]()[_0x24a078(0x26c)]()==='FLIP';for(let _0x33d877 of _0x5ab790){if(_0x24a078(0x1b6)===_0x24a078(0x1d4))_0xb3f40e[_0x24a078(0x1f4)](_0x13343f);else{_0x33d877=(_0x33d877||0x1)[_0x24a078(0x1f6)](0x1,0x64);const _0x13ac78=$gameScreen[_0x24a078(0x24e)](_0x33d877);if(!_0x13ac78)continue;try{const _0x30592c=eval(_0x1a6232['MovePosition']),_0xfd8de0=(_0x13ac78['getVnBustPosition']()+_0x30592c)['clamp'](0x0,0xa),_0x3156f8=ImageManager['vnPictureBustPosition'](_0xfd8de0);_0x13ac78[_0x24a078(0x242)]=_0x3156f8['x'],_0x13ac78[_0x24a078(0x1e9)]=_0x3156f8['y'],_0x13ac78['setVnBustPosition'](_0xfd8de0);}catch(_0x3bdd36){if($gameTemp[_0x24a078(0x1be)]())console[_0x24a078(0x1b4)](_0x3bdd36);}_0x13ac78[_0x24a078(0x1d0)](_0x1a6232['Duration']),_0x13ac78[_0x24a078(0x21c)](_0x1a6232[_0x24a078(0x1d2)]),_0x2fcc0b&&(_0x13ac78['_scaleX']*=-0x1,_0x13ac78[_0x24a078(0x20a)]*=-0x1);}}}),PluginManager[_0x44c48d(0x1e0)](pluginData['name'],_0x44c48d(0x1dd),_0x3ff7b8=>{const _0x490c98=_0x44c48d;VisuMZ[_0x490c98(0x236)](_0x3ff7b8,_0x3ff7b8);const _0x5c24d1=_0x3ff7b8[_0x490c98(0x1df)],_0x2ddc21=_0x3ff7b8['FlipDirection'][_0x490c98(0x1a2)]()['trim']()===_0x490c98(0x177);for(let _0x321cfd of _0x5c24d1){_0x321cfd=(_0x321cfd||0x1)['clamp'](0x1,0x64);const _0x269715=$gameScreen[_0x490c98(0x24e)](_0x321cfd);if(!_0x269715)continue;if(_0x3ff7b8['TargetX'][_0x490c98(0x1a2)]()[_0x490c98(0x26c)]()!==_0x490c98(0x1d9))try{if('ejfdd'!==_0x490c98(0x16b))_0x269715[_0x490c98(0x242)]=eval(_0x3ff7b8[_0x490c98(0x18b)]);else{const _0x40f9ba=_0x26816[_0x49853a[_0x490c98(0x18a)]],_0x185073=_0x546194['targets'],_0x21ad76=_0x1fdf65['mirror'];let _0x408f06=this[_0x490c98(0x245)]();const _0x2fc574=this['animationNextDelay']();if(this[_0x490c98(0x1ca)](_0x40f9ba))for(const _0x56d163 of _0x185073){this[_0x490c98(0x1a4)]([_0x56d163],_0x40f9ba,_0x21ad76,_0x408f06),_0x408f06+=_0x2fc574;}else this[_0x490c98(0x1a4)](_0x185073,_0x40f9ba,_0x21ad76,_0x408f06);}}catch(_0x4231fd){if($gameTemp[_0x490c98(0x1be)]())console[_0x490c98(0x1b4)](_0x4231fd);}if(_0x3ff7b8[_0x490c98(0x187)][_0x490c98(0x1a2)]()[_0x490c98(0x26c)]()!==_0x490c98(0x1d9)){if(_0x490c98(0x229)!==_0x490c98(0x1a8))try{if('jMdGz'==='ffslp'){const _0x1001fa=_0x3027fd(_0x3d2620[_0x490c98(0x250)]),_0x203c45=_0x295ec1[_0x490c98(0x1b7)]<0x0?-0x1:0x1;_0x460eb5[_0x490c98(0x20a)]=_0x1001fa*_0x203c45;}else _0x269715[_0x490c98(0x1e9)]=eval(_0x3ff7b8[_0x490c98(0x187)]);}catch(_0x238810){if($gameTemp[_0x490c98(0x1be)]())console[_0x490c98(0x1b4)](_0x238810);}else _0x41d0c6[_0x490c98(0x1b7)]*=-0x1,_0x323aea['_targetScaleX']*=-0x1;}_0x269715[_0x490c98(0x1d0)](_0x3ff7b8['Duration']),_0x269715[_0x490c98(0x21c)](_0x3ff7b8[_0x490c98(0x1d2)]),_0x2ddc21&&(_0x269715[_0x490c98(0x1b7)]*=-0x1,_0x269715[_0x490c98(0x20a)]*=-0x1);}}),PluginManager[_0x44c48d(0x1e0)](pluginData[_0x44c48d(0x25b)],'Move_MoveToPosition',_0x17b367=>{const _0x12f5e9=_0x44c48d;VisuMZ[_0x12f5e9(0x236)](_0x17b367,_0x17b367);const _0x1ce3c0=_0x17b367['PictureID'],_0x3988e5=_0x17b367[_0x12f5e9(0x203)][_0x12f5e9(0x1a2)]()[_0x12f5e9(0x26c)]()==='FLIP';for(let _0x94ba22 of _0x1ce3c0){_0x94ba22=(_0x94ba22||0x1)['clamp'](0x1,0x64);const _0x1124cb=$gameScreen[_0x12f5e9(0x24e)](_0x94ba22);if(!_0x1124cb)continue;try{if('JatpW'!=='amxVA'){const _0x1d96cc=(Number(eval(_0x17b367['TargetPosition']))||0x0)[_0x12f5e9(0x1f6)](0x0,0xa),_0x3e733a=ImageManager[_0x12f5e9(0x260)](_0x1d96cc);_0x1124cb['_targetX']=_0x3e733a['x'],_0x1124cb['_targetY']=_0x3e733a['y'],_0x1124cb[_0x12f5e9(0x1c7)](_0x1d96cc);}else _0x4c73c8=_0x19c276[_0x12f5e9(0x20f)](_0x44f334,0x1),this[_0x12f5e9(0x233)]=_0x55af24,this['_wholeDuration']=_0xfc4153;}catch(_0x47937a){if($gameTemp['isPlaytest']())console[_0x12f5e9(0x1b4)](_0x47937a);}_0x1124cb['vnSetDuration'](_0x17b367[_0x12f5e9(0x1b5)]),_0x1124cb[_0x12f5e9(0x21c)](_0x17b367[_0x12f5e9(0x1d2)]),_0x3988e5&&(_0x1124cb[_0x12f5e9(0x1b7)]*=-0x1,_0x1124cb['_targetScaleX']*=-0x1);}}),PluginManager[_0x44c48d(0x1e0)](pluginData[_0x44c48d(0x25b)],_0x44c48d(0x176),_0x255bb5=>{const _0x160dfc=_0x44c48d;VisuMZ['ConvertParams'](_0x255bb5,_0x255bb5);const _0x5a5f41=_0x255bb5[_0x160dfc(0x1df)],_0xd34dd2=_0x255bb5['FlipDirection'][_0x160dfc(0x1a2)]()[_0x160dfc(0x26c)]()===_0x160dfc(0x177);for(let _0x409b04 of _0x5a5f41){if(_0x160dfc(0x201)===_0x160dfc(0x24a)){const _0x286195=_0x459c1d(_0xdc08e8[_0x160dfc(0x189)]);_0x16d7e5['_duration']>0x0?_0x2d49ff['_targetY']+=_0x286195:_0xe9688e[_0x160dfc(0x1e9)]=_0x2c61d2['_y']+_0x286195;}else{_0x409b04=(_0x409b04||0x1)[_0x160dfc(0x1f6)](0x1,0x64);const _0x2c99e3=$gameScreen[_0x160dfc(0x24e)](_0x409b04);if(!_0x2c99e3)continue;const _0xbf0644=_0x2c99e3[_0x160dfc(0x1d8)]()[_0x160dfc(0x1f6)](0x0,0xa),_0xd90601=ImageManager[_0x160dfc(0x260)](_0xbf0644);_0x2c99e3[_0x160dfc(0x242)]=_0xd90601['x'],_0x2c99e3[_0x160dfc(0x1e9)]=_0xd90601['y'],_0x2c99e3[_0x160dfc(0x1c7)](_0xbf0644),_0x2c99e3['vnSetDuration'](_0x255bb5['Duration']),_0x2c99e3[_0x160dfc(0x21c)](_0x255bb5[_0x160dfc(0x1d2)]),_0xd34dd2&&(_0x2c99e3[_0x160dfc(0x1b7)]*=-0x1,_0x2c99e3[_0x160dfc(0x20a)]*=-0x1);}}}),PluginManager[_0x44c48d(0x1e0)](pluginData[_0x44c48d(0x25b)],_0x44c48d(0x21b),_0xbbc10b=>{const _0x1373d8=_0x44c48d;VisuMZ[_0x1373d8(0x236)](_0xbbc10b,_0xbbc10b);const _0x418007=_0xbbc10b['PictureID'];for(let _0x2e7018 of _0x418007){_0x2e7018=(_0x2e7018||0x1)['clamp'](0x1,0x64);const _0x555965=$gameScreen['picture'](_0x2e7018);if(!_0x555965)continue;let _0x1a5015=_0xbbc10b[_0x1373d8(0x235)]||0x0,_0x4634b0=_0xbbc10b[_0x1373d8(0x23e)]||0x0;if(_0x555965['_scaleX']<0x0)_0x1a5015*=-0x1;if(_0x555965[_0x1373d8(0x231)]<0x0)_0x4634b0*=-0x1;if(_0x555965[_0x1373d8(0x233)]>0x0)_0x555965[_0x1373d8(0x20a)]+=_0x1a5015,_0x555965[_0x1373d8(0x1c6)]+=_0x4634b0;else{if('BAfkh'==='BAfkh')_0x555965[_0x1373d8(0x20a)]=_0x555965[_0x1373d8(0x1b7)]+_0x1a5015,_0x555965[_0x1373d8(0x1c6)]=_0x555965[_0x1373d8(0x231)]+_0x4634b0;else{if(_0x480606[_0x1373d8(0x1be)]())_0x2016a6[_0x1373d8(0x1b4)](_0x133677);}}_0x555965[_0x1373d8(0x1d0)](_0xbbc10b[_0x1373d8(0x1b5)]),_0x555965[_0x1373d8(0x21c)](_0x1373d8(0x1f9));}}),PluginManager[_0x44c48d(0x1e0)](pluginData[_0x44c48d(0x25b)],_0x44c48d(0x1c9),_0x40007f=>{const _0x53ffe3=_0x44c48d;VisuMZ[_0x53ffe3(0x236)](_0x40007f,_0x40007f);const _0x28b2e2=_0x40007f[_0x53ffe3(0x1df)];for(let _0x3163a2 of _0x28b2e2){_0x3163a2=(_0x3163a2||0x1)[_0x53ffe3(0x1f6)](0x1,0x64);const _0x24475c=$gameScreen[_0x53ffe3(0x24e)](_0x3163a2);if(!_0x24475c)continue;if(_0x40007f[_0x53ffe3(0x250)][_0x53ffe3(0x1a2)]()['trim']()!=='UNCHANGED'){if(_0x53ffe3(0x19c)!==_0x53ffe3(0x1cd))try{if(_0x53ffe3(0x1f1)!==_0x53ffe3(0x1ab)){const _0x2a1494=eval(_0x40007f[_0x53ffe3(0x250)]),_0x400ce6=_0x24475c[_0x53ffe3(0x1b7)]<0x0?-0x1:0x1;_0x24475c[_0x53ffe3(0x20a)]=_0x2a1494*_0x400ce6;}else _0x3b8a8f[_0x53ffe3(0x1b7)]*=-0x1,_0x289b2b[_0x53ffe3(0x20a)]*=-0x1;}catch(_0x1db3b9){if($gameTemp[_0x53ffe3(0x1be)]())console[_0x53ffe3(0x1b4)](_0x1db3b9);}else{const _0x126b36=_0x55cd51[_0x53ffe3(0x1a0)](_0xb7b656),_0x4c31c8=_0x41f6d9[_0x53ffe3(0x258)](_0x5a586a);_0x3a2df6[_0x8c5014]={'x':_0x126b36,'y':_0x4c31c8};}}if(_0x40007f[_0x53ffe3(0x24d)][_0x53ffe3(0x1a2)]()[_0x53ffe3(0x26c)]()!=='UNCHANGED')try{if('WYnTJ'!==_0x53ffe3(0x205)){const _0x16211b=eval(_0x40007f[_0x53ffe3(0x24d)]),_0x4a9d8b=_0x24475c[_0x53ffe3(0x231)]<0x0?-0x1:0x1;_0x24475c['_targetScaleY']=_0x16211b*_0x4a9d8b;}else _0x3a5d95[_0x53ffe3(0x1bf)][_0x53ffe3(0x1b1)][_0x53ffe3(0x22a)](this),this[_0x53ffe3(0x1e1)]();}catch(_0x136d23){if($gameTemp[_0x53ffe3(0x1be)]())console[_0x53ffe3(0x1b4)](_0x136d23);}_0x24475c['vnSetDuration'](_0x40007f['Duration']),_0x24475c['setEasingType']('Linear');}}),PluginManager[_0x44c48d(0x1e0)](pluginData[_0x44c48d(0x25b)],_0x44c48d(0x1da),_0x3bc85e=>{const _0xb6df9a=_0x44c48d;VisuMZ[_0xb6df9a(0x236)](_0x3bc85e,_0x3bc85e);const _0x3bc2df=_0x3bc85e[_0xb6df9a(0x1df)],_0xfcff5a=VisuMZ['VNPictureBusts'][_0xb6df9a(0x1a5)];for(let _0x50335c of _0x3bc2df){_0x50335c=(_0x50335c||0x1)[_0xb6df9a(0x1f6)](0x1,0x64);const _0x4a6480=$gameScreen[_0xb6df9a(0x24e)](_0x50335c);if(!_0x4a6480)continue;_0x4a6480[_0xb6df9a(0x20a)]=_0xfcff5a['ScaleX']*(_0x4a6480['_scaleX']>0x0?0x1:-0x1),_0x4a6480[_0xb6df9a(0x1c6)]=_0xfcff5a['ScaleY']*(_0x4a6480['_scaleY']>0x0?0x1:-0x1),_0x4a6480[_0xb6df9a(0x1d0)](_0x3bc85e[_0xb6df9a(0x1b5)]),_0x4a6480[_0xb6df9a(0x21c)]('Linear');}}),PluginManager[_0x44c48d(0x1e0)](pluginData[_0x44c48d(0x25b)],_0x44c48d(0x1fa),_0xe6aaba=>{const _0x558175=_0x44c48d;VisuMZ[_0x558175(0x236)](_0xe6aaba,_0xe6aaba);const _0x1e4233=_0xe6aaba[_0x558175(0x1df)],_0x322952=VisuMZ['VNPictureBusts'][_0x558175(0x1a5)][_0x558175(0x186)];for(let _0x432d1d of _0x1e4233){if(_0x558175(0x265)!==_0x558175(0x265))try{const _0x21f8d4=_0x262644(_0x18cbee['TargetScaleY']),_0x344184=_0x2da8b7[_0x558175(0x231)]<0x0?-0x1:0x1;_0x515d40['_targetScaleY']=_0x21f8d4*_0x344184;}catch(_0x1782e8){if(_0x24bc8c[_0x558175(0x1be)]())_0x4cdc7c[_0x558175(0x1b4)](_0x1782e8);}else{_0x432d1d=(_0x432d1d||0x1)[_0x558175(0x1f6)](0x1,0x64);const _0x51cd84=$gameScreen['picture'](_0x432d1d);if(!_0x51cd84)continue;_0x51cd84['tint'](_0x322952,_0xe6aaba[_0x558175(0x1b5)]);}}}),PluginManager['registerCommand'](pluginData[_0x44c48d(0x25b)],_0x44c48d(0x20e),_0x3da252=>{const _0x3e0005=_0x44c48d;VisuMZ[_0x3e0005(0x236)](_0x3da252,_0x3da252);const _0xb92a7=_0x3da252[_0x3e0005(0x1df)],_0x252b73=VisuMZ[_0x3e0005(0x1bf)][_0x3e0005(0x1a5)][_0x3e0005(0x169)];for(let _0x42bb19 of _0xb92a7){if(_0x3e0005(0x182)!==_0x3e0005(0x182)){for(const _0x2df5ae of this[_0x3e0005(0x18f)]){!_0x2df5ae[_0x3e0005(0x1c2)]()&&this[_0x3e0005(0x21e)](_0x2df5ae);}this['processPictureAnimationRequests']();}else{_0x42bb19=(_0x42bb19||0x1)[_0x3e0005(0x1f6)](0x1,0x64);const _0x22d3a5=$gameScreen['picture'](_0x42bb19);if(!_0x22d3a5)continue;_0x22d3a5[_0x3e0005(0x190)](_0x252b73,_0x3da252['Duration']);}}}),PluginManager['registerCommand'](pluginData[_0x44c48d(0x25b)],_0x44c48d(0x261),_0x5a2608=>{const _0x478e5b=_0x44c48d;VisuMZ['ConvertParams'](_0x5a2608,_0x5a2608);const _0x1e5553=_0x5a2608[_0x478e5b(0x1df)],_0x5623ba=[0x0,0x0,0x0,0x0];for(let _0x468c69 of _0x1e5553){if(_0x478e5b(0x1e6)!=='DCeBw')this[_0x478e5b(0x21e)](_0xd8c453);else{_0x468c69=(_0x468c69||0x1)[_0x478e5b(0x1f6)](0x1,0x64);const _0x129669=$gameScreen[_0x478e5b(0x24e)](_0x468c69);if(!_0x129669)continue;_0x129669['tint'](_0x5623ba,_0x5a2608[_0x478e5b(0x1b5)]);}}}),PluginManager[_0x44c48d(0x1e0)](pluginData[_0x44c48d(0x25b)],'Tone_PresetBust',_0xd408da=>{const _0x3584ed=_0x44c48d;VisuMZ[_0x3584ed(0x236)](_0xd408da,_0xd408da);const _0x10b009=_0xd408da[_0x3584ed(0x1df)];let _0x402a7a=[0x0,0x0,0x0,0x0];switch(_0xd408da[_0x3584ed(0x1f7)][_0x3584ed(0x1a2)]()[_0x3584ed(0x26c)]()){case'NORMAL':_0x402a7a=[0x0,0x0,0x0,0x0];break;case _0x3584ed(0x16f):_0x402a7a=[-0x44,-0x44,-0x44,0x0];break;case _0x3584ed(0x19b):_0x402a7a=[0x22,-0x22,-0x44,0xaa];break;case _0x3584ed(0x1cf):_0x402a7a=[0x44,-0x22,-0x22,0x0];break;case'NIGHT':_0x402a7a=[-0x44,-0x44,0x0,0x44];break;}for(let _0x3e71e5 of _0x10b009){_0x3e71e5=(_0x3e71e5||0x1)['clamp'](0x1,0x64);const _0x1f179b=$gameScreen[_0x3584ed(0x24e)](_0x3e71e5);if(!_0x1f179b)continue;_0x1f179b[_0x3584ed(0x190)](_0x402a7a,_0xd408da[_0x3584ed(0x1b5)]);}}),PluginManager[_0x44c48d(0x1e0)](pluginData[_0x44c48d(0x25b)],_0x44c48d(0x1a9),_0x2d48c0=>{const _0x394ecc=_0x44c48d;VisuMZ['ConvertParams'](_0x2d48c0,_0x2d48c0);const _0x5bf0a6=_0x2d48c0[_0x394ecc(0x1df)],_0x2b6961=_0x2d48c0[_0x394ecc(0x1ef)];for(let _0x5852e4 of _0x5bf0a6){if(_0x394ecc(0x259)!==_0x394ecc(0x259)){const _0x2689ff=_0x124ebe(_0x51b531[_0x394ecc(0x238)]);_0x57c1d7['_duration']>0x0?_0x350ea1[_0x394ecc(0x242)]+=_0x2689ff:_0x1a57c3[_0x394ecc(0x242)]=_0x518f1d['_x']+_0x2689ff;}else{_0x5852e4=(_0x5852e4||0x1)[_0x394ecc(0x1f6)](0x1,0x64);const _0x548b11=$gameScreen[_0x394ecc(0x24e)](_0x5852e4);if(!_0x548b11)continue;_0x548b11[_0x394ecc(0x190)](_0x2b6961,_0x2d48c0[_0x394ecc(0x1b5)]);}}}),ImageManager['vnPictureBustPosition']=function(_0x25d30e){const _0x37a5fe=_0x44c48d;if(!this['_vnPictureBustCoordinates']){if(_0x37a5fe(0x1e2)!==_0x37a5fe(0x1e2)){const _0x6d7c03=this['isMVAnimation'](_0x5db6b8),_0x33e599=new(_0x6d7c03?_0x10ce16:_0x48dc26)(),_0x305ea6=this[_0x37a5fe(0x1a6)](_0x1a0e2d),_0x54996f=this[_0x37a5fe(0x245)](),_0x1be243=_0x300e64>_0x54996f?this['lastAnimationSprite']():null;this[_0x37a5fe(0x1e5)](_0x177b96[0x0])&&(_0x3ce2bf=!_0x288841),_0x33e599[_0x37a5fe(0x243)]=_0x5b3a42,_0x33e599[_0x37a5fe(0x23a)](_0x305ea6,_0x5de6b7,_0x6c72fc,_0x1cc997,_0x1be243),this[_0x37a5fe(0x211)][_0x37a5fe(0x232)](_0x33e599),this['_animationSprites'][_0x37a5fe(0x1f4)](_0x33e599);}else{const _0x1f3fe2={},_0x147c28=VisuMZ[_0x37a5fe(0x1bf)][_0x37a5fe(0x1a5)];for(let _0x27a5cf=0x0;_0x27a5cf<=0xa;_0x27a5cf++){const _0x509446=_0x147c28['ScreenX'](_0x27a5cf),_0x27a696=_0x147c28[_0x37a5fe(0x258)](_0x27a5cf);_0x1f3fe2[_0x27a5cf]={'x':_0x509446,'y':_0x27a696};}this[_0x37a5fe(0x183)]=_0x1f3fe2;}}return this[_0x37a5fe(0x183)][_0x25d30e]||new{'x':0x0,'y':0x0}();},VisuMZ[_0x44c48d(0x1bf)]['Game_Temp_initialize']=Game_Temp[_0x44c48d(0x206)]['initialize'],Game_Temp['prototype'][_0x44c48d(0x248)]=function(){const _0xf8561f=_0x44c48d;VisuMZ['VNPictureBusts'][_0xf8561f(0x23c)][_0xf8561f(0x22a)](this),this[_0xf8561f(0x1af)]=[];},Game_Temp[_0x44c48d(0x206)][_0x44c48d(0x1eb)]=function(_0x27c887,_0x8d2efb,_0x28a951){const _0x493d6c=_0x44c48d;_0x28a951=_0x28a951||![];if($dataAnimations[_0x8d2efb]){const _0x5952b2={'targets':_0x27c887,'animationId':_0x8d2efb,'mirror':_0x28a951};this[_0x493d6c(0x1af)][_0x493d6c(0x1f4)](_0x5952b2);for(const _0x4b140b of _0x27c887){_0x493d6c(0x227)!=='MEOat'?(_0x1288dc['_scaleX']*=-0x1,_0x2e3148[_0x493d6c(0x20a)]*=-0x1):_0x4b140b[_0x493d6c(0x22d)]&&_0x4b140b['startAnimation']();}}},Game_Temp[_0x44c48d(0x206)][_0x44c48d(0x185)]=function(){return this['_pictureAnimationQueue']['shift']();},Game_Screen[_0x44c48d(0x206)]['vnAutoErasePicture']=function(_0x587b24,_0x31adc9){const _0x57ece6=_0x44c48d;if(_0x31adc9<0x0)return;const _0x29ce8b=this[_0x57ece6(0x24e)](_0x587b24);if(!_0x29ce8b)return;if(_0x29ce8b[_0x57ece6(0x221)]<=0x0)this[_0x57ece6(0x22c)](_0x587b24);else{_0x31adc9-=0x1;const _0x24beea=0x64;setTimeout(this['vnAutoErasePicture']['bind'](this,_0x587b24,_0x31adc9),_0x24beea);}},VisuMZ['VNPictureBusts']['Game_Picture_initialize']=Game_Picture['prototype'][_0x44c48d(0x248)],Game_Picture[_0x44c48d(0x206)][_0x44c48d(0x248)]=function(){const _0x440203=_0x44c48d;VisuMZ[_0x440203(0x1bf)][_0x440203(0x20c)][_0x440203(0x22a)](this),this[_0x440203(0x254)]();},Game_Picture[_0x44c48d(0x206)][_0x44c48d(0x254)]=function(){const _0x42e510=_0x44c48d;this[_0x42e510(0x180)]=-0x1;},VisuMZ[_0x44c48d(0x1bf)][_0x44c48d(0x172)]=Game_Picture[_0x44c48d(0x206)][_0x44c48d(0x204)],Game_Picture[_0x44c48d(0x206)][_0x44c48d(0x204)]=function(){const _0x2b842b=_0x44c48d,_0x20fdfd=this['_duration'];VisuMZ[_0x2b842b(0x1bf)][_0x2b842b(0x172)][_0x2b842b(0x22a)](this);if(_0x20fdfd>0x0&&this[_0x2b842b(0x233)]<=0x0){this['_x']=this['_targetX'],this['_y']=this[_0x2b842b(0x1e9)],this['_scaleX']=this[_0x2b842b(0x20a)],this[_0x2b842b(0x231)]=this[_0x2b842b(0x1c6)],this[_0x2b842b(0x221)]=this['_targetOpacity'];if(this[_0x2b842b(0x1dc)]){if(_0x2b842b(0x184)===_0x2b842b(0x19d)){if(_0x144342<0x0)return;const _0x42ab4c=this[_0x2b842b(0x24e)](_0x2568ea);if(!_0x42ab4c)return;if(_0x42ab4c[_0x2b842b(0x221)]<=0x0)this[_0x2b842b(0x22c)](_0x5071b4);else{_0xdbed79-=0x1;const _0x3e09b9=0x64;_0x2193ae(this[_0x2b842b(0x171)][_0x2b842b(0x256)](this,_0x4e7935,_0x4efd3d),_0x3e09b9);}}else this[_0x2b842b(0x1dc)]['x']=this[_0x2b842b(0x18c)]['x'],this[_0x2b842b(0x1dc)]['y']=this[_0x2b842b(0x18c)]['y'];}}},Game_Picture[_0x44c48d(0x206)][_0x44c48d(0x1c7)]=function(_0x19aded){const _0x3381b9=_0x44c48d;_0x19aded=Number(_0x19aded)||0x0,this[_0x3381b9(0x180)]=_0x19aded;},Game_Picture[_0x44c48d(0x206)][_0x44c48d(0x1d8)]=function(){const _0x171435=_0x44c48d;return this[_0x171435(0x180)]===undefined&&this['initVnPictureBusts'](),this['_vnPictureBustPosition'];},Game_Picture[_0x44c48d(0x206)][_0x44c48d(0x173)]=function(_0x37974c,_0x5e20ae){const _0x9fc0be=_0x44c48d,_0x5bb8da=VisuMZ[_0x9fc0be(0x1bf)][_0x9fc0be(0x1a5)],_0x434dd7={'x':_0x5bb8da[_0x9fc0be(0x23b)],'y':_0x5bb8da[_0x9fc0be(0x24f)]};if(_0x37974c)this['setAnchor'](_0x434dd7);if(_0x5e20ae||this[_0x9fc0be(0x233)]<=0x0)this['setTargetAnchor'](_0x434dd7);},Game_Picture[_0x44c48d(0x206)][_0x44c48d(0x17a)]=function(_0x4b3918){const _0xb07ceb=_0x44c48d,_0x1357d3=ImageManager['loadPicture'](_0x4b3918);_0x1357d3[_0xb07ceb(0x25e)](this[_0xb07ceb(0x21a)][_0xb07ceb(0x256)](this,_0x4b3918));},Game_Picture[_0x44c48d(0x206)][_0x44c48d(0x21a)]=function(_0x2a8c1e){if(this)this['_name']=_0x2a8c1e;},Game_Picture[_0x44c48d(0x206)][_0x44c48d(0x1d0)]=function(_0x316640){const _0x4cef0f=_0x44c48d;_0x316640=Math[_0x4cef0f(0x20f)](_0x316640,0x1),this[_0x4cef0f(0x233)]=_0x316640,this[_0x4cef0f(0x255)]=_0x316640;},VisuMZ[_0x44c48d(0x1bf)]['Game_Interpreter_updateWaitMode']=Game_Interpreter[_0x44c48d(0x206)][_0x44c48d(0x21f)],Game_Interpreter[_0x44c48d(0x206)][_0x44c48d(0x21f)]=function(){const _0x438ec2=_0x44c48d;if(this[_0x438ec2(0x25c)]===_0x438ec2(0x1cb)){if(_0x438ec2(0x1de)!=='EwSfy'){if(SceneManager['_scene']['_spriteset'][_0x438ec2(0x193)]()){if(_0x438ec2(0x257)!==_0x438ec2(0x1ad))return!![];else try{_0x306174[_0x438ec2(0x1e9)]=_0x29c1fb(_0x546590[_0x438ec2(0x187)]);}catch(_0x41f134){if(_0x44b50d[_0x438ec2(0x1be)]())_0x4def1f[_0x438ec2(0x1b4)](_0x41f134);}}this['_waitMode']='';}else{if(_0x3b4fce['isPlaytest']())_0x2639a4[_0x438ec2(0x1b4)](_0x4249e0);}}return VisuMZ[_0x438ec2(0x1bf)][_0x438ec2(0x194)][_0x438ec2(0x22a)](this);},VisuMZ[_0x44c48d(0x1bf)][_0x44c48d(0x1ae)]=Spriteset_Base[_0x44c48d(0x206)][_0x44c48d(0x214)],Spriteset_Base[_0x44c48d(0x206)]['createPictures']=function(){const _0x2f5e95=_0x44c48d;VisuMZ['VNPictureBusts']['Spriteset_Base_createPictures'][_0x2f5e95(0x22a)](this),this[_0x2f5e95(0x247)]();},Spriteset_Base[_0x44c48d(0x206)][_0x44c48d(0x247)]=function(){const _0x4a11b6=_0x44c48d,_0x4fb3a6=new Sprite();this[_0x4a11b6(0x232)](_0x4fb3a6);const _0x4d1f03=this['pictureContainerRect']();_0x4fb3a6[_0x4a11b6(0x1e3)](_0x4d1f03['x'],_0x4d1f03['y'],_0x4d1f03[_0x4a11b6(0x175)],_0x4d1f03[_0x4a11b6(0x26d)]),this['_pictureEffectsContainer']=_0x4fb3a6;},VisuMZ[_0x44c48d(0x1bf)][_0x44c48d(0x1e7)]=Spriteset_Base[_0x44c48d(0x206)][_0x44c48d(0x223)],Spriteset_Base[_0x44c48d(0x206)][_0x44c48d(0x223)]=function(){const _0xb91575=_0x44c48d;VisuMZ[_0xb91575(0x1bf)][_0xb91575(0x1e7)][_0xb91575(0x22a)](this),this[_0xb91575(0x19e)]();},Spriteset_Base[_0x44c48d(0x206)][_0x44c48d(0x19e)]=function(){const _0x51dd03=_0x44c48d;for(const _0x3ceb76 of this[_0x51dd03(0x18f)]){_0x51dd03(0x16e)!==_0x51dd03(0x16e)?(this['_x']=this['_targetX'],this['_y']=this['_targetY'],this[_0x51dd03(0x1b7)]=this['_targetScaleX'],this['_scaleY']=this[_0x51dd03(0x1c6)],this[_0x51dd03(0x221)]=this[_0x51dd03(0x170)],this[_0x51dd03(0x1dc)]&&(this['_anchor']['x']=this[_0x51dd03(0x18c)]['x'],this['_anchor']['y']=this['_targetAnchor']['y'])):!_0x3ceb76[_0x51dd03(0x1c2)]()&&this[_0x51dd03(0x21e)](_0x3ceb76);}this[_0x51dd03(0x225)]();},Spriteset_Base[_0x44c48d(0x206)][_0x44c48d(0x225)]=function(){const _0x5245af=_0x44c48d;for(;;){const _0x556b30=$gameTemp['retrievePictureAnimation']();if(_0x556b30)this['createPictureAnimation'](_0x556b30);else{if(_0x5245af(0x240)!==_0x5245af(0x22f))break;else return this[_0x5245af(0x180)]===_0x41139f&&this['initVnPictureBusts'](),this[_0x5245af(0x180)];}}},Spriteset_Base[_0x44c48d(0x206)]['createPictureAnimation']=function(_0xea15f1){const _0x25a503=_0x44c48d,_0x5849fc=$dataAnimations[_0xea15f1['animationId']],_0x334cb5=_0xea15f1[_0x25a503(0x207)],_0x7a75eb=_0xea15f1[_0x25a503(0x267)];let _0x4a1719=this[_0x25a503(0x245)]();const _0x2ff7ea=this[_0x25a503(0x1d3)]();if(this[_0x25a503(0x1ca)](_0x5849fc)){if(_0x25a503(0x1f2)===_0x25a503(0x1b8)){_0x56522a=_0x2bc58f||![];if(_0x3a0f58[_0x387585]){const _0x4e0b3f={'targets':_0x13a024,'animationId':_0x23fde4,'mirror':_0x493c85};this['_pictureAnimationQueue']['push'](_0x4e0b3f);for(const _0x47c372 of _0x24871e){_0x47c372[_0x25a503(0x22d)]&&_0x47c372['startAnimation']();}}}else for(const _0x19d676 of _0x334cb5){this[_0x25a503(0x1a4)]([_0x19d676],_0x5849fc,_0x7a75eb,_0x4a1719),_0x4a1719+=_0x2ff7ea;}}else{if(_0x25a503(0x23f)!==_0x25a503(0x1ac))this['createPictureAnimationSprite'](_0x334cb5,_0x5849fc,_0x7a75eb,_0x4a1719);else try{const _0x14d0b4=_0x36176c(_0x3cf15a['TargetScaleX']),_0x122e59=_0x373101[_0x25a503(0x1b7)]<0x0?-0x1:0x1;_0x402aa6[_0x25a503(0x20a)]=_0x14d0b4*_0x122e59;}catch(_0x3f1725){if(_0x3075a3[_0x25a503(0x1be)]())_0x30d1c0['log'](_0x3f1725);}}},Spriteset_Base['prototype'][_0x44c48d(0x1a4)]=function(_0x4606f2,_0x2239ed,_0x575234,_0x163266){const _0x3cf115=_0x44c48d,_0x57e217=this[_0x3cf115(0x1b3)](_0x2239ed),_0x2bb925=new(_0x57e217?Sprite_AnimationMV:Sprite_Animation)(),_0x1804ba=this[_0x3cf115(0x1a6)](_0x4606f2),_0x156498=this[_0x3cf115(0x245)](),_0x4520ee=_0x163266>_0x156498?this['lastAnimationSprite']():null;if(this['animationShouldMirror'](_0x4606f2[0x0])){if(_0x3cf115(0x17c)===_0x3cf115(0x17c))_0x575234=!_0x575234;else{this[_0x3cf115(0x18f)][_0x3cf115(0x202)](_0x1794f0),this[_0x3cf115(0x211)][_0x3cf115(0x1e8)](_0x3b5411);for(const _0x492332 of _0x516e97[_0x3cf115(0x243)]){_0x492332['endAnimation']&&_0x492332['endAnimation']();}_0x3337c5[_0x3cf115(0x239)]();}}_0x2bb925['targetObjects']=_0x4606f2,_0x2bb925['setup'](_0x1804ba,_0x2239ed,_0x575234,_0x163266,_0x4520ee),this['_pictureEffectsContainer']['addChild'](_0x2bb925),this[_0x3cf115(0x18f)]['push'](_0x2bb925);},Spriteset_Base['prototype']['makePictureTargetSprites']=function(_0xbb7d9f){const _0x1cb9d9=_0x44c48d,_0x57c0e3=[];for(const _0x59c8fb of _0xbb7d9f){const _0x23395b=this[_0x1cb9d9(0x23d)](_0x59c8fb);_0x23395b&&_0x57c0e3['push'](_0x23395b);}return _0x57c0e3;},Spriteset_Base[_0x44c48d(0x206)][_0x44c48d(0x23d)]=function(_0x2168bf){const _0x321448=_0x44c48d;return this['_pictureContainer'][_0x321448(0x174)][_0x321448(0x263)](_0x405970=>_0x405970[_0x321448(0x21d)]===_0x2168bf);},Spriteset_Base[_0x44c48d(0x206)][_0x44c48d(0x21e)]=function(_0xef9b9d){const _0x1857ea=_0x44c48d;this[_0x1857ea(0x18f)]['remove'](_0xef9b9d),this['_pictureEffectsContainer'][_0x1857ea(0x1e8)](_0xef9b9d);for(const _0x53db91 of _0xef9b9d['targetObjects']){_0x53db91['endAnimation']&&_0x53db91[_0x1857ea(0x1ff)]();}_0xef9b9d[_0x1857ea(0x239)]();},VisuMZ[_0x44c48d(0x1bf)][_0x44c48d(0x1b1)]=Spriteset_Base['prototype']['removeAllAnimations'],Spriteset_Base[_0x44c48d(0x206)][_0x44c48d(0x1c0)]=function(){const _0x4d6dbe=_0x44c48d;VisuMZ[_0x4d6dbe(0x1bf)][_0x4d6dbe(0x1b1)][_0x4d6dbe(0x22a)](this),this[_0x4d6dbe(0x1e1)]();},Spriteset_Base['prototype'][_0x44c48d(0x1e1)]=function(){const _0x517e2d=_0x44c48d;for(const _0x576286 of this[_0x517e2d(0x18f)]['clone']()){this[_0x517e2d(0x21e)](_0x576286);}},Spriteset_Base[_0x44c48d(0x206)][_0x44c48d(0x193)]=function(){const _0x15bf0e=_0x44c48d,_0x3224e0=this[_0x15bf0e(0x211)];return _0x3224e0&&_0x3224e0[_0x15bf0e(0x174)][_0x15bf0e(0x195)]>0x0;};
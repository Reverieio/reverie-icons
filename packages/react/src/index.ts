/**
 * @reverie-icons/react
 *
 * React components for the Reverie icon library.
 * Each icon is available in 4 variations: Outline, Solid, Duotone, Bulk.
 *
 * @example
 *   import { FlaskOutline, DropletSolid, FlowerDuotone, MoleculeBulk } from '@reverie-icons/react'
 *
 *   <FlaskOutline size={24} color="#6A89A7" />
 *   <DropletSolid size={20} />
 *   <FlowerDuotone size={32} color="#E87D9F" secondaryOpacity={0.15} />
 *   <MoleculeBulk size={28} color="#0958d9" />
 *
 * Dynamic usage (render by name at runtime):
 *   import { Icon } from '@reverie-icons/react'
 *   <Icon name="flask" variation="duotone" size={24} />
 */

import {
  flask, droplet, flower, molecule, scent,
  leaf, beaker, pipette, scale, bottle, sparkle,
} from '@reverie-icons/core'

import { createReactIcon } from './createReactIcon'

// ── Re-exports ──────────────────────────────────────────────────────────────
export { createReactIcon, createReactIconSet } from './createReactIcon'
export type { ReverieIconProps } from './createReactIcon'
export { default as Icon } from './Icon'
export type { DynamicIconProps } from './Icon'

// Re-export core utilities for convenience
export { iconRegistry, getIcon, getIconVariation, searchIcons, iconMetadata, getIconNames } from '@reverieio/icons-core'
export type { IconVariation, IconSet, IconDefinition, IconMetadata } from '@reverieio/icons-core'

// ── Flask ───────────────────────────────────────────────────────────────────
export const FlaskOutline  = createReactIcon('FlaskOutline',  flask.outline)
export const FlaskSolid    = createReactIcon('FlaskSolid',    flask.solid)
export const FlaskDuotone  = createReactIcon('FlaskDuotone',  flask.duotone)
export const FlaskBulk     = createReactIcon('FlaskBulk',     flask.bulk)

// ── Droplet ─────────────────────────────────────────────────────────────────
export const DropletOutline  = createReactIcon('DropletOutline',  droplet.outline)
export const DropletSolid    = createReactIcon('DropletSolid',    droplet.solid)
export const DropletDuotone  = createReactIcon('DropletDuotone',  droplet.duotone)
export const DropletBulk     = createReactIcon('DropletBulk',     droplet.bulk)

// ── Flower ──────────────────────────────────────────────────────────────────
export const FlowerOutline  = createReactIcon('FlowerOutline',  flower.outline)
export const FlowerSolid    = createReactIcon('FlowerSolid',    flower.solid)
export const FlowerDuotone  = createReactIcon('FlowerDuotone',  flower.duotone)
export const FlowerBulk     = createReactIcon('FlowerBulk',     flower.bulk)

// ── Molecule ────────────────────────────────────────────────────────────────
export const MoleculeOutline  = createReactIcon('MoleculeOutline',  molecule.outline)
export const MoleculeSolid    = createReactIcon('MoleculeSolid',    molecule.solid)
export const MoleculeDuotone  = createReactIcon('MoleculeDuotone',  molecule.duotone)
export const MoleculeBulk     = createReactIcon('MoleculeBulk',     molecule.bulk)

// ── Scent ───────────────────────────────────────────────────────────────────
export const ScentOutline  = createReactIcon('ScentOutline',  scent.outline)
export const ScentSolid    = createReactIcon('ScentSolid',    scent.solid)
export const ScentDuotone  = createReactIcon('ScentDuotone',  scent.duotone)
export const ScentBulk     = createReactIcon('ScentBulk',     scent.bulk)

// ── Leaf ────────────────────────────────────────────────────────────────────
export const LeafOutline  = createReactIcon('LeafOutline',  leaf.outline)
export const LeafSolid    = createReactIcon('LeafSolid',    leaf.solid)
export const LeafDuotone  = createReactIcon('LeafDuotone',  leaf.duotone)
export const LeafBulk     = createReactIcon('LeafBulk',     leaf.bulk)

// ── Beaker ──────────────────────────────────────────────────────────────────
export const BeakerOutline  = createReactIcon('BeakerOutline',  beaker.outline)
export const BeakerSolid    = createReactIcon('BeakerSolid',    beaker.solid)
export const BeakerDuotone  = createReactIcon('BeakerDuotone',  beaker.duotone)
export const BeakerBulk     = createReactIcon('BeakerBulk',     beaker.bulk)

// ── Pipette ─────────────────────────────────────────────────────────────────
export const PipetteOutline  = createReactIcon('PipetteOutline',  pipette.outline)
export const PipetteSolid    = createReactIcon('PipetteSolid',    pipette.solid)
export const PipetteDuotone  = createReactIcon('PipetteDuotone',  pipette.duotone)
export const PipetteBulk     = createReactIcon('PipetteBulk',     pipette.bulk)

// ── Scale ───────────────────────────────────────────────────────────────────
export const ScaleOutline  = createReactIcon('ScaleOutline',  scale.outline)
export const ScaleSolid    = createReactIcon('ScaleSolid',    scale.solid)
export const ScaleDuotone  = createReactIcon('ScaleDuotone',  scale.duotone)
export const ScaleBulk     = createReactIcon('ScaleBulk',     scale.bulk)

// ── Bottle ──────────────────────────────────────────────────────────────────
export const BottleOutline  = createReactIcon('BottleOutline',  bottle.outline)
export const BottleSolid    = createReactIcon('BottleSolid',    bottle.solid)
export const BottleDuotone  = createReactIcon('BottleDuotone',  bottle.duotone)
export const BottleBulk     = createReactIcon('BottleBulk',     bottle.bulk)

// ── Sparkle ─────────────────────────────────────────────────────────────────
export const SparkleOutline  = createReactIcon('SparkleOutline',  sparkle.outline)
export const SparkleSolid    = createReactIcon('SparkleSolid',    sparkle.solid)
export const SparkleDuotone  = createReactIcon('SparkleDuotone',  sparkle.duotone)
export const SparkleBulk     = createReactIcon('SparkleBulk',     sparkle.bulk)

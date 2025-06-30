export type colorSchema = "primary" | "secondary" | "brand_primary" | "brand_secondary" | undefined;
export type variants = "filled" | "outline" | undefined;
export type size = "sm" | "md" | "lg" | "xl" | undefined;

export interface StyleSystemProps{
    colorSchema?: colorSchema,
    size?: size
}
---
id: chart-module
title: Chart
---

The Chart module provides functions for chart generation.


#### Common Classes


ChartGenerationRequest:

```typescript
interface ChartGenerationRequest {
  model: string;  
  ask: string;
  rows: Array<{[key: string]: any}>;
  column_definitions: ColumnDefinition[];
  chart_type: ChartType;
  parent_uuid?: string;
  tweak_history: ChartTweak[];
}
```


- **model**: `string`
  - The LLM smodel that will be used to generate the chart.

- **ask**: `string`
  - A query of what chart to be generated

- **rows**: `Array<{[key: string]: any}>`
  - The data rows for the chart. Each row is an object where keys are column names and values are the corresponding data.

- **column_definitions**: `ColumnDefinition[]`
  - An array of column definitions detailing the columns in the data rows.

- **chart_type**: `ChartType`
  - The type of chart to be generated, either `metabase` or `superset`.

- **parent_uuid?**: `string`
  - (Optional) The UUID of the parent chart, if applicable.

- **tweak_history**: `ChartTweak[]`
  - An array of tweaks or modifications made to the chart.




```typescript
interface ColumnDefinition {
  name: string;
  type: string;
  description?: string;
}
```

- **name**: `string`
  - The name of the column.

- **type**: `string`
  - The data type of the column (e.g., string, number, date).

- **description?**: `string`
  - (Optional) A description of the column.


```typescript
enum ChartType {
  Metabase = 'metabase',
  Superset = 'superset'
}
```

The `ChartType` enumeration defines the possible types of charts that can be generated.

- **Metabase**: `'metabase'`
  - Indicates that the chart should be generated using Metabase.

- **Superset**: `'superset'`
  - Indicates that the chart should be generated using Superset.

```typescript
interface MetabaseChartSpec {
  plot_type: string; 
  metric: string; 
  dimension: string;
  name: string;
  color_hex: string;
}
```
- **plot_type**: `string`
  - The type of plot (e.g., bar, line, pie).

- **metric**: `string`
  - The metric to be displayed in the chart.

- **dimension**: `string`
  - The dimension to categorize the data.

- **name**: `string`
  - The name of the chart.

- **color_hex**: `string`
  - The hexadecimal color code for the chart.

```typescript
interface SuperSetChartSpec {
  plot_type?: string;            
  metrics?: string[];            
  dimensions?: string[];     
  chart_name?: string;         
  color_hex?: string; 
  x_axis?: string;
  y_axis?: string;
  grid_style?: string;        
  stacked?: boolean;   
  width?: number;    
  height?: number;    
}
```

- **plot_type?**: `string`
  - (Optional) The type of plot (e.g., bar, line, pie).

- **metrics?**: `string[]`
  - (Optional) An array of metrics to be displayed in the chart.

- **dimensions?**: `string[]`
  - (Optional) An array of dimensions to categorize the data.

- **chart_name?**: `string`
  - (Optional) The name of the chart.

- **color_hex?**: `string`
  - (Optional) The hexadecimal color code for the chart.

- **x_axis?**: `string`
  - (Optional) The label for the x-axis.

- **y_axis?**: `string`
  - (Optional) The label for the y-axis.

- **grid_style?**: `string`
  - (Optional) The style of the grid.

- **stacked?**: `boolean`
  - (Optional) Indicates whether the chart should be stacked.

- **width?**: `number`
  - (Optional) The width of the chart.

- **height?**: `number`
  - (Optional) The height of the chart.
  

```typescript
interface ChartTweak {
  ask?: string;
  chart_spec?: SuperSetChartSpec | MetabaseChartSpec;
}
```

- **ask?**: `string`
  - (Optional) A query or description of the tweak.

- **chart_spec?**: `SuperSetChartSpec | MetabaseChartSpec`
  - (Optional) The chart specification after the tweak.


```typescript
interface ChartGenerationResponse  {
  uuid: string;
  timestamp?: number;
  chart_spec?: SuperSetChartSpec | MetabaseChartSpec;
}
```

- **uuid**: `string`
  - The unique identifier for the generated chart.

- **timestamp?**: `number`
  - (Optional) The timestamp indicating when the chart was generated.

- **chart_spec?**: `SuperSetChartSpec | MetabaseChartSpec`
  - (Optional) The specification of the generated chart.


### Chart Generation <a name="chart-generation"></a>

This function allows you to generate a chart based on the provided request parameters.

```typescript
async function generateChart(
    params: ChartGenerationRequest,
    signal?: AbortSignal
): Promise<ChartGenerationResponse>;
```


#### Parameters:

- `params` (required): An object of type `ChartGenerationRequest` containing the chart generation request parameters. Please refer to the common classes above for the details of the `ChartGenerationRequest` object.
- `signal` (optional): An AbortSignal object for aborting the request.

#### Returns:

A Promise resolving to a `ChartGenerationResponse` object containing the details of the generated chart specs.
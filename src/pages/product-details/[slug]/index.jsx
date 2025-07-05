import React from "react";

const ProductDetails = () => {
  return (
    <div>
      <div class="max-w-[1360px] mx-auto">
        <div class="bg-[#DC2626] text-white text-xs  flex items-center justify-center py-2 px-3 rounded-full w-14 mb-2 text-[10px] font-extrabold">
          10%
        </div>
        <div class="bg-green-100 text-green-600 text-xs text-[10px] font-extrabold flex   py-2 px-[6px] rounded-full w-24 ">
          <img src="/products/1.png" alt="" />
          ORGANIC
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div class="flex justify-center">
            <img
              src="/products/1.png"
              alt="Organic Banana"
              class="w-[4000px] rounded-xl"
            />
          </div>

          <div class="space-y-5">
            <h1 class="text-2xl font-bold">
              Marketside Fresh Organic Bananas, Bunch
            </h1>

            <p class="text-sm border-b pb-2 ">
              <span class="font-thin text-[#6B7280]">|</span>
              <strong class="text-[#6B7280] pl-2">Vendor:</strong>
              <span class="text-[13px] font-medium ">Mamun Fruit House</span>
              <span class="font-thin text-[#6B7280]">|</span>
              <strong class="text-[#6B7280] pl-3">SKU:</strong> E789GH0
            </p>

            <p class="text-sm text-gray-600 leading-relaxed">
              Vivamus adipiscing nisl ut dolor dignissim semper. Nulla luctus
              malesuada tincidunt. Class aptent taciti sociosqu ad litora
              torquent Vivamus adipiscing nisl ut dolor dignissim semper
            </p>

            <div class="flex items-center gap-4">
              <span class="text-red-600 text-2xl font-bold">BDT 100</span>
              <span class="text-gray-400 line-through text-lg">BDT 110</span>
            </div>

            <div class="flex items-center gap-5 bg-[#FFFFFF] border w-28 px-3 py-1 justify-center rounded">
              <button class=" text-xl">−</button>
              <span class="text-lg font-semibold">1</span>
              <button class=" text-lg">+</button>
            </div>

            <div class="flex gap-4">
              <button class="bg-[#16A34A] hover:bg-green-700 text-white font-semibold px-5 py-2 rounded flex items-center gap-2">
                <img src="/image/before.png" alt="" />
                Add to cart
              </button>
              <button class="bg-[#212529] hover:bg-gray-800 text-white font-semibold px-5 py-2 rounded flex items-center gap-2">
                <img src="/image/before.png" alt="" />
                Buy Now
              </button>
            </div>

            <div class="text-sm text-gray-600">
              <p>
                <strong>Unit:</strong> Dozen
              </p>
              <p>
                <strong>Category:</strong> Groceries
              </p>
            </div>

            <div class="mt-3 p-3 bg-[#E5E7EB] rounded text-sm text-[#6B7280] flex items-center gap-5">
              <div>
                <img src="/image/before.png" alt="" />
              </div>
              <div>
                <strong>Payment:</strong> Payment. Payment upon receipt of
                goods, Payment by card in the department, Bkash, Online card,
                -5% discount in case of payment
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
